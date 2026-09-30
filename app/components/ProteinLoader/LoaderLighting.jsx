/* eslint-disable react-hooks/immutability -- Three.js objects are mutated imperatively inside useFrame by design. */
/**
 * Clean studio lighting: a broad key, a large soft "window" reflection down the bottle, cool and
 * warm rims for crisp edges, and a glint spotlight that sweeps across the product every few
 * seconds. The environment map (procedural Lightformers, no network) supplies the reflections.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

/** A narrow spotlight that sweeps left → right across the bottle on a slow cycle. */
function Glint() {
  const ref = useRef();
  const target = useRef();
  useFrame((state) => {
    const l = ref.current;
    if (!l || !target.current) return;
    const t = (state.clock.elapsedTime % 5.2) / 5.2; // one sweep every 5.2 s
    const x = THREE.MathUtils.lerp(-3.2, 3.2, t);
    l.position.set(x, 3.2, 3.5);
    l.target = target.current;
    // bright only through the middle of the sweep
    l.intensity = 34 * Math.pow(Math.sin(Math.PI * t), 3);
  });
  return (
    <>
      <spotLight ref={ref} angle={0.28} penumbra={1} distance={14} decay={1.4} color="#fff8f0" />
      <object3D ref={target} position={[0, 0.2, 0]} />
    </>
  );
}

export default function LoaderLighting({ accentColor = '#FF683F', ambienceColor = '#3d3d43' }) {
  const cool = ambienceColor === '#3d3d43' ? '#e9efff' : '#dcefe3';
  return (
    <>
      <ambientLight intensity={0.3} />
      {/* key */}
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#fff5ea" />
      {/* fill */}
      <directionalLight position={[-4, 2, 3]} intensity={0.7} color={cool} />
      {/* rims: cool from back-left, warm from back-right */}
      <spotLight position={[-3, 4.5, -4]} intensity={60} angle={0.55} penumbra={0.9} color="#eef4ff" />
      <spotLight position={[3.5, 3, -3.5]} intensity={40} angle={0.6} penumbra={0.9} color="#ffd9c4" />
      {/* warm brand kicker behind the bottle */}
      <pointLight position={[2.5, 1.5, -3]} intensity={12} distance={12} decay={2} color={accentColor} />
      <Glint />

      <Environment resolution={256} frames={1}>
        <mesh scale={40}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={ambienceColor} side={THREE.BackSide} />
        </mesh>
        {/* top softbox */}
        <Lightformer form="rect" intensity={3.2} position={[0, 5, -1]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
        {/* big soft window in front-left: the long vertical reflection down the tumbler */}
        <Lightformer form="rect" intensity={2.4} position={[-3.5, 1.5, 4]} rotation-y={Math.PI / 3} scale={[1.6, 7, 1]} />
        {/* thin bright strips → crisp edge highlights */}
        <Lightformer form="rect" intensity={4.5} position={[-2.5, 2, -3]} rotation-y={Math.PI / 4} scale={[0.35, 6, 1]} />
        <Lightformer form="rect" intensity={3.2} position={[2.5, 2, -3]} rotation-y={-Math.PI / 4} scale={[0.35, 6, 1]} />
        {/* low wide band behind the stage: the wet horizon highlight across the chocolate pool */}
        <Lightformer form="rect" intensity={2.2} color="#fff1e4" position={[0, 0.4, -7]} scale={[16, 1.1, 1]} />
        {/* right side strip */}
        <Lightformer form="rect" intensity={1.4} position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[3, 5, 1]} />
        {/* warm accent + soft floor bounce */}
        <Lightformer form="circle" intensity={0.8} color={accentColor} position={[3, -1, -4]} scale={3} />
        <Lightformer form="rect" intensity={0.6} color="#ffe8d6" position={[0, -4, 2]} rotation-x={-Math.PI / 2} scale={[6, 4, 1]} />
      </Environment>
    </>
  );
}
