/* eslint-disable react-hooks/immutability -- Three.js geometry is deformed imperatively inside useFrame by design. */
/**
 * The hero splash, built to read as thick liquid rather than tubes:
 *  - three streams whose surface undulates as they flow (per-frame radius deformation),
 *    led by a stretched droplet at the leading edge
 *  - a crown sheet at the mouth with rim fingers that ripple and shed droplets
 *  - teardrop droplets oriented along their flight, plus a fine mist
 * `splashState.progress` grows the burst; `splashState.fall` (reset phase) lets everything
 * sag and fall under gravity instead of retracing its path. Origin = bottle mouth centre.
 */
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createCrownGeometry, createTaperedTube } from './geometry';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (t) => t * t * (3 - 2 * t);
const smoothstep = (e0, e1, x) => smooth(clamp01((x - e0) / (e1 - e0)));
const seeded = (i) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// main arc: up, over the front-right, then falling
const STREAM_A = [
  [0, -0.12, 0],
  [0.03, 0.25, 0.05],
  [0.14, 0.6, 0.1],
  [0.34, 0.92, 0.08],
  [0.58, 1.06, -0.04],
  [0.8, 0.98, -0.18],
  [0.92, 0.74, -0.3],
  [0.94, 0.42, -0.36],
];
// counter arc over the left
const STREAM_B = [
  [0, -0.12, 0],
  [-0.06, 0.22, -0.04],
  [-0.2, 0.55, -0.08],
  [-0.42, 0.8, 0.02],
  [-0.6, 0.9, 0.18],
  [-0.7, 0.72, 0.34],
  [-0.66, 0.42, 0.42],
];
// thin centre jet with a small hook
const STREAM_C = [
  [0.02, -0.08, -0.02],
  [0.06, 0.35, 0],
  [0.06, 0.72, 0.05],
  [0, 0.98, 0.1],
  [-0.1, 1.02, 0.12],
];

const STREAMS = [
  { key: 'a', delay: 0, sx: 1.3, sz: 0.85 },
  { key: 'b', delay: 0.08, sx: 0.9, sz: 1.3 },
  { key: 'c', delay: 0.04, sx: 1, sz: 1 },
];

const GRAVITY = 6.5;
// o: origin offset, v: launch velocity, T: flight-time scale, d: start delay (0-1 of progress)
const DROPLETS = [
  { size: 0.055, o: [0.05, 0, 0.05], v: [0.9, 2.4, 0.3], T: 0.5, d: 0.05 },
  { size: 0.045, o: [-0.06, 0, 0.02], v: [-0.8, 2.7, 0.2], T: 0.55, d: 0.08 },
  { size: 0.05, o: [0.02, 0, -0.05], v: [0.4, 3.0, -0.7], T: 0.5, d: 0.12 },
  { size: 0.04, o: [-0.03, 0, 0.06], v: [-0.5, 2.2, 0.7], T: 0.45, d: 0.1 },
  { size: 0.048, o: [0.07, 0, 0], v: [1.1, 2.0, -0.3], T: 0.5, d: 0.16 },
  { size: 0.042, o: [-0.07, 0, -0.03], v: [-1.0, 2.5, -0.5], T: 0.55, d: 0.2 },
  { size: 0.02, o: [0.04, 0, 0.04], v: [1.4, 2.6, 0.6], T: 0.55, d: 0.1 },
  { size: 0.015, o: [-0.04, 0, 0.03], v: [-1.3, 2.9, 0.4], T: 0.6, d: 0.14 },
  { size: 0.018, o: [0.01, 0, -0.04], v: [0.7, 3.2, -1.0], T: 0.6, d: 0.18 },
  { size: 0.014, o: [-0.02, 0, 0.05], v: [-0.9, 2.4, 1.0], T: 0.55, d: 0.22 },
  { size: 0.02, o: [0.06, 0, 0.01], v: [1.5, 2.1, -0.6], T: 0.6, d: 0.26 },
  { size: 0.016, o: [-0.06, 0, -0.02], v: [-1.5, 2.7, -0.8], T: 0.65, d: 0.2 },
  { size: 0.013, o: [0, 0, 0.02], v: [0.2, 3.4, 0.3], T: 0.6, d: 0.3 },
  { size: 0.017, o: [0.02, 0, -0.03], v: [-0.3, 3.1, -1.2], T: 0.65, d: 0.24 },
];
// droplets shed from the crown's rim fingers
for (let i = 0; i < 10; i++) {
  const a = (i / 10) * Math.PI * 2 + 0.3;
  const sp = 1.1 + 0.5 * seeded(i + 9);
  DROPLETS.push({ size: 0.018 + 0.012 * seeded(i + 1), o: [Math.cos(a) * 0.5, 0.28, Math.sin(a) * 0.5], v: [Math.cos(a) * sp, 1.3 + 0.6 * seeded(i + 3), Math.sin(a) * sp], T: 0.55, d: 0.04 + 0.05 * seeded(i + 5) });
}
// fine mist from the burst
for (let i = 0; i < 40; i++) {
  const a = seeded(i + 20) * Math.PI * 2;
  const sp = 0.7 + 1.6 * seeded(i + 40);
  DROPLETS.push({ size: 0.005 + 0.007 * seeded(i + 60), o: [Math.cos(a) * 0.08, 0.05, Math.sin(a) * 0.08], v: [Math.cos(a) * sp, 2.2 + 1.6 * seeded(i + 80), Math.sin(a) * sp], T: 0.5 + 0.3 * seeded(i + 100), d: 0.02 + 0.12 * seeded(i + 120), mist: true });
}

