'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import catalog from '@/public/products/manifest.json';

/** Product photography: the pouch shots from the brand banner first, then the store gallery (public/products/manifest.json). */
const photos = (slug) => catalog[slug]?.images ?? [];

/* ── Arrow Icon ── */
function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XSmIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckSmIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M2 6.5L4.8 9.5L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PRODUCTS = [
  {
    id: 'choco-buddy',
    tag: 'BEST SELLER',
    tagColor: '#FF683F',
    category: 'Plant Protein',
    title: 'Choco Buddy',
    subtitle: 'Rich Chocolate Flavor',
    rating: 4.9,
    reviews: 184,
    price: 1499,
    oldPrice: 1599,
    image: photos('choco-buddy')[0],
    gallery: photos('choco-buddy').slice(0, 4),
    isFeatured: true,
    highlights: ['24g Plant Isolate', '0g Added Sugar', '5.5g BCAAs'],
    sizes: [
      { label: '1 KG', price: 1499, oldPrice: 1599 },
      { label: '2 KG', price: 2799, oldPrice: 2999 },
    ],
    details: {
      description: 'Crafted for intense recovery & supreme dark chocolate flavor. Packed with 24g pure organic pea & brown rice plant protein isolate per scoop, zero added sugar, and digestive enzymes for zero bloat.',
      nutrition: [
        { label: 'Protein / scoop', val: '24g' },
        { label: 'BCAAs', val: '5.5g' },
        { label: 'Glutamine', val: '4.2g' },
        { label: 'Sugar', val: '0g Added' },
        { label: 'Calories', val: '118 kcal' },
      ],
      benefits: [
        'Ultra-clean 100% Organic Plant Protein Isolate',
        'Rich, creamy Belgian dark chocolate taste',
        'Fast absorption formula for post-workout muscle repair',
        'Informed Choice Certified & Lab Tested',
      ],
    },
  },
  {
    id: 'kulfi-mate',
    tag: 'NEW FLAVOR',
    tagColor: '#F59E0B',
    category: 'Plant Protein',
    title: 'Kulfi Mate',
    subtitle: 'Authentic Kulfi Flavor',
    rating: 4.85,
    reviews: 96,
    price: 1499,
    oldPrice: 1699,
    image: photos('kulfi-mate')[0],
    gallery: [photos('kulfi-mate')[0], photos('kulfi-mate')[1], photos('kulfi-mate')[2], photos('kulfi-mate')[4]],
    isFeatured: false,
    highlights: ['24g Plant Isolate', 'Saffron & Pistachio', 'Easy Digestion'],
    sizes: [
      { label: '1 KG', price: 1499, oldPrice: 1699 },
      { label: '2 KG', price: 2799, oldPrice: 2999 },
    ],
    details: {
      description: 'An authentic royal Indian treat transformed into performance nutrition. Infused with natural cardamom, saffron threads, and real pistachio bits.',
      nutrition: [
        { label: 'Protein / scoop', val: '24g' },
        { label: 'BCAAs', val: '5.4g' },
        { label: 'Glutamine', val: '4.0g' },
        { label: 'Sugar', val: '0g Added' },
        { label: 'Calories', val: '120 kcal' },
      ],
      benefits: [
        'Traditional Indian Kulfi flavor profile',
        'Real pistachio nuts and saffron essence',
        'Zero chalky aftertaste, effortless mixing',
        'Added DigeZyme® for smooth digestion',
      ],
    },
  },
  {
    id: 'coffee-crew',
    tag: 'EXCLUSIVE',
    tagColor: '#6B4226',
    category: 'Plant Protein',
    title: 'Coffee Crew',
    subtitle: 'Made from Arabica Coffee',
    rating: 4.9,
    reviews: 78,
    price: 1499,
    oldPrice: 1699,
    image: photos('coffee-crew')[0],
    gallery: photos('coffee-crew').slice(0, 4),
    isFeatured: false,
    highlights: ['24g Plant Isolate', 'Natural Coffee Extract', 'Zero Sugar'],
    sizes: [
      { label: '1 KG', price: 1499, oldPrice: 1699 },
      { label: '2 KG', price: 2799, oldPrice: 3199 },
    ],
    details: {
      description: 'Brewed for the coffee lover in you. Rich single-origin cold brew extract meets 24g of ultra-pure plant isolate — zero bitterness, smooth café-style taste with every scoop.',
      nutrition: [
        { label: 'Protein / scoop', val: '24g' },
        { label: 'BCAAs', val: '5.4g' },
        { label: 'Glutamine', val: '4.1g' },
        { label: 'Sugar', val: '0g Added' },
        { label: 'Calories', val: '119 kcal' },
      ],
      benefits: [
        'Natural cold brew coffee extract for authentic flavour',
        'Zero sugar, zero artificial sweeteners',
        'Smooth, creamy texture with no chalky aftertaste',
        'Added DigeZyme® for effortless digestion',
      ],
    },
  },
];

