'use client';

const reviews = [
  {
    quote: `"I often had bloating issues from whey, and most plant protein tasted chalky. Choco Buddy is the tastiest I've had, with zero bloating."`,
    name: "Neha Pawar",
    role: "Engineering student",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    initials: "NP",
    rating: 5,
    bgColor: "#FF683F",
  },
  {
    quote: `"I need something quick, clean, and reliable. Kulfi Mate keeps me full and helps me stay energised through long workdays."`,
    name: "Kavita",
    role: "Cyclist",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    initials: "K",
    rating: 5,
    bgColor: "#22C55E",
  },
  {
    quote: `"I was diagnosed with diabetes and advised to increase protein. The Proteinest is very tasty and my sugar levels are in check now."`,
    name: "Shephali",
    role: "Home maker",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    initials: "S",
    rating: 5,
    bgColor: "#3B82F6",
  },
  {
    quote: `"Light on the stomach, no weird aftertaste, and the Steel Shaker makes mixing super smooth into my daily routine."`,
    name: "Anshita",
    role: "Image coach",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    initials: "A",
    rating: 5,
    bgColor: "#A855F7",
  },
  {
    quote: `"Finally a plant protein that actually tastes good and doesn't make me feel heavy. Love the Kulfi Mate flavour!"`,
    name: "Riya Shah",
    role: "Yoga instructor",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    initials: "RS",
    rating: 5,
    bgColor: "#F59E0B",
  },
  {
    quote: `"I've tried so many proteins but The Proteinest is the only one I've stuck with for 6 months. Clean, effective, delicious."`,
    name: "Manav",
    role: "Software engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    initials: "M",
    rating: 5,
    bgColor: "#10B981",
  },
];

// Duplicate for seamless infinite loop
const doubled = [...reviews, ...reviews];

export default function TestimonialsSection() {
  return (
    <div className="testi-section">
      <div className="wrap">
        <div className="section-head">
          <h2 style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800, color: '#F8F6F2' }}>What serious people are saying</h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 300, color: 'rgba(248,246,242,0.6)' }}>Plant-powered results from people who never settle. Real experiences, every scoop.</p>
        </div>
      </div>

      {/* Full-width infinite scroll track */}
      <div className="testi-marquee-outer">
        <div className="testi-marquee-track">
          {doubled.map((rev, idx) => (
            <div key={idx} className="testi-card flex flex-col justify-between">
              <div>
                {/* 5-Star Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#F59E0B] text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <svg className="w-2.5 h-2.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                </div>

                <p className="testi-quote">{rev.quote}</p>
              </div>

              <div className="testi-who mt-4">
                {/* Profile Image with Initials Fallback */}
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/20 shrink-0 bg-stone-800">
                  <img
                    src={rev.image}
                    alt={rev.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      // Fallback to initials circle if image fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center font-bold text-white text-xs -z-10"
                    style={{ backgroundColor: rev.bgColor }}
                  >
                    {rev.initials}
                  </div>
                </div>

                <div>
                  <div className="name text-white font-semibold text-sm">{rev.name}</div>
                  <div className="role text-stone-400 text-xs">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

