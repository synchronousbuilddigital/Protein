'use client';

/**
 * "Why protein is important": editorial stat cards on a draggable rail.
 * Each card's headline stat counts up when it scrolls into view (and resets when it leaves),
 * the rail can be dragged with the pointer or stepped with the arrows, and a progress bar
 * tracks the position. Styles: "Why protein" in globals.css.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CARDS = [
  { id: 1, img: '/protein_gym_woman.png', pos: '50% 20%', alt: 'Woman training at gym with protein shake', label: 'Training & Recovery', quote: 'After every workout your muscles enter a 30-minute repair window. Without enough protein, the gains you worked for simply break down overnight.', stat: '30 min', statLabel: 'Recovery window' },
  { id: 2, img: '/protein_office_man.png', pos: '50% 25%', alt: 'Professional staying focused at work', label: 'Office & Focus', quote: 'Most working adults get under 50g of protein daily — less than half the minimum needed to maintain muscle mass, sharp focus, and all-day energy.', stat: '< 50g', statLabel: 'Average daily intake' },
  { id: 3, img: '/protein_morning_woman.png', pos: '50% 30%', alt: 'Woman making a healthy protein smoothie', label: 'Daily Nutrition', quote: 'A typical Indian meal delivers just 10–15g protein per serving. Hitting your daily target through food alone is nearly impossible without smart supplementation.', stat: '1.6g', statLabel: 'Per kg bodyweight needed' },
  { id: 4, img: '/protein_outdoor_runner.png', pos: '50% 30%', alt: 'Man jogging outdoors for fitness', label: 'Active Lifestyle', quote: 'Active individuals need up to 2× more protein than sedentary adults. Falling short means slower metabolism, fatigue, and constant sugar cravings.', stat: '2×', statLabel: 'Higher protein need' },
  { id: 5, img: '/rv1.png', pos: '50% 20%', alt: 'Healthy protein lifestyle and nutrition', label: 'Satiety & Metabolism', quote: 'Protein increases satiety hormones while curbing hunger signals. Hitting your daily protein requirement boosts metabolism and keeps energy steady.', stat: '20-30%', statLabel: 'Metabolic support' },
  { id: 6, img: '/avatar_shephali.png', pos: '50% 25%', alt: 'Healthy lifestyle and longevity', label: 'Immunity & Longevity', quote: 'Antibodies, enzymes, and cellular repair depend on essential amino acids. Preserving lean muscle mass is key to immune health and vibrant longevity.', stat: '9 Essential', statLabel: 'Amino acids needed' },
];

const pad = (n) => String(n).padStart(2, '0');

/** Splits "< 50g" into { prefix: '< ', value: 50, decimals: 0, suffix: 'g' } for the count-up. */
function parseStat(stat) {
  const m = stat.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { prefix: stat, value: null, decimals: 0, suffix: '' };
  const num = m[2];
  return { prefix: m[1], value: parseFloat(num), decimals: (num.split('.')[1] || '').length, suffix: m[3] };
}

/** Counts from 0 to the stat's number while `active` (written straight to the DOM node); shows 0 when not. */
function CountUp({ stat, active }) {
  const { prefix, value, decimals, suffix } = parseStat(stat);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || value === null) return;
    const write = (v) => {
      el.textContent = prefix + v.toFixed(decimals) + suffix;
    };
    if (!active) {
      write(0);
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n = { v: 0 };
    const tween = gsap.to(n, { v: value, duration: reduce ? 0 : 1.4, ease: 'power3.out', onStart: () => write(0), onUpdate: () => write(n.v) });
    return () => tween.kill();
  }, [active, value, decimals, prefix, suffix]);
  if (value === null) return <>{stat}</>;
  return <span ref={ref}>{prefix + value.toFixed(decimals) + suffix}</span>;
}

