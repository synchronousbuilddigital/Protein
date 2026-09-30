'use client';

import { useId } from 'react';

/*
 * Product "splash shot" for the auth panel. The liquid is real: a crown splash + pool cut out of
 * the Steel Shaker photo (public/products/splash-{choco,kulfi}-{back,front}.webp — the kulfi pair
 * is the same liquid recoloured). The pouch stands where the shaker was: the back layer sits behind
 * it, the front layer (only the liquid below the crown's front rim) sits over its base.
 * Animation on top: the pouch dips/rises, the splash "breathes" with it, droplets leap from the
 * crown tips, ripples + a shimmer cross the pool, and flavour pieces drift at three depths.
 * Scene units match the photo (1000 wide); prefers-reduced-motion freezes it (globals.css).
 */

const FLAVOURS = {
  choco: { top: '#b0714a', mid: '#6e3f24', deep: '#2a140a', sheen: 'rgba(255, 232, 214, 0.55)', pieces: ['bean', 'chunk'] },
  kulfi: { top: '#fff4d6', mid: '#dcc28a', deep: '#8a6b3a', sheen: 'rgba(255, 255, 255, 0.75)', pieces: ['almond', 'pista', 'saffron'] },
};

const SPLASH = { y: 330, w: 1000, h: 670 }; // where the photo layers sit in scene units
const PACK = { cx: 540, bottom: 772, w: 460 };
const RATIO = 1302 / 889; // pouch render aspect

// droplets from the photo's crown tips: [x, y, rise, radius, delay]
const DROPS = [
  [150, 448, 70, 9, 0],
  [282, 432, 84, 8, -0.7],
  [206, 486, 60, 7, -1.4],
  [918, 436, 78, 9, -0.35],
  [762, 452, 66, 7, -1.1],
  [846, 548, 58, 7, -1.9],
  [596, 666, 44, 6, -2.4],
  [640, 628, 50, 6, -0.9],
];

// flavour pieces: [x, y, size, rotation, depth(0 back, 1 mid, 2 front), duration, delay]
const PIECES = [
  [120, 200, 44, -20, 0, 9, 0],
  [880, 170, 40, 35, 0, 8, -2],
  [940, 330, 52, 70, 1, 7, -1],
  [70, 330, 56, -50, 1, 8.5, -3],
  [230, 110, 32, 15, 0, 10, -4],
  [800, 80, 30, 80, 0, 9.5, -5],
  [60, 640, 86, 25, 2, 6.5, -1.5],
  [950, 700, 92, -35, 2, 7, -3.5],
  [320, 60, 26, -60, 0, 11, -6],
  [700, 40, 34, 45, 0, 10.5, -1],
  [170, 300, 30, 120, 0, 9, -7],
];

