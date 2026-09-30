'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollReveal from './ScrollReveal';
import SplashStage from './SplashStage';

/*
 * Shared layout for /login and /signup: a full-height photo panel (brand line + what an account
 * gives you) beside the form card. On phones the photo becomes a short banner above the form.
 * Only presentation lives here — each page keeps its own auth logic.
 * Styles: "Auth" in globals.css.
 */

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ICONS = {
  mail: (
    <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm0 1 8 6 8-6" />
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </>
  ),
};

function Icon({ name }) {
  return (
    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/** Labelled input with a leading icon. Pass `toggle` for a password field with a show/hide button. */
export function AuthField({ id, label, icon, toggle = false, hint, children, ...input }) {
  const [shown, setShown] = useState(false);
  const type = toggle ? (shown ? 'text' : 'password') : input.type;
  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-input">
        <Icon name={icon} />
        <input id={id} {...input} type={type} aria-describedby={hint ? `${id}-hint` : undefined} />
        {toggle && (
          <button type="button" className="auth-eye" onClick={() => setShown((s) => !s)} aria-label={shown ? 'Hide password' : 'Show password'} aria-pressed={shown}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {shown ? (
                <>
                  <path d="M3 3l18 18" />
                  <path d="M10.6 5.1A9.8 9.8 0 0 1 12 5c5.5 0 9 5.5 9 7a11.6 11.6 0 0 1-2.6 3.4M6.3 6.4C4.2 7.8 3 10.2 3 12c0 1.5 3.5 7 9 7a9.4 9.4 0 0 0 4.2-1" />
                  <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                </>
              ) : (
                <>
                  <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export function AuthError({ message }) {
  if (!message) return null;
  return (
    <div className="auth-error" role="alert">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5.5M12 16.5v.01" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

export function AuthSubmit({ loading, label, loadingLabel }) {
  return (
    <button type="submit" disabled={loading} className="shop-cta auth-submit" aria-busy={loading}>
      {loading ? (
        <>
          <span className="auth-spinner" aria-hidden />
          {loadingLabel}
        </>
      ) : (
        <>
          {label}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      )}
    </button>
  );
}

export default function AuthShell({ image, imagePosition = '50% 50%', cutout = false, flavor = 'choco', panelTitle, panelPoints, kicker, title, subtitle, children, switchText, switchLabel, switchHref }) {
  return (
    <main className="auth">
      <Navbar />
      <ScrollReveal />

      <div className="auth-grid">
        {/* photo panel */}
        <section className={`auth-visual${cutout ? ' auth-visual--studio' : ''}`} aria-label="The Proteinest">
          {cutout ? (
            // transparent pack render floated in a lit studio — shown near native size so it stays sharp
            <div className="auth-stage">
              <span className="auth-halo" aria-hidden />
              <SplashStage image={image} flavor={flavor} />
            </div>
          ) : (
            <img src={image} alt="" className="auth-visual-img" style={{ objectPosition: imagePosition }} />
          )}
          <div className="auth-visual-shade" aria-hidden />
          <div className="auth-visual-copy" data-reveal-stagger="0.1">
            <span className="auth-chip">
              <i aria-hidden />
              Your Proteinest account
            </span>
            <p className="auth-visual-title">{panelTitle}</p>
            <ul className="auth-points">
              {panelPoints.map((p) => (
                <li key={p}>
                  <span aria-hidden>
                    <Check />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="auth-trust">24 g plant protein · 0 g added sugar · NABL lab tested</p>
          </div>
        </section>

        {/* form */}
        <section className="auth-form-side" aria-labelledby="auth-title">
          <div className="auth-card" data-reveal="up">
            <span className="auth-kicker">{kicker}</span>
            <h1 id="auth-title" className="auth-title">
              {title}
            </h1>
            <p className="auth-sub">{subtitle}</p>
            {children}
            <div className="auth-switch">
              <span>{switchText}</span>
              <Link href={switchHref} className="auth-switch-btn">
                {switchLabel}
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
