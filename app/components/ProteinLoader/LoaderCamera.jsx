/* eslint-disable react-hooks/immutability -- Three.js objects are mutated imperatively inside useFrame/useEffect by design (no React state involved). */
/**
 * Perspective camera with responsive framing and GSAP-driven cinematic offsets.
 * The bottle occupies ~60vh on desktop, ~55vh on tablet and ~45vh on mobile; the distance
 * is also clamped so the splash never clips horizontally on narrow screens.
 */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const BOTTLE_H = 2.2; // body + lid, world units
const LOOK_Y = 0.28;
const MIN_WIDTH_UNITS = 2.7;

export function computeCameraDistance(width, height, fovDeg, fit = 1) {
  const vh = (height < 400 ? 0.62 : width < 640 ? 0.45 : width < 1024 ? 0.55 : 0.6) * fit;
  const tanHalf = Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2);
  const byHeight = BOTTLE_H / vh / (2 * tanHalf);
  const aspect = width / Math.max(1, height);
  const byWidth = MIN_WIDTH_UNITS / (2 * tanHalf * aspect);
  return Math.max(byHeight, byWidth);
}

export default function LoaderCamera({ camState, fov = 40, baseY = 0.35, fit = 1, lookOffset = 0 }) {
  const { camera, size } = useThree();
  const dist = useRef(5.2);
  const target = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    dist.current = computeCameraDistance(size.width, size.height, fov, fit);
    camera.fov = fov;
    camera.near = 0.1;
    camera.far = 60;
    camera.updateProjectionMatrix();
  }, [size, camera, fov, fit]);

  useFrame(() => {
    // lookOffset lowers camera and target together: the scene sits higher in frame, same perspective
    camera.position.set(camState.x, baseY + camState.y - lookOffset, dist.current + camState.z);
    target.set(0, LOOK_Y + camState.look - lookOffset, 0);
    camera.lookAt(target);
  });

  return null;
}
