'use client';

/**
 * <ProteinLoader />
 *
 * Real-time 3D protein-shaker loader (React Three Fiber + GSAP), ~5-second seamless loop:
 * spin-in → shake → lid pops off + chocolate splash → reset.
 *
 * Props
 *  theme        'forest' | 'clay' | 'dark' | 'light' — option defaults      default 'forest'
 *  bottleStyle  'tumbler' (opaque steel-look, vertical wordmark) | 'clear'  (theme default)
 *  size         'small' | 'medium' | 'large' | number(px height)          default 'large' (fills parent)
 *  background   'transparent' | 'light' | 'dark' | any CSS hex colour      (theme default)
 *  liquidColor  protein shake colour                                        (theme default)
 *  bottleColor  plastic tint                                                (theme default)
 *  inkColor     wordmark colour                                             (theme default)
 *  accentColor  brand accent (lid ring, logo circle, tagline)               default '#FF683F'
 *  speed        playback multiplier, 1 = ~5 s loop, 0.5 = half speed         default 1
 *  grain        film-grain overlay                                            default true
 *  mode         'loader' (drop-in / spin-out loop) | 'hero' (stays on screen: idle → shake →
 *               splash → settle, with floating droplets and pointer parallax)   default 'loader'
 *  idleDelay    hero mode: calm seconds between bursts                          default 4
 *  active       false pauses rendering entirely (e.g. when scrolled off-screen)  default true
 *  brandName / tagline / subline   label copy
 *  logoSrc      optional image URL drawn in place of the procedural logo mark
 *  lookOffset   lowers the camera so the scene sits higher in frame (world units)     default 0
 *  fit          multiplier on the responsive bottle height (1 = 60vh desktop / 55vh tablet / 45vh mobile)
 *  children     overlay content rendered above the canvas; the wrapper gets data-transit="1"
 *               while the bottle is rising in / sinking out (style children to dip away)
 *  paused       freeze the animation
 *  onReady      called once shaders/textures are warmed up and the timeline starts
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import ShakerBottle, { FLOOR_Y } from './ShakerBottle';
import EnergyDroplets from './EnergyDroplets';
import MotionTrail from './MotionTrail';
import ShakePool from './ShakePool';
import { createPoolState } from './pool';
import LoaderLighting from './LoaderLighting';
import LoaderCamera from './LoaderCamera';
import GroundShadow from './GroundShadow';
import { useLoaderMaterials } from './materials';
import { resolveBrandFont } from './BrandLabel';
import StudioBackdrop from './StudioBackdrop';
import HeroDroplets from './HeroDroplets';
import { createLoaderTimeline, createHeroTimeline, REST_Y, PHASES } from './animation';

const SIZES = { small: 180, medium: 360, large: '100%' };

/** Film grain tile (SVG turbulence) layered over the canvas at low opacity. */
const GRAIN_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1 0"/></filter><rect width="220" height="220" filter="url(#n)"/></svg>';

const THEMES = {
  // site palette ("Dark Forest Luxury"): deep moss / emerald studio, off-white tumbler, orange wordmark
  forest: { background: 'forest', liquidColor: '#4A2416', bottleColor: '#EDE8E1', inkColor: '#FF683F', bottleStyle: 'tumbler' },
  // brand photo: off-white steel tumbler, orange wordmark, chocolate shake, terracotta studio
  clay: { background: 'clay', liquidColor: '#4A2416', bottleColor: '#EDE8E1', inkColor: '#FF683F', bottleStyle: 'tumbler' },
  dark: { background: 'dark', liquidColor: '#3A1D12', bottleColor: '#8A8A92', inkColor: '#F8F6F2', bottleStyle: 'clear' },
  light: { background: 'light', liquidColor: '#F5E6C8', bottleColor: '#FFFFFF', inkColor: '#141414', bottleStyle: 'clear' },
};

const BACKGROUNDS = {
  // base = mid tone, glow = spotlight behind the product, edge = vignette, floor = reflective pool,
  // dust = particle colour, ambience = environment / fill tint
  forest: { base: '#173A2A', glow: '#3E8A5F', edge: '#050E09', floor: '#1B4432', dust: '#E6F2E9', ambience: '#22432F', css: '#0E2016' },
  clay: { base: '#A9735B', glow: '#DCA88E', edge: '#55372B', floor: '#7E5340', dust: '#FFE4CF', css: '#A9735B' },
  light: { base: '#EDE7DE', glow: '#FFFFFF', edge: '#C6BDB0', floor: '#DFD8CE', dust: '#FFFFFF', css: '#EDE7DE' },
  dark: { base: '#1E1E23', glow: '#44444E', edge: '#050506', floor: '#131316', dust: '#E6E6EE', css: '#141416' },
  charcoal: { base: '#1E1E23', glow: '#44444E', edge: '#050506', floor: '#131316', dust: '#E6E6EE', css: '#141416' },
};

function resolveBackground(bg) {
  if (!bg || bg === 'transparent') return null;
  if (BACKGROUNDS[bg]) return BACKGROUNDS[bg];
  const c = new THREE.Color(bg);
  const hex = (col) => '#' + col.getHexString();
  return {
    base: bg,
    glow: hex(c.clone().lerp(new THREE.Color('#ffffff'), 0.28)),
    edge: hex(c.clone().lerp(new THREE.Color('#000000'), 0.48)),
    floor: hex(c.clone().lerp(new THREE.Color('#000000'), 0.16)),
    dust: '#ffffff',
    css: bg,
  };
}

/** Sets data-transit on the wrapper while the bottle is well below its rest height. */
function TransitFlag({ rigRef, wrapperRef, restY }) {
  const last = useRef(null);
  useFrame(() => {
    const rig = rigRef.current;
    const el = wrapperRef.current;
    if (!rig || !el) return;
    const inTransit = rig.position.y < restY - 0.3;
    if (inTransit !== last.current) {
      last.current = inTransit;
      el.dataset.transit = inTransit ? '1' : '0';
    }
  });
  return null;
}

/** Builds the GSAP master timeline once every Three.js object exists. */
function LoaderController({ rigRef, lidRef, splashRef, liquidState, splashState, shakeState, camState, poolState, paused, speed, mode, idleDelay, ready }) {
  const tlRef = useRef(null);

  // Built only once the scene is warmed up (see Warmup) so the motion never stalls on a shader compile.
  useEffect(() => {
    if (!ready) return;
    const refs = {
      rig: rigRef.current,
      lid: lidRef.current,
      splash: splashRef.current,
      liquidState,
      splashState,
      shakeState,
      camState,
      poolState,
    };
    const tl = mode === 'hero' ? createHeroTimeline(refs, { idleDelay, speed }) : createLoaderTimeline(refs, speed);
    tlRef.current = tl;
    if (process.env.NODE_ENV !== 'production') {
      window.__proteinLoaderTimeline = tl; // dev hook: scrub with tl.pause(t)
      window.__proteinLoaderRefs = { rig: rigRef.current, lid: lidRef.current, splash: splashRef.current };
    }
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      // A calm, static frame: bottle at rest, lid closed, liquid full.
      tl.pause(mode === 'hero' ? 0.01 : PHASES.splash - 0.01);
    } else if (!paused) {
      tl.play(0);
    }
    return () => {
      tl.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    tlRef.current?.timeScale(speed);
  }, [speed]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (paused) tl.pause();
    else if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) tl.play();
  }, [paused]);

  return null;
}

