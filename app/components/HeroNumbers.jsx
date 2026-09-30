/* eslint-disable react-hooks/immutability -- Three.js objects are mutated imperatively inside useFrame/useEffect by design. */
'use client';

/**
 * The hero's "24 g | 4 g" as real extruded 3D type (Fira Sans ExtraBold outlines converted to
 * three.js typeface data). On the intro hand-off the row rotates into place while the digits
 * count up; afterwards it turns slowly and tilts toward the pointer over the hero.
 * Digit meshes are right-aligned from the font's advance widths, so the layout never jumps
 * while counting. Rendering pauses while off-screen.
 */
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment, Lightformer, Text3D } from '@react-three/drei';
import { FontLoader } from 'three-stdlib';
import * as THREE from 'three';
import gsap from 'gsap';

const FONT = '/fonts/fira-sans-800.typeface.json';
const SIZE = 1;
const GEO = { size: SIZE, height: 0.22, curveSegments: 10, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.024, bevelSegments: 4 };
const GAP = 0.16; // digits → "g"
const BAR_GAP = 0.42; // "g" → divider → next digits

function useMetrics() {
  const font = useLoader(FontLoader, FONT);
  return useMemo(() => {
    const k = SIZE / font.data.resolution;
    const w = (s) => [...s].reduce((a, ch) => a + (font.data.glyphs[ch]?.ha ?? 0), 0) * k;
    return { w };
  }, [font]);
}

/** Right-aligned digits: the mesh moves left as it gets wider, so its right edge stays put. */
function Digits({ value, rightX, material }) {
  const { w } = useMetrics();
  const text = String(value);
  return (
    <Text3D font={FONT} {...GEO} material={material} position={[rightX - w(text), 0, 0]}>
      {text}
    </Text3D>
  );
}

function Row({ counts, material, barMaterial }) {
  const { w } = useMetrics();
  // final layout, from the font metrics: [24][g]  |  [4][g]
  const g = w('g');
  const w24 = w('24');
  const w4 = w('4');
  const total = w24 + GAP + g + BAR_GAP + 0.06 + BAR_GAP + w4 + GAP + g;
  const x0 = -total / 2;
  const r1 = x0 + w24;
  const g1 = r1 + GAP;
  const bar = g1 + g + BAR_GAP + 0.03;
  const r2 = bar + 0.03 + BAR_GAP + w4;
  const g2 = r2 + GAP;
  return (
    <group position={[0, -0.36, 0]}>
      <Digits value={counts.a} rightX={r1} material={material} />
      <Text3D font={FONT} {...GEO} material={material} position={[g1, 0, 0]}>
        g
      </Text3D>
      <mesh position={[bar, 0.3, 0.05]} material={barMaterial}>
        <boxGeometry args={[0.05, 1.25, 0.08]} />
      </mesh>
      <Digits value={counts.b} rightX={r2} material={material} />
      <Text3D font={FONT} {...GEO} material={material} position={[g2, 0, 0]}>
        g
      </Text3D>
    </group>
  );
}

function Rig({ pointer, armed, reduce, onReady, children }) {
  const group = useRef();
  const inner = useRef();
  const [counts, setCounts] = useState(() => (reduce ? { a: 24, b: 4 } : { a: 0, b: 0 }));

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  // entrance: rotate in from the side while the digits count up
  useEffect(() => {
    const g = group.current;
    if (!g) return;
    if (reduce) {
      g.rotation.set(0, 0, 0);
      g.position.z = 0;
      return;
    }
    if (!armed) {
      g.rotation.set(0.15, -0.9, 0);
      g.position.z = -1.2;
      return;
    }
    const n = { a: 0, b: 0 };
    const tl = gsap.timeline();
    tl.to(g.rotation, { x: 0, y: 0, z: 0, duration: 1.5, ease: 'power3.out' }, 0)
      .to(g.position, { z: 0, duration: 1.5, ease: 'power3.out' }, 0)
      .to(n, {
        a: 24,
        b: 4,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => setCounts((c) => (c.a === Math.round(n.a) && c.b === Math.round(n.b) ? c : { a: Math.round(n.a), b: Math.round(n.b) })),
      }, 0.1);
    return () => tl.kill();
  }, [armed, reduce]);

  useFrame((state, dt) => {
    const g = inner.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    const ty = p.active ? p.x * 0.24 : reduce ? 0 : Math.sin(t * 0.5) * 0.06;
    const tx = p.active ? -p.y * 0.16 : reduce ? 0 : Math.cos(t * 0.4) * 0.03;
    const k = 1 - Math.pow(0.001, dt);
    g.rotation.y += (ty - g.rotation.y) * k * 0.9;
    g.rotation.x += (tx - g.rotation.x) * k * 0.9;
  });

  return (
    <group ref={group}>
      <group ref={inner}>{typeof children === 'function' ? children(counts) : children}</group>
    </group>
  );
}

