'use client';

/**
 * Site-wide smooth scrolling (Lenis) synced to GSAP ScrollTrigger, plus a thin scroll-progress
 * bar at the top of the viewport. Mounted once in the root layout.
 *
 * - Lenis runs on GSAP's ticker so pinned / scrubbed ScrollTriggers stay frame-perfect.
 * - While the intro overlay is up the page is held still, and released on "proteinest:intro-done".
 * - In-page "#anchor" links glide instead of jumping. window.__lenis is exposed for scripted scrolls.
 * - Touch devices keep native scrolling; reduced-motion users get plain native scrolling.
 * - Add data-lenis-prevent to any element with its own scroll area (modals, drawers).
 */
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

export default function SmoothScroll() {
  const bar = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // progress bar (works with or without Lenis)
    const progress = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
      },
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => progress.kill();
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      smoothWheel: true,
      anchors: { offset: -90 }, // clear the floating navbar
    });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // hold the page still behind the intro overlay
    const intro = document.getElementById('proteinest-intro');
    const release = () => lenis.start();
    if (intro && intro.style.display !== 'none') {
      lenis.stop();
      window.addEventListener('proteinest:intro-done', release);
    }
    const safety = setTimeout(release, 12000);

    return () => {
      clearTimeout(safety);
      window.removeEventListener('proteinest:intro-done', release);
      gsap.ticker.remove(raf);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
      progress.kill();
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden>
      <span ref={bar} />
    </div>
  );
}