/* ── Per-product art direction: accent colour + the giant ghost word behind the stage ── */
const ART = {
  'choco-buddy': { accent: '#B25A2C', word: 'CHOCO' },
  'kulfi-mate': { accent: '#E0B44A', word: 'KULFI' },
  'coffee-crew': { accent: '#C27A3A', word: 'COFFEE' },
};
const pad = (n) => String(n).padStart(2, '0');
const STAT_ORDER = ['Protein / scoop', 'BCAAs', 'Sugar', 'Calories'];
const statsOf = (p) =>
  STAT_ORDER.map((l) => p.details.nutrition.find((x) => x.label === l))
    .filter(Boolean)
    .map((x) => {
      const label = x.label.replace(' / scoop', '');
      // "0g Added" + "Sugar" reads the same as "0g" + "Added sugar", and fits the stat tiles
      return /\sAdded$/.test(x.val) ? { label: 'Added sugar', val: x.val.replace(/\sAdded$/, '') } : { label, val: x.val };
    });

function StarIcon({ dim }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={dim ? 'rgba(255,255,255,0.18)' : '#F5C451'} aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Rating({ rating, reviews }) {
  const full = Math.round(rating);
  return (
    <div className="showcase-rating" aria-label={`Rated ${rating} out of 5 from ${reviews} reviews`}>
      <span className="flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} dim={i >= full} />
        ))}
      </span>
      <span className="showcase-rating-val">{rating}</span>
      <span className="showcase-rating-n">{reviews} verified reviews</span>
    </div>
  );
}

/** Glass badge that sits on the product photo. */
function ProteinBadge({ p }) {
  const protein = p.details.nutrition.find((x) => x.label === 'Protein / scoop');
  if (!protein) return null;
  return (
    <span className="showcase-badge">
      <strong>{protein.val}</strong>
      <span>protein / scoop</span>
    </span>
  );
}

