'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

import proteinImg from '../../public/protein.png';
import kulfiImg from '../../public/badamkhulfi.png';
import shakerImg from '../../public/steel-shaker.png';

/* ── SVG Icon Components ─────────────────────────────────────── */
function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4512A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4512A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4512A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

/* ── Scroll-Observer Hook for Smooth Entry Motion ──────────────── */
function useScrollReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.18 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
}

/* ── Product Card Component (Alternating Split Layout) ───────────── */
function ProductRow({ product, index }) {
  const [ref, isVisible] = useScrollReveal();
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const isEven = index % 2 === 0;

  const handleAddToCart = () => {
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const currentSize = product.sizes[selectedSize];
  const totalPrice = currentSize.price * quantity;

  return (
    <div
      ref={ref}
      id={product.id}
      className={`py-16 sm:py-24 border-b border-[#E6E1D8] last:border-b-0 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* IMAGE SIDE */}
          <div
            className={`lg:col-span-6 relative flex items-center justify-center ${
              isEven ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            {/* Ambient Radial Backlight Glow */}
            <div
              className="absolute inset-0 blur-3xl rounded-full scale-125 pointer-events-none opacity-60 transition-transform duration-700 hover:scale-135"
              style={{ background: product.glowBg }}
            />

            {/* Main Product Showcase Box */}
            <div className="relative w-full max-w-[480px] h-[380px] sm:h-[460px] lg:h-[500px] rounded-[32px] bg-white border border-[#E6E1D8] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 flex items-center justify-center group overflow-hidden">
              
              {/* Badge Tag */}
              <div className="absolute top-5 left-5 z-20">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-md" style={{ backgroundColor: product.tagBg }}>
                  {product.tag}
                </span>
              </div>

              {/* Discount Tag */}
              {product.discount && (
                <div className="absolute top-5 right-5 z-20">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-black text-white shadow-sm">
                    {product.discount}
                  </span>
                </div>
              )}

              {/* High-Res Product Hero Image with 3D Motion Zoom */}
              <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-500 ease-out group-hover:scale-108">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[85%] max-w-[85%] object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
                />
              </div>

              {/* Subtle hover sparkle label */}
              <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[11px] font-semibold text-[#6B625D] bg-[#F8F6F2] px-3 py-1 rounded-full border border-black/5">
                Hover to zoom
              </div>
            </div>
          </div>

          {/* DETAILS SIDE */}
          <div
            className={`lg:col-span-6 flex flex-col justify-center ${
              isEven ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            {/* Category / Subtitle */}
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4512A] mb-2">
              {product.subtitle}
            </div>

            {/* Main Title */}
            <h2 className="font-['Anton'] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#111111] leading-none mb-3">
              {product.title}
            </h2>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <span className="text-xs font-extrabold text-[#111111]">{product.rating}</span>
              <span className="text-xs text-[#6B625D]">({product.reviews} verified reviews)</span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#524B46] leading-relaxed mb-6 font-normal">
              {product.description}
            </p>

            {/* Key Benefit Highlights Grid */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              {product.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white px-3 py-2.5 rounded-xl border border-[#E6E1D8] text-center shadow-2xs"
                >
                  <span className="block text-xs font-bold text-[#111111]">{item.title}</span>
                  <span className="block text-[11px] text-[#6B625D] mt-0.5">{item.desc}</span>
                </div>
              ))}
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                Select Size / Pack:
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((sz, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border ${
                      selectedSize === idx
                        ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                        : 'bg-white text-[#111111] border-[#E6E1D8] hover:border-[#111111]'
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Box */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-['Anton'] text-3xl sm:text-4xl text-[#111111]">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
              {currentSize.oldPrice && (
                <span className="text-base text-[#8C877F] line-through font-medium">
                  ₹{(currentSize.oldPrice * quantity).toLocaleString('en-IN')}
                </span>
              )}
              {currentSize.oldPrice && (
                <span className="text-xs font-bold text-[#059669] bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  SAVE ₹{((currentSize.oldPrice - currentSize.price) * quantity).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Quantity Selector & CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#E6E1D8] bg-white rounded-full px-3 py-2 shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-base text-[#111111] hover:bg-[#F8F6F2] rounded-full transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-sm text-[#111111]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center font-bold text-base text-[#111111] hover:bg-[#F8F6F2] rounded-full transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2A2A2A] transition-all duration-200 shadow-md active:scale-98"
              >
                <BagIcon />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F4512A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#E03E17] transition-all duration-200 shadow-md shadow-[#F4512A]/25 active:scale-98"
              >
                <ZapIcon />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Add to Cart Toast Notification */}
            {addedToast && (
              <div className="mt-4 p-3 rounded-xl bg-[#059669] text-white text-xs font-bold flex items-center gap-2 shadow-md animate-fade-in">
                <CheckIcon />
                <span>Added {quantity}x {product.title} ({currentSize.label}) to your cart!</span>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Main Shop Page ────────────────────────────────────────────── */
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
      image: proteinImg.src,
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
      image: kulfiImg.src,
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
      id: 'steel-shaker',
      category: 'SHAKER ACCESSORIES',
      tag: 'SIGNATURE GEAR',
      tagBg: '#111111',
      discount: 'MUST HAVE',
      title: 'Steel Shaker',
      subtitle: 'Double-Wall Stainless Steel Insulated Shaker',
      rating: 4.95,
      reviews: 212,
      image: shakerImg.src,
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
    <main className="min-h-screen bg-[#F8F6F2] text-[#111111] pt-[68px] font-sans">
      <Navbar />

      {/* ALTERNATING PRODUCT SHOWCASE SLIDES */}
      <section className="relative py-8">
        {PRODUCTS_DATA.map((product, idx) => (
          <ProductRow key={product.id} product={product} index={idx} />
        ))}
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
