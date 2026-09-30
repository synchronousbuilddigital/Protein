/**
 * Bottle lid. Two variants:
 *  - 'tumbler': off-white screw ring with a black inset top, black flip-cap spout and hinge tab,
 *               plus a dark underside that shows when the lid pops off and tilts (brand photo).
 *  - 'clear':   the large black ridged lid with an orange accent ring and a carry loop.
 * A static wrapper places the pivot at the lid's bottom centre (on the neck); the inner
 * (animated) group starts at identity so the timeline can lift, shift and tilt it freely.
 */
import { forwardRef, useEffect, useRef } from 'react';
import * as THREE from 'three';

const RING_R = 0.5;
const RIDGE_COUNT = 36;

function TumblerLid({ materials }) {
  return (
    <>
      {/* dark underside / inner plug */}
      <mesh material={materials.cap} position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.37, 0.37, 0.06, 48]} />
      </mesh>
      {/* off-white screw ring */}
      <mesh material={materials.lidRing} position={[0, 0.11, 0]}>
        <cylinderGeometry args={[0.455, 0.462, 0.22, 64]} />
      </mesh>
      <mesh material={materials.lidRing} position={[0, 0.22, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.435, 0.022, 10, 64]} />
      </mesh>
      {/* black inset top */}
      <mesh material={materials.cap} position={[0, 0.232, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.03, 56]} />
      </mesh>
      {/* black cap dome */}
      <mesh material={materials.cap} position={[0, 0.275, 0]}>
        <cylinderGeometry args={[0.3, 0.33, 0.07, 56]} />
      </mesh>
      {/* spout */}
      <mesh material={materials.cap} position={[0.12, 0.36, 0.14]}>
        <cylinderGeometry args={[0.11, 0.12, 0.12, 36]} />
      </mesh>
      <mesh material={materials.cap} position={[0.12, 0.422, 0.14]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.105, 0.012, 8, 36]} />
      </mesh>
      {/* hinge / flip tab */}
      <mesh material={materials.cap} position={[-0.1, 0.33, -0.2]}>
        <boxGeometry args={[0.22, 0.05, 0.1]} />
      </mesh>
    </>
  );
}

function ClearLid({ materials, ridges }) {
  return (
    <>
      <mesh material={materials.lid} position={[0, 0.13, 0]}>
        <cylinderGeometry args={[RING_R, RING_R + 0.006, 0.26, 56]} />
      </mesh>
      <instancedMesh ref={ridges} args={[undefined, undefined, RIDGE_COUNT]} material={materials.lid} frustumCulled={false}>
        <boxGeometry args={[0.024, 0.22, 0.026]} />
      </instancedMesh>
      <mesh material={materials.accent} position={[0, 0.268, 0]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[RING_R, 0.014, 10, 64]} />
      </mesh>
      <mesh material={materials.lid} position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.42, RING_R, 0.1, 56]} />
      </mesh>
      <mesh material={materials.lid} position={[0, 0.395, 0]}>
        <cylinderGeometry args={[0.4, 0.42, 0.05, 56]} />
      </mesh>
      <mesh material={materials.lid} position={[0, 0.47, 0.2]}>
        <cylinderGeometry args={[0.14, 0.15, 0.1, 40]} />
      </mesh>
      <mesh material={materials.accent} position={[0, 0.522, 0.2]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.135, 0.012, 8, 40]} />
      </mesh>
      <mesh material={materials.lid} position={[0, 0.5, 0.36]}>
        <boxGeometry args={[0.1, 0.03, 0.06]} />
      </mesh>
      <mesh material={materials.lid} position={[0, 0.54, -0.3]}>
        <torusGeometry args={[0.13, 0.022, 10, 40]} />
      </mesh>
      <mesh material={materials.lid} position={[0, 0.43, -0.45]}>
        <boxGeometry args={[0.16, 0.06, 0.09]} />
      </mesh>
    </>
  );
}

const BottleLid = forwardRef(function BottleLid({ materials, pivotY, variant = 'tumbler' }, ref) {
  const ridges = useRef();

  useEffect(() => {
    const mesh = ridges.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const p = new THREE.Vector3();
    const s = new THREE.Vector3(1, 1, 1);
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < RIDGE_COUNT; i++) {
      const a = (i / RIDGE_COUNT) * Math.PI * 2;
      p.set(Math.sin(a) * (RING_R + 0.002), 0.13, Math.cos(a) * (RING_R + 0.002));
      q.setFromAxisAngle(up, a);
      m.compose(p, q, s);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [variant]);

  return (
    <group position={[0, pivotY, 0]}>
      {/* animated group: rest pose is identity */}
      <group ref={ref}>{variant === 'tumbler' ? <TumblerLid materials={materials} /> : <ClearLid materials={materials} ridges={ridges} />}</group>
    </group>
  );
});

export default BottleLid;
