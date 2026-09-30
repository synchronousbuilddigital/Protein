/**
 * Procedural geometry helpers for the shaker bottle and the splash.
 * All bottle profiles are in "body space": y = 0 at the bottle's base, y = BODY_H at the neck lip.
 */
import * as THREE from 'three';

export const BODY_H = 1.9; // neck lip height
export const BOTTOM_THICKNESS = 0.09;
export const LIQUID_TOP = 1.5; // fill line in body space
export const LIQUID_H = LIQUID_TOP - BOTTOM_THICKNESS;
export const NECK_R = 0.45;
export const BODY_R = 0.47;

/** Outer wall profile (radius, y) — wide straight body, grip waist, thread band, chamfered base. */
export const OUTER_PROFILE = [
  [0.0, 0.0],
  [0.36, 0.0],
  [0.41, 0.015],
  [0.44, 0.05],
  [0.455, 0.1],
  [0.46, 0.2],
  [0.455, 0.45],
  [0.44, 0.6],
  [0.432, 0.75],
  [0.44, 0.9],
  [0.455, 1.05],
  [0.462, 1.25],
  [0.468, 1.5],
  [0.472, 1.68],
  [0.478, 1.72],
  [0.478, 1.8],
  [0.462, 1.84],
  [NECK_R, 1.87],
  [NECK_R, BODY_H],
];

/** Inner wall profile, walked top → bottom so the lathe forms a closed double wall. */
export const INNER_PROFILE = [
  [0.415, BODY_H],
  [0.415, 1.8],
  [0.43, 1.68],
  [0.428, 1.5],
  [0.42, 1.25],
  [0.412, 1.05],
  [0.398, 0.9],
  [0.39, 0.75],
  [0.398, 0.6],
  [0.412, 0.45],
  [0.418, 0.2],
  [0.41, 0.12],
  [0.38, 0.095],
  [0.34, BOTTOM_THICKNESS],
  [0.0, BOTTOM_THICKNESS],
];

/** Liquid body: sits just inside the inner wall, from the inner floor to the fill line. */
export const LIQUID_PROFILE = [
  [0.0, 0.0],
  [0.33, 0.0],
  [0.37, 0.006],
  [0.402, 0.03],
  [0.41, 0.11],
  [0.404, 0.36],
  [0.39, 0.51],
  [0.382, 0.66],
  [0.39, 0.81],
  [0.404, 0.96],
  [0.412, 1.16],
  [0.42, LIQUID_H],
  [0.0, LIQUID_H],
];

/* ── Tumbler style (opaque steel-look shaker, as on the brand photo) ── */
export const TUMBLER_R = 0.43;
/** Straight matte body with a rounded base; the top is closed off by the steel collar. */
export const TUMBLER_OUTER = [
  [0.0, 0.0],
  [0.3, 0.0],
  [0.38, 0.02],
  [0.415, 0.06],
  [TUMBLER_R, 0.13],
  [TUMBLER_R, 1.66],
  [0.425, 1.7],
  [0.41, 1.72],
  [0.0, 1.72],
];
/** Brushed-steel screw collar: threaded outside, plain inner wall down to a dark floor. */
export const TUMBLER_COLLAR = [
  [0.0, 1.7],
  [0.41, 1.7],
  [0.418, 1.74],
  [0.406, 1.77],
  [0.418, 1.8],
  [0.406, 1.83],
  [0.418, 1.86],
  [0.41, BODY_H],
  [0.375, BODY_H],
  [0.375, 1.25],
  [0.0, 1.25],
];
export const TUMBLER_LIQUID = [
  [0.0, 0.0],
  [0.34, 0.0],
  [0.365, 0.02],
  [0.37, 0.1],
  [0.37, LIQUID_H],
  [0.0, LIQUID_H],
];

const toVec2 = (pts) => pts.map(([x, y]) => new THREE.Vector2(x, y));

/** Linear-interpolated outer radius at a given body-space height. */
export function outerRadiusAt(y, style = 'clear') {
  const p = style === 'tumbler' ? TUMBLER_OUTER : OUTER_PROFILE;
  for (let i = 1; i < p.length; i++) {
    if (y <= p[i][1]) {
      const [r0, y0] = p[i - 1];
      const [r1, y1] = p[i];
      const t = y1 === y0 ? 0 : (y - y0) / (y1 - y0);
      return r0 + (r1 - r0) * t;
    }
  }
  return p[p.length - 1][0];
}

export function createBottleGeometry(segments = 72, style = 'clear') {
  const pts = toVec2(style === 'tumbler' ? TUMBLER_OUTER : [...OUTER_PROFILE, ...INNER_PROFILE]);
  return new THREE.LatheGeometry(pts, segments);
}

export function createCollarGeometry(segments = 72) {
  return new THREE.LatheGeometry(toVec2(TUMBLER_COLLAR), segments);
}

export function createLiquidGeometry(segments = 48, style = 'clear') {
  const geo = new THREE.LatheGeometry(toVec2(style === 'tumbler' ? TUMBLER_LIQUID : LIQUID_PROFILE), segments);
  // Remember the undisplaced positions so the surface can be re-computed every frame.
  geo.userData.basePositions = geo.attributes.position.array.slice();
  return geo;
}

