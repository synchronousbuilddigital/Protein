/**
 * GSAP master timeline for the Protein Shaker loader.
 *
 * One ~5-second loop, four phases (each phase is authored at a "native" length and then
 * time-scaled to its final length in PHASE_LENGTHS, so the choreography stays intact):
 *   EMERGE           the pool bulges, the shaker erupts out of the chocolate with a crown splash,
 *                    overshoots, and settles standing in the pool as it turns to face the camera
 *   SHAKE            vigorous hand shake (procedural, see ShakeDriver)
 *   POP & SPLASH     lid launches off and hovers tilted, chocolate splash bursts out, camera pushes in
 *   RESET            splash falls back, lid returns and snaps on, shaker plunges back into the pool
 *
 * The loop is seamless because the bottle ends fully submerged in the pool (clipped at the surface,
 * see pool.js) and the next loop erupts from the same pose. Ripples and splashes are time-based
 * (ShakePool), so they carry on smoothly across the loop point.
 *
 * GSAP tweens Three.js objects directly (position / rotation / scale) plus a few plain
 * state objects that `useFrame` hooks read every frame. No React re-renders happen during
 * the animation.
 */
import gsap from 'gsap';

/** Final length of each phase, in seconds. Change these to re-time the loop. */
export const PHASE_LENGTHS = { drop: 1.3, shake: 1.5, splash: 1.5, reset: 1.1 };
/** Length each phase is authored at (the builders below use these absolute positions). */
const NATIVE_LENGTHS = { drop: 0.6, shake: 1, splash: 1, reset: 0.55 };
/** Start time of each phase. */
export const PHASES = {
  drop: 0,
  shake: PHASE_LENGTHS.drop,
  splash: PHASE_LENGTHS.drop + PHASE_LENGTHS.shake,
  reset: PHASE_LENGTHS.drop + PHASE_LENGTHS.shake + PHASE_LENGTHS.splash,
};
export const LOOP_DURATION = PHASES.reset + PHASE_LENGTHS.reset;

/** Vertical rest position of the bottle rig (bottle visual centre sits at world y ≈ 0). */
export const REST_Y = -0.85;
/** Start/end position: fully submerged (lid top below the pool surface). */
export const START_Y = REST_Y - 2.5;
/** Turn the bottle arrives through (label sweeps into view) and leaves through. */
export const START_TURN = 0.55;
/** Tilt it breaks the surface at (as in the product shot). */
const START_TILT = 0.3;
/** Where the popped-off lid hovers (relative to its seat on the neck). */
export const LID_POP = { x: -0.66, y: 0.64, z: 0.1, tiltZ: -0.6, tiltX: 0.3 };

const rad = (deg) => (deg * Math.PI) / 180;

/** Guarantees a phase timeline is exactly `len` seconds long. */
function padTo(tl, len) {
  tl.to({}, { duration: len }, 0);
  return tl;
}

/* ─────────────────────────────────────────────────────────
   PHASE 1 — RISE-IN & LAND (native 0.6s)
   ───────────────────────────────────────────────────────── */
export function dropAnimation({ rig, lid, liquidState, camState, poolState }) {
  const tl = padTo(gsap.timeline(), 0.6);

  // Hard reset of everything that must be identical at loop start.
  tl.set(lid.position, { x: 0, y: 0, z: 0 }, 0);
  tl.set(lid.rotation, { x: 0, y: 0, z: 0 }, 0);

  // The pool swells, then the shaker erupts through the surface (ease-out: fastest as it breaks
  // out), overshoots, and eases back down to stand in the chocolate as it straightens and turns
  // to face the camera. A crown splash + ripples fire as the lid breaks the surface.
  tl.set(rig.scale, { x: 1, y: 1, z: 1 }, 0);
  if (poolState) {
    tl.set(poolState, { bulge: 0 }, 0);
    tl.to(poolState, { bulge: 1, duration: 0.06, ease: 'power2.in' }, 0);
    tl.to(poolState, { bulge: 0, duration: 0.14, ease: 'power2.out' }, 0.07);
    tl.call(() => poolState.fire(1, 'emerge'), null, 0.07);
  }
  tl.fromTo(rig.position, { y: START_Y, x: 0 }, { y: REST_Y + 0.34, duration: 0.3, ease: 'power3.out' }, 0.05);
  tl.to(rig.position, { y: REST_Y, duration: 0.24, ease: 'sine.inOut' }, 0.35);
  tl.fromTo(rig.rotation, { y: START_TURN, z: START_TILT, x: 0.06 }, { y: 0, z: 0, x: 0, duration: 0.5, ease: 'power2.out' }, 0.05);

  // Liquid settles inside; a kick makes the surface ripple on landing.
  tl.fromTo(liquidState, { fill: 0 }, { fill: 1, duration: 0.45, ease: 'power2.out' }, 0.06);
  tl.set(liquidState, { kick: 1 }, 0.36);

  // Camera starts a touch higher and further back, looking down toward where the bottle
  // rises from, then pushes in and levels as it lands.
  tl.fromTo(
    camState,
    { x: 0, y: 0.1, z: 0.3, look: -0.1 },
    { y: 0, z: 0, look: 0, duration: 0.6, ease: 'power3.out' },
    0
  );

  return tl;
}

