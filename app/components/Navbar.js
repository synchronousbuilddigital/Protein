'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';

/* ── Icons ───────────────────────────────────────────────── */
function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

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
  const { data: session, isPending } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* ── Floating Split Glassmorphic Navbar — Pushed Further Left & Right ──────────────── */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-10 w-full flex items-center justify-between pointer-events-none">

        {/* LEFT PILL — Brand Logo (No Dot) & Navigation Links */}
        <nav
          className="pointer-events-auto flex items-center gap-5 sm:gap-7 px-5 py-2 rounded-full transition-all duration-300"
          style={{
            background: 'rgba(14, 32, 22, 0.20)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.20)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.10)',
          }}
          aria-label="Main navigation"
        >
          {/* Brand Logo without Dot */}
          <a
            href="/"
            className="text-sm sm:text-base font-extrabold text-white tracking-tight hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'var(--font-fira-sans)' }}
          >
            The Proteinest
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-5 sm:gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-xs sm:text-[13px] font-semibold text-white/80 hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="sm:hidden p-1 text-white/90 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </nav>

        {/* RIGHT PILL — Cart & Login Button */}
        <div
          className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 rounded-full transition-all duration-300"
          style={{
            background: 'rgba(14, 32, 22, 0.20)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.20)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.10)',
          }}
        >
          {/* Cart Icon Link */}
          <a
            href="/shop"
            aria-label="Cart"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 transition-all"
          >
            <CartIcon />
          </a>

          {/* Login / Account Pill Button */}
          {mounted && !isPending && session?.user ? (
            <a
              href="/account"
              className="px-4 py-1.5 rounded-full bg-white text-[#0E2016] text-xs font-bold hover:bg-[#F8F6F2] transition-all shadow-sm border border-white/80 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {session.user.name?.split(' ')[0] || 'Account'}
            </a>
          ) : (
            <a
              href="/login"
              className="px-4 py-1.5 rounded-full bg-white text-[#0E2016] text-xs font-bold hover:bg-[#F8F6F2] transition-all shadow-sm border border-white/80 whitespace-nowrap"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Login
            </a>
          )}
        </div>
      </header>

      {/* ── Mobile Dropdown Drawer ───────────────────────────── */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          mobileOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: '80px' }}
      >
        <div
          className="mx-6 rounded-3xl p-5 border border-white/15 shadow-2xl"
          style={{
            background: 'rgba(14, 32, 22, 0.90)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white/90 hover:bg-white/10 transition-all"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold bg-white text-[#0E2016] rounded-full hover:bg-[#F8F6F2] transition-all shadow-sm"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
