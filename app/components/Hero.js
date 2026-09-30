'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import useIntroDone from './useIntroDone';

const HeroNumbers = dynamic(() => import('./HeroNumbers'), { ssr: false });

/**
 * Homepage hero.
 *
 * ≥1024px  A stage: the real store banner (pouches, left) with a studio panel on the right that
 *          replaces the banner's baked-in copy with crisp HTML text.
 * <1024px  The banner cropped to the pouches, then the copy strip.
 *
 * Sizing rules live under "Hero" in globals.css.
 */
const RADIUS = 'clamp(24px, 3.5vw, 48px)';

const BANNER = {
  src: '/hero-banner-2x.webp',
  // 1400 is the store's original; 2x/3x are Real-ESRGAN upscales of it for retina screens.
  srcSet: '/hero-banner.webp 1400w, /hero-banner-2x.webp 2800w, /hero-banner-3x.webp 4200w',
  alt: 'The Proteinest plant protein — Coffee Crew, Kulfi Mate and Choco Buddy pouches',
  width: 1400,
  height: 500,
};

/** Which layout is live, so only the visible copy block mounts a WebGL canvas. */
function useDesktop() {
  const [desktop, setDesktop] = useState(null);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
  return desktop;
}

/**
 * The copy stack. Each line is wrapped twice: the outer div is the scroll-reveal target, the
 * inner .hero-depth carries its own 3D depth (translateZ) inside the tilting stack.
 * The "24 g | 4 g" line is real 3D type (HeroNumbers) over an HTML fallback that hides once
 * the scene has rendered.
 */
function HeroCopy({ mount3d, hostRef }) {
  const introDone = useIntroDone(); // mount the 3D type after the intro so it can't stutter the loader
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  return (
    <div className="hero-copy" data-reveal-stagger="0.09">
      <div>
        <div className="hero-depth hero-nums" style={{ '--z': 52 }} data-ready={ready}>
          <p className="hero-copy-nums" aria-label="24 grams protein, 4 grams fibre">
            24 g<span className="hero-sep">|</span>4 g
          </p>
          {mount3d && introDone && <HeroNumbers pointerHost={hostRef} onReady={onReady} className="hero-nums-canvas" />}
        </div>
      </div>
      <div>
        <p className="hero-copy-labels hero-depth" style={{ '--z': 30 }}>
          Protein<span className="hero-sep">|</span>Fibre
        </p>
      </div>
      <div>
        <div className="hero-depth" style={{ '--z': 40 }}>
          <span className="hero-copy-pill">From Nature</span>
        </div>
      </div>
      <div>
        <p className="hero-copy-line hero-depth" style={{ '--z': 18 }}>
          Complete<span className="hero-sep">|</span>Clean
        </p>
      </div>
      <div>
        <p className="hero-copy-line hero-copy-line--big hero-depth" style={{ '--z': 24 }}>
          Easy to Digest
        </p>
      </div>
      <div>
        <div className="hero-depth" style={{ '--z': 48 }}>
          <a href="/shop" className="hero-copy-cta">
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const desktop = useDesktop();

  // Pointer over the hero tilts the copy stack (CSS vars read by .hero-copy).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let raf = 0;
    const set = (x, y) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', x.toFixed(3));
        el.style.setProperty('--py', y.toFixed(3));
      });
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => set(0, 0);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero hero-no-pad w-full relative overflow-hidden select-none"
      style={{
        padding: 0,
        margin: 0,
        borderBottomLeftRadius: RADIUS,
        borderBottomRightRadius: RADIUS,
        isolation: 'isolate',
        transform: 'translateZ(0)',
      }}
    >
      {/* ── ≥1024px: banner + studio panel ── */}
      <div className="hero-stage hidden lg:block">
        <a href="/shop" className="hero-stage-banner" aria-label="Shop the range" data-reveal="scale">
          <img
            src={BANNER.src}
            srcSet={BANNER.srcSet}
            sizes="(max-width: 1279px) 84vw, 76vw"
            alt={BANNER.alt}
            width={BANNER.width}
            height={BANNER.height}
            fetchPriority="high"
            decoding="async"
          />
        </a>
        <div className="hero-panel">
          <div className="hero-panel-inner">
            <HeroCopy mount3d={desktop === true} hostRef={sectionRef} />
          </div>
        </div>
      </div>

      {/* ── <1024px: cropped banner, then the copy strip ── */}
      <div className="lg:hidden">
        <a href="/shop" className="hero-banner-link block w-full leading-none" style={{ margin: 0 }} data-reveal="scale">
          <img
            src={BANNER.src}
            srcSet={BANNER.srcSet}
            sizes="(max-width: 480px) 280vw, (max-width: 767px) 210vw, 133vw"
            alt={BANNER.alt}
            width={BANNER.width}
            height={BANNER.height}
            fetchPriority="high"
            decoding="async"
            className="hero-banner-img w-full block select-none"
            style={{ padding: 0, margin: 0 }}
          />
        </a>
        <div className="hero-strip">
          <HeroCopy mount3d={desktop === false} hostRef={sectionRef} />
        </div>
      </div>
    </section>
  );
}