function Piece({ kind, s, fill, id }) {
  switch (kind) {
    case 'bean':
      return (
        <g>
          <ellipse rx={s * 0.5} ry={s * 0.34} fill={`url(#${id}-bean)`} />
          <path d={`M${-s * 0.36} ${-s * 0.04} C${-s * 0.12} ${s * 0.1} ${s * 0.12} ${-s * 0.12} ${s * 0.36} ${s * 0.03}`} stroke="#1c0c05" strokeWidth={s * 0.06} fill="none" strokeLinecap="round" />
          <ellipse cx={-s * 0.14} cy={-s * 0.14} rx={s * 0.14} ry={s * 0.05} fill="rgba(255,230,210,0.35)" />
        </g>
      );
    case 'chunk':
      return (
        <g>
          <rect x={-s * 0.5} y={-s * 0.4} width={s} height={s * 0.8} rx={s * 0.1} fill={`url(#${id}-chunk)`} />
          <rect x={-s * 0.36} y={-s * 0.28} width={s * 0.72} height={s * 0.56} rx={s * 0.07} fill="none" stroke="rgba(255,220,190,0.25)" strokeWidth={s * 0.04} />
          <path d={`M${-s * 0.5} ${-s * 0.3} L${-s * 0.3} ${-s * 0.4}`} stroke="rgba(255,230,210,0.45)" strokeWidth={s * 0.05} strokeLinecap="round" />
        </g>
      );
    case 'almond':
      return (
        <g>
          <path d={`M0 ${-s * 0.5} C${s * 0.36} ${-s * 0.3} ${s * 0.3} ${s * 0.3} 0 ${s * 0.5} C${-s * 0.3} ${s * 0.3} ${-s * 0.36} ${-s * 0.3} 0 ${-s * 0.5} Z`} fill={`url(#${id}-almond)`} />
          <path d={`M0 ${-s * 0.4} C${s * 0.08} ${-s * 0.1} ${s * 0.06} ${s * 0.2} 0 ${s * 0.4}`} stroke="rgba(90,50,20,0.45)" strokeWidth={s * 0.04} fill="none" />
        </g>
      );
    case 'pista':
      return (
        <g>
          <ellipse rx={s * 0.42} ry={s * 0.26} fill="#8fb551" />
          <ellipse rx={s * 0.3} ry={s * 0.16} fill="#b9d77a" />
          <ellipse cx={s * 0.12} rx={s * 0.12} ry={s * 0.08} fill="#7c4a6a" opacity="0.55" />
        </g>
      );
    default: // saffron strand
      return <path d={`M${-s * 0.5} 0 C${-s * 0.2} ${-s * 0.2} ${s * 0.2} ${s * 0.2} ${s * 0.5} 0`} stroke={fill} strokeWidth={s * 0.08} fill="none" strokeLinecap="round" />;
  }
}

