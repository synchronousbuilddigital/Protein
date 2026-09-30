'use client';

/**
 * Founder section: a full-height dark stage. Left, the real founder portrait as a 3D card
 * (FounderStage) with the quote card and founder chip floating on their own depth layers and
 * a giant ghost word behind. Right, the story with a staggered reveal.
 * Styles: "Founder stage" in globals.css.
 */
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import useIntroDone from './useIntroDone';

function StageFallback() {
  return (
    <div className="fd-stage-fallback">
      <img src="/founder-real.jpg" alt="Founder of The Proteinest" />
    </div>
  );
}

const FounderStage = dynamic(() => import('./FounderStage'), { ssr: false, loading: StageFallback });

const PROMISES = ['Plant-based & gut-friendly', 'Backed by research', 'Tailored to the Indian diet', 'Third-party tested'];

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.2 6.2L4.8 9.2L9.8 2.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FounderSection() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [near, setNear] = useState(false); // within ~800px of the viewport → worth mounting the WebGL stage
  const introDone = useIntroDone();

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mount the 3D stage only as the section approaches (it compiles shaders + uploads a large photo).
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Parallax for the floating layers, driven by the pointer over the stage (desktop only).
  useEffect(() => {
    const el = stageRef.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', x.toFixed(3));
        el.style.setProperty('--py', y.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="about" ref={ref} className={`fd${inView ? ' fd-in' : ''}`} aria-labelledby="fd-title">
      <div className="fd-card">
        <div className="fd-glow" aria-hidden />
        <div className="fd-grain" aria-hidden />

        {/* ── 3D portrait stage ── */}
        <div ref={stageRef} className="fd-stage">
          <span className="fd-ghost-word" aria-hidden data-parallax="0.2">
            FOUNDER
          </span>
          <div className="fd-stage-canvas">
            {near && introDone ? <FounderStage revealed={inView} /> : <StageFallback />}
          </div>
          <span className="fd-chip fd-layer" style={{ '--depth': 1.4 }}>
            <strong>Founder</strong>
            <span>The Proteinest</span>
          </span>
          <blockquote className="fd-float fd-layer" style={{ '--depth': 2.2 }}>
            <span className="fd-float-mark" aria-hidden>
              “
            </span>
            <p className="editorial">One scoop a day. A stronger you.</p>
          </blockquote>
        </div>

        {/* ── story ── */}
        <div className="fd-copy">
          <span className="fd-kicker" style={{ '--i': 1 }}>
            <i aria-hidden />
            Why we created The Proteinest
          </span>
          <h2 id="fd-title" className="fd-title" style={{ '--i': 2 }} data-split>
            Built for people who <em>refuse to settle</em>
          </h2>
          <p className="fd-p" style={{ '--i': 3 }}>
            For years, I watched Indian kitchens run low on the one nutrient quietly powering energy, hormones, and strength. Most options on the shelf were loud, synthetic, and not built for how we actually eat and live.
          </p>
          <p className="fd-p" style={{ '--i': 4 }}>
            The Proteinest was built differently. Clean, potent, responsibly sourced ingredients — including Spanish-sourced cocoa and plant-based pea protein — engineered for serious results. Not for everyone. Made for the finest version of you.
          </p>
          <p className="fd-pull editorial" style={{ '--i': 5 }}>
            “One scoop. One standard. No compromise.”
          </p>
          <ul className="fd-promises" style={{ '--i': 6 }} aria-label="Our promises">
            {PROMISES.map((p) => (
              <li key={p}>
                <span className="fd-tick">
                  <CheckIcon />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="fd-actions" style={{ '--i': 7 }}>
            <a href="/shop" className="fd-cta">
              Shop Protein Now <ArrowIcon />
            </a>
            <a href="/about" className="fd-ghost">
              Read our story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
