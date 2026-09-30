'use client';

/**
 * Shop — premium storefront.
 * Dark hero (word-reveal title, trust chips, jump links), then each product as its own chapter on a
 * tinted backdrop (.band → scroll-scrubbed transitions from ScrollReveal): glass-framed gallery with a
 * flavour ghost word, editorial details, segmented sizes, per-serving price, gradient CTA and a trust
 * row. A guarantees strip closes the page. Styles: "Shop" in globals.css.
 */
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

import catalog from '@/public/products/manifest.json';

/** Product photography: the pouch shots first, then the store gallery (public/products/manifest.json). */
const photos = (slug) => catalog[slug]?.images ?? [];

/* per-product art direction: backdrop tint, glows, ghost word */
const ART = {
  'choco-buddy': { word: 'CHOCO', tint: '#f5ece6', a: 'rgba(178, 90, 44, 0.16)', b: 'rgba(47, 107, 73, 0.1)', accent: '#B25A2C' },
  'kulfi-mate': { word: 'KULFI', tint: '#f7f0e2', a: 'rgba(224, 180, 74, 0.2)', b: 'rgba(255, 104, 63, 0.1)', accent: '#C9971C' },
  'coffee-crew': { word: 'COFFEE', tint: '#f2ece5', a: 'rgba(138, 90, 46, 0.16)', b: 'rgba(26, 64, 48, 0.1)', accent: '#8A5A2E' },
  'steel-shaker': { word: 'STEEL', tint: '#eef0ee', a: 'rgba(90, 100, 110, 0.14)', b: 'rgba(255, 104, 63, 0.09)', accent: '#4B5563' },
};
const pad = (n) => String(n).padStart(2, '0');
const servingsOf = (label) => {
  const m = label.match(/(\d+)\s*Servings/i);
  return m ? parseInt(m[1], 10) : null;
};

