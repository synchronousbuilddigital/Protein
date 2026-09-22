'use client';

import { useState } from 'react';

export default function Hero() {
  const slides = [
    {
      id: 1,
      type: 'image',
      src: '/New banner.png',
      alt: 'The Proteinest — Fueling The Finest You',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Slide track */}
      <div className="w-full flex">
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <a href="/shop" className="block w-full">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-auto block select-none"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
