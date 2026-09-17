'use client';

import { useState, useEffect } from 'react';

export default function Hero() {
  const slides = [
    { id: 1, src: '/banner1.png', alt: 'Small Steps. Stronger You. — The Proteinest Plant Based Protein' },
    { id: 2, src: '/banner2.png', alt: 'Fuel Your Fitness — The Proteinest Choco Buddy Plant Based Protein' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div
      className="w-full relative overflow-hidden bg-black"
      style={{ aspectRatio: '1920 / 640', maxHeight: '700px', minHeight: '300px' }}
    >
      {/* Slide track */}
      <div
        className="hero-track flex w-full h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative overflow-hidden">
            <a href="/shop" className="block w-full h-full">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full block select-none"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
            </a>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2.5 z-10 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 border border-white/50 ${
              currentSlide === index
                ? 'bg-[#EF5A32] w-6 sm:w-7 border-[#EF5A32]'
                : 'bg-white/40 hover:bg-white/80 w-2 sm:w-2.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
