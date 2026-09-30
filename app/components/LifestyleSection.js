'use client';

/**
 * "Protein for every place you perform" — an expanding gallery.
 * Four photo panels share one row; the active panel opens wide and shows its copy, the rest
 * collapse into slim strips. Hover (pointer) or tap (touch) switches, and it auto-advances
 * with a progress bar unless hovered or reduced motion is set. On phones the row becomes a
 * vertical accordion. Styles: "Lifestyle gallery" in globals.css.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

const SCENES = [
  {
    id: 'outdoors',
    badge: 'Outdoors',
    title: 'Trail days and long runs',
    info: 'Fast-dissolving plant protein built for mountain trails and endurance runs.',
    tags: ['24g Protein', 'Electrolytes'],
    image: '/lifestyle-outdoors.png',
    pos: '50% 40%',
  },
  {
    id: 'at-work',
    badge: 'At Work',
    title: 'Steady energy at your desk',
    info: 'Beat the 3 PM sugar crash with steady, focused desk energy.',
    tags: ['No Sugar Crash', 'Focus'],
    image: '/lifestyle-at-work.png',
    pos: '50% 30%',
  },
  {
    id: 'on-the-go',
    badge: 'On the Go',
    title: 'Airports, commutes, everywhere',
    info: 'Pocket-ready single sachets for airports, commutes and busy schedules.',
    tags: ['Instant Shake', 'Portable'],
    image: '/lifestyle-on-the-go.png',
    pos: '50% 30%',
  },
  {
    id: 'in-the-kitchen',
    badge: 'In the Kitchen',
    title: 'Blends into breakfast',
    info: 'Heat-stable formula that blends effortlessly into pancakes and oats.',
    tags: ['Bake Stable', 'Creamy'],
    image: '/lifestyle-in-the-kitchen.png',
    pos: '50% 40%',
  },
];

const AUTO_MS = 4800;
const pad = (n) => String(n).padStart(2, '0');

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LifestyleSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const hoverable = useRef(false);

  useEffect(() => {
    hoverable.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setAutoplay(!mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!autoplay || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % SCENES.length), AUTO_MS);
    return () => clearInterval(t);
  }, [autoplay, paused, active]);

  const onEnterCard = useCallback((i) => {
    if (hoverable.current) setActive(i);
  }, []);

  return (
    <section className="life band band--sand" aria-labelledby="life-title">
      <div className="life-wrap">
        {/* ── copy ── */}
        <div className="life-copy" data-reveal-stagger="0.1">
          <span className="life-kicker">
            <i aria-hidden />
            Built for real life
          </span>
          <h2 id="life-title" className="life-title" data-split>
            Protein for <em>every place</em> you perform
          </h2>
          <p className="life-lead">
            At your desk, on the trail, in the kitchen — The Proteinest integrates into the life you already live. No ritual required.
          </p>
          <a href="/shop" className="life-cta">
            Shop Protein Now <ArrowIcon />
          </a>

          <p className="life-note editorial" data-parallax="-0.12">
            Same goals.
            <br />
            A cleaner standard.
          </p>
        </div>

        {/* ── expanding gallery ── */}
        <div
          className="life-gallery"
          data-reveal="right"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="tablist"
          aria-label="Where you use The Proteinest"
        >
          {SCENES.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`life-panel-${s.id}`}
                className="life-card"
                data-active={isActive}
                onMouseEnter={() => onEnterCard(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <img src={s.image} alt="" className="life-card-img" style={{ objectPosition: s.pos }} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                <span className="life-card-shade" aria-hidden />

                {/* collapsed strip */}
                <span className="life-strip" aria-hidden={isActive}>
                  <span className="life-strip-num">{pad(i + 1)}</span>
                  <span className="life-strip-label">{s.badge}</span>
                </span>

                {/* expanded content */}
                <span id={`life-panel-${s.id}`} className="life-panel" aria-hidden={!isActive}>
                  <span className="life-panel-top">
                    <span className="life-badge">{s.badge}</span>
                    <span className="life-count">
                      {pad(i + 1)} <span>/ {pad(SCENES.length)}</span>
                    </span>
                  </span>
                  <span className="life-panel-bottom">
                    <span className="life-panel-title">{s.title}</span>
                    <span className="life-panel-info">{s.info}</span>
                    <span className="life-tags">
                      {s.tags.map((t) => (
                        <span key={t} className="life-tag">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                  {isActive && autoplay && (
                    <span key={active} className="life-progress" data-paused={paused} aria-hidden>
                      <span style={{ animationDuration: `${AUTO_MS}ms` }} />
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