/* ─────────────────────────────────────────────────────────
   PHASE 2 — SHAKE (native 1.0s)
   ───────────────────────────────────────────────────────── */
export function shakeAnimation({ shakeState, camState }) {
  const tl = padTo(gsap.timeline(), 1);

  // The motion itself is procedural (ShakeDriver in ShakerBottle.jsx reads shakeState.t and
  // shakeState.energy every frame): big strokes about a hand pivot, a squash at each turn, a
  // damped settle at the end. The timeline only drives the envelope and the phase clock.
  tl.fromTo(shakeState, { energy: 0 }, { energy: 1, duration: 0.3, ease: 'power2.out' }, 0);
  tl.to(shakeState, { energy: 0, duration: 0.1, ease: 'power3.in' }, 0.88); // decisive stop
  tl.fromTo(shakeState, { t: 0 }, { t: 1, duration: 1, ease: 'none' }, 0);

  // Camera leans in with the effort, then eases back as the shake stops.
  tl.to(camState, { z: -0.22, y: 0.03, duration: 0.35, ease: 'power2.out' }, 0);
  tl.to(camState, { z: 0, y: 0, duration: 0.25, ease: 'power2.inOut' }, 0.8);

  return tl;
}

/* ─────────────────────────────────────────────────────────
   PHASE 3 — POP & SPLASH (native 1.0s)
   ───────────────────────────────────────────────────────── */
export function splashAnimation({ lid, splash, splashState, liquidState, camState }) {
  const tl = padTo(gsap.timeline(), 1);

  tl.set(splash.position, { x: 0, y: 0, z: 0 }, 0);
  tl.set(splash.rotation, { x: 0, y: 0, z: 0 }, 0);
  tl.set(splashState, { opacity: 1, fall: 0 }, 0.02);

  // Lid launches off, drifts up-left and tilts so its underside shows, then hovers.
  tl.to(lid.position, { x: LID_POP.x, y: LID_POP.y, z: LID_POP.z, duration: 0.32, ease: 'back.out(1.2)' }, 0);
  tl.to(lid.rotation, { z: LID_POP.tiltZ, x: LID_POP.tiltX, duration: 0.32, ease: 'power2.out' }, 0);
  tl.to(lid.position, { y: LID_POP.y + 0.06, duration: 0.55, ease: 'sine.inOut' }, 0.35);
  tl.to(lid.rotation, { z: LID_POP.tiltZ - 0.08, y: 0.12, duration: 0.6, ease: 'sine.inOut' }, 0.35);

  // Liquid inside reacts: level dips as some leaves, surface gets a kick.
  tl.set(liquidState, { kick: 1 }, 0.02);
  tl.to(liquidState, { level: 0.86, duration: 0.3, ease: 'power2.out' }, 0.03);

  // Splash bursts upward and curls over.
  tl.fromTo(
    splash.scale,
    { x: 0.55, y: 0.55, z: 0.55 },
    { x: 1, y: 1, z: 1, duration: 0.5, ease: 'back.out(1.3)' },
    0.03
  );
  tl.fromTo(splashState, { progress: 0 }, { progress: 1, duration: 0.42, ease: 'power4.out' }, 0.03);
  tl.fromTo(splashState, { crown: 0 }, { crown: 0.9, duration: 0.18, ease: 'back.out(2.2)' }, 0.02);
  tl.to(splashState, { crown: 0.7, duration: 0.5, ease: 'sine.inOut' }, 0.3);

  // Keep the splash alive during the hold.
  tl.to(splash.rotation, { y: 0.14, duration: 0.6, ease: 'sine.inOut' }, 0.4);
  tl.to(splash.position, { y: 0.03, duration: 0.5, ease: 'sine.inOut' }, 0.5);

  // Camera pushes in and tilts up toward the splash.
  tl.to(camState, { z: -0.5, y: 0.22, look: 0.16, duration: 0.85, ease: 'sine.inOut' }, 0.05);

  return tl;
}

/* ─────────────────────────────────────────────────────────
   PHASE 4 — RESET (native 0.55s)
   ───────────────────────────────────────────────────────── */
