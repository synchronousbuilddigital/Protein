'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = typeof window !== 'undefined' && sessionStorage.getItem('proteinest_loaded');
    const targetDuration = hasLoadedBefore ? 1100 : 2000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.round((elapsed / targetDuration) * 100));
      setProgress(rawPct);

      if (elapsed >= targetDuration) {
        clearInterval(interval);
        setProgress(100);
        setIsFinishing(true);
        setTimeout(() => {
          setIsLoaded(true);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('proteinest_loaded', 'true');
          }
          setTimeout(() => setIsExited(true), 850);
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setProgress(100);
    setIsFinishing(true);
    setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => setIsExited(true), 850);
    }, 150);
  };

  if (isExited) return null;

  // Brand-aligned plant-based quality milestones
  const milestones = [
    { threshold: 25, label: 'Spanish Cocoa', icon: '🍫' },
    { threshold: 50, label: 'Pea Peptides', icon: '🌿' },
    { threshold: 75, label: 'Zero Fillers', icon: '🛡️' },
    { threshold: 100, label: 'Lab Verified', icon: '🔬' },
  ];

  const getSubMessage = (p) => {
    if (p < 25) return 'SOURCING SPANISH-ORIGIN COCOA';
    if (p < 50) return 'ACTIVATING PLANT-BASED PEPTIDES';
    if (p < 75) return 'VERIFYING ZERO ARTIFICIAL FILLERS';
    if (p < 95) return 'NABL QUALITY CHECK COMPLETE';
    return 'READY TO FUEL THE FINEST YOU';
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[9999] flex items-center justify-center select-none overflow-hidden ${
        isLoaded ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="The Proteinest Loading Screen"
    >
      {/* ── TOP SHUTTER PANEL ───────────────────────────────── */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 border-b transition-transform duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isLoaded ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ background: '#F8F6F2', borderColor: 'rgba(20,20,20,0.08)' }}
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(255,104,63,0.07)' }} />
      </div>

      {/* ── BOTTOM SHUTTER PANEL ────────────────────────────── */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 border-t transition-transform duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isLoaded ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{ background: '#F8F6F2', borderColor: 'rgba(20,20,20,0.08)' }}
      >
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(26,64,48,0.08)' }} />
      </div>

      {/* ── CENTER SPLIT LASER ──────────────────────────────── */}
      <div
        className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] z-30 transition-all duration-500 ${
          isLoaded ? 'opacity-0 scale-x-150' : 'opacity-90 scale-x-100'
        }`}
        style={{ background: 'linear-gradient(to right, transparent, #FF683F, transparent)', boxShadow: '0 0 15px rgba(255,104,63,0.5)' }}
      />

      {/* ── WATERMARK ───────────────────────────────────────── */}
      <div
        className={`absolute inset-0 flex flex-col justify-between py-12 pointer-events-none z-10 overflow-hidden transition-opacity duration-500 ${
          isFinishing ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="whitespace-nowrap text-[80px] sm:text-[130px] uppercase tracking-widest leading-none select-none"
          style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800, color: 'rgba(20,20,20,0.03)' }}
        >
          THE PROTEINEST · PLANT-BASED · PRECISION FORMULATED ·
        </div>
        <div
          className="whitespace-nowrap text-[80px] sm:text-[130px] uppercase tracking-widest leading-none select-none text-right"
          style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800, color: 'rgba(20,20,20,0.03)' }}
        >
          · NABL TESTED · 25G PROTEIN · SPANISH COCOA ·
        </div>
      </div>

      {/* ── CENTER CONTENT ──────────────────────────────────── */}
      <div
        className={`relative z-20 flex flex-col items-center text-center px-5 max-w-lg mx-auto transition-all duration-500 ${
          isFinishing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Status Pill */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7"
          style={{ background: '#fff', border: '1px solid rgba(20,20,20,0.1)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#FF683F' }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#FF683F' }} />
          </span>
          <span
            className="text-[11px] font-mono font-bold uppercase tracking-widest"
            style={{ color: '#141414' }}
          >
            {getSubMessage(progress)}
          </span>
        </div>

        {/* Shaker + Numbers */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 my-2">

          {/* Plant-protein themed shaker bottle */}
          <div className="relative w-16 h-36 sm:w-20 sm:h-44 shrink-0 flex flex-col items-center">
            <svg
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 8px 20px rgba(255,104,63,0.22))' }}
              viewBox="0 0 80 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="liquidGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#0E2016" />
                  <stop offset="60%" stopColor="#1A4030" />
                  <stop offset="100%" stopColor="#FF683F" />
                </linearGradient>
                <clipPath id="shakerClip">
                  <path d="M16 40 L22 145 Q23 152 30 152 L50 152 Q57 152 58 145 L64 40 Z" />
                </clipPath>
              </defs>

              {/* Cap */}
              <rect x="33" y="6" width="14" height="10" rx="3" fill="#141414" stroke="#333" strokeWidth="1.5" />
              <path d="M24 16 L56 16 L52 26 L28 26 Z" fill="#0E2016" stroke="#333" strokeWidth="1.5" />

              {/* Collar — Burnt Orange brand accent */}
              <rect x="14" y="26" width="52" height="12" rx="4" fill="#FF683F" stroke="#141414" strokeWidth="1.5" />
              <line x1="20" y1="32" x2="60" y2="32" stroke="white" strokeWidth="1" strokeOpacity="0.6" />

              {/* Body */}
              <path
                d="M16 40 L22 145 Q23 152 30 152 L50 152 Q57 152 58 145 L64 40 Z"
                fill="rgba(255,255,255,0.9)"
                stroke="#141414"
                strokeWidth="2.5"
              />

              {/* Measurement ticks */}
              <line x1="22" y1="65" x2="30" y2="65" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.35" />
              <line x1="23" y1="85" x2="33" y2="85" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.35" />
              <line x1="24" y1="105" x2="30" y2="105" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.35" />
              <line x1="25" y1="125" x2="34" y2="125" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.35" />

              {/* Liquid fill */}
              <g clipPath="url(#shakerClip)">
                <rect
                  x="0"
                  y={152 - (progress / 100) * 112}
                  width="80"
                  height="160"
                  fill="url(#liquidGrad)"
                  style={{ transition: 'y 40ms ease-out' }}
                />
                <ellipse
                  cx="40"
                  cy={152 - (progress / 100) * 112}
                  rx="26"
                  ry="3"
                  fill="rgba(255,104,63,0.4)"
                  style={{ transition: 'cy 40ms ease-out' }}
                />
                {progress > 15 && (
                  <>
                    <circle cx="34" cy={140 - (progress * 0.7)} r="2" fill="white" opacity="0.7" className="animate-ping" />
                    <circle cx="46" cy={146 - (progress * 0.5)} r="1.5" fill="white" opacity="0.8" />
                  </>
                )}
              </g>
            </svg>
            <div className="w-14 h-2 rounded-full blur-[4px] -mt-1" style={{ background: 'rgba(20,20,20,0.12)' }} />
          </div>

          {/* Progress numbers + brand lockup */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-baseline leading-none">
              <span
                className="text-7xl sm:text-9xl tracking-tight"
                style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800, color: '#141414' }}
              >
                {String(progress).padStart(2, '0')}
              </span>
              <span
                className="text-4xl sm:text-5xl ml-2"
                style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800, color: '#FF683F' }}
              >
                %
              </span>
            </div>

            <div className="mt-1">
              <span
                className="text-2xl sm:text-3xl uppercase tracking-wide block leading-none"
                style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800, color: '#141414' }}
              >
                The Proteinest
              </span>
              <span
                className="text-lg sm:text-xl block mt-1"
                style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontWeight: 400, color: '#D94D28' }}
              >
                fueling the finest you
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="w-full max-w-sm h-3 rounded-full overflow-hidden my-6 p-0.5 relative"
          style={{ background: '#fff', border: '1px solid rgba(20,20,20,0.12)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-75 relative shadow-sm"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, #FF683F, #D94D28)',
            }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2"
              style={{ background: '#fff', borderColor: '#FF683F', boxShadow: '0 0 8px #FF683F' }}
            />
          </div>
        </div>

        {/* Quality checkpoint cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-md">
          {milestones.map((m, idx) => {
            const isCompleted = progress >= m.threshold;
            return (
              <div
                key={idx}
                className="p-2.5 rounded-xl border transition-all duration-300 flex flex-col items-center text-center"
                style={{
                  background: isCompleted ? '#fff' : 'rgba(255,255,255,0.6)',
                  borderColor: isCompleted ? '#FF683F' : 'rgba(20,20,20,0.08)',
                  color: isCompleted ? '#141414' : 'rgba(20,20,20,0.35)',
                  boxShadow: isCompleted ? '0 4px 12px rgba(255,104,63,0.15)' : 'none',
                  fontFamily: 'var(--font-fira-sans)',
                  fontWeight: isCompleted ? 700 : 400,
                }}
              >
                <span className="text-sm mb-1">{m.icon}</span>
                <span className="text-[10px] uppercase tracking-tight leading-tight">{m.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skip hint */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-300 flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest cursor-pointer ${
          isFinishing ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ color: 'rgba(20,20,20,0.4)' }}
      >
        <span>Click anywhere to enter</span>
        <span className="text-sm font-bold">↳</span>
      </div>
    </div>
  );
}
