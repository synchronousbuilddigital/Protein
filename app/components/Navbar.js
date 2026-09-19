'use client';

import { useState, useEffect } from 'react';

/* ── SVG Icon Components ─────────────────────────────────────── */
function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? 'pt-3 pb-2 px-4 sm:px-8' : 'pt-0 pb-0 px-0'
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ease-out flex items-center justify-between text-white ${
          isScrolled
            ? 'max-w-[1100px] bg-[#EF5A32]/95 backdrop-blur-md rounded-full px-6 py-2 shadow-[0_12px_35px_rgba(239,90,50,0.35)] border border-white/25'
            : 'w-full bg-[#EF5A32] rounded-none px-8 sm:px-12 py-2.5 shadow-none border-none'
        }`}
      >
        {/* Brand Logo */}
        <a href="/" className="logo flex flex-col justify-center text-white no-underline group">
          <span className="font-['Anton'] text-lg sm:text-xl tracking-wide group-hover:opacity-90 transition-opacity">
            The Proteinest
          </span>
          <span className="font-['Inter'] text-[8px] tracking-[0.14em] font-medium uppercase text-white/90 -mt-0.5">
            Fueling the finest you
          </span>
        </a>

        {/* Navigation Links */}
        <div
          className={`hidden md:flex items-center gap-1 transition-all duration-300 ${
            isScrolled ? 'bg-white/10 p-1 rounded-full border border-white/15' : 'gap-8'
          }`}
        >
          <a
            href="/shop"
            className={`transition-all duration-200 text-xs font-bold uppercase tracking-wider ${
              isScrolled
                ? 'px-4 py-1.5 rounded-full text-white hover:bg-white hover:text-[#111111]'
                : 'text-white/90 hover:text-white hover:opacity-80'
            }`}
          >
            Shop
          </a>
          <a
            href="/calculator"
            className={`transition-all duration-200 text-xs font-bold uppercase tracking-wider ${
              isScrolled
                ? 'px-4 py-1.5 rounded-full text-white hover:bg-white hover:text-[#111111]'
                : 'text-white/90 hover:text-white hover:opacity-80'
            }`}
          >
            Protein calculator
          </a>
          <a
            href="/about"
            className={`transition-all duration-200 text-xs font-bold uppercase tracking-wider ${
              isScrolled
                ? 'px-4 py-1.5 rounded-full text-white hover:bg-white hover:text-[#111111]'
                : 'text-white/90 hover:text-white hover:opacity-80'
            }`}
          >
            About us
          </a>
          <a
            href="/blog"
            className={`transition-all duration-200 text-xs font-bold uppercase tracking-wider ${
              isScrolled
                ? 'px-4 py-1.5 rounded-full text-white hover:bg-white hover:text-[#111111]'
                : 'text-white/90 hover:text-white hover:opacity-80'
            }`}
          >
            Blog
          </a>
        </div>

        {/* Action Buttons */}
        <div className="nav-cta flex items-center gap-2">
          <button
            aria-label="Search"
            title="Search"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              isScrolled
                ? 'bg-white/10 hover:bg-white hover:text-[#EF5A32] text-white'
                : 'bg-white/15 hover:bg-white/30 text-white'
            }`}
          >
            <SearchIcon />
          </button>
          <button
            aria-label="Account"
            title="Account"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              isScrolled
                ? 'bg-white/10 hover:bg-white hover:text-[#EF5A32] text-white'
                : 'bg-white/15 hover:bg-white/30 text-white'
            }`}
          >
            <UserIcon />
          </button>
          <button
            aria-label="Cart"
            title="Cart"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              isScrolled
                ? 'bg-white/10 hover:bg-white hover:text-[#EF5A32] text-white'
                : 'bg-white/15 hover:bg-white/30 text-white'
            }`}
          >
            <CartIcon />
          </button>
        </div>
      </nav>
    </header>
  );
}
