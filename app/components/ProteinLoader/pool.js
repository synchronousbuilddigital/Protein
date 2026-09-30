/**
 * The chocolate pool the shaker erupts from. Shared constants + the clipping plane that hides
 * everything of the bottle below the surface, so it genuinely rises out of (and sinks into) the
 * liquid. Materials opt in with `clippingPlanes: [POOL_PLANE]` (renderer.localClippingEnabled).
 */
import * as THREE from 'three';
import { REST_Y } from './animation';

/** World height of the pool surface: the bottle's base at rest (REST_Y + BODY_OFFSET_Y). */
export const POOL_Y = REST_Y - 0.25;
/** Keeps y > POOL_Y − ε (a hair under the surface, so the base never flickers at rest). */
export const POOL_PLANE = new THREE.Plane(new THREE.Vector3(0, 1, 0), -(POOL_Y - 0.004));

/**
 * State the timeline drives: `bulge` is tweened; bursts are fired by timeline callbacks and then
 * animated in real time by ShakePool, so ripples and splashes stay continuous across the loop.
 */
export function createPoolState() {
  return {
    bulge: 0,
    burstId: 0,
    burstAmp: 1,
    burstKind: 'emerge',
    fire(amp = 1, kind = 'emerge') {
      this.burstAmp = amp;
      this.burstKind = kind;
      this.burstId += 1;
    },
  };
}
