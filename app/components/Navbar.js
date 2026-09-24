'use client';

import { useState, useEffect } from 'react';
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

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* ── Floating Split Glassmorphic Navbar — Wide & Clean Layout ──────────────── */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-12 w-full flex items-center justify-between pointer-events-none">

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
          <a
            href="/"
            className="relative z-10 text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight hover:opacity-90 transition-opacity pr-2"
            style={{ fontFamily: 'var(--font-fira-sans)' }}
          >
            The Proteinest
          </a>

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

      {/* ── Mobile Dropdown Drawer ───────────────────────────── */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          mobileOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: '88px' }}
      >
        <div
          className="mx-6 rounded-3xl p-5 border border-white/15 shadow-2xl"
          style={{
            background: 'rgba(14, 32, 22, 0.92)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive ? 'bg-white/20 text-white font-bold' : 'text-white/90 hover:bg-white/10'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {label}
                </a>
              );
            })}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs sm:text-sm font-bold bg-white text-[#0E2016] rounded-full hover:bg-[#F8F6F2] transition-all shadow-sm"
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

