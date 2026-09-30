/**
 * Stainless mixer ball (three interlocking rings). It floats at the liquid surface and hops
 * around the head-space during the shake, driven by `shakeState` — no React state involved.
 */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BOTTOM_THICKNESS, LIQUID_H } from './geometry';

export default function MixerBall({ material, liquidState, shakeState }) {
  const ref = useRef();
  const geo = useMemo(() => new THREE.TorusGeometry(0.115, 0.013, 8, 40), []);
  useEffect(() => () => geo.dispose(), [geo]);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    g.visible = liquidState.fill > 0.05;
    const fill = liquidState.fill * liquidState.level;
    const surface = BOTTOM_THICKNESS + LIQUID_H * fill;
    const e = shakeState.energy;
    const t = shakeState.t;
    const hop = e * Math.abs(Math.sin(t * Math.PI * 6)) * 0.28;
    const bob = Math.sin(state.clock.elapsedTime * 2.2) * 0.012;
    g.position.set(e * Math.sin(t * Math.PI * 5) * 0.12, surface - 0.035 + hop + bob, e * Math.cos(t * Math.PI * 4) * 0.08);
    g.rotation.x += 0.012 + e * 0.22;
    g.rotation.y += 0.009 + e * 0.16;
  });

  return (
    <group ref={ref}>
      <mesh geometry={geo} material={material} />
      <mesh geometry={geo} material={material} rotation-x={Math.PI / 2} />
      <mesh geometry={geo} material={material} rotation-y={Math.PI / 2} />
    </group>
  );
}
