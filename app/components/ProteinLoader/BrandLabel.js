/**
 * Draws the brand label (logo mark + wordmark + tagline + measurement ticks) onto a canvas
 * and returns it as a THREE.CanvasTexture that is wrapped onto the front of the bottle.
 *
 * The logo mark is drawn procedurally (leaping figure inside a circle, as on The Proteinest
 * packaging). Pass `logoSrc` to draw a real image in its place.
 */
import * as THREE from 'three';

const SIZE = 1024;

export function resolveBrandFont() {
  if (typeof window === 'undefined') return '"Fira Sans", "Inter", Arial, sans-serif';
  const v = getComputedStyle(document.documentElement).getPropertyValue('--font-fira-sans').trim();
  return v ? `${v}, "Fira Sans", Arial, sans-serif` : '"Fira Sans", "Inter", Arial, sans-serif';
}

function drawSpacedText(ctx, text, x, y, spacing) {
  // Manual letter spacing (canvas `letterSpacing` is not available everywhere).
  let width = 0;
  for (const ch of text) width += ctx.measureText(ch).width + spacing;
  width -= spacing;
  let cx = x - width / 2;
  const align = ctx.textAlign;
  ctx.textAlign = 'left';
  for (const ch of text) {
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + spacing;
  }
  ctx.textAlign = align;
}

function drawFigure(ctx, cx, cy, R, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // head
  ctx.beginPath();
  ctx.arc(cx + 0.21 * R, cy - 0.43 * R, 0.13 * R, 0, Math.PI * 2);
  ctx.fill();

  // torso → leading leg (tapered swoosh)
  ctx.beginPath();
  ctx.moveTo(cx + 0.1 * R, cy - 0.22 * R);
  ctx.bezierCurveTo(cx + 0.02 * R, cy + 0.05 * R, cx - 0.12 * R, cy + 0.26 * R, cx - 0.44 * R, cy + 0.58 * R);
  ctx.lineTo(cx - 0.32 * R, cy + 0.64 * R);
  ctx.bezierCurveTo(cx - 0.04 * R, cy + 0.32 * R, cx + 0.16 * R, cy + 0.1 * R, cx + 0.3 * R, cy - 0.16 * R);
  ctx.closePath();
  ctx.fill();

  // raised left arm
  ctx.lineWidth = 0.13 * R;
  ctx.beginPath();
  ctx.moveTo(cx + 0.14 * R, cy - 0.17 * R);
  ctx.quadraticCurveTo(cx - 0.12 * R, cy - 0.3 * R, cx - 0.47 * R, cy - 0.42 * R);
  ctx.stroke();

  // right arm
  ctx.lineWidth = 0.12 * R;
  ctx.beginPath();
  ctx.moveTo(cx + 0.2 * R, cy - 0.15 * R);
  ctx.quadraticCurveTo(cx + 0.38 * R, cy - 0.2 * R, cx + 0.5 * R, cy - 0.33 * R);
  ctx.stroke();

  // trailing leg
  ctx.lineWidth = 0.11 * R;
  ctx.beginPath();
  ctx.moveTo(cx - 0.02 * R, cy + 0.22 * R);
  ctx.quadraticCurveTo(cx + 0.14 * R, cy + 0.36 * R, cx + 0.32 * R, cy + 0.52 * R);
  ctx.stroke();
  ctx.restore();
}

/** Vertical wordmark running up the side of the tumbler (as on the brand photo). */
function paintVertical(ctx, { brandName, tagline, accent, font }, W, H) {
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.rotate(-Math.PI / 2); // text now reads bottom → top
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'center';
  ctx.fillStyle = accent;
  // wordmark: as tall (long) as fits in ~86% of the label height
  let px = 190;
  ctx.font = `800 ${px}px ${font}`;
  while (ctx.measureText(brandName).width > H * 0.86 && px > 60) {
    px -= 4;
    ctx.font = `800 ${px}px ${font}`;
  }
  const wordW = ctx.measureText(brandName).width;
  ctx.fillText(brandName, 0, 40);
  // tagline sits to the right of the wordmark (further down the canvas → +y after rotation)
  ctx.font = `500 44px ${font}`;
  drawSpacedText(ctx, tagline, -(wordW / 2) + (ctx.measureText(tagline).width + tagline.length * 10) / 2, 118, 10);
  ctx.restore();
}