function ArrowIcon({ left = false }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={left ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Card({ card, index, railRef }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setActive(true);
      return;
    }
    // observe within the rail horizontally and the viewport vertically
    const io = new IntersectionObserver(([e]) => setActive(e.intersectionRatio >= 0.3), { root: null, threshold: [0, 0.3, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, [railRef]);

  return (
    <article ref={ref} className="why-card" data-active={active} style={{ '--i': index }}>
      <div className="why-media">
        <img src={card.img} alt={card.alt} style={{ objectPosition: card.pos }} loading={index < 3 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
        <span className="why-media-shade" aria-hidden />
        <span className="why-tag">{card.label}</span>
        <span className="why-index" aria-hidden>
          {pad(index + 1)}
        </span>
      </div>
      <div className="why-body">
        <span className="why-quote-mark" aria-hidden>
          “
        </span>
        <p className="why-quote">{card.quote}</p>
        <div className="why-stat">
          <span className="why-stat-num">
            <CountUp stat={card.stat} active={active} />
          </span>
          <span className="why-stat-label">{card.statLabel}</span>
          <span className="why-stat-bar" aria-hidden />
        </div>
      </div>
    </article>
  );
}

export default function ProteinWhySection() {
  const railRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });

  const update = useCallback(() => {
    const r = railRef.current;
    if (!r) return;
    const max = r.scrollWidth - r.clientWidth;
    const p = max > 0 ? r.scrollLeft / max : 0;
    setProgress(p);
    setAtStart(r.scrollLeft <= 8); // the rail's own padding leaves a few px at rest
    setAtEnd(r.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const r = railRef.current;
    if (!r) return;
    update();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    r.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      r.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, [update]);

  const step = (dir) => {
    const r = railRef.current;
    if (!r) return;
    const card = r.querySelector('.why-card');
    const w = card ? card.getBoundingClientRect().width + 20 : 340;
    r.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  // drag to scroll (mouse); snapping is suspended while dragging and restored on release
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = railRef.current;
    drag.current = { on: true, x: e.clientX, left: r.scrollLeft, moved: false };
    r.style.scrollSnapType = 'none';
    r.classList.add('is-dragging');
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.on) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 3) d.moved = true;
    railRef.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    const r = railRef.current;
    r.classList.remove('is-dragging');
    r.style.scrollSnapType = '';
  };

  return (
    <section className="why" aria-labelledby="why-title">
      <span className="why-ghost" aria-hidden data-parallax="0.35">
        PROTEIN
      </span>
      <div className="why-wrap">
        <div className="why-head" data-reveal-stagger="0.12">
          <span className="why-kicker">
            <i aria-hidden />
            The protein gap
            <i aria-hidden />
          </span>
          <h2 id="why-title" className="why-title">
            Why protein is <em>important.</em>
          </h2>
          <p className="why-sub editorial">Most Indian plates fall short. Here is what that costs you, and the number to aim for.</p>
        </div>

        <div className="why-railwrap" data-reveal="up" data-reveal-delay="0.1">
          <button type="button" className="why-arrow why-arrow--l" onClick={() => step(-1)} disabled={atStart} aria-label="Previous cards">
            <ArrowIcon left />
          </button>
          <div ref={railRef} className="why-rail" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerLeave={endDrag} onPointerCancel={endDrag}>
            {CARDS.map((c, i) => (
              <Card key={c.id} card={c} index={i} railRef={railRef} />
            ))}
          </div>
          <button type="button" className="why-arrow why-arrow--r" onClick={() => step(1)} disabled={atEnd} aria-label="Next cards">
            <ArrowIcon />
          </button>
        </div>

        <div className="why-foot">
          <div className="why-progress" aria-hidden>
            <span style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} />
          </div>
          <span className="why-hint">Drag to explore</span>
        </div>

        <div className="why-cta-row" data-reveal="up">
          <a href="/shop" className="why-cta">
            Fix your protein gap <ArrowIcon />
          </a>
          <a href="/calculator" className="why-ghostbtn">
            Calculate your daily need
          </a>
        </div>
      </div>
    </section>
  );
}
