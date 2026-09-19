'use client';

export default function Marquee() {
  const logos = [
    { src: '/ChatGPT Image Sep 19, 2026, 11_54_09 AM.png', alt: 'FSSAI Certified' },
    { src: '/ChatGPT Image Sep 19, 2026, 11_54_24 AM.png', alt: 'NABL Accredited' },
    { src: '/ChatGPT Image Sep 19, 2026, 11_54_37 AM.png', alt: 'ISO Certified' },
    { src: '/ChatGPT Image Sep 19, 2026, 11_54_49 AM.png', alt: 'HACCP Certified' },
    { src: '/ChatGPT Image Sep 19, 2026, 11_55_04 AM.png', alt: 'GMP Certified' },
  ];

  // Repeat sequence 4 times per track set for smooth continuous animation across all screens
  const trackSet = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full bg-white overflow-hidden flex items-center select-none py-3 border-y border-neutral-100">
      <div className="marquee-track flex w-max items-center">
        {/* Track Set 1 */}
        <div className="flex shrink-0 items-center gap-12 sm:gap-20 pr-12 sm:pr-20">
          {trackSet.map((logo, index) => (
            <img
              key={`set1-${index}`}
              src={logo.src}
              alt={logo.alt}
              className="h-9 sm:h-12 md:h-14 w-auto object-contain shrink-0"
            />
          ))}
        </div>
        {/* Track Set 2 (identical for 100% seamless infinite loop) */}
        <div className="flex shrink-0 items-center gap-12 sm:gap-20 pr-12 sm:pr-20">
          {trackSet.map((logo, index) => (
            <img
              key={`set2-${index}`}
              src={logo.src}
              alt={logo.alt}
              className="h-9 sm:h-12 md:h-14 w-auto object-contain shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
