'use client';

const PROTEIN_NEEDS = [
  {
    id: 1,
    img: '/protein_gym_woman.png',
    alt: 'Woman training at gym with protein shake',
    label: 'Training & Recovery',
    quote:
      'After every workout your muscles enter a 30-minute repair window. Without enough protein, the gains you worked for simply break down overnight.',
    stat: '30 min',
    statLabel: 'Recovery Window',
  },
  {
    id: 2,
    img: '/protein_office_man.png',
    alt: 'Professional staying focused at work',
    label: 'Office & Focus',
    quote:
      'Most working adults get under 50g of protein daily — less than half the minimum needed to maintain muscle mass, sharp focus, and all-day energy.',
    stat: '< 50g',
    statLabel: 'Average Daily Intake',
  },
  {
    id: 3,
    img: '/protein_morning_woman.png',
    alt: 'Woman making a healthy protein smoothie',
    label: 'Daily Nutrition',
    quote:
      'A typical Indian meal delivers just 10–15g protein per serving. Hitting your daily target through food alone is nearly impossible without smart supplementation.',
    stat: '1.6g',
    statLabel: 'Per kg Bodyweight Needed',
  },
  {
    id: 4,
    img: '/protein_outdoor_runner.png',
    alt: 'Man jogging outdoors for fitness',
    label: 'Active Lifestyle',
    quote:
      'Active individuals need up to 2× more protein than sedentary adults. Falling short means slower metabolism, fatigue, and constant sugar cravings.',
    stat: '2×',
    statLabel: 'Higher Protein Need',
  },
];

export default function ProteinWhySection() {
  return (
    <section
      className="w-full py-12 sm:py-16 px-4 sm:px-8 lg:px-16"
      style={{ background: '#F8F6F2' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight"
            style={{ color: '#0E2016' }}
          >
            Why your body needs protein{' '}
            <span style={{ color: '#FF683F' }}>every single day.</span>
          </h2>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PROTEIN_NEEDS.map((card) => (
            <div
              key={card.id}
              className="flex flex-col rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: '#fff',
                boxShadow: '0 2px 16px rgba(14,32,22,0.07)',
              }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden" style={{ height: '190px' }}>
                <img
                  src={card.img}
                  alt={card.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Fade bottom of image into card */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: '45%',
                    background:
                      'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.55) 70%, #ffffff 100%)',
                  }}
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 px-4 pb-5 pt-1">
                {/* Label */}
                <span
                  className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full self-start mb-3"
                  style={{
                    color: '#FF683F',
                    background: 'rgba(255,104,63,0.1)',
                    border: '1px solid rgba(255,104,63,0.2)',
                  }}
                >
                  {card.label}
                </span>

                {/* Quote mark */}
                <span
                  className="block font-black leading-none mb-1 select-none"
                  style={{ fontSize: '2.8rem', color: '#FF683F', lineHeight: '1', marginTop: '-4px' }}
                  aria-hidden="true"
                >
                  "
                </span>

                {/* Quote text */}
                <p
                  className="text-xs leading-relaxed flex-1 mb-4"
                  style={{ color: '#333', fontFamily: 'var(--font-inter)' }}
                >
                  {card.quote}
                </p>

                {/* Stat */}
                <div
                  className="flex items-baseline gap-2 pt-3"
                  style={{ borderTop: '1px solid rgba(14,32,22,0.07)' }}
                >
                  <span
                    className="text-xl font-black tracking-tight"
                    style={{ color: '#0E2016' }}
                  >
                    {card.stat}
                  </span>
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider leading-tight"
                    style={{ color: '#999' }}
                  >
                    {card.statLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <a
            href="/shop"
            className="inline-block px-7 py-3 rounded-full font-bold text-sm uppercase tracking-wider text-white transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: '#FF683F' }}
          >
            Fix Your Protein Gap →
          </a>
        </div>

      </div>
    </section>
  );
}
