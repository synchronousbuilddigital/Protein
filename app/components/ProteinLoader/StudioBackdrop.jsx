/* eslint-disable react-hooks/immutability -- Three.js objects are mutated imperatively inside useFrame by design. */
/**
 * Clean studio set: a smooth spotlit cyclorama with a vertical light cone behind the product,
 * a lit circle on the floor, a soft mirror reflection that fades out radially, and a handful
 * of slow bokeh discs for depth. Colours come from the theme preset.
 * The floor pool and stage spot fade out while the bottle is below floor level (rising in /
 * sinking out) and light up as it arrives, so the bottle never shows through the floor.
 */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { createGlowTexture, createRadialAlphaTexture, createStudioBackdropTexture } from './geometry';

const BACKDROP_Z = -4;

// fixed, hand-placed bokeh so the composition is the same on every load
const BOKEH = [
  { x: -2.6, y: 1.4, z: -1.5, s: 0.42, v: 0.05 },
  { x: 2.4, y: 0.4, z: -1.2, s: 0.3, v: 0.07 },
  { x: -1.6, y: -0.6, z: -0.6, s: 0.22, v: 0.06 },
  { x: 2.9, y: 1.9, z: -2.2, s: 0.5, v: 0.04 },
  { x: -3.1, y: 0.1, z: -2.4, s: 0.36, v: 0.05 },
  { x: 1.5, y: -1.1, z: -0.4, s: 0.16, v: 0.08 },
  { x: 0.6, y: 2.2, z: -2.8, s: 0.28, v: 0.045 },
  { x: -0.9, y: 1.9, z: -1.9, s: 0.2, v: 0.06 },
];

function Bokeh({ color }) {
  const group = useRef();
  const tex = useMemo(() => createGlowTexture(), []);
  const mat = useMemo(() => new THREE.SpriteMaterial({ map: tex, color: new THREE.Color(color), transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending }), [tex, color]);
  useEffect(
    () => () => {
      tex.dispose();
      mat.dispose();
    },
    [tex, mat]
  );
  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.children.forEach((sp, i) => {
      const b = BOKEH[i];
      sp.position.y += b.v * dt;
      if (sp.position.y > 2.8) sp.position.y = -1.6;
      sp.position.x = b.x + Math.sin(t * 0.25 + i) * 0.12;
      sp.material.opacity = 0.1 + 0.08 * (0.5 + 0.5 * Math.sin(t * 0.6 + i * 1.3));
    });
  });
  return (
    <group ref={group}>
      {BOKEH.map((b, i) => (
        <sprite key={i} position={[b.x, b.y, b.z]} scale={[b.s, b.s, 1]} material={mat.clone()} />
      ))}
    </group>
  );
}

export default function StudioBackdrop({ preset, floorY, rigRef, restY = 0, reflect = true }) {
  const { camera, size, viewport } = useThree();
  const back = useRef();
  const floor = useRef();
  const spot = useRef();

  useFrame(() => {
    const rig = rigRef?.current;
    if (!rig) return;
    const d = rig.position.y - restY; // 0 at rest, negative while below the floor
    const f = d >= -0.05 ? 1 : Math.max(0, 1 + (d + 0.05) / 0.45);
    if (floor.current) floor.current.material.opacity = f;
    if (spot.current) spot.current.material.opacity = 0.42 * f;
  });

  const backTex = useMemo(
    () => createStudioBackdropTexture({ base: preset.base, glow: preset.glow, edge: preset.edge, cone: true, noise: 2 }),
    [preset.base, preset.glow, preset.edge]
  );
  const alphaTex = useMemo(() => createRadialAlphaTexture(), []);
  const spotTex = useMemo(() => createGlowTexture(), []);
  useEffect(
    () => () => {
      backTex.dispose();
      alphaTex.dispose();
      spotTex.dispose();
    },
    [backTex, alphaTex, spotTex]
  );

  const target = useMemo(() => new THREE.Vector3(0, 0.2, BACKDROP_Z), []);
  useEffect(() => {
    const v = viewport.getCurrentViewport(camera, target);
    if (back.current) back.current.scale.set(v.width * 1.7, v.height * 1.7, 1);
  }, [camera, size, viewport, target]);

  const reflectorRes = size.width >= 900 ? 512 : 320;

  return (
    <>
      {/* cyclorama */}
      <mesh ref={back} position={[0, 0.2, BACKDROP_Z]} renderOrder={-4}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={backTex} toneMapped={false} />
      </mesh>

      {/* reflective floor — skipped under the pool, which covers it (it re-renders the whole scene every frame) */}
      {reflect && (
      <mesh ref={floor} rotation-x={-Math.PI / 2} position={[0, floorY - 0.02, -0.4]} renderOrder={-3}>
        <planeGeometry args={[7, 7]} />
        <MeshReflectorMaterial
          resolution={reflectorRes}
          blur={[260, 90]}
          mixBlur={0.9}
          mixStrength={1.3}
          mirror={0.4}
          roughness={0.7}
          depthScale={0.9}
          minDepthThreshold={0.5}
          maxDepthThreshold={1.7}
          color={preset.floor}
          metalness={0.15}
          alphaMap={alphaTex}
          transparent
          depthWrite={false}
        />
      </mesh>
      )}

      {/* lit circle on the stage under the product */}
      <mesh ref={spot} rotation-x={-Math.PI / 2} position={[0, floorY - 0.012, -0.2]} renderOrder={-2}>
        <planeGeometry args={[3.6, 3.6]} />
        <meshBasicMaterial map={spotTex} color={preset.glow} transparent opacity={0.42} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <Bokeh color={preset.dust} />
    </>
  );
}