export function resetAnimation({ rig, lid, splash, splashState, liquidState, camState, poolState }, { exit = true } = {}) {
  const tl = padTo(gsap.timeline(), 0.55);

  // Splash sags and falls under gravity (droplets keep flying), then fades as it lands.
  tl.fromTo(splashState, { fall: 0 }, { fall: 1, duration: 0.42, ease: 'power2.in' }, 0);
  tl.to(splashState, { crown: 0, duration: 0.3, ease: 'power2.in' }, 0.08);
  tl.to(splash.position, { y: -0.16, duration: 0.42, ease: 'power2.in' }, 0);
  tl.to(splash.rotation, { y: 0, duration: 0.3, ease: 'sine.inOut' }, 0);
  tl.to(splashState, { opacity: 0, duration: 0.16, ease: 'power1.in' }, 0.3);

  // Liquid level returns, small settle kick when the lid lands.
  tl.to(liquidState, { level: 1, duration: 0.3, ease: 'power2.out' }, 0.05);
  tl.set(liquidState, { kick: 0.6 }, 0.32);

  // Lid flies back onto the neck and snaps on (tiny compression of lid + bottle).
  tl.to(lid.position, { x: 0, y: 0, z: 0, duration: 0.22, ease: 'power3.in' }, 0.04);
  tl.to(lid.rotation, { x: 0, y: 0, z: 0, duration: 0.22, ease: 'power3.in' }, 0.04);
  tl.to(lid.position, { y: -0.012, duration: 0.04, ease: 'power1.out' }, 0.26);
  tl.to(lid.position, { y: 0, duration: 0.08, ease: 'back.out(3)' }, 0.3);
  tl.to(rig.scale, { y: 0.985, duration: 0.04, ease: 'power1.out' }, 0.26);
  tl.to(rig.scale, { y: 1, duration: 0.08, ease: 'power2.out' }, 0.3);

  // Camera returns home.
  tl.to(camState, { x: 0, y: 0, z: 0, look: 0, duration: 0.35, ease: 'power2.inOut' }, 0.05);

  if (exit) {
    // The shaker plunges back into the pool (ease-in: accelerating into the liquid) with a small
    // splash, ending fully submerged in the pose the next eruption starts from.
    tl.to(rig.position, { y: START_Y, duration: 0.17, ease: 'power2.in' }, 0.38);
    tl.to(rig.rotation, { y: -START_TURN, z: -START_TILT * 0.6, x: 0.06, duration: 0.17, ease: 'power2.in' }, 0.38);
    tl.to(camState, { y: 0.1, z: 0.3, look: -0.1, duration: 0.17, ease: 'power2.in' }, 0.38);
    if (poolState) tl.call(() => poolState.fire(0.5, 'plunge'), null, 0.41);
  }

  return tl;
}

/* ─────────────────────────────────────────────────────────
   MASTER
   ───────────────────────────────────────────────────────── */
/**
 * @param {object} refs
 * @param {THREE.Group}  refs.rig          bottle rig (position / rotation / scale)
 * @param {THREE.Group}  refs.lid          lid group, pivot at its bottom centre on the neck
 * @param {THREE.Group}  refs.splash       splash group, origin at the bottle mouth
 * @param {object}       refs.liquidState  { fill, level, kick }
 * @param {object}       refs.splashState  { progress, crown, opacity }
 * @param {object}       refs.shakeState   { energy, t }
 * @param {object}       refs.camState     { x, y, z, look }
 * @param {number}       [speed=1]         global playback multiplier (0.5 = half speed)
 */
export function createLoaderTimeline(refs, speed = 1) {
  const master = gsap.timeline({ repeat: -1, repeatDelay: 0, paused: true });
  const add = (key, child) => {
    child.timeScale(NATIVE_LENGTHS[key] / PHASE_LENGTHS[key]);
    master.add(child, PHASES[key]);
  };
  add('drop', dropAnimation(refs));
  add('shake', shakeAnimation(refs));
  add('splash', splashAnimation(refs));
  add('reset', resetAnimation(refs));
  master.timeScale(speed);
  return master;
}

/* ─────────────────────────────────────────────────────────
   HERO LOOP — the shaker stays on screen: idle → shake → pop & splash → settle → idle …
   ───────────────────────────────────────────────────────── */
export const HERO_PHASE_LENGTHS = { shake: 1.3, splash: 1.6, settle: 0.7 };

/**
 * @param {object} refs      same refs as createLoaderTimeline
 * @param {object} [opts]
 * @param {number} [opts.idleDelay=4]  seconds of calm between bursts
 * @param {number} [opts.speed=1]      global playback multiplier
 */
export function createHeroTimeline(refs, { idleDelay = 4, speed = 1 } = {}) {
  const master = gsap.timeline({ repeat: -1, repeatDelay: 0, paused: true });
  // resting state (no drop-in): bottle centred, full, lid closed, splash hidden
  master.set(refs.rig.position, { x: 0, y: REST_Y }, 0);
  master.set(refs.rig.rotation, { x: 0, y: 0, z: 0 }, 0);
  master.set(refs.rig.scale, { x: 1, y: 1, z: 1 }, 0);
  master.set(refs.liquidState, { fill: 1, level: 1 }, 0);
  master.set(refs.splashState, { progress: 0, crown: 0, opacity: 0 }, 0);
  master.set(refs.camState, { x: 0, y: 0, z: 0, look: 0 }, 0);
  master.to({}, { duration: idleDelay }, 0); // idle
  const add = (child, at, native, len) => {
    child.timeScale(native / len);
    master.add(child, at);
  };
  const L = HERO_PHASE_LENGTHS;
  add(shakeAnimation(refs), idleDelay, 1, L.shake);
  add(splashAnimation(refs), idleDelay + L.shake, 1, L.splash);
  add(resetAnimation(refs, { exit: false }), idleDelay + L.shake + L.splash, 0.55, L.settle);
  master.timeScale(speed);
  return master;
}
