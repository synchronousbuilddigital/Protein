/* eslint-disable react-hooks/immutability -- Three.js objects are mutated imperatively inside useFrame/useEffect by design (no React state involved). */
/**
 * The bottle rig: body (opaque tumbler with a steel collar, or a transparent double-walled
 * shaker), printed brand label, liquid, pop-off lid and the splash emitter. The rig group is what the timeline moves/rotates;
 * its origin sits ~0.25 units above the base (roughly where a hand would grip it) so the
 * shake reads as a hand motion rather than a spin around the centre.
 */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createBottleGeometry, createCollarGeometry, createLabelGeometry, BODY_H } from './geometry';
import { createBrandLabelTexture } from './BrandLabel';
import { REST_Y } from './animation';
import { POOL_PLANE } from './pool';
import BottleLid from './BottleLid';
import ProteinLiquid from './ProteinLiquid';
import ProteinSplash from './ProteinSplash';
import MixerBall from './MixerBall';

const TAU = Math.PI * 2;
/** Full strokes across the shake phase (exported so the motion trail can read the stroke velocity). */
export const SHAKES = 5;
/** Hand pivot in rig space: below the base, so the top of the bottle swings more than the bottom. */
const PIVOT_Y = -0.6;
const SETTLE_S = 0.45;

/**
 * Roll θ about the hand pivot (the rig origin moves by p − R·p), plus lift, sideways sway and
 * a forward/back pitch.
 */
function applyPose(rig, theta, lift, swayX, pitch) {
  rig.rotation.z = theta;
  rig.rotation.x = pitch;
  rig.position.x = swayX + PIVOT_Y * Math.sin(theta);
  rig.position.y = REST_Y + lift + PIVOT_Y * (1 - Math.cos(theta));
}

/**
 * Procedural hand shake. Runs only while shakeState.energy > 0 (the shake phase), so it never
 * fights the drop / splash / reset tweens. Big deliberate strokes: the bottle lifts and drops
 * while rolling about a pivot below its base, the roll lagging the lift so the motion is an
 * elliptical swing rather than a straight jitter; a slow yaw drift, a squash at each turn and
 * a small rattle of the lid. When the energy cuts out, a short damped wobble settles it.
 */
function ShakeDriver({ rigRef, lidRef, shakeState }) {
  const st = useRef({ active: false, settleAt: -1 });
  useFrame((state) => {
    const rig = rigRef.current;
    const lid = lidRef?.current;
    if (!rig) return;
    const s = st.current;
    const e = shakeState.energy;
    const now = state.clock.elapsedTime;

    if (e < 0.0005) {
      if (s.active) {
        // shake over: start the settle, hand the lid back to the timeline
        s.active = false;
        s.settleAt = now;
        rig.scale.set(1, 1, 1);
        rig.rotation.y = 0;
        if (lid) {
          lid.position.y = 0;
          lid.rotation.z = 0;
        }
      }
      if (s.settleAt >= 0) {
        const tau = now - s.settleAt;
        if (tau >= SETTLE_S) {
          s.settleAt = -1;
          rig.position.set(0, REST_Y, 0);
          rig.rotation.set(0, 0, 0);
          return;
        }
        const k = Math.exp(-7 * tau);
        applyPose(rig, 0.11 * k * Math.sin(22 * tau + 0.4), 0.035 * k * Math.sin(22 * tau + 1.2), 0, 0.02 * k * Math.sin(22 * tau));
      }
      return;
    }

    s.active = true;
    s.settleAt = -1;
    const ph = TAU * SHAKES * shakeState.t;
    const v = Math.sin(ph);
    const stroke = Math.sign(v) * Math.pow(Math.abs(v), 0.7);
    const harm = Math.sin(ph * 1.9 + 1.1);
    const lift = (0.17 * stroke + 0.02 * harm) * e;
    const theta = (0.22 * Math.sin(ph - 0.9) + 0.03 * harm) * e; // lags the lift → elliptical swing
    const pitch = 0.06 * Math.sin(ph + 0.4) * e;
    const swayX = 0.02 * Math.sin(ph * 0.5 + 0.3) * e;
    applyPose(rig, theta, lift, swayX, pitch);
    rig.rotation.y = 0.04 * Math.sin(ph * 0.5) * e;
    const squash = 0.025 * Math.pow(Math.abs(v), 8) * e;
    rig.scale.set(1 + squash * 0.5, 1 - squash, 1 + squash * 0.5);
    if (lid) {
      lid.position.y = 0.008 * Math.abs(Math.sin(ph * 2)) * e;
      lid.rotation.z = 0.025 * Math.sin(ph * 2 + 1) * e;
    }
  });
  return null;
}