/** Details column for one product (shared by the pinned showcase and the mobile carousel). */
function SlideInfo({ p, sizeIdx, qty, onSize, onAdd, onQty, onQuickView, compact = false }) {
  const art = ART[p.id];
  const currentSize = p.sizes[sizeIdx];
  const saving = currentSize.oldPrice ? currentSize.oldPrice - currentSize.price : 0;
  const stats = statsOf(p);
  return (
    <div className={`showcase-copy${compact ? ' showcase-copy--compact' : ''}`}>
      <div className="showcase-eyebrow">
        <span className="showcase-tag" style={{ background: p.tagColor }}>
          {p.tag}
        </span>
        <span className="showcase-eyebrow-line" aria-hidden />
        <span className="showcase-eyebrow-cat">{p.category}</span>
      </div>

      <div>
        <h3 className="showcase-title">{p.title}</h3>
        <p className="showcase-subtitle editorial">{p.subtitle}</p>
      </div>

      <Rating rating={p.rating} reviews={p.reviews} />

      <p className="showcase-desc">{p.details.description}</p>

      <dl className="showcase-stats">
        {stats.map((s) => (
          <div key={s.label}>
            <dd>{s.val}</dd>
            <dt>{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="showcase-buy">
        <div className="showcase-sizes" role="group" aria-label="Select weight">
          {p.sizes.map((s, idx) => (
            <button key={s.label} type="button" onClick={() => onSize(idx)} data-active={sizeIdx === idx} aria-pressed={sizeIdx === idx}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="showcase-price">
          <span className="showcase-price-now">₹{currentSize.price.toLocaleString('en-IN')}</span>
          <span className="showcase-price-per">/ {currentSize.label}</span>
          {currentSize.oldPrice && <s className="showcase-price-old">₹{currentSize.oldPrice.toLocaleString('en-IN')}</s>}
          {saving > 0 && (
            <span className="showcase-save" style={{ color: art.accent, borderColor: `${art.accent}66` }}>
              Save ₹{saving}
            </span>
          )}
        </div>
      </div>

      <div className="showcase-actions">
        {qty === 0 ? (
          <button type="button" onClick={onAdd} className="showcase-cta">
            <span>Add to Cart</span>
            <ArrowIcon />
          </button>
        ) : (
          <div className="showcase-cta showcase-cta--qty">
            <button type="button" onClick={() => onQty(-1)} aria-label="Remove one">−</button>
            <span>{qty} in cart</span>
            <button type="button" onClick={() => onQty(1)} aria-label="Add one">+</button>
          </div>
        )}
        <button type="button" onClick={onQuickView} className="showcase-ghost">
          Quick View
        </button>
      </div>

      <p className="showcase-micro">Certified · Lab tested · Made in India</p>
    </div>
  );
}

function SectionHeader({ className = '' }) {
  return (
    <div className={`showcase-headwrap ${className}`}>
      <span className="showcase-kicker">
        <i aria-hidden />
        Our Products
        <i aria-hidden />
      </span>
      <h2 className="showcase-h2">Start With A Favorite</h2>
      <p className="showcase-head-sub editorial">Three flavours. One clean plant formula.</p>
    </div>
  );
}

function ExploreCta({ className = '' }) {
  return (
    <a href="/shop" className={`showcase-explore ${className}`}>
      Explore the full collection <ArrowIcon />
    </a>
  );
}

export default function ProductsSection() {
  const [selectedSizes, setSelectedSizes] = useState({ 'choco-buddy': 0, 'kulfi-mate': 0, 'coffee-crew': 0 });
  const [cartCount, setCartCount] = useState({ 'choco-buddy': 0, 'kulfi-mate': 0, 'coffee-crew': 0 });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewImg, setQuickViewImg] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  // pinned showcase (≥1024px)
  const pinRef = useRef(null);
  const mediaRefs = useRef([]);
  const infoRefs = useRef([]);
  const wordRefs = useRef([]);
  const tiltRef = useRef(null);
  const railFillRef = useRef(null);
  const triggerRef = useRef(null);
  const [active, setActive] = useState(0);

  // mobile / tablet carousel
  const railRef = useRef(null);
  const [railActive, setRailActive] = useState(0);

  const n = PRODUCTS.length;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };
  const handleSizeChange = (productId, index) => setSelectedSizes((prev) => ({ ...prev, [productId]: index }));
  const handleAddToCart = (product) => {
    const sizeObj = product.sizes[selectedSizes[product.id] || 0];
    setCartCount((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    showToast(`Added ${product.title} (${sizeObj.label}) to your cart!`);
  };
  const handleUpdateQty = (productId, delta) =>
    setCartCount((prev) => ({ ...prev, [productId]: Math.max(0, (prev[productId] || 0) + delta) }));
  const openQuickView = (p) => {
    setQuickViewProduct(p);
    setQuickViewImg(0);
  };

  /* ── Scroll-driven showcase: pin the stage for (n-1) screens; each screen = one transition ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const media = mediaRefs.current.filter(Boolean);
      const infos = infoRefs.current.filter(Boolean);
      const words = wordRefs.current.filter(Boolean);
      if (!pinRef.current || media.length < 2) return;

      gsap.set(media.slice(1), { yPercent: 38, opacity: 0, scale: 0.9, rotate: 3 });
      gsap.set(infos.slice(1), { y: 40, opacity: 0 });
      gsap.set(words.slice(1), { xPercent: 14, opacity: 0 });

      // Lenis-driven snap: once scrolling pauses inside the pin, glide to the next product in the
      // direction of travel (a small nudge below 8% of a step falls back to the current one).
      let snapTimer = 0;
      let snapDir = 1;
      const scheduleSnap = (self) => {
        clearTimeout(snapTimer);
        snapTimer = setTimeout(() => {
          const lenis = window.__lenis;
          if (!lenis || !self.isActive) return;
          const seg = self.progress * (n - 1);
          const target = Math.min(n - 1, Math.max(0, snapDir > 0 ? Math.ceil(seg - 0.08) : Math.floor(seg + 0.08)));
          const y = self.start + ((self.end - self.start) * target) / (n - 1);
          if (Math.abs(window.scrollY - y) > 2) lenis.scrollTo(y, { duration: 0.75 });
        }, 170);
      };

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: () => '+=' + (n - 1) * window.innerHeight,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // inertia:false = snap by where the scroll actually is (not a velocity guess), so one flick
          // never skips a product; directional keeps a short flick advancing to the next one.
          // With Lenis smooth scrolling the snap is done through Lenis (below); ScrollTrigger's own
          // snap would fight it. Without Lenis (reduced motion) the native snap is used.
          ...(window.__lenis ? {} : { snap: { snapTo: 1 / (n - 1), duration: { min: 0.3, max: 0.7 }, delay: 0.1, ease: 'power2.inOut', inertia: false, directional: true } }),
          onUpdate: (self) => {
            if (self.direction) snapDir = self.direction;
            scheduleSnap(self);
            const i = Math.round(self.progress * (n - 1));
            setActive((a) => (a === i ? a : i));
            if (railFillRef.current) railFillRef.current.style.transform = `scaleY(${self.progress})`;
          },
        },
      });
      for (let i = 1; i < n; i++) {
        const at = i - 1;
        // Outgoing fades fast (power1.inOut) while it drifts up; incoming fades in only once the
        // outgoing is mostly gone, so the two photos never sit on top of each other.
        tl.to(media[i - 1], { yPercent: -38, scale: 0.9, rotate: -3, duration: 0.55, ease: 'power2.in' }, at)
          .to(media[i - 1], { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, at)
          .to(infos[i - 1], { y: -40, duration: 0.45, ease: 'power2.in' }, at + 0.04)
          .to(infos[i - 1], { opacity: 0, duration: 0.34, ease: 'power1.inOut' }, at + 0.04)
          .to(words[i - 1], { xPercent: -14, opacity: 0, duration: 0.55, ease: 'power2.in' }, at)
          .to(media[i], { yPercent: 0, scale: 1, rotate: 0, duration: 0.6, ease: 'power2.out' }, at + 0.4)
          .to(media[i], { opacity: 1, duration: 0.45, ease: 'power1.out' }, at + 0.42)
          .to(infos[i], { y: 0, duration: 0.5, ease: 'power2.out' }, at + 0.5)
          .to(infos[i], { opacity: 1, duration: 0.4, ease: 'power1.out' }, at + 0.52)
          .to(words[i], { xPercent: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, at + 0.42);
      }
      triggerRef.current = tl.scrollTrigger;
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      return () => {
        clearTimeout(snapTimer);
        window.removeEventListener('load', refresh);
        tl.kill();
        triggerRef.current = null;
      };
    });
    return () => mm.revert();
  }, [n]);

  /* ── Pointer tilt on the photo card (desktop, pointer devices only) ── */
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)', () => {
      const el = tiltRef.current;
      if (!el) return;
      const cards = el.querySelectorAll('.showcase-card3d');
      gsap.set(cards, { transformPerspective: 1100 });
      const rx = gsap.quickTo(cards, 'rotationX', { duration: 0.7, ease: 'power3.out' });
      const ry = gsap.quickTo(cards, 'rotationY', { duration: 0.7, ease: 'power3.out' });
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ry(x * 10);
        rx(-y * 8);
      };
      const onLeave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    });
    return () => mm.revert();
  }, []);

  const jumpTo = useCallback(
    (i) => {
      const st = triggerRef.current;
      if (!st) return;
      const top = st.start + ((st.end - st.start) * i) / (n - 1);
      if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.1 });
      else window.scrollTo({ top, behavior: 'smooth' });
    },
    [n]
  );

  /* ── Carousel dots ── */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = rail.querySelectorAll('[data-slide]');
        if (!cards.length) return;
        const mid = rail.scrollLeft + rail.clientWidth / 2;
        let best = 0;
        let dist = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < dist) {
            dist = d;
            best = i;
          }
        });
        setRailActive((a) => (a === best ? a : best));
      });
    };
    rail.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      rail.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  const railJump = (i) => {
    const card = railRef.current?.querySelectorAll('[data-slide]')[i];
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const infoProps = (p) => ({
    p,
    sizeIdx: selectedSizes[p.id] || 0,
    qty: cartCount[p.id] || 0,
    onSize: (idx) => handleSizeChange(p.id, idx),
    onAdd: () => handleAddToCart(p),
    onQty: (d) => handleUpdateQty(p.id, d),
    onQuickView: () => openQuickView(p),
  });

  return (
    <section id="shop" className="showcase w-full relative overflow-hidden" style={{ background: '#0E2016', borderRadius: 'clamp(24px, 3.5vw, 48px)' }}>
      {/* ═══ ≥1024px: pinned, scroll-driven showcase (one product per screen) ═══ */}
      <div className="showcase-desktop">
        <div ref={pinRef} className="showcase-pin">
          {/* ambient glow per product */}
          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              aria-hidden
              className="showcase-glow"
              style={{
                background: `radial-gradient(48% 55% at 34% 58%, ${ART[p.id].accent}59 0%, rgba(14,32,22,0) 70%), radial-gradient(30% 40% at 78% 30%, ${ART[p.id].accent}22 0%, rgba(14,32,22,0) 70%)`,
                opacity: active === i ? 1 : 0,
              }}
            />
          ))}
          <div className="showcase-vignette" aria-hidden />
          <div className="showcase-grain" aria-hidden />

          <SectionHeader className="showcase-head" />

          <div className="showcase-grid showcase-grid--card" style={{ '--accent': ART[PRODUCTS[active].id].accent }}>
            <div className="showcase-shell" aria-hidden />
            {/* giant flavour word behind the stage */}
            <div className="showcase-words" aria-hidden>
              {PRODUCTS.map((p, i) => (
                <span
                  key={p.id}
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className="showcase-word"
                >
                  {ART[p.id].word}
                </span>
              ))}
            </div>

            {/* product photos, stacked */}
            <div ref={tiltRef} className="showcase-media">
              {PRODUCTS.map((p, i) => (
                <div
                  key={p.id}
                  ref={(el) => {
                    mediaRefs.current[i] = el;
                  }}
                  className="showcase-media-item"
                  aria-hidden={active !== i}
                >
                  <div className="showcase-card3d">
                    <span className="showcase-pedestal" style={{ background: ART[p.id].accent }} aria-hidden />
                    <figure className="showcase-frame">
                      <img src={p.image} alt={p.title} className="showcase-img" loading={i === 0 ? 'eager' : 'lazy'} />
                      <span className="showcase-card-word" aria-hidden>
                        {ART[p.id].word}
                      </span>
                      <span className="showcase-card-count" aria-hidden>
                        {pad(i + 1)} <i>/ {pad(PRODUCTS.length)}</i>
                      </span>
                      <ProteinBadge p={p} />
                    </figure>
                  </div>
                </div>
              ))}
            </div>

            {/* product details, stacked */}
            <div className="showcase-info">
              {PRODUCTS.map((p, i) => (
                <div
                  key={p.id}
                  ref={(el) => {
                    infoRefs.current[i] = el;
                  }}
                  className="showcase-info-item"
                  style={{ pointerEvents: active === i ? 'auto' : 'none' }}
                  aria-hidden={active !== i}
                >
                  <SlideInfo {...infoProps(p)} />
                </div>
              ))}
            </div>
          </div>

          {/* progress rail */}
          <nav className="showcase-rail-nav" aria-label="Products">
            {PRODUCTS.map((p, i) => (
              <button key={p.id} type="button" onClick={() => jumpTo(i)} className="showcase-rail-btn" data-active={active === i} aria-current={active === i}>
                <span className="showcase-rail-label">{p.title}</span>
                <span className="showcase-rail-num">{pad(i + 1)}</span>
              </button>
            ))}
            <span className="showcase-rail-track" aria-hidden>
              <span ref={railFillRef} className="showcase-rail-fill" />
            </span>
          </nav>

          <div className="showcase-foot">
            <span className="showcase-hint" style={{ opacity: active === n - 1 ? 0 : 1 }}>
              <span className="showcase-hint-line" aria-hidden />
              Scroll for the next flavour
            </span>
            <ExploreCta />
          </div>
        </div>
      </div>

      {/* ═══ <1024px (and reduced motion): swipeable carousel, one product per card ═══ */}
      <div className="showcase-mobile py-14 sm:py-16">
        <SectionHeader className="px-6 mb-8" />
        <div ref={railRef} className="showcase-rail">
          {PRODUCTS.map((p, i) => (
            <article key={p.id} data-slide className="showcase-card" data-active={railActive === i} style={{ '--accent': ART[p.id].accent }}>
              <div className="showcase-card-glow" aria-hidden />
              <div className="showcase-card-media">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
                <span className="showcase-card-word" aria-hidden>
                  {ART[p.id].word}
                </span>
                <span className="showcase-card-count" aria-hidden>
                  {pad(i + 1)} <i>/ {pad(PRODUCTS.length)}</i>
                </span>
                <ProteinBadge p={p} />
              </div>
              <div className="showcase-card-body">
                <SlideInfo {...infoProps(p)} compact />
              </div>
            </article>
          ))}
        </div>
        <div className="showcase-pager" role="tablist" aria-label="Products">
          <span className="showcase-pager-num" aria-hidden>
            {pad(railActive + 1)}
          </span>
          <div className="showcase-pager-tabs">
            {PRODUCTS.map((p, i) => (
              <button key={p.id} type="button" role="tab" aria-selected={railActive === i} aria-label={p.title} onClick={() => railJump(i)} data-active={railActive === i}>
                <span style={{ background: ART[p.id].accent }} />
              </button>
            ))}
          </div>
          <span className="showcase-pager-num showcase-pager-num--dim" aria-hidden>
            {pad(PRODUCTS.length)}
          </span>
        </div>
        <div className="text-center mt-10 px-6">
          <ExploreCta />
        </div>
      </div>

      {/* Quick View Modal — kept functional, dark green styled */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
            style={{ background: '#163526', border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-white"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <XSmIcon />
            </button>

            <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center" style={{ background: '#0E2016' }}>
              <span
                className="self-start mb-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white"
                style={{ background: quickViewProduct.tagColor }}
              >
                {quickViewProduct.tag}
              </span>
              <img
                src={(quickViewProduct.gallery ?? [quickViewProduct.image])[quickViewImg] ?? quickViewProduct.image}
                alt={quickViewProduct.title}
                className="w-full max-h-[240px] object-cover rounded-2xl shadow-2xl"
              />
              {quickViewProduct.gallery?.length > 1 && (
                <div className="flex gap-2 mt-3 flex-wrap justify-center">
                  {quickViewProduct.gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setQuickViewImg(i)}
                      className="w-12 h-12 rounded-lg overflow-hidden border-2 transition-all"
                      style={{ borderColor: i === quickViewImg ? '#FF683F' : 'rgba(255,255,255,0.15)', opacity: i === quickViewImg ? 1 : 0.7 }}
                      aria-label={`View photo ${i + 1}`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto" data-lenis-prevent>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#FF683F] mb-1">{quickViewProduct.category}</p>
              <h3 className="text-3xl font-extrabold text-white tracking-tight mb-1" style={{ fontFamily: 'var(--font-fira-sans)' }}>
                {quickViewProduct.title}
              </h3>
              <p className="text-xs text-white/50 font-medium mb-4">{quickViewProduct.subtitle}</p>
              <p className="text-xs text-white/70 leading-relaxed mb-4">{quickViewProduct.details.description}</p>

              <div className="rounded-xl p-3 border border-white/10 mb-4" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2">Key Nutrition</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {quickViewProduct.details.nutrition.map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-white/50">{item.label}</span>
                      <span className="font-bold text-white">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6 space-y-1.5">
                {quickViewProduct.details.benefits.map((b, idx) => (
                  <div key={idx} className="text-[11px] text-white/70 flex items-center gap-1.5">
                    <span className="text-[#FF683F]"><CheckSmIcon /></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <div className="text-2xl font-extrabold text-white" style={{ fontFamily: 'var(--font-fira-sans)' }}>
                    ₹{quickViewProduct.price.toLocaleString('en-IN')}
                  </div>
                  {quickViewProduct.oldPrice && (
                    <div className="text-[10px] text-[#FF683F] font-bold uppercase">
                      Save ₹{(quickViewProduct.oldPrice - quickViewProduct.price).toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => { handleAddToCart(quickViewProduct); setQuickViewProduct(null); }}
                  className="px-6 py-3 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 hover:opacity-90"
                  style={{ background: '#FF683F' }}
                >
                  Add To Cart <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3"
          style={{ background: '#163526', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-xs opacity-60 hover:opacity-100">
            <XSmIcon />
          </button>
        </div>
      )}
    </section>
  );
}
