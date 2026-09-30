'use client';

/**
 * Newsletter band: a dark studio card with a capsule sign-up form wired to /api/newsletter,
 * three membership perks, and animated success / error states.
 * Styles: "Newsletter" in globals.css.
 */
import { useState } from 'react';

const PERKS = ['Science-backed reads', 'Launch-first access', 'Members-only offers'];

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.2 6.2L4.8 9.2L9.8 2.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message === 'You are already subscribed!' ? 'You were already on the list. Good taste.' : 'You are in. Welcome to the finest.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'We could not subscribe you right now. Please try again shortly.');
      }
    } catch {
      setStatus('error');
      setMessage('We could not subscribe you right now. Please try again shortly.');
    }
  };

  return (
    <section className="nl band band--dawn" aria-labelledby="nl-title">
      <div className="wrap">
        <div className="nl-card" data-reveal="up">
          <div className="nl-glow" aria-hidden />
          <div className="nl-grain" aria-hidden />
          <span className="nl-ghost" aria-hidden data-parallax="0.25">
            FUEL
          </span>

          <div className="nl-copy">
            <span className="nl-kicker">
              <i aria-hidden />
              Stay in the loop
            </span>
            <h2 id="nl-title" className="nl-title" data-split>
              Your protein. <em>Upgraded.</em>
            </h2>
            <p className="nl-sub">Clean science, sourcing transparency, and performance insight — delivered to your inbox.</p>
            <ul className="nl-perks" aria-label="What you get">
              {PERKS.map((p) => (
                <li key={p}>
                  <span className="nl-tick">
                    <CheckIcon />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="nl-action">
            {status === 'success' ? (
              <div className="nl-done" role="status">
                <span className="nl-done-mark" aria-hidden>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path className="nl-done-path" d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <strong>{message}</strong>
                <span>Your first read lands this week.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="nl-form" noValidate>
                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <div className="nl-capsule" data-busy={status === 'loading'}>
                  <input id="nl-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com" required />
                  <button type="submit" disabled={status === 'loading'} aria-live="polite">
                    <span>{status === 'loading' ? 'Joining…' : 'Join now'}</span>
                    <ArrowIcon />
                  </button>
                </div>
                {status === 'error' ? (
                  <p className="nl-note nl-note--error" role="alert">
                    {message}
                  </p>
                ) : (
                  <p className="nl-note">
                    <LockIcon /> No spam. Unsubscribe anytime.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