/* ── icons (SVG, 24×24) ── */
const Svg = ({ children, size = 18, fill = 'none', ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {children}
  </svg>
);
const StarIcon = ({ dim }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={dim ? 'rgba(20,20,20,0.15)' : '#F5A524'} aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CheckIcon = () => <Svg size={13} strokeWidth="2.6"><polyline points="20 6 9 17 4 12" /></Svg>;
const BagIcon = () => (
  <Svg>
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </Svg>
);
const ZapIcon = () => <Svg><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Svg>;
const TruckIcon = () => (
  <Svg>
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </Svg>
);
const ShieldIcon = () => (
  <Svg>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);
const RefreshIcon = () => (
  <Svg>
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </Svg>
);
const LeafIcon = () => (
  <Svg>
    <path d="M20 4s-2 10-8 14-10 2-10 2 2-10 8-14 10-2 10-2z" />
    <path d="M2 20 10 12" />
  </Svg>
);
const ArrowDown = () => <Svg size={14}><path d="M12 5v14M6 13l6 6 6-6" /></Svg>;

/* ── one product chapter ── */
function ProductChapter({ product, index, total }) {
  const art = ART[product.id] || ART['choco-buddy'];
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);
  const [activeImg, setActiveImg] = useState(0); // locked by click / tap / Enter
  const [previewImg, setPreviewImg] = useState(null); // shown while hovering or focusing a thumbnail
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const shownImg = previewImg ?? activeImg;
  const flip = index % 2 === 1;

  const size = product.sizes[selectedSize];
  const total$ = size.price * quantity;
  const servings = servingsOf(size.label);
  const perServing = servings ? Math.round(size.price / servings) : null;
  const saving = size.oldPrice ? (size.oldPrice - size.price) * quantity : 0;

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  return (
    <section
      id={product.id}
      className="shop-chapter band"
      style={{ '--tint': art.tint, '--glow-a': art.a, '--glow-a-at': flip ? '85% 30%' : '15% 30%', '--glow-b': art.b, '--glow-b-at': flip ? '10% 85%' : '90% 85%', '--accent': art.accent }}
      aria-labelledby={`${product.id}-title`}
    >
      <div className={`shop-grid${flip ? ' shop-grid--flip' : ''}`}>
        {/* gallery */}
        <div className="shop-media" data-reveal={flip ? 'right' : 'left'}>
          <span className="shop-ghost" aria-hidden data-parallax="0.18">
            {art.word}
          </span>
          <figure className="shop-frame">
            {/* all photos stacked: swapping is a pure crossfade; the hover zoom lives on the wrapper */}
            <div className="shop-stack">
              {gallery.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={i === shownImg ? `${product.title}, photo ${i + 1} of ${gallery.length}` : ''}
                  aria-hidden={i !== shownImg}
                  className="shop-photo"
                  data-shown={i === shownImg}
                  loading={index === 0 && i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ))}
            </div>
            <span className="shop-chip shop-chip--tag" style={{ background: product.tagBg }}>
              {product.tag}
            </span>
            {product.discount && <span className="shop-chip shop-chip--glass">{product.discount}</span>}
            <span className="shop-count" aria-hidden>
              {pad(index + 1)} <span>/ {pad(total)}</span>
            </span>
          </figure>
          {gallery.length > 1 && (
            <div
              className="shop-thumbs"
              role="tablist"
              aria-label={`${product.title} photos`}
              onMouseLeave={() => setPreviewImg(null)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setPreviewImg(null);
              }}
            >
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={i === activeImg}
                  aria-label={`Show photo ${i + 1}`}
                  className="shop-thumb"
                  data-active={i === activeImg}
                  data-preview={previewImg === i && i !== activeImg}
                  onMouseEnter={() => setPreviewImg(i)}
                  onFocus={() => setPreviewImg(i)}
                  onClick={() => {
                    setActiveImg(i);
                    setPreviewImg(null);
                  }}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* details */}
        <div className="shop-info" data-reveal-stagger="0.07">
          <div className="shop-eyebrow">
            <span>{product.category}</span>
            <i aria-hidden />
            <span className="shop-eyebrow-num">No. {pad(index + 1)}</span>
          </div>
          <h2 id={`${product.id}-title`} className="shop-title" data-split>
            {product.title}
          </h2>
          <p className="shop-sub editorial">{product.subtitle}</p>
          <div className="shop-rating" aria-label={`Rated ${product.rating} out of 5 from ${product.reviews} reviews`}>
            <span className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} dim={i >= Math.round(product.rating)} />
              ))}
            </span>
            <strong>{product.rating}</strong>
            <span>{product.reviews} verified reviews</span>
          </div>
          <p className="shop-desc">{product.description}</p>

          <dl className="shop-stats">
            {product.highlights.map((h) => (
              <div key={h.title}>
                <dd>{h.title}</dd>
                <dt>{h.desc}</dt>
              </div>
            ))}
          </dl>

          {product.sizes.length > 1 && (
            <div className="shop-field">
              <span className="shop-label">Choose your pack</span>
              <div className="shop-seg" role="radiogroup" aria-label="Pack size">
                {product.sizes.map((s, i) => (
                  <button key={s.label} type="button" role="radio" aria-checked={i === selectedSize} data-active={i === selectedSize} onClick={() => setSelectedSize(i)}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {product.sizes.length === 1 && <p className="shop-single">{size.label}</p>}

          <div className="shop-price">
            <span className="shop-price-now">₹{total$.toLocaleString('en-IN')}</span>
            {size.oldPrice && <s>₹{(size.oldPrice * quantity).toLocaleString('en-IN')}</s>}
            {saving > 0 && <span className="shop-save">Save ₹{saving.toLocaleString('en-IN')}</span>}
            {perServing && <span className="shop-per">₹{perServing} / serving</span>}
          </div>

          <div className="shop-buy">
            <div className="shop-qty" aria-label="Quantity">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>
            <button type="button" className="shop-cta" onClick={() => flash(`Added ${quantity} × ${product.title} (${size.label}) to your cart`)}>
              <BagIcon /> Add to cart
            </button>
            <button type="button" className="shop-ghostbtn" onClick={() => flash(`${product.title} reserved — continue to checkout`)}>
              <ZapIcon /> Buy now
            </button>
          </div>

          <div className={`shop-toast${toast ? ' is-on' : ''}`} role="status" aria-live="polite">
            <span className="shop-toast-tick">
              <CheckIcon />
            </span>
            {toast}
          </div>

          <ul className="shop-trust">
            <li>
              <TruckIcon /> Free shipping over ₹999
            </li>
            <li>
              <ShieldIcon /> Third-party lab tested
            </li>
            <li>
              <RefreshIcon /> 7-day easy returns
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── page ── */
export default function ShopPage() {
  const PRODUCTS_DATA = [
    {
      id: 'choco-buddy',
      category: 'PROTEIN ISOLATE',
      tag: 'BEST SELLER',
      tagBg: '#F4512A',
      discount: '6% OFF',
      title: 'Choco Buddy',
      subtitle: 'Rich Belgian Dark Chocolate Plant Isolate',
      rating: 4.9,
      reviews: 184,
      image: photos('choco-buddy')[0],
      gallery: photos('choco-buddy'),
      glowBg: 'radial-gradient(circle, rgba(244,81,42,0.25) 0%, transparent 70%)',
      description:
        'Crafted for intense muscle recovery and supreme Belgian dark chocolate taste. Formulated with 24g pure organic pea & brown rice plant protein isolate per scoop, zero added sugar, and digestive enzymes for guaranteed zero bloat.',
      highlights: [
        { title: '24g Protein', desc: 'Plant Isolate' },
        { title: '0g Sugar', desc: 'No Added Sugar' },
        { title: '5.5g BCAAs', desc: 'Fast Recovery' },
      ],
      sizes: [
        { label: '1 KG (30 Servings)', price: 1499, oldPrice: 1599 },
        { label: '2 KG (60 Servings)', price: 2799, oldPrice: 2999 },
      ],
    },
    {
      id: 'kulfi-mate',
      category: 'PROTEIN ISOLATE',
      tag: 'NEW FLAVOR',
      tagBg: '#D97706',
      discount: 'POPULAR',
      title: 'Kulfi Mate',
      subtitle: 'Authentic Royal Kulfi Plant Isolate',
      rating: 4.85,
      reviews: 96,
      image: photos('kulfi-mate')[0],
      gallery: photos('kulfi-mate'),
      glowBg: 'radial-gradient(circle, rgba(217,119,6,0.25) 0%, transparent 70%)',
      description:
        'Inspired by traditional royal Indian kulfi with natural saffron & cardamom notes. Delivers 24g ultra-clean organic plant protein isolate per serving with effortless digestion and pure monk fruit sweetness.',
      highlights: [
        { title: '24g Protein', desc: 'Per Scoop' },
        { title: 'Natural Monk', desc: 'Fruit Sweetened' },
        { title: 'Gut Friendly', desc: 'Zero Bloat' },
      ],
      sizes: [
        { label: '1 KG (30 Servings)', price: 1499, oldPrice: 1599 },
        { label: '2 KG (60 Servings)', price: 2799, oldPrice: 2999 },
      ],
    },
    {
      id: 'coffee-crew',
      category: 'PROTEIN ISOLATE',
      tag: 'EXCLUSIVE',
      tagBg: '#6B4226',
      discount: '12% OFF',
      title: 'Coffee Crew',
      subtitle: 'Rich Single-Origin Cold Brew Coffee Plant Isolate',
      rating: 4.9,
      reviews: 78,
      image: photos('coffee-crew')[0],
      gallery: photos('coffee-crew'),
      glowBg: 'radial-gradient(circle, rgba(107,66,38,0.25) 0%, transparent 70%)',
      description:
        'Brewed for the coffee lover in you. Single-origin cold brew extract meets 24g of ultra-pure plant protein isolate per scoop — zero bitterness, smooth café-style taste, zero added sugar, and DigeZyme® for smooth digestion.',
      highlights: [
        { title: '24g Protein', desc: 'Plant Isolate' },
        { title: 'Cold Brew', desc: 'Real Coffee Extract' },
        { title: '0g Sugar', desc: 'Café Quality' },
      ],
      sizes: [
        { label: '1 KG (30 Servings)', price: 1499, oldPrice: 1699 },
        { label: '2 KG (60 Servings)', price: 2799, oldPrice: 3199 },
      ],
    },
    {
      id: 'steel-shaker',
      category: 'SHAKER ACCESSORIES',
      tag: 'SIGNATURE GEAR',
      tagBg: '#111111',
      discount: 'MUST HAVE',
      title: 'Steel Shaker',
      subtitle: 'Double-Wall Stainless Steel Insulated Shaker',
      rating: 4.95,
      reviews: 212,
      image: photos('steel-shaker')[0],
      gallery: photos('steel-shaker'),
      glowBg: 'radial-gradient(circle, rgba(100,100,100,0.2) 0%, transparent 70%)',
      description:
        'Engineered for ice-cold shakes that stay chilled for 24+ hours. Made from premium food-grade 18/8 stainless steel with a 100% leak-proof flip lid, internal silent blending whisk, and zero odor retention.',
      highlights: [
        { title: '750 ml', desc: 'Capacity' },
        { title: '24 Hours', desc: 'Chilled Storage' },
        { title: 'BPA-Free', desc: 'Food-Grade 18/8' },
      ],
      sizes: [
        { label: '750 ML Matte Black / Steel', price: 799, oldPrice: 999 },
      ],
    },
  ];

  return (
    <main className="shop min-h-screen text-[#141414]">
      <Navbar />
      <ScrollReveal />

      {/* hero */}
      <section className="shop-hero" aria-labelledby="shop-title">
        <div className="shop-hero-glow" aria-hidden />
        <div className="shop-hero-grain" aria-hidden />
        <span className="shop-hero-ghost" aria-hidden data-parallax="0.25">
          SHOP
        </span>
        <div className="shop-hero-inner" data-reveal-stagger="0.1">
          <span className="shop-kicker">
            <i aria-hidden />
            The collection
            <i aria-hidden />
          </span>
          <h1 id="shop-title" className="shop-hero-title" data-split>
            Clean protein, <em>crafted to perform.</em>
          </h1>
          <p className="shop-hero-sub">Three plant-based flavours and the shaker built for them. 24 g protein per scoop, no fillers, no bloat.</p>
          <ul className="shop-hero-chips" aria-label="Highlights">
            <li>
              <LeafIcon /> 100% plant-based
            </li>
            <li>
              <ShieldIcon /> NABL lab tested
            </li>
            <li>
              <TruckIcon /> Free shipping over ₹999
            </li>
          </ul>
          <nav className="shop-jump" aria-label="Jump to product">
            {PRODUCTS_DATA.map((p, i) => (
              <a key={p.id} href={`#${p.id}`}>
                <span>{pad(i + 1)}</span>
                {p.title}
              </a>
            ))}
          </nav>
          <span className="shop-scroll" aria-hidden>
            <ArrowDown /> Scroll to explore
          </span>
        </div>
      </section>

      {PRODUCTS_DATA.map((product, idx) => (
        <ProductChapter key={product.id} product={product} index={idx} total={PRODUCTS_DATA.length} />
      ))}

      {/* guarantees */}
      <section className="shop-promise band band--ivory" aria-label="Our promise">
        <div className="shop-promise-grid" data-reveal-stagger="0.1">
          {[
            { icon: <ShieldIcon />, t: 'Tested every batch', d: 'Purity, heavy metals and pesticides checked by NABL-accredited labs.' },
            { icon: <LeafIcon />, t: 'Clean label', d: 'Real Spanish cocoa and vanilla bean. No gums, fillers or preservatives.' },
            { icon: <TruckIcon />, t: 'Fast, free delivery', d: 'Free shipping on orders over ₹999, tracked to your door.' },
            { icon: <RefreshIcon />, t: 'Easy returns', d: 'Not for you? Return unopened packs within 7 days.' },
          ].map((x) => (
            <div key={x.t} className="shop-promise-card">
              <span className="shop-promise-icon">{x.icon}</span>
              <strong>{x.t}</strong>
              <p>{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