/** Keeps the whole row inside the canvas whatever its aspect ratio. */
function Fit({ width }) {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    const half = width / 2 + 0.35;
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const byW = half / (tan * aspect);
    const byH = 1.05 / tan;
    camera.position.set(0, 0.05, Math.max(byW, byH));
    camera.lookAt(0, 0.05, 0);
    camera.updateProjectionMatrix();
  }, [camera, size, width]);
  return null;
}

function Scene({ pointer, armed, reduce, onReady }) {
  const { w } = useMetrics();
  const rowWidth = w('24') + GAP + w('g') + BAR_GAP * 2 + 0.06 + w('4') + GAP + w('g');
  const materials = useMemo(
    () => ({
      type: new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#FBF8F3'), roughness: 0.26, metalness: 0.12, clearcoat: 1, clearcoatRoughness: 0.15, envMapIntensity: 1.6 }),
      bar: new THREE.MeshPhysicalMaterial({ color: new THREE.Color('#ffffff'), roughness: 0.4, transparent: true, opacity: 0.35, envMapIntensity: 0.8 }),
    }),
    []
  );
  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);

  return (
    <>
      <Fit width={rowWidth} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={2.4} color="#fff4e9" />
      <directionalLight position={[-3, 1, 2]} intensity={0.5} color="#d9efe2" />
      <spotLight position={[3, 2, -3]} intensity={26} angle={0.7} penumbra={0.9} color="#ff9a70" />
      <Environment resolution={64} frames={1}>
        <mesh scale={20}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#3a4a40" side={THREE.BackSide} />
        </mesh>
        <Lightformer form="rect" intensity={3} position={[0, 4, -1]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={3.5} position={[-3, 1.5, -2]} rotation-y={Math.PI / 4} scale={[0.5, 5, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#ffd2bd" position={[3, 1, -2]} rotation-y={-Math.PI / 4} scale={[0.5, 5, 1]} />
      </Environment>
      <Rig pointer={pointer} armed={armed} reduce={reduce} onReady={onReady}>
        {(counts) => <Row counts={counts} material={materials.type} barMaterial={materials.bar} />}
      </Rig>
    </>
  );
}

/**
 * @param {object} props
 * @param {React.RefObject<HTMLElement>} props.pointerHost element whose pointer moves drive the tilt (the hero section)
 * @param {() => void} [props.onReady]                      called once the 3D type has rendered (hides the HTML fallback)
 */
export default function HeroNumbers({ pointerHost, onReady, className }) {
  const host = useRef(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const [reduce, setReduce] = useState(false);
  const [armed, setArmed] = useState(() => {
    const intro = typeof document !== 'undefined' ? document.getElementById('proteinest-intro') : null;
    return !intro || intro.style.opacity === '0';
  });
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // start the entrance when the intro loader lifts (or right away when there is no intro)
  useEffect(() => {
    if (armed) return;
    const start = () => setArmed(true);
    window.addEventListener('proteinest:intro-done', start, { once: true });
    const t = setTimeout(start, 12000);
    return () => {
      window.removeEventListener('proteinest:intro-done', start);
      clearTimeout(t);
    };
  }, [armed]);

  // pointer tilt from anywhere over the hero
  useEffect(() => {
    const el = pointerHost?.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [pointerHost]);

  useEffect(() => {
    const el = host.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className={className} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        dpr={[1, 2]}
        frameloop={inView && !reduce ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        camera={{ fov: 30, near: 0.1, far: 30, position: [0, 0, 8] }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <Scene pointer={pointer} armed={armed} reduce={reduce} onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
