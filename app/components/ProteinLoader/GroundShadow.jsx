/**
 * Cheap contact shadow: a radial-gradient disc that fades and grows as the bottle lifts off,
 * vanishes while the bottle is below the floor (rising in / sinking out), and follows its scale.
 */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { createShadowTexture } from './geometry';

export default function GroundShadow({ rigRef, restY, floorY, opacity = 0.42 }) {
  const ref = useRef();
  const tex = useMemo(() => createShadowTexture(), []);
  useEffect(() => () => tex.dispose(), [tex]);

  useFrame(() => {
    const rig = rigRef.current;
    const mesh = ref.current;
    if (!rig || !mesh) return;
    const d = rig.position.y - restY;
    const f = d >= 0 ? Math.max(0, 1 - d / 2.2) : Math.max(0, 1 + d / 0.5);
    mesh.material.opacity = opacity * f * f;
    const s = (1 + Math.max(0, d) * 0.35) * rig.scale.x;
    mesh.scale.set(s, s, 1);
    mesh.position.x = rig.position.x * 0.9;
  });

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2} position={[0, floorY, 0]} renderOrder={-1}>
      <planeGeometry args={[1.7, 1.7]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} opacity={opacity} />
    </mesh>
  );
}
