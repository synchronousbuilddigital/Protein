'use client';

import { useRef } from 'react';

/* Instagram-style play icon */
function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

/* Instagram logo icon */
function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
    </svg>
  );
}

const REELS = [
  {
    id: 1,
    tag: '#ProteinGoals',
    bg: 'linear-gradient(170deg, #1a0e06 0%, #3d1f0e 50%, #0d0704 100%)',
    accent: 'rgba(255,104,63,0.35)',
  },
  {
    id: 2,
    tag: '#CleanEating',
    bg: 'linear-gradient(170deg, #061a0e 0%, #0e3520 50%, #030d07 100%)',
    accent: 'rgba(40,200,90,0.28)',
  },
  {
    id: 3,
    tag: '#GutHealth',
    bg: 'linear-gradient(170deg, #06080f 0%, #0f1830 50%, #03050a 100%)',
    accent: 'rgba(80,110,240,0.28)',
  },
  {
    id: 4,
    tag: '#HighProtein',
    bg: 'linear-gradient(170deg, #100800 0%, #2e1a04 50%, #070400 100%)',
    accent: 'rgba(250,180,20,0.32)',
  },
  {
    id: 5,
    tag: '#StayFit',
    bg: 'linear-gradient(170deg, #0e0614 0%, #22083a 50%, #070310 100%)',
    accent: 'rgba(180,50,240,0.28)',
  },
  {
    id: 6,
    tag: '#FuelUp',
    bg: 'linear-gradient(170deg, #0a1208 0%, #1a2e10 50%, #040803 100%)',
    accent: 'rgba(120,200,60,0.28)',
  },
];

export default function ReelsSection() {
  const scrollRef = useRef(null);

  return (
    <section
      className="w-full py-8 select-none"
      style={{ background: '#F8F6F2' }}
    >


      {/* Full-width horizontal reel strip — all 6 fit perfectly across screen */}
      <div
        className="flex w-full"
        style={{ height: '68vh', minHeight: '300px', maxHeight: '560px', gap: '2px' }}
      >
        {REELS.map((reel) => (
          <a
            key={reel.id}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden"
            style={{
              flex: '1 1 0',
              minWidth: 0,
              background: reel.bg,
            }}
          >
            {/* Accent glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 30%, ${reel.accent} 0%, transparent 60%)`,
              }}
            />

            {/* Bottom gradient for text readability */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: '45%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
              }}
            />

            {/* Coming Soon label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/25 text-xs font-bold uppercase tracking-widest text-center px-4">
                Reel<br />Coming<br />Soon
              </span>
            </div>

            {/* Bottom-left: play icon + tag */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
              >
                <PlayIcon />
              </div>
              <span className="text-white text-[10px] font-bold opacity-80">{reel.tag}</span>
            </div>

            {/* Top-right: Instagram icon */}
            <div className="absolute top-3 right-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              >
                <InstagramIcon />
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </a>
        ))}
      </div>

      {/* Instagram CTA */}
      <div className="text-center mt-8 px-4">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all hover:scale-105"
          style={{ background: '#0E2016' }}
        >
          <InstagramIcon /> Follow Us On Instagram
        </a>
      </div>
    </section>
  );
}