/** Partial lathe (front arc only) that hugs the bottle wall — used for the printed label. */
export function createLabelGeometry({ yMin = 0.5, yMax = 1.5, arc = (130 * Math.PI) / 180, steps = 10, style = 'clear' } = {}) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const y = yMin + ((yMax - yMin) * i) / steps;
    pts.push(new THREE.Vector2(outerRadiusAt(y, style) + 0.004, y));
  }
  return new THREE.LatheGeometry(pts, 48, -arc / 2, arc);
}

/** Thin crown sheet that rises around the mouth; its rim is deformed into fingers every frame. */
export function createCrownGeometry() {
  const pts = toVec2([
    [0.36, 0.0],
    [0.42, 0.05],
    [0.5, 0.14],
    [0.55, 0.24],
    [0.56, 0.32],
    [0.5, 0.3],
    [0.46, 0.2],
    [0.4, 0.1],
    [0.36, 0.03],
  ]);
  const geo = new THREE.LatheGeometry(pts, 72);
  geo.userData.base = geo.attributes.position.array.slice();
  geo.userData.maxY = 0.32;
  return geo;
}

/**
 * A tube that tapers along its length. Radius is 1 at creation and every ring is then
 * scaled by `radiusFn(t)` (t = 0 at the start, 1 at the end).
 */
export function createTaperedTube(points, { tubular = 72, radial = 12, radiusFn = () => 0.1 } = {}) {
  const curve = new THREE.CatmullRomCurve3(
    points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    false,
    'centripetal'
  );
  const geo = new THREE.TubeGeometry(curve, tubular, 1, radial, false);
  const pos = geo.attributes.position;
  const center = new THREE.Vector3();
  const v = new THREE.Vector3();
  const centers = new Float32Array((tubular + 1) * 3);
  const units = new Float32Array(pos.count * 3);
  for (let j = 0; j <= tubular; j++) {
    const t = j / tubular;
    curve.getPointAt(t, center);
    centers.set([center.x, center.y, center.z], j * 3);
    const r = radiusFn(t);
    for (let i = 0; i <= radial; i++) {
      const idx = j * (radial + 1) + i;
      v.fromBufferAttribute(pos, idx).sub(center); // unit-radius offset from the ring centre
      units.set([v.x, v.y, v.z], idx * 3);
      v.multiplyScalar(r).add(center);
      pos.setXYZ(idx, v.x, v.y, v.z);
    }
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  geo.userData.curve = curve;
  geo.userData.centers = centers;
  geo.userData.units = units;
  geo.userData.radiusFn = radiusFn;
  geo.userData.tubular = tubular;
  geo.userData.radial = radial;
  geo.userData.indexPerRing = radial * 6;
  return geo;
}

/** Radial-gradient disc used as a cheap contact shadow. */
export function createShadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  g.addColorStop(0, 'rgba(0,0,0,0.55)');
  g.addColorStop(0.45, 'rgba(0,0,0,0.22)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Vertical gradient used for the studio backdrop plane. */
export function createGradientTexture(top, bottom) {
  const c = document.createElement('canvas');
  c.width = 4;
  c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 4, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Studio cyclorama: a warm spotlight glow behind the product, darker vignette edges and a
 * touch of grain so the gradient never bands. Painted once per theme.
 */
export function createStudioBackdropTexture({ base, glow, edge, glowX = 0.5, glowY = 0.47, cone = false, noise = 9 }) {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, S, S);
  let g = ctx.createRadialGradient(S * glowX, S * glowY, 6, S * glowX, S * glowY, S * 0.72);
  g.addColorStop(0, glow);
  g.addColorStop(0.42, base);
  g.addColorStop(1, edge);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  if (cone) {
    // vertical spotlight cone falling from above the product
    ctx.save();
    ctx.translate(S * glowX, S * 0.1);
    ctx.scale(1, 2.6);
    const c = ctx.createRadialGradient(0, S * 0.12, 0, 0, S * 0.12, S * 0.3);
    c.addColorStop(0, glow);
    c.addColorStop(0.55, base);
    c.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = c;
    ctx.fillRect(-S, -S, 2 * S, 2 * S);
    ctx.restore();
    ctx.globalAlpha = 1;
  }
  g = ctx.createRadialGradient(S / 2, S / 2, S * 0.38, S / 2, S / 2, S * 0.8);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,0,0.42)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  const img = ctx.getImageData(0, 0, S, S);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * noise;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Soft white disc with a radial alpha falloff: used for bokeh sprites and the stage spot. */
export function createGlowTexture() {
  const S = 128;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Radial alpha mask (opaque centre → transparent rim) for the reflective floor pool. */
export function createRadialAlphaTexture(inner = 0.18, outer = 0.98) {
  const S = 256;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(S / 2, S / 2, (S / 2) * inner, S / 2, S / 2, (S / 2) * outer);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.55, '#8a8a8a');
  g.addColorStop(1, '#000000');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return new THREE.CanvasTexture(c);
}
