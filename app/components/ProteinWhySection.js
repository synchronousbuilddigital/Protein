'use client';

import React, { useRef } from 'react';

export default function ProteinWhySection() {
  const scrollRef = useRef(null);

  const slides = [
    {
      id: 1,
      badge: '01 / RECOVERY',
      title: 'Muscle & Cell Repair',
      metric: '24g Isolate',
      submetric: '5.5g EAAs • 30-Min Recovery',
      need: 'Daily stress & physical exertion drain key amino acids required to repair muscle tissue.',
      solution: 'Cold-filtered pure whey isolate delivering instant cellular recovery without soreness.',
    },
    {
      id: 2,
      badge: '02 / ENERGY',
      title: 'Crash-Free Stamina',
      metric: '4+ Hours',
      submetric: 'Sustained Stamina • Zero Spike',
      need: 'High-carb meals cause sharp blood sugar spikes followed by severe mid-day energy crashes.',
      solution: 'Steady-release amino matrix maintaining constant nitrogen balance and all-day stamina.',
    },
    {
      id: 3,
      badge: '03 / DIGESTION',
      title: 'Zero-Bloat Digestion',
      metric: '99.8% Absorption',
      submetric: 'DigeZyme® + Lactase Synergy',
      need: 'Conventional protein powders trigger stomach cramps, gas, heaviness, and poor nutrient uptake.',
      solution: 'Fortified with multi-enzyme complexes enabling complete, effortless gut digestion.',
    },
    {
      id: 4,
      badge: '04 / SATIETY',
      title: 'Metabolic & Weight Drive',
      metric: 'GLP-1 Satiety',
      submetric: 'High-Satiety • Thermogenesis',
      need: 'Protein-deficient diets accelerate muscle breakdown and trigger constant sugar cravings.',
      solution: 'High-satiety isolate that curbs unwanted cravings while stimulating active calorie burning.',
    },
    {
      id: 5,
      badge: '05 / PURITY',
      title: '100% Clean Bio-Purity',
      metric: '0g Sugar',
      submetric: 'NABL & FSSAI Certified',
      need: 'Mass-market supplements hide behind artificial gums, heavy metals, and hidden sugars.',
      solution: 'Third-party lab tested with zero added sugar, zero maltodextrin, and 100% clean label.',
    },
  ];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-14 sm:py-18 px-6 sm:px-12 lg:px-16 select-none border-b border-white/10" style={{ background: '#0E2016' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF683F] mb-2 block">
            The Science Of Daily Vitality
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why your body needs protein—and our solution.
          </h2>
        </div>

        {/* Carousel Container with Safely Positioned Side Navigation Arrows */}
        <div className="relative group max-w-7xl mx-auto">
          {/* Left Arrow Button (Positioned cleanly outside cards) */}
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll Left"
            className="absolute -left-4 sm:-left-7 lg:-left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#0E2016] hover:bg-[#FF683F] hover:text-white font-bold shadow-2xl flex items-center justify-center transition-all border border-white/20 active:scale-95 cursor-pointer text-base sm:text-lg"
          >
            ←
          </button>

          {/* Right Arrow Button (Positioned cleanly outside cards) */}
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll Right"
            className="absolute -right-4 sm:-right-7 lg:-right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#0E2016] hover:bg-[#FF683F] hover:text-white font-bold shadow-2xl flex items-center justify-center transition-all border border-white/20 active:scale-95 cursor-pointer text-base sm:text-lg"
          >
            →
          </button>

          {/* 5-Slide Track (Calculated so 4 cards fit cleanly across desktop view) */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {slides.map((s) => (
              <div
                key={s.id}
                className="snap-start flex-shrink-0 w-[245px] sm:w-[260px] md:w-[270px] lg:w-[calc(25%-15px)] rounded-2xl p-5 border border-white/10 shadow-xl hover:border-[#FF683F]/50 transition-all duration-300 flex flex-col justify-between"
                style={{ background: '#163526' }}
              >
                <div>
                  {/* Category Pill Tag */}
                  <div className="mb-2.5">
                    <span className="text-[9.5px] font-bold tracking-widest text-[#FF683F] bg-[#FF683F]/15 px-2.5 py-0.5 rounded-full border border-[#FF683F]/30 inline-block uppercase">
                      {s.badge}
                    </span>
                  </div>

                  {/* Clean Headline */}
                  <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight mb-3 h-11 flex items-center">
                    {s.title}
                  </h3>

                  {/* Clean Stat Metric (Uniform Height) */}
                  <div className="my-3 pb-3 border-b border-white/10 text-center">
                    <span className="text-2xl sm:text-3xl font-black text-[#FF683F] block tracking-tight leading-none mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                      {s.metric}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider text-emerald-300 uppercase block font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                      {s.submetric}
                    </span>
                  </div>

                  {/* Clean Editorial Need & Solution */}
                  <div className="space-y-3 my-4 text-left">
                    <div>
                      <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-[#FF683F] block mb-1">
                        • The Need
                      </span>
                      <p className="text-xs text-white/80 leading-relaxed font-light">
                        {s.need}
                      </p>
                    </div>

                    <div>
                      <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-emerald-400 block mb-1">
                        ✓ Our Solution
                      </span>
                      <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
                        {s.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <a
                    href="/shop"
                    className="w-full block py-2.5 px-3 rounded-full bg-[#FF683F] hover:bg-[#D94D28] text-white font-bold text-[11px] uppercase tracking-wider transition-all shadow-md text-center"
                  >
                    Explore Formulation
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
