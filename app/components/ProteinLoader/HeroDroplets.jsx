/**
 * Decorative chocolate droplets that drift around the shaker in the hero, with a light
 * parallax toward the pointer. One instanced mesh, no React state.
 */
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// p: base position (world units, bottle spans y ≈ -1.1 … 1.1), r: radius, s: drift speed, ph: phase
const DROPS = [
  { p: [-0.95, 0.65, 0.3], r: 0.075, s: 0.9, ph: 0.2 },
  { p: [0.98, 0.15, -0.2], r: 0.06, s: 1.1, ph: 1.4 },
  { p: [-0.72, -0.55, 0.5], r: 0.045, s: 1.3, ph: 2.6 },
  { p: [0.82, 1.1, 0.1], r: 0.05, s: 0.8, ph: 3.1 },
  { p: [-1.15, 1.25, -0.4], r: 0.035, s: 1.2, ph: 0.9 },
  { p: [0.62, -0.95, 0.6], r: 0.07, s: 1.0, ph: 4.2 },
  { p: [1.25, -0.35, 0.4], r: 0.04, s: 1.4, ph: 5.0 },
  { p: [-0.5, 1.65, 0.2], r: 0.03, s: 1.1, ph: 2.0 },
  { p: [0.3, 1.85, -0.5], r: 0.045, s: 0.7, ph: 3.7 },
  { p: [-1.35, 0.1, 0.1], r: 0.055, s: 0.95, ph: 1.1 },
];

export default function HeroDroplets({ material }) {
  const mesh = useRef();
  const grp = useRef();
  const { pointer } = useThree();
  const tmp = useMemo(
    () => ({ m: new THREE.Matrix4(), p: new THREE.Vector3(), q: new THREE.Quaternion(), s: new THREE.Vector3() }),
    []
  );

  useFrame((state) => {
    const im = mesh.current;
    const g = grp.current;
    if (!im || !g) return;
    const t = state.clock.elapsedTime;
    g.position.x += (pointer.x * 0.22 - g.position.x) * 0.05;
    g.position.y += (pointer.y * 0.12 - g.position.y) * 0.05;
    for (let i = 0; i < DROPS.length; i++) {
      const d = DROPS[i];
      tmp.p.set(
        d.p[0] + Math.cos(t * d.s + d.ph) * 0.06,
        d.p[1] + Math.sin(t * d.s * 1.3 + d.ph) * 0.09,
        d.p[2] + Math.sin(t * d.s * 0.7 + d.ph) * 0.05
      );
      tmp.s.set(d.r, d.r * 1.15, d.r);
      tmp.q.identity();
      tmp.m.compose(tmp.p, tmp.q, tmp.s);
      im.setMatrixAt(i, tmp.m);
    }
    im.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={grp}>
      <instancedMesh ref={mesh} args={[undefined, undefined, DROPS.length]} material={material} frustumCulled={false}>
        <sphereGeometry args={[1, 16, 12]} />
      </instancedMesh>
    </group>
  );
}
