'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    // Check if seen in this session; snappy reload, smooth first visit
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
          // Remove from DOM after shutter doors open
          setTimeout(() => {
            setIsExited(true);
          }, 850);
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

  // Active Milestone Checkpoints
  const milestones = [
    { threshold: 25, label: 'Cold-Filtered Whey', icon: '🥛' },
    { threshold: 50, label: 'DigeZyme® Enzymes', icon: '🌿' },
    { threshold: 75, label: 'Zero Bloat Certified', icon: '🛡️' },
    { threshold: 100, label: '100% Lab Tested', icon: '🔬' },
  ];

  // Dynamic step status
  const getSubMessage = (p) => {
    if (p < 25) return 'FORMULATING BIOACTIVE PEPTIDES';
    if (p < 50) return 'ACTIVATING MULTI-ENZYME MATRIX';
    if (p < 75) return 'CALIBRATING FOR THE INDIAN GUT';
    if (p < 95) return 'PURITY & TASTE VERIFICATION COMPLETE';
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
      {/* ── TOP SHUTTER PANEL (Light Cream Theme) ───────────────── */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#FBF7F1] border-b border-[#111111]/10 transition-transform duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isLoaded ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Soft warm ambient glow inside top panel */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#EF5A32]/8 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* ── BOTTOM SHUTTER PANEL (Light Cream Theme) ────────────── */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#FBF7F1] border-t border-[#111111]/10 transition-transform duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isLoaded ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Soft bottom glow inside bottom panel */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* ── HORIZONTAL WARM LASER BEAM (Center Split Line) ─────── */}
      <div
        className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#EF5A32] to-transparent shadow-[0_0_15px_rgba(239,90,50,0.5)] z-30 transition-all duration-500 ${
          isLoaded ? 'opacity-0 scale-x-150' : 'opacity-90 scale-x-100'
        }`}
      />

      {/* ── SUBTLE WATERMARK MARQUEE (Light Theme) ─────────────── */}
      <div
        className={`absolute inset-0 flex flex-col justify-between py-12 pointer-events-none z-10 overflow-hidden transition-opacity duration-500 ${
          isFinishing ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="whitespace-nowrap font-['Anton'] text-[80px] sm:text-[130px] uppercase text-[#111111]/[0.035] tracking-widest leading-none select-none">
          THE PROTEINEST · CLEAN WHEY · ZERO BLOAT · THE PROTEINEST ·
        </div>
        <div className="whitespace-nowrap font-['Anton'] text-[80px] sm:text-[130px] uppercase text-[#111111]/[0.035] tracking-widest leading-none select-none text-right">
          · DIGEZYME · NABL TESTED · 25G PROTEIN · DIGEZYME ·
        </div>
      </div>

      {/* ── CENTER CONTENT (High Contrast & Legibility) ─────────── */}
      <div
        className={`relative z-20 flex flex-col items-center text-center px-5 max-w-lg mx-auto transition-all duration-500 ${
          isFinishing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#111111]/12 shadow-sm mb-7">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF5A32] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF5A32]" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#111111]">
            {getSubMessage(progress)}
          </span>
        </div>

        {/* Liquid Shaker + Big Clear Numbers */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 my-2">
          
          {/* ── Light-Theme Liquid Shaker Bottle (SVG) ── */}
          <div className="relative w-16 h-36 sm:w-20 sm:h-44 shrink-0 flex flex-col items-center">
            <svg
              className="w-full h-full drop-shadow-[0_8px_20px_rgba(239,90,50,0.25)]"
              viewBox="0 0 80 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Liquid Gradient */}
                <linearGradient id="liquidGradLight" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#C8441F" />
                  <stop offset="60%" stopColor="#EF5A32" />
                  <stop offset="100%" stopColor="#FFA477" />
                </linearGradient>

                {/* Shaker Flask Clip Path */}
                <clipPath id="shakerBodyClipLight">
                  <path d="M16 40 L22 145 Q23 152 30 152 L50 152 Q57 152 58 145 L64 40 Z" />
                </clipPath>
              </defs>

              {/* Shaker Cap / Spout (Solid Dark Charcoal) */}
              <rect x="33" y="6" width="14" height="10" rx="3" fill="#111111" stroke="#333" strokeWidth="1.5" />
              <path d="M24 16 L56 16 L52 26 L28 26 Z" fill="#1A1918" stroke="#333" strokeWidth="1.5" />

              {/* Shaker Collar Ring */}
              <rect x="14" y="26" width="52" height="12" rx="4" fill="#EF5A32" stroke="#111111" strokeWidth="1.5" />
              <line x1="20" y1="32" x2="60" y2="32" stroke="white" strokeWidth="1" strokeOpacity="0.7" />

              {/* Shaker Body Background (Frosted Glass) */}
              <path
                d="M16 40 L22 145 Q23 152 30 152 L50 152 Q57 152 58 145 L64 40 Z"
                fill="rgba(255, 255, 255, 0.9)"
                stroke="#111111"
                strokeWidth="2.5"
              />

              {/* Measurement Volume Ticks */}
              <line x1="22" y1="65" x2="30" y2="65" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.45" />
              <line x1="23" y1="85" x2="33" y2="85" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.45" />
              <line x1="24" y1="105" x2="30" y2="105" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.45" />
              <line x1="25" y1="125" x2="34" y2="125" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.45" />

              {/* Liquid Inside Shaker (Fills Up in Real-Time) */}
              <g clipPath="url(#shakerBodyClipLight)">
                <rect
                  x="0"
                  y={152 - (progress / 100) * 112}
                  width="80"
                  height="160"
                  fill="url(#liquidGradLight)"
                  style={{ transition: 'y 40ms ease-out' }}
                />

                {/* Liquid Wave Surface Lip */}
                <ellipse
                  cx="40"
                  cy={152 - (progress / 100) * 112}
                  rx="26"
                  ry="3.5"
                  fill="#FFD2BC"
                  style={{ transition: 'cy 40ms ease-out' }}
                />

                {/* Rising Micro-Bubbles */}
                {progress > 15 && (
                  <>
                    <circle cx="34" cy={140 - (progress * 0.7)} r="2.2" fill="white" opacity="0.8" className="animate-ping" />
                    <circle cx="46" cy={146 - (progress * 0.5)} r="1.8" fill="white" opacity="0.9" />
                  </>
                )}
              </g>
            </svg>

            {/* Subtle soft shadow underneath shaker */}
            <div className="w-14 h-2 bg-[#111111]/15 rounded-full blur-[4px] -mt-1" />
          </div>

          {/* ── High-Contrast Numeric & Brand Typography ── */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-baseline leading-none">
              <span className="font-['Anton'] text-7xl sm:text-9xl tracking-tight text-[#111111]">
                {String(progress).padStart(2, '0')}
              </span>
              <span className="font-['Anton'] text-4xl sm:text-5xl text-[#EF5A32] ml-2">
                %
              </span>
            </div>

            {/* Brand Title Lockup */}
            <div className="mt-1">
              <span className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wide text-[#111111] block leading-none">
                The Proteinest
              </span>
              <span className="font-['Caveat'] text-xl sm:text-2xl text-[#C8441F] block mt-0.5 font-bold">
                fueling the finest you
              </span>
            </div>
          </div>

        </div>

        {/* ── High-Contrast Progress Bar Track ── */}
        <div className="w-full max-w-sm h-3 bg-white rounded-full overflow-hidden my-6 p-0.5 relative border border-[#111111]/15 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#EF5A32] via-[#FF753A] to-[#FFA07A] rounded-full transition-all duration-75 relative shadow-sm"
            style={{ width: `${progress}%` }}
          >
            {/* Glowing Leading Head Tip */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full border-2 border-[#EF5A32] shadow-[0_0_8px_#EF5A32]" />
          </div>
        </div>

        {/* ── Quality Checkpoint Cards (High Readability) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-md">
          {milestones.map((m, idx) => {
            const isCompleted = progress >= m.threshold;
            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border transition-all duration-300 flex flex-col items-center text-center ${
                  isCompleted
                    ? 'bg-white border-[#EF5A32] text-[#111111] shadow-[0_4px_12px_rgba(239,90,50,0.18)] ring-1 ring-[#EF5A32]/30 font-bold'
                    : 'bg-white/60 border-[#111111]/10 text-[#111111]/45'
                }`}
              >
                <span className="text-sm mb-1">{m.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-tight leading-tight">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Bottom Click to Skip Hint ── */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-300 flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#111111]/50 hover:text-[#111111] cursor-pointer ${
          isFinishing ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span>Click anywhere to enter</span>
        <span className="text-sm font-bold">↳</span>
      </div>
    </div>
  );
}