/** Re-shapes a stream every frame: travelling ripples along its length, breaking up as it falls. */
function deformTube(geo, time, fall) {
  const { centers, units, tubular, radial, radiusFn } = geo.userData;
  const pos = geo.attributes.position;
  const per = radial + 1;
  for (let j = 0; j <= tubular; j++) {
    const t = j / tubular;
    const wob = 1 + 0.16 * Math.sin(t * 14 - time * 9) + 0.07 * Math.sin(t * 31 + time * 13) + fall * 0.4 * Math.sin(t * 22 + time * 20);
    const r = radiusFn(t) * wob * (1 - 0.35 * fall * t);
    const cx = centers[j * 3];
    const cy = centers[j * 3 + 1];
    const cz = centers[j * 3 + 2];
    for (let i = 0; i < per; i++) {
      const idx = j * per + i;
      pos.setXYZ(idx, cx + units[idx * 3] * r, cy + units[idx * 3 + 1] * r, cz + units[idx * 3 + 2] * r);
    }
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

/** Crown sheet: rim fingers that ripple around the mouth and collapse on the fall. */
function deformCrown(geo, time, crown, fall) {
  const { base, maxY } = geo.userData;
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = base[i * 3];
    const y = base[i * 3 + 1];
    const z = base[i * 3 + 2];
    const h = Math.max(0, y / maxY);
    const a = Math.atan2(z, x);
    const f = Math.pow(0.5 + 0.5 * Math.sin(a * 9 + time * 1.2), 3) * h * h * h;
    const rad = 1 + 0.32 * f + 0.06 * Math.sin(a * 5 - time * 2) * h;
    const up = 0.34 * f * crown - 0.28 * fall * h;
    pos.setXYZ(i, x * rad, y + up, z * rad);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

const ProteinSplash = forwardRef(function ProteinSplash({ material, splashState, position }, ref) {
  const inner = useRef();
  const meshA = useRef();
  const meshB = useRef();
  const meshC = useRef();
  const tips = useRef();
  const crown = useRef();
  const drops = useRef();
  const meshRefs = { a: meshA, b: meshB, c: meshC };

  const geos = useMemo(
    () => ({
      a: createTaperedTube(STREAM_A, { tubular: 80, radial: 14, radiusFn: (t) => lerp(0.15, 0.03, smooth(t)) }),
      b: createTaperedTube(STREAM_B, { tubular: 64, radial: 12, radiusFn: (t) => lerp(0.095, 0.026, smooth(t)) }),
      c: createTaperedTube(STREAM_C, { tubular: 36, radial: 10, radiusFn: (t) => lerp(0.06, 0.018, t) }),
      crown: createCrownGeometry(),
      drop: new THREE.SphereGeometry(1, 12, 10),
    }),
    []
  );
  useEffect(() => () => Object.values(geos).forEach((g) => g.dispose()), [geos]);

  const tmp = useMemo(
    () => ({
      m: new THREE.Matrix4(),
      p: new THREE.Vector3(),
      q: new THREE.Quaternion(),
      s: new THREE.Vector3(),
      v: new THREE.Vector3(),
      up: new THREE.Vector3(0, 1, 0),
      fwd: new THREE.Vector3(0, 0, 1),
    }),
    []
  );

  useFrame((state) => {
    const p = splashState.progress;
    const fall = splashState.fall || 0;
    const time = state.clock.elapsedTime;
    material.opacity = splashState.opacity;
    const visible = p > 0.004 && splashState.opacity > 0.004;
    if (inner.current) inner.current.visible = visible;
    if (!visible || !tips.current || !drops.current) return;

    const sy = 1 - 0.85 * fall; // streams sag back toward the mouth on the fall
    const dy = -0.3 * fall * fall;

    STREAMS.forEach((st, i) => {
      const mesh = meshRefs[st.key].current;
      if (!mesh) return;
      const g = mesh.geometry;
      const lp = clamp01((p - st.delay) / (1 - st.delay));
      const rings = Math.floor(lp * g.userData.tubular);
      g.setDrawRange(0, rings * g.userData.indexPerRing);
      mesh.visible = rings > 0;
      if (rings > 0) deformTube(g, time, fall);
      mesh.scale.y = sy;
      mesh.position.y = dy;

      // stretched droplet leading the stream, oriented along its direction of travel
      const t = Math.max(0.001, lp);
      g.userData.curve.getPointAt(t, tmp.p);
      g.userData.curve.getTangentAt(t, tmp.v);
      tmp.p.set(tmp.p.x * st.sx, tmp.p.y * sy + dy, tmp.p.z * st.sz);
      tmp.v.set(tmp.v.x * st.sx, tmp.v.y * sy, tmp.v.z * st.sz).normalize();
      const r = rings > 0 ? g.userData.radiusFn(t) * 1.25 : 0.0001;
      tmp.q.setFromUnitVectors(tmp.fwd, tmp.v);
      tmp.s.set(r, r, r * 1.9);
      tmp.m.compose(tmp.p, tmp.q, tmp.s);
      tips.current.setMatrixAt(i, tmp.m);
    });
    tips.current.instanceMatrix.needsUpdate = true;

    // crown at the mouth
    if (crown.current) {
      const cs = Math.max(0.0001, splashState.crown);
      crown.current.scale.set(cs, cs, cs);
      crown.current.visible = cs > 0.01;
      if (cs > 0.01) deformCrown(crown.current.geometry, time, cs, fall);
    }

    // ballistic droplets: teardrops aligned with their velocity; keep falling on the reset
    for (let i = 0; i < DROPLETS.length; i++) {
      const d = DROPLETS[i];
      const lp = clamp01((p - d.d) / (1 - d.d));
      const t = lp * d.T + fall * 0.75;
      tmp.p.set(d.o[0] + d.v[0] * t, d.o[1] + d.v[1] * t - 0.5 * GRAVITY * t * t, d.o[2] + d.v[2] * t);
      tmp.v.set(d.v[0], d.v[1] - GRAVITY * t, d.v[2]).normalize();
      const life = d.mist ? 1 - smoothstep(0.35, 1, lp) : 1 - 0.25 * lp;
      const sc = Math.max(0.0001, d.size * smoothstep(0, 0.1, lp) * life * (1 - 0.6 * fall));
      tmp.q.setFromUnitVectors(tmp.up, tmp.v);
      tmp.s.set(sc, sc * (d.mist ? 1.3 : 1.7), sc);
      tmp.m.compose(tmp.p, tmp.q, tmp.s);
      drops.current.setMatrixAt(i, tmp.m);
    }
    drops.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
      {/* animated group (identity at rest) */}
      <group ref={ref}>
        <group ref={inner} visible={false}>
          <mesh ref={meshA} geometry={geos.a} material={material} frustumCulled={false} scale={[1.3, 1, 0.85]} />
          <mesh ref={meshB} geometry={geos.b} material={material} frustumCulled={false} scale={[0.9, 1, 1.3]} />
          <mesh ref={meshC} geometry={geos.c} material={material} frustumCulled={false} />
          <instancedMesh ref={tips} args={[geos.drop, material, STREAMS.length]} frustumCulled={false} />
          <mesh ref={crown} geometry={geos.crown} material={material} position={[0, -0.02, 0]} />
          <instancedMesh ref={drops} args={[geos.drop, material, DROPLETS.length]} frustumCulled={false} />
        </group>
      </group>
    </group>
  );
});

export default ProteinSplash;
