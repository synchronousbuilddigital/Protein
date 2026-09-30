/* eslint-disable react-hooks/immutability -- Three.js objects are mutated imperatively inside useFrame by design. */
/**
 * Motion-blur trail for the shake: translucent ghost silhouettes of the bottle drawn at poses
 * from a few frames ago, fading with age. Strength follows the shake energy and the stroke
 * velocity, so the trail is strongest mid-stroke and vanishes at the turnarounds.
 */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createBottleGeometry, createCollarGeometry, BODY_H } from './geometry';
import { BODY_OFFSET_Y, SHAKES } from './ShakerBottle';
import { POOL_PLANE } from './pool';

const GHOSTS = [
  { lag: 1, opacity: 0.14 },
  { lag: 2, opacity: 0.1 },
  { lag: 3, opacity: 0.06 },
  { lag: 5, opacity: 0.03 },
];
const HISTORY = 8;

export default function MotionTrail({ rigRef, shakeState, color = '#ffffff' }) {
  const groups = useRef([]);
  const geos = useMemo(
    () => ({
      body: createBottleGeometry(40, 'tumbler'),
      collar: createCollarGeometry(40),
      lid: new THREE.CylinderGeometry(0.41, 0.43, 0.26, 40), // sits inside the real lid
    }),
    []
  );
  const mats = useMemo(
    () =>
      GHOSTS.map(
        () =>
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            transparent: true,
            opacity: 0,
            depthWrite: false,
            toneMapped: false,
            // pushed a hair behind co-planar surfaces: hidden where a ghost coincides with the
            // bottle, visible only where it trails behind it (no z-fighting stripes)
            polygonOffset: true,
            polygonOffsetFactor: 2,
            polygonOffsetUnits: 2,
            clippingPlanes: [POOL_PLANE],
          })
      ),
    [color]
  );
  useEffect(
    () => () => {
      Object.values(geos).forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
    },
    [geos, mats]
  );
  const hist = useMemo(() => ({ m: Array.from({ length: HISTORY }, () => new THREE.Matrix4()), q: new THREE.Quaternion(), head: 0, filled: 0 }), []);

  useFrame(() => {
    const rig = rigRef.current;
    if (!rig) return;
    const h = hist;
    h.q.setFromEuler(rig.rotation);
    h.m[h.head].compose(rig.position, h.q, rig.scale);
    // analytic stroke velocity (|cos| of the stroke phase): strongest mid-stroke
    const vel = Math.abs(Math.cos(Math.PI * 2 * SHAKES * shakeState.t));
    const strength = shakeState.energy * Math.min(1, vel * 1.4);
    GHOSTS.forEach((g, i) => {
      const grp = groups.current[i];
      if (!grp) return;
      const show = strength > 0.03 && h.filled >= g.lag;
      grp.visible = show;
      if (show) {
        grp.matrix.copy(h.m[(h.head - g.lag + HISTORY * 2) % HISTORY]);
        grp.matrixWorldNeedsUpdate = true;
        mats[i].opacity = g.opacity * strength;
      }
    });
    h.head = (h.head + 1) % HISTORY;
    h.filled = Math.min(HISTORY, h.filled + 1);
  });

  return (
    <>
      {GHOSTS.map((g, i) => (
        <group
          key={g.lag}
          ref={(el) => {
            groups.current[i] = el;
          }}
          matrixAutoUpdate={false}
          visible={false}
        >
          <group position={[0, BODY_OFFSET_Y, 0]}>
            <mesh geometry={geos.body} material={mats[i]} />
            <mesh geometry={geos.collar} material={mats[i]} />
            <mesh geometry={geos.lid} material={mats[i]} position={[0, BODY_H + 0.13, 0]} />
          </group>
        </group>
      ))}
    </>
  );
}