export default function SplashStage({ image, flavor = 'choco' }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const f = FLAVOURS[flavor] ?? FLAVOURS.choco;
  const layer = (part) => `/products/splash-${flavor === 'kulfi' ? 'kulfi' : 'choco'}-${part}.webp`;
  const packH = PACK.w * RATIO;
  const pack = { x: PACK.cx - PACK.w / 2, y: PACK.bottom - packH, w: PACK.w, h: packH };
  const pieces = PIECES.map(([x, y, s, r, depth, dur, delay], i) => ({ x, y, s, r, depth, dur, delay, kind: f.pieces[i % f.pieces.length] }));
  const renderPieces = (list, key) =>
    list.map((p, i) => (
      <g key={`${key}${i}`} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`} filter={p.depth === 2 ? `url(#${id}-dof)` : undefined}>
        <g className="splash-piece" style={{ '--dur': `${p.dur}s`, '--delay': `${p.delay}s` }}>
          <Piece kind={p.kind} s={p.s} fill="#d9531e" id={id} />
        </g>
      </g>
    ));
  const photo = (part) => (
    <g mask={`url(#${id}-edgeX)`}>
      <g mask={`url(#${id}-edgeY)`}>
        <g className="splash-breathe">
          <image href={layer(part)} x="0" y={SPLASH.y} width={SPLASH.w} height={SPLASH.h} preserveAspectRatio="none" />
        </g>
      </g>
    </g>
  );

  return (
    <svg className="splash" viewBox="0 40 1000 960" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-drop`} cx="0.35" cy="0.3" r="0.7">
          <stop offset="0" stopColor={f.top} />
          <stop offset="0.6" stopColor={f.mid} />
          <stop offset="1" stopColor={f.deep} />
        </radialGradient>
        <radialGradient id={`${id}-bean`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#8a5332" />
          <stop offset="0.6" stopColor="#4d2a17" />
          <stop offset="1" stopColor="#24110a" />
        </radialGradient>
        <linearGradient id={`${id}-chunk`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6e3e24" />
          <stop offset="0.5" stopColor="#3f2011" />
          <stop offset="1" stopColor="#1f0e07" />
        </linearGradient>
        <linearGradient id={`${id}-almond`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e2a86e" />
          <stop offset="0.6" stopColor="#b77a45" />
          <stop offset="1" stopColor="#7c4b25" />
        </linearGradient>
        {/* fade the pool's left/right and bottom edges into the studio */}
        <linearGradient id={`${id}-fx`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.04" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.26" stopColor="#fff" />
          <stop offset="0.74" stopColor="#fff" />
          <stop offset="0.96" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-fy`} gradientUnits="userSpaceOnUse" x1="0" y1={SPLASH.y} x2="0" y2={SPLASH.y + SPLASH.h}>
          <stop offset="0.64" stopColor="#fff" />
          <stop offset="0.97" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* side fade applies to the pool only — the crown and its droplets above stay whole */}
        <mask id={`${id}-edgeX`} maskContentUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1000" height="646" fill="#fff" />
          <rect x="0" y="646" width="1000" height="354" fill={`url(#${id}-fx)`} />
        </mask>
        <mask id={`${id}-edgeY`} maskContentUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1000" height="1000" fill={`url(#${id}-fy)`} />
        </mask>
        {/* pouch silhouette, for the warm liquid bounce light on its base */}
        <mask id={`${id}-packmask`} maskContentUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
          <image href={image} x={pack.x} y={pack.y} width={pack.w} height={pack.h} preserveAspectRatio="xMidYMid meet" />
        </mask>
        <linearGradient id={`${id}-bounce`} gradientUnits="userSpaceOnUse" x1="0" y1={pack.y + pack.h * 0.6} x2="0" y2={PACK.bottom}>
          <stop offset="0" stopColor={f.mid} stopOpacity="0" />
          <stop offset="1" stopColor={f.mid} stopOpacity="0.55" />
        </linearGradient>
        <clipPath id={`${id}-poolclip`}>
          <rect x="80" y="650" width="840" height="330" />
        </clipPath>
        <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id={`${id}-dof`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <g filter={`url(#${id}-soft)`} opacity="0.75">
        {renderPieces(pieces.filter((p) => p.depth === 0), 'b')}
      </g>

      {/* real splash — back layer */}
      {photo('back')}

      {/* moving light on the pool */}
      <g clipPath={`url(#${id}-poolclip)`} mask={`url(#${id}-edgeX)`}>
        <ellipse className="splash-sheen" cx="500" cy="700" rx="300" ry="14" fill={f.sheen} opacity="0.45" filter={`url(#${id}-soft)`} />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} className="splash-ring" style={{ '--delay': `${-i * 2}s` }} cx={PACK.cx} cy="790" rx="260" ry="50" fill="none" stroke={f.sheen} strokeWidth="2.5" />
        ))}
      </g>

      {/* pouch + warm bounce light from the liquid */}
      <g className="splash-pack">
        <image href={image} x={pack.x} y={pack.y} width={pack.w} height={pack.h} preserveAspectRatio="xMidYMid meet" />
        <rect x={pack.x} y={pack.y} width={pack.w} height={pack.h} fill={`url(#${id}-bounce)`} mask={`url(#${id}-packmask)`} />
      </g>

      {/* real splash — front lip over the pouch base */}
      {photo('front')}

      {DROPS.map(([x, y, rise, r, delay], i) => (
        <g key={`d${i}`} transform={`translate(${x} ${y})`}>
          <g className="splash-drop" style={{ '--rise': `${-rise}px`, '--delay': `${delay}s` }}>
            <ellipse rx={r * 0.85} ry={r} fill={`url(#${id}-drop)`} />
            <ellipse cx={-r * 0.3} cy={-r * 0.35} rx={r * 0.26} ry={r * 0.18} fill="rgba(255,255,255,0.7)" />
          </g>
        </g>
      ))}

      {renderPieces(pieces.filter((p) => p.depth > 0), 'f')}
    </svg>
  );
}
