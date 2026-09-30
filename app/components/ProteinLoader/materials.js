/**
 * Shared PBR materials. Created once per loader instance (useMemo) and disposed on unmount.
 */
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { POOL_PLANE } from './pool';

export function useLoaderMaterials({ bottleColor, liquidColor, accentColor, bottleStyle = 'clear' }) {
  const mats = useMemo(() => {
    const bottle =
      bottleStyle === 'tumbler'
        ? // opaque satin finish (powder-coated steel / ceramic look)
          new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(bottleColor),
            roughness: 0.3,
            metalness: 0,
            clearcoat: 1,
            clearcoatRoughness: 0.08,
            sheen: 0.15,
            sheenColor: new THREE.Color('#ffffff'),
            envMapIntensity: 1.35,
          })
        : new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(bottleColor),
      transmission: 1,
      thickness: 0.15,
      roughness: 0.07,
      metalness: 0,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.8,
      specularIntensity: 1,
      attenuationColor: new THREE.Color(bottleColor).lerp(new THREE.Color('#000000'), 0.35),
      attenuationDistance: 1.2,
      side: THREE.FrontSide,
    });

    // Opaque on purpose: transmissive materials only "see" opaque objects behind them.
    const liquidCol = new THREE.Color(liquidColor);
    const liquid = new THREE.MeshPhysicalMaterial({
      color: liquidCol,
      roughness: 0.22,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      sheen: 0.7,
      sheenRoughness: 0.45,
      sheenColor: liquidCol.clone().lerp(new THREE.Color('#ffffff'), 0.45),
      envMapIntensity: 1.2,
    });

    // Glossier variant for the airborne liquid. Sheen follows the liquid colour so a dark
    // chocolate shake stays dark with sharp highlights instead of washing out to grey.
    const splash = new THREE.MeshPhysicalMaterial({
      color: liquidCol.clone().lerp(new THREE.Color('#ffffff'), 0.03),
      roughness: 0.08,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      sheen: 0.5,
      sheenRoughness: 0.4,
      sheenColor: liquidCol.clone().lerp(new THREE.Color('#ffffff'), 0.28),
      specularIntensity: 1.2,
      envMapIntensity: 1.6,
      transparent: true,
      opacity: 1,
      depthWrite: true,
    });

    const lid = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1c1c1e'),
      roughness: 0.38,
      metalness: 0.05,
      clearcoat: 0.7,
      clearcoatRoughness: 0.25,
      envMapIntensity: 1,
    });

    const accent = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor),
      roughness: 0.32,
      metalness: 0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1,
    });

    // stainless mixer ball
    const mixer = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#d6d6da'),
      metalness: 1,
      roughness: 0.28,
      envMapIntensity: 1.6,
    });

    // brushed steel collar
    const steel = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#d2d5db'),
      metalness: 1,
      roughness: 0.2,
      envMapIntensity: 2,
    });

    // tumbler lid: off-white ring + black cap
    const lidRing = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(bottleColor).lerp(new THREE.Color('#ffffff'), 0.35),
      roughness: 0.45,
      clearcoat: 0.3,
      clearcoatRoughness: 0.35,
      envMapIntensity: 0.8,
    });
    const cap = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#151517'),
      roughness: 0.4,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
      envMapIntensity: 1,
    });

    // everything on the bottle side is cut at the pool surface, so the shaker rises out of it
    [bottle, liquid, splash, lid, accent, mixer, steel, lidRing, cap].forEach((mat) => {
      mat.clippingPlanes = [POOL_PLANE];
    });

    return { bottle, liquid, splash, lid, accent, mixer, steel, lidRing, cap };
  }, [bottleColor, liquidColor, accentColor, bottleStyle]);

  useEffect(() => {
    return () => {
      Object.values(mats).forEach((m) => m.dispose());
    };
  }, [mats]);

  return mats;
}
