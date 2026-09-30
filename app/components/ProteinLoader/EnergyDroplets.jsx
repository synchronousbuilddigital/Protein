/**
 * Droplets flung off the bottle during the shake. Each spawns on the bottle surface (in world
 * space, so it detaches from the moving bottle), flies outward and up under gravity as a
 * teardrop aligned with its velocity, and re-spawns a few times per shake.
 */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const deg = (d) => (d * Math.PI) / 180;
const GRAVITY = 1.9;
// a: angle around the bottle, y: rig-local spawn height, size, off: phase offset, freq: bursts per shake,
// speed: outward speed, up: initial upward speed (both per unit of u)
const DROPS = [
  { a: deg(35), y: 0.95, size: 0.055, off: 0.0, freq: 2.6, speed: 1.0, up: 0.65 },
  { a: deg(120), y: 0.6, size: 0.042, off: 0.35, freq: 2.4, speed: 0.85, up: 0.55 },
  { a: deg(215), y: 1.1, size: 0.048, off: 0.6, freq: 2.8, speed: 0.95, up: 0.7 },
  { a: deg(300), y: 0.75, size: 0.06, off: 0.15, freq: 2.2, speed: 1.1, up: 0.6 },
  { a: deg(345), y: 0.4, size: 0.038, off: 0.8, freq: 2.7, speed: 0.8, up: 0.5 },
  { a: deg(70), y: 1.25, size: 0.032, off: 0.5, freq: 3.0, speed: 0.9, up: 0.75 },
  { a: deg(160), y: 1.4, size: 0.028, off: 0.25, freq: 3.2, speed: 0.75, up: 0.8 },
  { a: deg(250), y: 0.3, size: 0.045, off: 0.7, freq: 2.3, speed: 1.05, up: 0.45 },
  { a: deg(10), y: 1.55, size: 0.026, off: 0.45, freq: 3.4, speed: 0.7, up: 0.85 },
];

export default function EnergyDroplets({ rigRef, shakeState, material }) {
  const mesh = useRef();
  const state = useRef(DROPS.map(() => ({ cycle: -1, spawn: new THREE.Vector3() })));
  const tmp = useMemo(
    () => ({
      m: new THREE.Matrix4(),
      p: new THREE.Vector3(),
      v: new THREE.Vector3(),
      q: new THREE.Quaternion(),
      s: new THREE.Vector3(),
      up: new THREE.Vector3(0, 1, 0),
    }),
    []
  );

  useFrame(() => {
    const rig = rigRef.current;
    const im = mesh.current;
    if (!rig || !im) return;
    const e = shakeState.energy;
    im.visible = e > 0.02;
    if (!im.visible) return;

    for (let i = 0; i < DROPS.length; i++) {
      const d = DROPS[i];
      const st = state.current[i];
      const phase = shakeState.t * d.freq + d.off;
      const cycle = Math.floor(phase);
      const u = phase - cycle;
      if (cycle !== st.cycle) {
        st.cycle = cycle;
        tmp.p.set(Math.sin(d.a) * 0.46, d.y, Math.cos(d.a) * 0.46);
        rig.localToWorld(tmp.p);
        st.spawn.copy(tmp.p);
      }
      const vx = Math.sin(d.a) * d.speed * 0.84;
      const vz = Math.cos(d.a) * d.speed * 0.42;
      tmp.p.set(st.spawn.x + vx * u, st.spawn.y + d.up * u - 0.5 * GRAVITY * u * u, st.spawn.z + vz * u);
      tmp.v.set(vx, d.up - GRAVITY * u, vz).normalize();
      const life = Math.sin(Math.PI * u);
      const sc = Math.max(0.0001, d.size * Math.min(1, life * 1.6) * e);
      tmp.q.setFromUnitVectors(tmp.up, tmp.v);
      tmp.s.set(sc, sc * 1.7, sc);
      tmp.m.compose(tmp.p, tmp.q, tmp.s);
      im.setMatrixAt(i, tmp.m);
    }
    im.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, DROPS.length]} material={material} frustumCulled={false} visible={false}>
      <sphereGeometry args={[1, 12, 10]} />
    </instancedMesh>
  );
}
