/* eslint-disable react-hooks/immutability -- Three.js objects are mutated imperatively inside useFrame by design. */
/**
 * Chocolate pool + emergence effects.
 *  - Surface: a large plane whose height field runs in the vertex shader (idle swell, a bulge
 *    before the bottle breaks through, travelling ripple rings per burst) with analytic normals,
 *    so it catches the studio reflections like thick liquid. Edges fade into the backdrop.
 *  - Crown: a splash sheet that erupts around the bottle and collapses back below the surface.
 *  - Droplets: teardrops thrown outward that fall back and vanish into the pool (clipped).
 *  - Drips: glossy streaks sliding down the bottle as it rises out (emerge bursts only).
 * Bursts are time-based (started by poolState.fire from the timeline), so nothing snaps at the loop.
 * Between bursts the surface keeps living: lapping ripples from where the bottle stands (stronger
 * while it dips during the shake), splash-back rings where the mouth splash falls into the pool,
 * a ring wherever a flung droplet lands, and a meniscus hugging the bottle's base.
 */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { POOL_Y } from './pool';
import { createRadialAlphaTexture } from './geometry';
import { BODY_OFFSET_Y } from './ShakerBottle';
import { REST_Y } from './animation';

const MAX_IMPACTS = 10;
const PLANE_Z = -0.3; // pool plane centre (world z); local y = PLANE_Z − world z
const GRAVITY = 7;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const seeded = (i) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const DROPS = Array.from({ length: 22 }, (_, i) => {
  const a = seeded(i + 1) * Math.PI * 2;
  const sp = 0.7 + 1.1 * seeded(i + 7);
  return { a, r: 0.48 + 0.08 * seeded(i + 3), sp, up: 2.1 + 1.4 * seeded(i + 11), size: 0.018 + 0.03 * seeded(i + 13), delay: 0.03 * seeded(i + 17) };
});
const DRIPS = [
  { a: -0.62, delay: 0.12, len: 1.15, size: 0.016 },
  { a: -0.1, delay: 0.24, len: 1.3, size: 0.013 },
  { a: 0.42, delay: 0.06, len: 1.05, size: 0.018 },
  { a: 0.88, delay: 0.3, len: 0.95, size: 0.012 },
];

/** Smooth thin crown sheet (dense profile, so the deformed fingers stay round rather than faceted). */
function createPoolCrownGeometry() {
  const pts = [
    [0.36, 0.0], [0.42, 0.05], [0.5, 0.14], [0.55, 0.24], [0.56, 0.32], [0.5, 0.3], [0.46, 0.2], [0.4, 0.1], [0.36, 0.03],
  ].map(([x, y]) => new THREE.Vector3(x, y, 0));
  const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
  const profile = curve.getPoints(40).map((p) => new THREE.Vector2(p.x, p.y));
  const geo = new THREE.LatheGeometry(profile, 96);
  geo.userData.base = geo.attributes.position.array.slice();
  geo.userData.maxY = 0.32;
  return geo;
}

/** Crown sheet: flares outward and grows finger spikes around the rim; c = 0..1 eruption strength. */
function deformCrown(geo, c, spin) {
  const { base, maxY } = geo.userData;
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = base[i * 3];
    const y = base[i * 3 + 1];
    const z = base[i * 3 + 2];
    const h = Math.max(0, y / maxY);
    const a = Math.atan2(z, x) + spin;
    const finger = Math.pow(0.5 + 0.5 * Math.sin(a * 11 + 0.7), 3.2) * h * h;
    const flare = 1 + (0.55 * h + 0.22 * finger) * c;
    pos.setXYZ(i, x * flare, y * (0.35 + 1.9 * c) + finger * 0.55 * c, z * flare);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

function usePoolMaterial(color) {
  const alpha = useMemo(() => createRadialAlphaTexture(0.22, 0.97), []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uBulge: { value: 0 }, uBulgeC: { value: new THREE.Vector2(0, PLANE_Z) }, uImpacts: { value: Array.from({ length: MAX_IMPACTS }, () => new THREE.Vector4()) } }), []);
  const mat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color).lerp(new THREE.Color('#000000'), 0.22),
      roughness: 0.12,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      specularIntensity: 0.9,
      envMapIntensity: 1.35,
      transparent: true,
      alphaMap: alpha,
      depthWrite: true,
    });
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
uniform float uTime;
uniform float uBulge;
uniform vec2 uBulgeC;
uniform vec4 uImpacts[${MAX_IMPACTS}]; // x: age (s), y: amplitude (0 = inactive), zw: centre (local)
float poolH(vec2 p) {
  float r0 = length(p - uBulgeC);
  float h = 0.012 * sin(p.x * 2.1 + uTime * 0.9) * sin(p.y * 1.7 - uTime * 0.7)
          + 0.006 * sin(p.x * 4.3 - uTime * 1.3) * sin(p.y * 3.1 + uTime * 1.1)
          + 0.005 * sin(r0 * 6.0 - uTime * 1.8);
  h += uBulge * 0.2 * exp(-r0 * r0 * 3.2);
  for (int i = 0; i < ${MAX_IMPACTS}; i++) {
    vec4 im = uImpacts[i];
    if (im.y <= 0.0) continue;
    float r = length(p - im.zw);
    float front = 0.45 * min(1.0, im.y * 2.0) + im.x * 2.3;
    float d = r - front;
    float packet = exp(-d * d * 1.8) * smoothstep(0.45, 0.0, d); // soft leading edge, no hard cutoff
    h += im.y * 0.1 * exp(-im.x * 1.35) * sin(d * 10.0) * packet;
    h -= im.y * im.y * 0.07 * exp(-im.x * 5.0) * exp(-r * r * 5.0); // crater (big bursts only)
  }
  return h;
}`
        )
        .replace(
          '#include <beginnormal_vertex>',
          `float e = 0.02;
