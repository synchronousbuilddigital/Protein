'use client';

import { useState } from 'react';

export default function LifestyleSection() {
  const [activeCardId, setActiveCardId] = useState(null);

  const cards = [
    {
      id: 'outdoors',
      badge: 'Outdoors',
      image: '/lifestyle-outdoors.png',
      shortInfo: 'Fast-dissolving plant protein built for mountain trails & endurance runs.',
      tag: '25g Protein • Electrolytes',
    },
    {
      id: 'at-work',
      badge: 'At Work',
      image: '/lifestyle-at-work.png',
      shortInfo: 'Beat the 3 PM sugar crash with steady, focused desk energy.',
      tag: 'No Sugar Crash • Focus',
    },
    {
      id: 'on-the-go',
      badge: 'On the Go',
      image: '/lifestyle-on-the-go.png',
      shortInfo: 'Pocket-ready single sachets for airports, commutes & busy schedules.',
      tag: 'Instant Shake • Portable',
    },
    {
      id: 'in-the-kitchen',
      badge: 'In the Kitchen',
      image: '/lifestyle-in-the-kitchen.png',
      shortInfo: 'Heat-stable formula that blends effortlessly into pancakes & oats.',
      tag: 'Bake Stable • Creamy',
    },
  ];

  return (
    <section className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-6 sm:px-10 lg:px-14 relative overflow-hidden border-t border-black/5" style={{ background: '#F8F6F2' }}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Heading & Copy (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: 'var(--font-fira-sans)', color: '#4A4642' }}
          >
            Built for real life
          </span>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.05] mb-5"
            style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800, color: '#141414' }}
          >
            Protein for every place you perform
          </h2>

          <p
            className="text-sm sm:text-base leading-relaxed mb-8 max-w-md"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, color: '#4A4642', lineHeight: '1.65' }}
          >
            At your desk, on the trail, in the kitchen — The Proteinest integrates into the life you already live. No ritual required.
          </p>

          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
            style={{ fontFamily: 'var(--font-fira-sans)', border: '2px solid #FF683F', color: '#FF683F', background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FF683F'; e.currentTarget.style.color = '#F8F6F2'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF683F'; }}
          >
            <span>Shop Protein Now</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Middle Column: 4 Vertical Lifestyle Cards (6 cols) */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 items-start">
            {cards.map((card) => {
              const isActive = activeCardId === card.id;

              return (
                <div key={card.id} className="flex flex-col w-full">
                  {/* Image Card Container */}
                  <button
                    onClick={() => setActiveCardId(isActive ? null : card.id)}
                    className={`group relative w-full aspect-[3/4.2] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-200 border transition-all duration-300 text-left focus:outline-none cursor-pointer ${isActive
                        ? 'ring-4 ring-[#FF683F] ring-offset-2 border-[#FF683F] shadow-xl scale-[1.02]'
                        : 'border-black/5 shadow-md hover:shadow-xl hover:scale-[1.01]'
                      }`}
                    aria-label={`View ${card.badge} details`}
                  >
                    <img
                      src={card.image}
                      alt={card.badge}
                      className={`w-full h-full object-cover object-center transition-transform duration-500 ${isActive ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                    />

                    {/* Gradient Overlay for visual quality */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Overlay Badge inside image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                      <span
                        className={`text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-sm transition-all duration-300 ${isActive
                            ? 'bg-[#FF683F] text-white shadow-md'
                            : 'bg-white/90 backdrop-blur-md text-[#141414] group-hover:bg-white'
                          }`}
                      >
                        {card.badge}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                            ? 'bg-white text-[#FF683F] rotate-180'
                            : 'bg-black/30 backdrop-blur-md text-white group-hover:bg-black/50'
                          }`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Exact Width Compact Info Dropdown directly below this image */}
                  {isActive && (
                    <div className="mt-2.5 w-full bg-white rounded-xl sm:rounded-2xl p-3 border border-[#FF683F]/30 shadow-md transition-all duration-300 animate-fadeIn">
                      <p className="text-[11px] sm:text-xs text-[#4A4642] leading-snug font-normal">
                        {card.shortInfo}
                      </p>
                      <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#FF683F] tracking-tight">
                          {card.tag}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Editorial Italic Note (2 cols) */}
        <div className="lg:col-span-2 flex items-center justify-start lg:justify-center pt-2 lg:pt-0 pl-2 lg:pl-4">
          <div className="transform rotate-[-3deg] lg:rotate-[6deg] select-none">
            <span
              className="text-2xl sm:text-3xl block tracking-wide opacity-85 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontWeight: 400, color: '#1A4030' }}
            >
              Same goals.<br />
              A cleaner<br />
              standard.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


