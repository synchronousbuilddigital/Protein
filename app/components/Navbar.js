'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';

/* ── Icons ───────────────────────────────────────────────── */
function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* Mobile hamburger */
function MenuIcon({ open }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = useSession();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── Desktop / Tablet Floating Navbar ──────────────── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'pt-3 px-4 sm:px-6' : 'pt-4 px-5 sm:px-8'} flex items-center justify-between`}>

        {/* LEFT — Dark transparent pill: logo + nav links */}
        <nav
          className="flex items-center gap-0.5 px-2 py-1.5 rounded-full transition-all duration-300"
          style={{
            background: scrolled ? 'rgba(14, 32, 22, 0.65)' : 'rgba(14, 32, 22, 0.80)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 4px 24px rgba(14, 32, 22, 0.35)',
            border: scrolled ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.08)',
          }}
          aria-label="Main navigation"
        >
          {/* Brand logo */}
          <a
            href="/"
            className="flex flex-col justify-center px-3 py-1 rounded-full transition-all duration-200 mr-1 group"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="text-sm leading-none tracking-wide group-hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800, color: '#F8F6F2' }}
            >
              The Proteinest
            </span>
            <span
              className="text-[7px] tracking-[0.14em] -mt-[1px] group-hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: 'rgba(255,104,63,0.85)' }}
            >
              fueling the finest you
            </span>
          </a>

          {/* Subtle divider */}
          <span className="w-px h-4 mx-1 rounded-full hidden sm:block" style={{ background: 'rgba(255,255,255,0.1)' }} />

          {/* Nav links — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:bg-white/10"
                style={{
                  fontFamily: 'var(--font-fira-sans)',
                  color: 'rgba(248,246,242,0.75)',
                  letterSpacing: '0.06em',
                  fontSize: '11px',
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger inside the pill */}
          <button
            className="sm:hidden ml-2 p-1.5 rounded-full transition-all hover:bg-white/10"
            style={{ color: '#F8F6F2' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </nav>

        {/* RIGHT — Action buttons */}
        <div className="flex items-center gap-2">

          {/* Cart icon pill */}
          <button
            aria-label="Cart"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{
              background: scrolled ? 'rgba(14, 32, 22, 0.65)' : 'rgba(14, 32, 22, 0.80)',
              border: scrolled ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.08)',
              color: '#F8F6F2',
              boxShadow: scrolled ? '0 8px 24px rgba(0, 0, 0, 0.25)' : '0 2px 12px rgba(14, 32, 22, 0.25)',
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            }}
          >
            <CartIcon />
          </button>

          {/* Sign In / Account */}
          {mounted && !isPending && session?.user ? (
            <a
              href="/account"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:opacity-85 hover:scale-[1.02]"
              style={{
                fontFamily: 'var(--font-fira-sans)',
                background: scrolled ? 'rgba(14, 32, 22, 0.65)' : 'rgba(14, 32, 22, 0.80)',
                border: scrolled ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#F8F6F2',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                boxShadow: scrolled ? '0 8px 24px rgba(0, 0, 0, 0.25)' : '0 2px 12px rgba(14, 32, 22, 0.25)',
                fontSize: '11px',
                letterSpacing: '0.07em',
              }}
            >
              <UserIcon />
              <span>{session.user.name?.split(' ')[0] || 'Account'}</span>
            </a>
          ) : (
            <a
              href="/login"
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:opacity-85 hover:scale-[1.02]"
              style={{
                fontFamily: 'var(--font-fira-sans)',
                background: scrolled ? 'rgba(14, 32, 22, 0.65)' : 'rgba(14, 32, 22, 0.80)',
                border: scrolled ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#F8F6F2',
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                boxShadow: scrolled ? '0 8px 24px rgba(0, 0, 0, 0.25)' : '0 2px 12px rgba(14, 32, 22, 0.25)',
                fontSize: '11px',
                letterSpacing: '0.07em',
              }}
            >
              Sign In
            </a>
          )}

        </div>
      </header>

      {/* ── Mobile Dropdown Menu ───────────────────────────── */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          mobileOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: '72px' }}
      >
        <div
          className="mx-5 rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(14, 32, 22, 0.88)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          }}
        >
          <div className="flex flex-col py-3">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-150 hover:bg-white/6"
                style={{
                  fontFamily: 'var(--font-fira-sans)',
                  color: 'rgba(248,246,242,0.8)',
                  letterSpacing: '0.08em',
                }}
              >
                {label}
              </a>
            ))}
            <div className="mx-6 mt-2 pt-3 flex gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <a
                href="/login"
                className="w-full py-2.5 rounded-full text-center text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  fontFamily: 'var(--font-fira-sans)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#F8F6F2',
                  fontSize: '11px',
                }}
              >
                Sign In
              </a>
            </div>
            <div className="pb-1" />
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
