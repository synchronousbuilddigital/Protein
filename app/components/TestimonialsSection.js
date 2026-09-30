'use client';

/**
 * Testimonials spotlight: one review at a time. The quote and reviewer sit on the left; on the
 * right a deck of portrait cards shuffles the next reviewer forward. Avatars and arrows switch
 * reviews, it auto-advances with a progress line (paused on hover, off under reduced motion).
 * Styles: "Testimonials spotlight" in globals.css.
 */
import { useCallback, useEffect, useState } from 'react';

const REVIEWS = [
  { quote: 'Finally a truly delicious and quality protein powder.', name: 'Arjun Bakali', role: 'Owner & Coach at CrossFit Third Eye', image: '/rv1.png', pos: '50% 20%' },
  { quote: "It's so tasty, I didn't even feel like I was having a protein shake.", name: 'Prerna Maarvikurne', role: 'Student of Oberoi International', image: '/rv2.png', pos: '50% 25%' },
  { quote: 'Found my go-to protein — clean, tasty and keeps me full.', name: 'Shailin Suvarna', role: 'Antal International, India Partner', image: '/rv3.png', pos: '50% 20%' },
  { quote: "Tastes like it's been freshly squeezed — absolutely love it.", name: 'Riya Shah', role: 'Yoga Instructor', image: '/avatar_riya.png', pos: '50% 25%' },
  { quote: 'Smooth texture, zero bloat, and super delicious flavor!', name: 'Manav Joshi', role: 'Software Engineer', image: '/avatar_manav.png', pos: '50% 20%' },
];

const AUTO_MS = 5500;
const pad = (n) => String(n).padStart(2, '0');

function HeartIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
function ArrowIcon({ left = false }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={left ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TestimonialsSection() {
  const n = REVIEWS.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const go = useCallback((d) => setActive((a) => (a + d + n) % n), [n]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setAutoplay(!mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!autoplay || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), AUTO_MS);
    return () => clearInterval(t);
  }, [autoplay, paused, active, n]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const r = REVIEWS[active];

  return (
    <section className="tm band band--blush" aria-labelledby="tm-title" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="tm-wrap">
        {/* ── copy ── */}
        <div className="tm-copy" data-reveal="up">
          <span className="tm-pill">
            <HeartIcon /> 228K <span>loves</span>
          </span>
          <h2 id="tm-title" className="tm-title" data-split>
            Real people.
            <br />
            <em>Real love.</em>
          </h2>

          <figure key={active} className="tm-quote" aria-live="polite">
            <span className="tm-quote-mark" aria-hidden>
              “
            </span>
            <blockquote className="tm-quote-text editorial">{r.quote}</blockquote>
            <figcaption className="tm-quote-by">
              <strong>{r.name}</strong>
              <span>{r.role}</span>
            </figcaption>
          </figure>

          <div className="tm-controls" onKeyDown={onKey}>
            <div className="tm-avatars" role="tablist" aria-label="Reviews">
              {REVIEWS.map((v, i) => (
                <button key={v.name} type="button" role="tab" aria-selected={i === active} aria-label={`${v.name}'s review`} className="tm-avatar" data-active={i === active} onClick={() => setActive(i)}>
                  <img src={v.image} alt="" style={{ objectPosition: v.pos }} loading="lazy" />
                </button>
              ))}
            </div>
            <div className="tm-arrows">
              <button type="button" onClick={() => go(-1)} aria-label="Previous review">
                <ArrowIcon left />
              </button>
              <span className="tm-count">
                {pad(active + 1)} <span>/ {pad(n)}</span>
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Next review">
                <ArrowIcon />
              </button>
            </div>
          </div>

          {autoplay && (
            <span key={`p-${active}`} className="tm-progress" data-paused={paused} aria-hidden>
              <span style={{ animationDuration: `${AUTO_MS}ms` }} />
            </span>
          )}
        </div>

        {/* ── portrait deck ── */}
        <div className="tm-deck" aria-hidden data-reveal="scale" data-reveal-delay="0.1" data-parallax="-0.08">
          {REVIEWS.map((v, i) => {
            const off = (i - active + n) % n;
            const state = off === n - 1 ? 'out' : Math.min(off, 3);
            return (
              <div key={v.name} className="tm-card" data-off={state} style={{ zIndex: off === n - 1 ? 0 : n - off }}>
                <img src={v.image} alt="" style={{ objectPosition: v.pos }} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                <span className="tm-card-shade" />
                <span className="tm-card-heart">
                  <HeartIcon size={14} />
                </span>
                <span className="tm-card-chip">
                  <strong>{v.name}</strong>
                  <span>{v.role}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
