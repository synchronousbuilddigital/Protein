'use client';

const reviews = [
  {
    quote: `"I often had bloating issues from whey, and most plant protein tasted chalky. Choco Buddy is the tastiest I've had, with zero bloating."`,
    name: "Neha Pawar",
    role: "Engineering student",
    initials: "NP",
    bgColor: "#EF5A32",
  },
  {
    quote: `"I need something quick, clean, and reliable. Kulfi Mate keeps me full and helps me stay energised through long workdays."`,
    name: "Kavita",
    role: "Cyclist",
    initials: "K",
    bgColor: "#22C55E",
  },
  {
    quote: `"I was diagnosed with diabetes and advised to increase protein. The Proteinest is very tasty and my sugar levels are in check now."`,
    name: "Shephali",
    role: "Home maker",
    initials: "S",
    bgColor: "#3B82F6",
  },
  {
    quote: `"Light on the stomach, no weird aftertaste, and the Steel Shaker makes mixing super smooth into my daily routine."`,
    name: "Anshita",
    role: "Image coach",
    initials: "A",
    bgColor: "#A855F7",
  },
  {
    quote: `"Finally a plant protein that actually tastes good and doesn't make me feel heavy. Love the Kulfi Mate flavour!"`,
    name: "Riya Shah",
    role: "Yoga instructor",
    initials: "RS",
    bgColor: "#F59E0B",
  },
  {
    quote: `"I've tried so many proteins but The Proteinest is the only one I've stuck with for 6 months. Clean, effective, delicious."`,
    name: "Manav",
    role: "Software engineer",
    initials: "M",
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
          <h2>What the tribe is saying</h2>
          <p>Real routines, real results — from students to cyclists to home makers.</p>
        </div>
      </div>

      {/* Full-width infinite scroll track */}
      <div className="testi-marquee-outer">
        <div className="testi-marquee-track">
          {doubled.map((rev, idx) => (
            <div key={idx} className="testi-card">
              <p className="testi-quote">{rev.quote}</p>
              <div className="testi-who">
                <div
                  className="testi-avatar flex items-center justify-center font-bold text-white text-sm rounded-full"
                  style={{ backgroundColor: rev.bgColor, width: "44px", height: "44px", flexShrink: 0 }}
                >
                  {rev.initials}
                </div>
                <div>
                  <div className="name">{rev.name}</div>
                  <div className="role">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