export const BODY_OFFSET_Y = -0.25;
export const MOUTH_Y = BODY_OFFSET_Y + BODY_H; // 1.55 in rig space
export const FLOOR_Y = REST_Y + BODY_OFFSET_Y; // world y of the bottle base at rest

export default function ShakerBottle({
  rigRef,
  lidRef,
  splashRef,
  materials,
  liquidState,
  splashState,
  shakeState,
  brandName,
  tagline,
  subline,
  accentColor,
  inkColor,
  logoSrc,
  bottleStyle = 'tumbler',
}) {
  const tumbler = bottleStyle === 'tumbler';
  const bodyGeo = useMemo(() => createBottleGeometry(72, bottleStyle), [bottleStyle]);
  const collarGeo = useMemo(() => (tumbler ? createCollarGeometry(72) : null), [tumbler]);
  const labelGeo = useMemo(
    () =>
      tumbler
        ? createLabelGeometry({ style: 'tumbler', yMin: 0.26, yMax: 1.58, arc: (100 * Math.PI) / 180 })
        : createLabelGeometry({ style: 'clear' }),
    [tumbler]
  );
  const label = useMemo(
    () =>
      createBrandLabelTexture({
        brandName,
        tagline,
        subline,
        accent: accentColor,
        ink: inkColor,
        logoSrc,
        variant: tumbler ? 'vertical' : 'logo',
      }),
    [brandName, tagline, subline, accentColor, inkColor, logoSrc, tumbler]
  );
  const labelMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: label.texture,
        transparent: true,
        roughness: tumbler ? 0.5 : 0.55,
        clearcoat: tumbler ? 0.2 : 0.5,
        clearcoatRoughness: tumbler ? 0.4 : 0.2,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
        alphaTest: 0.02,
        envMapIntensity: 0.6,
        clippingPlanes: [POOL_PLANE],
      }),
    [label, tumbler]
  );

  useEffect(
    () => () => {
      bodyGeo.dispose();
      labelGeo.dispose();
      collarGeo?.dispose();
    },
    [bodyGeo, labelGeo, collarGeo]
  );
  useEffect(
    () => () => {
      label.dispose();
      labelMat.dispose();
    },
    [label, labelMat]
  );

  return (
    <group ref={rigRef} position={[0, REST_Y, 0]}>
      <ShakeDriver rigRef={rigRef} lidRef={lidRef} shakeState={shakeState} />
      <group position={[0, BODY_OFFSET_Y, 0]}>
        <ProteinLiquid rigRef={rigRef} material={materials.liquid} liquidState={liquidState} bottleStyle={bottleStyle} />
        {!tumbler && <MixerBall material={materials.mixer} liquidState={liquidState} shakeState={shakeState} />}
        <mesh geometry={bodyGeo} material={materials.bottle} />
        {tumbler && <mesh geometry={collarGeo} material={materials.steel} />}
        <mesh geometry={labelGeo} material={labelMat} renderOrder={2} />
      </group>
      <BottleLid ref={lidRef} materials={materials} pivotY={MOUTH_Y} variant={bottleStyle} />
      <ProteinSplash ref={splashRef} material={materials.splash} splashState={splashState} position={[0, MOUTH_Y, 0]} />
    </group>
  );
}