/**
 * Warm-up: before the timeline starts, compile every shader (including parts that are hidden
 * until later — splash, crown, trail, droplets) and upload every texture/buffer with one hidden
 * frame. Without this, each part stalls the main thread for 50–150 ms the first time it appears.
 * Waits for the environment map (it changes material programs) and the label's brand webfont (the
 * label texture repaints when it arrives).
 */
function Warmup({ onReady }) {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    let cancelled = false;
    const frame = () => new Promise((r) => requestAnimationFrame(() => r()));
    (async () => {
      for (let i = 0; i < 60 && !scene.environment && !cancelled; i++) await frame();
      const font = resolveBrandFont();
      const fontLoad = document.fonts?.load ? Promise.all([document.fonts.load(`800 96px ${font}`), document.fonts.load(`600 34px ${font}`)]) : Promise.resolve();
      await Promise.race([fontLoad.catch(() => {}), new Promise((r) => setTimeout(r, 600))]);
      await frame(); // let font-driven label repaints flag their textures first
      if (cancelled) return;

      const hidden = [];
      scene.traverse((o) => {
        if (!o.visible) {
          hidden.push(o);
          o.visible = true;
        }
      });
      try {
        if (gl.compileAsync) await gl.compileAsync(scene, camera);
        else gl.compile(scene, camera);
        if (cancelled) return;
        gl.render(scene, camera); // uploads textures + geometry
      } catch {
        /* warm-up is best effort */
      } finally {
        hidden.forEach((o) => (o.visible = false));
      }
      if (!cancelled) onReady();
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/** Hero mode: gentle hover + slow turn that leans toward the pointer (wraps the rig so GSAP owns the rig itself). */
function IdleFloat({ children }) {
  const ref = useRef();
  const { pointer } = useThree();
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.position.y = Math.sin(t * 1.1) * 0.035;
    g.rotation.y += (pointer.x * 0.35 + Math.sin(t * 0.4) * 0.14 - g.rotation.y) * 0.04;
    g.rotation.x += (-pointer.y * 0.08 - g.rotation.x) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

function Wrap({ when, children }) {
  return when ? <IdleFloat>{children}</IdleFloat> : children;
}

function Fallback({ accentColor }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: `3px solid ${accentColor}33`,
          borderTopColor: accentColor,
          animation: 'proteinloader-spin 0.9s linear infinite',
        }}
      />
      <style>{`@keyframes proteinloader-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

export default function ProteinLoader({
  theme = 'forest',
  bottleStyle: bottleStyleProp,
  size = 'large',
  background: backgroundProp,
  liquidColor: liquidColorProp,
  bottleColor: bottleColorProp,
  inkColor: inkColorProp,
  accentColor = '#FF683F',
  speed = 1,
  brandName = 'THE PROTEINEST',
  tagline = 'FUELING THE FINEST YOU',
  subline = 'PLANT BASED PROTEIN',
  logoSrc = null,
  fit = 1,
  lookOffset = 0,
  grain = true,
  mode = 'loader',
  idleDelay = 4,
  active = true,
  paused = false,
  onReady,
  children,
  className,
  style,
}) {
  const t = THEMES[theme] ?? THEMES.forest;
  const bottleStyle = bottleStyleProp ?? t.bottleStyle;
  const background = backgroundProp ?? t.background;
  const liquidColor = liquidColorProp ?? t.liquidColor;
  const bottleColor = bottleColorProp ?? t.bottleColor;
  const inkColor = inkColorProp ?? t.inkColor;

  const [ready, setReady] = useState(false);
  const [dpr, setDpr] = useState(1.6);
  const rigRef = useRef();
  const lidRef = useRef();
  const splashRef = useRef();
  const wrapperRef = useRef(null);

  // Plain objects tweened by GSAP and read by useFrame — never React state.
  const liquidState = useMemo(() => ({ fill: 0, level: 1, kick: 0 }), []);
  const splashState = useMemo(() => ({ progress: 0, crown: 0, opacity: 0, fall: 0 }), []);
  const poolState = useMemo(() => createPoolState(), []);
  const withPool = mode !== 'hero';
  const shakeState = useMemo(() => ({ energy: 0, t: 0 }), []);
  const camState = useMemo(() => ({ x: 0, y: 0, z: 0, look: 0 }), []);

  const materials = useLoaderMaterials({ bottleColor, liquidColor, accentColor, bottleStyle });
  const bg = useMemo(() => resolveBackground(background), [background]);
  const height = typeof size === 'number' ? size : SIZES[size] ?? SIZES.large;

  return (
    <div
      ref={wrapperRef}
      className={className}
      role="img"
      aria-label={mode === 'hero' ? 'Animated protein shaker' : 'Loading'}
      style={{
        position: 'relative',
        width: '100%',
        height,
        minHeight: typeof height === 'number' ? height : undefined,
        background: bg ? bg.css : 'transparent',
        overflow: 'hidden',
        ...style,
      }}
    >
      <Canvas
        dpr={dpr}
        frameloop={active ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.18,
        }}
        camera={{ fov: 40, near: 0.1, far: 60, position: [0, 0.35, 5.2] }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true; // the pool surface cuts the bottle (see pool.js)
          if (bg) gl.setClearColor(new THREE.Color(bg.css), 1);
          else gl.setClearColor(0x000000, 0);
        }}
        style={{ position: 'absolute', inset: 0, opacity: ready ? 1 : 0, transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        fallback={<Fallback accentColor={accentColor} />}
      >
        {/* drop resolution on devices that can't hold the frame rate, restore when they can */}
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.6)} flipflops={3} onFallback={() => setDpr(1)} />
        <Warmup
          onReady={() => {
            setReady(true);
            onReady?.();
          }}
        />
        <LoaderCamera camState={camState} fov={40} fit={fit} lookOffset={lookOffset} />
        <LoaderLighting accentColor={accentColor} ambienceColor={bg?.ambience} />
        {bg && <StudioBackdrop preset={bg} floorY={FLOOR_Y} rigRef={withPool ? undefined : rigRef} restY={REST_Y} reflect={!withPool} />}
        {withPool && <ShakePool poolState={poolState} rigRef={rigRef} shakeState={shakeState} splashState={splashState} liquidColor={liquidColor} splashMaterial={materials.splash} />}

        {mode === 'hero' && <HeroDroplets material={materials.liquid} />}
        <Wrap when={mode === 'hero'}>
        <ShakerBottle
          rigRef={rigRef}
          lidRef={lidRef}
          splashRef={splashRef}
          materials={materials}
          liquidState={liquidState}
          splashState={splashState}
          shakeState={shakeState}
          brandName={brandName}
          tagline={tagline}
          subline={subline}
          accentColor={accentColor}
          inkColor={inkColor}
          logoSrc={logoSrc}
          bottleStyle={bottleStyle}
        />
        </Wrap>
        <EnergyDroplets rigRef={rigRef} shakeState={shakeState} material={materials.liquid} />
        <MotionTrail rigRef={rigRef} shakeState={shakeState} />
        {!withPool && <GroundShadow rigRef={rigRef} restY={REST_Y} floorY={FLOOR_Y - 0.005} />}
        <TransitFlag rigRef={rigRef} wrapperRef={wrapperRef} restY={REST_Y} />

        <LoaderController
          rigRef={rigRef}
          lidRef={lidRef}
          splashRef={splashRef}
          liquidState={liquidState}
          splashState={splashState}
          shakeState={shakeState}
          camState={camState}
          poolState={poolState}
          paused={paused}
          speed={speed}
          mode={mode}
          idleDelay={idleDelay}
          ready={ready}
        />
      </Canvas>

      {bg && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 42%, rgba(0,0,0,0.42) 100%)',
          }}
        />
      )}
      {grain && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.035,
            mixBlendMode: 'overlay',
            backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(GRAIN_SVG)}")`,
            backgroundSize: '220px 220px',
          }}
        />
      )}
      {children}
    </div>
  );
}
