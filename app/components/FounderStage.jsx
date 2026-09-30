/* eslint-disable react-hooks/immutability -- Three.js objects are mutated imperatively inside useFrame/useEffect by design (no React state involved). */
'use client';

/**
 * 3D portrait stage for the founder section (React Three Fiber).
 * The real founder photo is mapped onto a rounded, slightly bevelled card with a clearcoat
 * sheen. The card tilts toward the pointer, floats when idle, and rotates in from an angle
 * on first reveal. Glossy chocolate droplets drift behind it with parallax, and a blurred
 * mirror reflection sits below. Rendering pauses while the stage is off-screen.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const CARD_W = 2.0;
const CARD_H = 2.5;
const CARD_D = 0.08;

/** Pointer position in -1..1, shared with the scene without re-renders. */
function usePointer(hostRef) {
  const target = useRef({ x: 0, y: 0, active: false });
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      target.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.current.active = true;
    };
    const onLeave = () => {
      target.current.active = false;
    };
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [hostRef]);
  return target;
}

function PortraitCard({ src, pointer, revealed, reduce }) {
  const group = useRef();
  const inner = useRef();
  const texture = useLoader(THREE.TextureLoader, src);
  const { gl } = useThree();

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    // cover-fit the 4:5 card with the 1600x2112 photo (slightly taller than 4:5)
    const imgAspect = texture.image.width / texture.image.height;
    const cardAspect = CARD_W / CARD_H;
    if (imgAspect > cardAspect) {
      texture.repeat.set(cardAspect / imgAspect, 1);
      texture.offset.set((1 - cardAspect / imgAspect) / 2, 0);
    } else {
      texture.repeat.set(1, imgAspect / cardAspect);
      texture.offset.set(0, 1 - imgAspect / cardAspect - 0.02); // bias toward the face
    }
    texture.needsUpdate = true;
  }, [texture, gl]);

  // reveal: rotate in from the side and settle; reverse when the section scrolls away
  const first = useRef(true);
  useEffect(() => {
    const g = group.current;
    if (!g) return;
    const SETTLED = { rot: [0, 0, 0], pos: [0, 0.12, 0], s: 1 };
    const AWAY = { rot: [0.1, -0.9, -0.08], pos: [-0.6, -0.18, -0.8], s: 0.86 };
    const pose = (p) => {
      g.rotation.set(...p.rot);
      g.position.set(...p.pos);
      g.scale.setScalar(p.s);
    };
    if (reduce) {
      pose(SETTLED);
      return;
    }
    if (first.current) {
      first.current = false;
      pose(AWAY);
      if (!revealed) return;
    }
    const to = revealed ? SETTLED : AWAY;
    const d = revealed ? 1.5 : 0.9;
    const ease = revealed ? 'power3.out' : 'power2.in';
    const tl = gsap.timeline();
    tl.to(g.rotation, { x: to.rot[0], y: to.rot[1], z: to.rot[2], duration: d, ease }, 0)
      .to(g.position, { x: to.pos[0], y: to.pos[1], z: to.pos[2], duration: d, ease }, 0)
      .to(g.scale, { x: to.s, y: to.s, z: to.s, duration: d, ease }, 0);
    return () => tl.kill();
  }, [revealed, reduce]);

  useFrame((state, dt) => {
    const g = inner.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    const targetY = p.active ? p.x * 0.32 : Math.sin(t * 0.5) * 0.06;
    const targetX = p.active ? -p.y * 0.22 : Math.cos(t * 0.4) * 0.04;
    const k = 1 - Math.pow(0.001, dt); // smooth follow
    g.rotation.y += (targetY - g.rotation.y) * k * 0.9;
    g.rotation.x += (targetX - g.rotation.x) * k * 0.9;
    g.position.y = reduce ? 0 : Math.sin(t * 0.9) * 0.03;
  });

  const fadeMap = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 4;
    c.height = 128;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, '#000'); // far end of the reflection (v = 1)
    g.addColorStop(1, '#fff'); // touching the card (v = 0)
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 4, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  useEffect(() => () => fadeMap.dispose(), [fadeMap]);

  const materials = useMemo(() => {
    const face = new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.32,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      envMapIntensity: 0.9,
    });
    const edge = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f3ede4'),
      roughness: 0.3,
      metalness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.2,
    });
    return { face, edge };
  }, [texture]);
  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);

  return (
    <group ref={group}>
      <group ref={inner}>
        {/* bevelled card body (edges) */}
        <RoundedBox args={[CARD_W, CARD_H, CARD_D]} radius={0.09} smoothness={6} material={materials.edge} />
        {/* photo face, a hair in front of the body */}
        <mesh position={[0, 0, CARD_D / 2 + 0.002]} material={materials.face}>
          <planeGeometry args={[CARD_W - 0.05, CARD_H - 0.05]} />
        </mesh>
        {/* mirror reflection below */}
        <group position={[0, -CARD_H - 0.06, 0]} scale={[1, -1, 1]}>
          <mesh position={[0, 0, CARD_D / 2 + 0.002]}>
            <planeGeometry args={[CARD_W - 0.05, CARD_H - 0.05]} />
            <meshBasicMaterial map={texture} alphaMap={fadeMap} transparent opacity={0.28} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

const DROPS = [
  { p: [-1.35, 1.2, -1.2], r: 0.16, s: 0.7 },
  { p: [1.3, 0.7, -1.6], r: 0.2, s: 0.5 },
  { p: [1.25, -1.2, -0.9], r: 0.12, s: 0.9 },
  { p: [-1.25, -0.9, -1.8], r: 0.18, s: 0.6 },
  { p: [0.4, 1.7, -2.2], r: 0.1, s: 0.8 },
];

function Droplets({ pointer, reduce }) {
  const group = useRef();
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#4A2416'),
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        sheen: 0.3,
        sheenColor: new THREE.Color('#ffb08a'),
        envMapIntensity: 1.6,
      }),
    []
  );
  useEffect(() => () => mat.dispose(), [mat]);
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    const k = 1 - Math.pow(0.001, dt);
    const tx = (p.active ? -p.x : 0) * 0.35;
    const ty = (p.active ? p.y : 0) * 0.25;
    g.position.x += (tx - g.position.x) * k;
    g.position.y += (ty - g.position.y) * k;
    if (reduce) return;
    g.children.forEach((m, i) => {
      const d = DROPS[i];
      m.position.y = d.p[1] + Math.sin(t * d.s + i) * 0.12;
      m.position.x = d.p[0] + Math.cos(t * d.s * 0.7 + i) * 0.06;
    });
  });
  return (
    <group ref={group}>
      {DROPS.map((d, i) => (
        <mesh key={i} position={d.p} material={mat}>
          <sphereGeometry args={[d.r, 32, 24]} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ src, pointer, revealed, reduce }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff3e8" />
      <directionalLight position={[-4, 1, 3]} intensity={0.5} color="#dcefe3" />
      <spotLight position={[-3, 4, -3]} intensity={30} angle={0.6} penumbra={0.9} color="#ffd9c4" />
      <Environment resolution={128} frames={1}>
        <mesh scale={30}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#1f3d2c" side={THREE.BackSide} />
        </mesh>
        <Lightformer form="rect" intensity={3} position={[0, 5, -1]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={4} position={[-3, 2, -2]} rotation-y={Math.PI / 4} scale={[0.5, 6, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[3, 1, -2]} rotation-y={-Math.PI / 4} scale={[0.5, 6, 1]} />
        <Lightformer form="circle" intensity={1.2} color="#ff683f" position={[3, -1, -3]} scale={3} />
      </Environment>
      <Droplets pointer={pointer} reduce={reduce} />
      <PortraitCard src={src} pointer={pointer} revealed={revealed} reduce={reduce} />
    </>
  );
}

function FrameGate({ active }) {
  const { invalidate } = useThree();
  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);
  return null;
}

export default function FounderStage({ src = '/founder-real.jpg', revealed = false, className }) {
  const host = useRef(null);
  const pointer = usePointer(host);
  const [reduce, setReduce] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        dpr={[1, 1.6]}
        frameloop={inView && !reduce ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        camera={{ fov: 32, near: 0.1, far: 30, position: [0, 0, 5.6] }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ position: 'absolute', inset: 0 }}
      >
        <FrameGate active={inView} />
        <Scene src={src} pointer={pointer} revealed={revealed} reduce={reduce} />
      </Canvas>
    </div>
  );
}
