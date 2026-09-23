'use client';

export default function Hero() {
  const slides = [
    {
      id: 1,
      type: 'image',
      src: '/newbanner.png',
      alt: 'The Proteinest — Fueling The Finest You',
    },
  ];

  return (
    <section
      className="hero-no-pad w-full relative overflow-hidden select-none"
      style={{
        padding: 0,
        margin: 0,
        borderBottomLeftRadius: 'clamp(24px, 3.5vw, 48px)',
        borderBottomRightRadius: 'clamp(24px, 3.5vw, 48px)',
        isolation: 'isolate',
        transform: 'translateZ(0)',
      }}
    >
      <div
        className="w-full flex leading-none overflow-hidden"
        style={{
          padding: 0,
          margin: 0,
          borderBottomLeftRadius: 'clamp(24px, 3.5vw, 48px)',
          borderBottomRightRadius: 'clamp(24px, 3.5vw, 48px)',
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative leading-none overflow-hidden"
            style={{
              padding: 0,
              margin: 0,
              borderBottomLeftRadius: 'clamp(24px, 3.5vw, 48px)',
              borderBottomRightRadius: 'clamp(24px, 3.5vw, 48px)',
            }}
          >
            <a href="/shop" className="block w-full leading-none" style={{ padding: 0, margin: 0 }}>
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-auto block select-none object-cover"
                style={{
                  padding: 0,
                  margin: 0,
                  borderBottomLeftRadius: 'clamp(24px, 3.5vw, 48px)',
                  borderBottomRightRadius: 'clamp(24px, 3.5vw, 48px)',
                }}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
