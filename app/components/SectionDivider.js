'use client';

export default function SectionDivider() {
  return (
    <div
      className="w-full relative py-6 sm:py-8 flex items-center justify-center overflow-hidden select-none"
      style={{ background: '#F8F6F2' }}
      aria-hidden="true"
    >
      {/* Ambient soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[80px] bg-gradient-to-r from-[#FF683F]/8 via-[#d63384]/12 to-[#FF683F]/8 blur-2xl rounded-full pointer-events-none" />

      <div className="w-full max-w-[1440px] px-6 sm:px-10 lg:px-14 relative flex items-center justify-center">
        {/* Left Tapered Gradient Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#141414]/10 to-[#141414]/25" />

        {/* Decorative Diamond Accent */}
        <span className="text-[9px] text-[#141414]/30 px-2 select-none">◆</span>

        {/* Center Luxury Pill Badge */}
        <div
          className="mx-2 sm:mx-4 px-4 sm:px-6 py-2 rounded-full flex items-center gap-2 sm:gap-2.5 transition-all duration-300 hover:scale-105"
          style={{
            background: '#FAF8F5',
            border: '1px solid rgba(20, 20, 20, 0.08)',
            boxShadow: '0 2px 14px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Heart Icon matching Testimonials */}
          <span className="flex items-center justify-center text-[#d63384]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#d63384">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </span>

          <span
            className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#1A4030]"
            style={{ fontFamily: 'var(--font-fira-sans)' }}
          >
            Real Community &bull; Real Stories
          </span>

          {/* Heart Icon matching Testimonials */}
          <span className="flex items-center justify-center text-[#d63384]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#d63384">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </span>
        </div>

        {/* Decorative Diamond Accent */}
        <span className="text-[9px] text-[#141414]/30 px-2 select-none">◆</span>

        {/* Right Tapered Gradient Line */}
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#141414]/10 to-[#141414]/25" />
      </div>
    </div>
  );
}