function paint(ctx, { brandName, tagline, subline, accent, ink, font, logoImage }) {
  ctx.clearRect(0, 0, SIZE, SIZE);

  // ── logo mark ──
  const cx = SIZE / 2;
  const cy = 300;
  const R = 150;
  if (logoImage) {
    const box = R * 2.2;
    const ratio = Math.min(box / logoImage.width, box / logoImage.height);
    const w = logoImage.width * ratio;
    const h = logoImage.height * ratio;
    ctx.drawImage(logoImage, cx - w / 2, cy - h / 2, w, h);
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();
    drawFigure(ctx, cx, cy, R, '#FFFFFF');
  }

  // ── wordmark ──
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = ink;
  let px = 96;
  ctx.font = `800 ${px}px ${font}`;
  while (ctx.measureText(brandName).width + brandName.length * 2 > 920 && px > 40) {
    px -= 4;
    ctx.font = `800 ${px}px ${font}`;
  }
  drawSpacedText(ctx, brandName, cx, 590, 2);

  // ── tagline ──
  ctx.fillStyle = accent;
  ctx.font = `600 34px ${font}`;
  drawSpacedText(ctx, tagline, cx, 652, 9);

  // ── hairline + subline ──
  ctx.strokeStyle = ink;
  ctx.globalAlpha = 0.28;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 150, 690);
  ctx.lineTo(cx + 150, 690);
  ctx.stroke();
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = ink;
  ctx.font = `500 24px ${font}`;
  drawSpacedText(ctx, subline, cx, 732, 6);
  ctx.globalAlpha = 1;

  // ── measurement ticks (left edge) ──
  ctx.strokeStyle = ink;
  ctx.fillStyle = ink;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.textAlign = 'left';
  ctx.font = `600 20px ${font}`;
  const ticks = [
    { y: 790, label: '400', w: 44 },
    { y: 830, w: 26 },
    { y: 870, label: '300', w: 44 },
    { y: 910, w: 26 },
    { y: 950, label: '200', w: 44 },
  ];
  for (const t of ticks) {
    ctx.beginPath();
    ctx.moveTo(74, t.y);
    ctx.lineTo(74 + t.w, t.y);
    ctx.stroke();
    if (t.label) ctx.fillText(t.label, 74 + t.w + 10, t.y + 7);
  }
  ctx.globalAlpha = 1;
}

/**
 * @returns {{ texture: THREE.CanvasTexture, dispose: () => void }}
 */
export function createBrandLabelTexture({
  brandName = 'THE PROTEINEST',
  tagline = 'FUELING THE FINEST YOU',
  subline = 'PLANT BASED PROTEIN',
  accent = '#FF683F',
  ink = '#141414',
  logoSrc = null,
  variant = 'logo', // 'logo' (mark + wordmark) | 'vertical' (wordmark running up the side)
} = {}) {
  const canvas = document.createElement('canvas');
  const W = variant === 'vertical' ? 640 : SIZE;
  const H = SIZE;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const font = resolveBrandFont();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const opts = { brandName, tagline, subline, accent, ink, font, logoImage: null };
  const repaint = () => {
    if (variant === 'vertical') paintVertical(ctx, opts, W, H);
    else paint(ctx, opts);
    texture.needsUpdate = true;
  };
  repaint();

  // Re-paint once the brand webfont is actually available.
  if (typeof document !== 'undefined' && document.fonts?.load) {
    Promise.all([document.fonts.load(`800 96px ${font}`), document.fonts.load(`600 34px ${font}`), document.fonts.load(`500 44px ${font}`)])
      .then(repaint)
      .catch(() => {});
  }

  // Optional real logo image.
  if (logoSrc && typeof Image !== 'undefined') {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      opts.logoImage = img;
      repaint();
    };
    img.src = logoSrc;
  }

  return {
    texture,
    dispose: () => {
      texture.dispose();
    },
  };
}