float hx = poolH(position.xy + vec2(e, 0.0)) - poolH(position.xy - vec2(e, 0.0));
float hy = poolH(position.xy + vec2(0.0, e)) - poolH(position.xy - vec2(0.0, e));
vec3 objectNormal = normalize(vec3(-hx / (2.0 * e), -hy / (2.0 * e), 1.0));
#ifdef USE_TANGENT
  vec3 objectTangent = vec3( tangent.xyz );
#endif`
        )
        .replace('#include <begin_vertex>', `vec3 transformed = vec3(position); transformed.z += poolH(position.xy);`);
    };
    return m;
  }, [color, alpha, uniforms]);
  useEffect(
    () => () => {
      mat.dispose();
      alpha.dispose();
    },
    [mat, alpha]
  );
  return { mat, uniforms };
}

export default function ShakePool({ poolState, rigRef, shakeState, splashState, liquidColor, splashMaterial: baseSplash }) {
  const { mat, uniforms } = usePoolMaterial(liquidColor);
  // own opaque copy: the mouth-splash material's opacity is driven to 0 outside the splash phase
  const splashMaterial = useMemo(() => {
    const m = baseSplash.clone();
    m.transparent = false;
    m.opacity = 1;
    m.clippingPlanes = [...(baseSplash.clippingPlanes || [])];
    return m;
  }, [baseSplash]);
  useEffect(() => () => splashMaterial.dispose(), [splashMaterial]);
  const geo = useMemo(() => new THREE.PlaneGeometry(8, 8, 180, 180), []);
  const crownGeo = useMemo(() => createPoolCrownGeometry(), []);
  const dropGeo = useMemo(() => new THREE.SphereGeometry(1, 12, 10), []);
  useEffect(
    () => () => {
      geo.dispose();
      crownGeo.dispose();
      dropGeo.dispose();
    },
    [geo, crownGeo, dropGeo]
  );

  const crown = useRef();
  const meniscus = useRef();
  const menGeo = useMemo(() => new THREE.TorusGeometry(0.445, 0.045, 12, 64), []);
  useEffect(() => () => menGeo.dispose(), [menGeo]);
  const drops = useRef();
  const drips = useRef();
  const sim = useRef({ lastId: 0, bursts: [], impacts: [], nextLap: 0, landed: [], lastFall: 0 });
  const tmp = useMemo(() => ({ m: new THREE.Matrix4(), p: new THREE.Vector3(), v: new THREE.Vector3(), q: new THREE.Quaternion(), qr: new THREE.Quaternion(), s: new THREE.Vector3(), up: new THREE.Vector3(0, 1, 0), zero: new THREE.Matrix4().makeScale(0, 0, 0) }), []);

  useFrame((state) => {
    const now = state.clock.elapsedTime;
    const s = sim.current;
    const rig = rigRef.current;
    const bx = rig ? rig.position.x : 0;
    const addImpact = (amp, x, z) => {
      s.impacts.push({ t0: now, amp, x, y: PLANE_Z - z });
      if (s.impacts.length > MAX_IMPACTS) s.impacts.shift();
    };
    if (poolState.burstId !== s.lastId) {
      s.lastId = poolState.burstId;
      s.bursts.push({ t0: now, amp: poolState.burstAmp, kind: poolState.burstKind });
      if (s.bursts.length > 3) s.bursts.shift();
      s.landed = DROPS.map(() => false);
      addImpact(poolState.burstAmp, bx, 0);
    }
    s.bursts = s.bursts.filter((b) => now - b.t0 < 4);

    // lapping ripples from where the bottle stands; stronger while it dips during the shake
    if (rig && Math.abs(rig.position.y - REST_Y) < 0.35 && now >= s.nextLap) {
      const e = shakeState?.energy || 0;
      addImpact(e > 0.2 ? 0.28 + 0.2 * e : 0.14, bx, 0);
      s.nextLap = now + (e > 0.2 ? 0.34 : 1.25);
    }
    // splash-back: the mouth splash falling into the pool on the reset
    const fall = splashState?.fall || 0;
    if (fall > 0.75 && s.lastFall <= 0.75) {
      addImpact(0.32, bx + 0.95, 0.35);
      addImpact(0.24, bx - 0.7, -0.2);
    }
    s.lastFall = fall;
    s.impacts = s.impacts.filter((im) => now - im.t0 < 3.5);

    uniforms.uTime.value = now;
    uniforms.uBulge.value = poolState.bulge;
    uniforms.uBulgeC.value.set(bx, PLANE_Z);
    for (let i = 0; i < MAX_IMPACTS; i++) {
      const im = s.impacts[i];
      uniforms.uImpacts.value[i].set(im ? now - im.t0 : 0, im ? im.amp : 0, im ? im.x : 0, im ? im.y : 0);
    }

    // meniscus: a lip of chocolate hugging the base whenever the bottle stands in the pool
    if (meniscus.current && rig) {
      const k = clamp01(1 - Math.abs(rig.position.y - REST_Y) / 0.12);
      meniscus.current.visible = k > 0.02;
      meniscus.current.position.set(bx, POOL_Y - 0.01, rig.position.z);
      const sc = 0.6 + 0.4 * k;
      meniscus.current.scale.set(1, 1, sc);
    }

    // the most recent burst drives the crown / droplets / drips
    const b = s.bursts[s.bursts.length - 1];
    const age = b ? now - b.t0 : 99;
    const amp = b ? b.amp : 0;

    if (crown.current) {
      // erupt (0 → 0.18 s, ease-out), then collapse and sink below the surface (clipped) by ~0.8 s
      const up = clamp01(age / 0.18);
      const down = clamp01((age - 0.24) / 0.55);
      const c = amp * (1 - Math.pow(1 - up, 3)) * (1 - down * down);
      const vis = age < 0.85;
      crown.current.visible = vis;
      if (vis) {
        deformCrown(crown.current.geometry, c, age * 0.3);
        const w = 1.22 + 0.2 * up;
        crown.current.scale.set(w, 1, w);
        crown.current.position.y = POOL_Y - 0.05 - down * 0.7;
      }
    }

    if (drops.current) {
      const im = drops.current;
      for (let i = 0; i < DROPS.length; i++) {
        const d = DROPS[i];
        const t = age - d.delay;
        if (!b || t < 0 || t > 1.4) {
          im.setMatrixAt(i, tmp.zero);
          continue;
        }
        const k = 0.55 + 0.45 * amp;
        const vx = Math.cos(d.a) * d.sp * k;
        const vz = Math.sin(d.a) * d.sp * k;
        const vy = d.up * k;
        tmp.p.set(Math.cos(d.a) * d.r + vx * t, POOL_Y + 0.05 + vy * t - 0.5 * GRAVITY * t * t, Math.sin(d.a) * d.r + vz * t);
        if (tmp.p.y < POOL_Y && t > 0.2 && s.landed && !s.landed[i]) {
          s.landed[i] = true;
          if (d.size > 0.03) addImpact(0.1, tmp.p.x, tmp.p.z); // the bigger drops leave a ring
        }
        tmp.v.set(vx, vy - GRAVITY * t, vz).normalize();
        tmp.q.setFromUnitVectors(tmp.up, tmp.v);
        const sc = d.size * k * Math.min(1, t * 12);
        tmp.s.set(sc, sc * 1.8, sc);
        tmp.m.compose(tmp.p, tmp.q, tmp.s);
        im.setMatrixAt(i, tmp.m);
      }
      im.instanceMatrix.needsUpdate = true;
    }

    if (drips.current && rig) {
      const im = drips.current;
      rig.getWorldQuaternion(tmp.qr);
      for (let i = 0; i < DRIPS.length; i++) {
        const d = DRIPS[i];
        const t = age - d.delay;
        if (!b || b.kind !== 'emerge' || t < 0 || t > 2.2) {
          im.setMatrixAt(i, tmp.zero);
          continue;
        }
        const u = clamp01(t / 2.0);
        const slide = 1 - Math.pow(1 - u, 2); // eases out as the streak thins
        const y = BODY_OFFSET_Y + 1.5 - slide * d.len;
        tmp.p.set(Math.sin(d.a) * 0.437, y, Math.cos(d.a) * 0.437);
        rig.localToWorld(tmp.p);
        const fade = 1 - clamp01((u - 0.6) / 0.4);
        const sc = d.size * fade;
        tmp.s.set(sc, sc * (5 + 7 * slide), sc * 0.45); // long thin streak, flat against the bottle
        tmp.m.compose(tmp.p, tmp.qr, tmp.s);
        im.setMatrixAt(i, tmp.m);
      }
      im.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <mesh geometry={geo} material={mat} rotation-x={-Math.PI / 2} position={[0, POOL_Y, PLANE_Z]} renderOrder={1} />
      <mesh ref={crown} geometry={crownGeo} material={splashMaterial} visible={false} />
      <mesh ref={meniscus} geometry={menGeo} material={splashMaterial} rotation-x={-Math.PI / 2} visible={false} />
      <instancedMesh ref={drops} args={[dropGeo, splashMaterial, DROPS.length]} frustumCulled={false} />
      <instancedMesh ref={drips} args={[dropGeo, splashMaterial, DRIPS.length]} frustumCulled={false} />
    </>
  );
}
