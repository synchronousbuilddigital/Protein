'use client';

export default function Marquee() {
  const logos = [
    {
      name: 'FSSAI Certified',
      src: '/ChatGPT Image Sep 19, 2026, 11_54_09 AM.png',
      alt: 'FSSAI Certified Logo',
    },
    {
      name: 'NABL Accredited',
      src: '/ChatGPT Image Sep 19, 2026, 11_54_24 AM.png',
      alt: 'NABL ISO/IEC 17025 Accredited Logo',
    },
    {
      name: 'ISO Certified',
      src: '/ChatGPT Image Sep 19, 2026, 11_54_37 AM.png',
      alt: 'ISO Certified Logo',
    },
    {
      name: 'HACCP Standard',
      src: '/ChatGPT Image Sep 19, 2026, 11_54_49 AM.png',
      alt: 'HACCP Critical Control Point Logo',
    },
    {
      name: 'GMP Practice',
      src: '/ChatGPT Image Sep 19, 2026, 11_55_04 AM.png',
      alt: 'GMP Good Manufacturing Practice Logo',
    },
  ];

  return (
    <section
      className="w-full select-none border-b border-[#141414]/10 overflow-hidden"
      style={{ background: '#F8F6F2', padding: '10px 16px' }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-around sm:justify-between gap-3 sm:gap-6">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center justify-center p-0 m-0 transition-all duration-300 hover:scale-105"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
