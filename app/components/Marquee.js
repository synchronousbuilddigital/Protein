'use client';

/** Trust strip — official certification marks (same assets as theproteinest.com). */
// h = rendered height in px (each mark has different padding/aspect, so they are balanced by eye)
const BADGES = [
  { name: 'FSSAI', src: '/badges/fssai.png', alt: 'FSSAI licensed', h: [26, 32, 36] },
  { name: 'NABL', src: '/badges/nabl.png', alt: 'NABL ISO/IEC 17025 accredited lab tested', h: [52, 62, 72] },
  { name: 'ISO', src: '/badges/iso.png', alt: 'ISO certified', h: [30, 36, 42] },
  { name: 'HACCP', src: '/badges/haccp.png', alt: 'HACCP hazard analysis critical control point', h: [50, 58, 66] },
  { name: 'GMP', src: '/badges/gmp.png', alt: 'GMP good manufacturing practice', h: [50, 58, 66] },
];

export default function Marquee() {
  return (
    <section className="w-full select-none border-b border-[#141414]/10 overflow-hidden" style={{ background: '#F8F6F2', padding: '18px 16px 16px' }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] mb-3" style={{ color: 'rgba(20,20,20,0.4)' }} data-reveal="fade">
          Certified · Lab tested · Made in India
        </p>
        <div className="flex items-center justify-around sm:justify-between gap-3 sm:gap-6" data-reveal-stagger="0.07">
          {BADGES.map((b) => (
            <div key={b.name} className="group flex items-center justify-center transition-transform duration-300 hover:scale-105" title={b.alt}>
              <img
                src={b.src}
                alt={b.alt}
                className="w-auto object-contain transition-all duration-300 group-hover:opacity-100"
                style={{ height: `clamp(${b.h[0]}px, ${(b.h[1] / 1024) * 100}vw, ${b.h[2]}px)`, filter: 'grayscale(1) contrast(1.05)', opacity: 0.72 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
