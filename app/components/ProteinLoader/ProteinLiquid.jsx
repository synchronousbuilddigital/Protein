/* eslint-disable react-hooks/immutability -- Three.js objects are mutated imperatively inside useFrame/useEffect by design (no React state involved). */
/**
 * Liquid inside the bottle. A lathe body whose top surface is re-computed every frame:
 *  - a spring-damper makes the surface lag behind the bottle's tilt (slosh),
 *  - ripples are driven by angular velocity and by "kicks" from the timeline,
 *  - `liquidState.fill` (0→1) fills the bottle, `liquidState.level` dips during the splash.
 */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { createLiquidGeometry, BOTTOM_THICKNESS, LIQUID_H } from './geometry';

const SPRING_K = 180; // ≈ 2.1 Hz slosh
const SPRING_C = 7;

export default function ProteinLiquid({ rigRef, material, liquidState, bottleStyle = 'clear' }) {
  const meshRef = useRef();
  const geo = useMemo(() => createLiquidGeometry(48, bottleStyle), [bottleStyle]);
  useEffect(() => () => geo.dispose(), [geo]);

  const sim = useRef({
    slopeX: 0,
    velX: 0,
    slopeZ: 0,
    velZ: 0,
    ripple: 0,
    prevRotZ: 0,
    prevRotX: 0,
    time: 0,
  });

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    const rig = rigRef.current;
    if (!mesh || !rig) return;

    const dt = Math.min(delta, 0.05);
    const s = sim.current;
    s.time += dt;

    // Surface wants to stay level in world space → target slope is the negative bottle tilt.
    const rotZ = rig.rotation.z;
    const rotX = rig.rotation.x;
    const angVel = Math.abs(rotZ - s.prevRotZ) / Math.max(dt, 1e-4) + Math.abs(rotX - s.prevRotX) / Math.max(dt, 1e-4);
    s.prevRotZ = rotZ;
    s.prevRotX = rotX;

    const targetX = -Math.tan(rotZ);
    const targetZ = Math.tan(rotX);
    s.velX += (-SPRING_K * (s.slopeX - targetX) - SPRING_C * s.velX) * dt;
    s.slopeX += s.velX * dt;
    s.velZ += (-SPRING_K * (s.slopeZ - targetZ) - SPRING_C * s.velZ) * dt;
    s.slopeZ += s.velZ * dt;

    if (liquidState.kick > 0) {
      s.ripple += liquidState.kick * 0.045;
      s.velX += liquidState.kick * 1.4;
      liquidState.kick = 0;
    }
    s.ripple += angVel * dt * 0.012;
    s.ripple = Math.min(s.ripple, 0.05) * Math.exp(-3.2 * dt);

    const fill = Math.max(0.001, liquidState.fill * liquidState.level);
    mesh.scale.y = fill;
    mesh.visible = liquidState.fill > 0.01;

    // Displace only the top-surface vertices.
    const pos = geo.attributes.position;
    const base = geo.userData.basePositions;
    const t = s.time;
    const amp = s.ripple;
    const inv = 1 / Math.max(0.25, fill);
    for (let i = 0; i < pos.count; i++) {
      const by = base[i * 3 + 1];
      if (by < LIQUID_H - 1e-4) continue;
      const x = base[i * 3];
      const z = base[i * 3 + 2];
      const r = Math.sqrt(x * x + z * z);
      let y = LIQUID_H + (s.slopeX * x + s.slopeZ * z) * inv;
      y += amp * (Math.sin(x * 9 + t * 14) * Math.cos(z * 7 - t * 11) * 0.5 + Math.sin(r * 13 - t * 17) * 0.35);
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return <mesh ref={meshRef} geometry={geo} material={material} position={[0, BOTTOM_THICKNESS, 0]} />;
}
