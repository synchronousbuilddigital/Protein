'use client';

export default function LifestyleSection() {
  const cards = [
    {
      id: 'outdoors',
      badge: 'Outdoors',
      caption: 'Hike. Run. Explore.',
      image: '/lifestyle-outdoors.png',
    },
    {
      id: 'at-work',
      badge: 'At Work',
      caption: 'Focus. Fuel. Get it done.',
      image: '/lifestyle-at-work.png',
    },
    {
      id: 'on-the-go',
      badge: 'On the Go',
      caption: 'Nutrition, wherever life takes you.',
      image: '/lifestyle-on-the-go.png',
    },
    {
      id: 'in-the-kitchen',
      badge: 'In the Kitchen',
      caption: 'Easy. Healthy. Everyday.',
      image: '/lifestyle-in-the-kitchen.png',
    },
  ];

  return (
    <section className="bg-[#FBF7F1] py-16 sm:py-24 px-6 sm:px-10 lg:px-14 relative overflow-hidden border-t border-black/5">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Column: Heading & Copy (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#4A4642] mb-3">
            BUILT FOR REAL LIFE
          </span>
          
          <h2 className="font-['Anton'] text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#111111] leading-[1.05] mb-5">
            Protein for all the places you go.
          </h2>

          <p className="text-sm sm:text-base text-[#4A4642] font-normal leading-relaxed mb-8 max-w-md">
            Whether you&apos;re working, studying, travelling or just trying to eat a little better, The Proteinest fits into your everyday routine.
          </p>

          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#EF5A32] text-[#EF5A32] bg-white hover:bg-[#EF5A32] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
          >
            <span>See How People Use It</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Middle Column: 4 Vertical Lifestyle Cards (6 cols) */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {cards.map((card) => (
              <div key={card.id} className="flex flex-col group">
                <div className="relative aspect-[3/4.2] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-200 shadow-md border border-black/5 group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={card.image}
                    alt={card.badge}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="bg-white/90 backdrop-blur-md text-[#111111] text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {card.badge}
                    </span>
                  </div>
                </div>

                {/* Caption below */}
                <p className="text-xs text-[#4A4642] font-medium mt-3 px-0.5 leading-snug">
                  {card.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Cursive Script Note (2 cols) */}
        <div className="lg:col-span-2 flex items-center justify-start lg:justify-center pt-2 lg:pt-0 pl-2 lg:pl-4">
          <div className="transform rotate-[-3deg] lg:rotate-[6deg] select-none">
            <span className="font-serif italic text-2xl sm:text-3xl text-[#5C4033] block tracking-wide opacity-90 leading-tight">
              Same goals.<br />
              A kinder<br />
              routine.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
