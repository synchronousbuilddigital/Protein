'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

/* ── Icons ───────────────────────────────────────────────── */
function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <>
          <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

const noopSubscribe = () => () => {};

export default function Navbar() {
  // true after hydration (the session-dependent login button only renders client-side)
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  // while the mobile sheet is open: freeze page scroll (Lenis + native) and close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const lenis = window.__lenis;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Floating Split Glassmorphic Navbar — Wide & Clean Layout ──────────────── */}
      <header className="hidden sm:flex fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-12 w-full items-center justify-between pointer-events-none">

        {/* LEFT PILL — Brand Logo & Navigation Links */}
        <nav
          className="pointer-events-auto relative overflow-hidden flex items-center gap-5 sm:gap-7 md:gap-9 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 rounded-full transition-all duration-300"
          style={{
            background: 'rgba(14, 32, 22, 0.25)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
          }}
          aria-label="Main navigation"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="relative z-10 text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight hover:opacity-90 transition-opacity pr-2 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-fira-sans)' }}
          >
            The Proteinest
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3 md:gap-4">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <a
                  key={href}
                  href={href}
                  className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? 'text-white font-bold bg-white/20 border border-white/30 shadow-sm'
                      : 'text-white/85 hover:text-white hover:bg-white/15'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  <span className="relative z-10">{label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="relative z-10 sm:hidden p-1.5 text-white/90 hover:text-white focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </nav>

        {/* RIGHT PILL — Cart & Login Button */}
        <div
          className="pointer-events-auto relative overflow-hidden flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300"
          style={{
            background: 'rgba(14, 32, 22, 0.25)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
          }}
        >
          {/* Cart Icon Link */}
          <a
            href="/shop"
            aria-label="Cart"
            className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition-all"
          >
            <CartIcon />
          </a>

          {/* Login / Account Button */}
          {mounted && !isPending && session?.user ? (
            <a
              href="/account"
              className="relative z-10 px-5 py-2 rounded-full bg-white text-[#0E2016] text-xs sm:text-sm font-bold hover:bg-[#F8F6F2] hover:scale-[1.03] active:scale-[0.98] transition-all shadow-md border border-white/80 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {session.user.name?.split(' ')[0] || 'Account'}
            </a>
          ) : (
            <a
              href="/login"
              className="relative z-10 px-5 py-2 rounded-full bg-white text-[#0E2016] text-xs sm:text-sm font-bold hover:bg-[#F8F6F2] hover:scale-[1.03] active:scale-[0.98] transition-all shadow-md border border-white/80 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Login
            </a>
          )}
        </div>
      </header>

      {/* ── Mobile: one dark-glass bar + full-screen menu sheet (styles: "Mobile nav" in globals.css) ── */}
      <header className={`m-nav sm:hidden${mobileOpen ? ' is-open' : ''}`}>
        <div className="m-nav-bar">
          <Link href="/" className="m-nav-brand" style={{ fontFamily: 'var(--font-fira-sans)' }}>
            The Proteinest
          </Link>
          <div className="m-nav-actions">
            <a href="/shop" aria-label="Cart" className="m-nav-icon">
              <CartIcon />
            </a>
            {!mobileOpen &&
              (mounted && !isPending && session?.user ? (
                <a href="/account" className="m-nav-login">
                  {session.user.name?.split(' ')[0] || 'Account'}
                </a>
              ) : (
                <a href="/login" className="m-nav-login">
                  Login
                </a>
              ))}
            <button type="button" className="m-nav-icon m-nav-toggle" onClick={() => setMobileOpen((o) => !o)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="m-nav-sheet">
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      <div id="m-nav-sheet" className={`m-sheet sm:hidden${mobileOpen ? ' is-open' : ''}`} aria-hidden={!mobileOpen} inert={!mobileOpen}>
        <div className="m-sheet-glow" aria-hidden />
        <nav className="m-sheet-links" aria-label="Mobile navigation">
          {[{ href: '/', label: 'Home' }, ...NAV_LINKS].map(({ href, label }, i) => {
            const isActive = pathname === href;
            return (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} className="m-sheet-link" aria-current={isActive ? 'page' : undefined} style={{ '--i': i }}>
                <span className="m-sheet-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="m-sheet-label">{label}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            );
          })}
        </nav>
        <div className="m-sheet-foot" style={{ '--i': 6 }}>
          {mounted && !isPending && session?.user ? (
            <a href="/account" onClick={() => setMobileOpen(false)} className="m-sheet-cta">
              My account
            </a>
          ) : (
            <a href="/login" onClick={() => setMobileOpen(false)} className="m-sheet-cta">
              Login / Create account
            </a>
          )}
          <a href="/shop" onClick={() => setMobileOpen(false)} className="m-sheet-cta m-sheet-cta--ghost">
            Shop all products
          </a>
          <p>24 g plant protein · 0 g added sugar · NABL lab tested</p>
        </div>
      </div>
    </>
  );
}

