'use client';

import { useState } from 'react';
import proteinImg from '../../public/chocolate flavor.png';
import kulfiImg from '../../public/khulfi.png';
const coffeeImg = '/coffeeflavor.png';

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
    image: proteinImg.src,
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
    image: kulfiImg.src,
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
    id: 'coffee-boost',
    tag: 'EXCLUSIVE',
    tagColor: '#6B4226',
    category: 'Plant Protein',
    title: 'Coffee Boost',
    subtitle: 'Rich Coffee Flavor',
    rating: 4.9,
    reviews: 78,
    price: 1499,
    oldPrice: 1699,
    image: coffeeImg,
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

export default function ProductsSection() {
  const [selectedSizes, setSelectedSizes] = useState({ 'choco-buddy': 0, 'kulfi-mate': 0, 'coffee-boost': 0 });
  const [cartCount, setCartCount] = useState({ 'choco-buddy': 0, 'kulfi-mate': 0, 'coffee-boost': 0 });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleSizeChange = (productId, index) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: index }));
  };

  const handleAddToCart = (product) => {
    const sizeIdx = selectedSizes[product.id] || 0;
    const sizeObj = product.sizes[sizeIdx];
    setCartCount((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
    showToast(`Added ${product.title} (${sizeObj.label}) to your cart!`);
  };

  const handleUpdateQty = (productId, delta) => {
    setCartCount((prev) => {
      const next = Math.max(0, (prev[productId] || 0) + delta);
      return { ...prev, [productId]: next };
    });
  };

  return (
    <section
      id="shop"
      className="w-full py-14 sm:py-20 px-4 sm:px-8 lg:px-16 relative overflow-hidden"
      style={{
        background: '#0E2016',
        borderRadius: 'clamp(24px, 3.5vw, 48px)',
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF683F] mb-2 block">
            Our Products
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Start With A Favorite
          </h2>
          <p className="mt-3 text-white/60 text-sm sm:text-base max-w-xl mx-auto">
            Ultra-pure plant isolate protein blends crafted for peak performance &amp; taste.
          </p>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
          {PRODUCTS.map((p) => {
            const sizeIdx = selectedSizes[p.id] || 0;
            const currentSize = p.sizes[sizeIdx];
            const qtyInCart = cartCount[p.id] || 0;
            const saving = currentSize.oldPrice ? currentSize.oldPrice - currentSize.price : 0;

            return (
              <div
                key={p.id}
                className="flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)] group"
                style={{
                  background: '#163526',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Tag badge */}
                <div className="flex justify-between items-center px-5 pt-5 pb-0">
                  <span
                    className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: p.tagColor, color: '#fff' }}
                  >
                    {p.tag}
                  </span>
                  {saving > 0 && (
                    <span className="text-[9px] font-bold text-[#FF683F] uppercase tracking-wider">
                      Save ₹{saving}
                    </span>
                  )}
                </div>

                {/* Category + Title */}
                <div className="text-center px-5 pt-4 pb-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 mb-1">
                    {p.category}
                  </p>
                  <h3
                    className="text-2xl sm:text-3xl font-extrabold text-white leading-tight"
                    style={{ fontFamily: 'var(--font-fira-sans)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs text-white/55 mt-1 font-medium">
                    {p.subtitle}
                  </p>
                </div>

                {/* Product Image — centered, not cropped */}
                <div
                  className="relative mx-auto w-full flex items-center justify-center px-6"
                  style={{ height: '240px' }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    style={{ filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.45))' }}
                  />
                </div>

                {/* Card Footer */}
                <div className="flex flex-col px-5 pb-5 pt-3 mt-auto gap-4">

                  {/* Size Selector */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/40 mb-2">
                      Select Weight
                    </p>
                    <div className="flex gap-2">
                      {p.sizes.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSizeChange(p.id, idx)}
                          className="flex-1 py-2 rounded-full text-xs font-bold transition-all duration-200"
                          style={
                            sizeIdx === idx
                              ? { background: '#fff', color: '#0E2016', border: '1.5px solid #fff' }
                              : { background: 'transparent', color: 'rgba(255,255,255,0.65)', border: '1.5px solid rgba(255,255,255,0.2)' }
                          }
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-white" style={{ fontFamily: 'var(--font-fira-sans)' }}>
                      ₹{currentSize.price.toLocaleString('en-IN')}
                    </span>
                    {currentSize.oldPrice && (
                      <span className="text-sm text-white/35 line-through font-medium">
                        ₹{currentSize.oldPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {saving > 0 && (
                      <span className="text-xs font-bold text-[#FF683F] ml-1">
                        SAVE ₹{saving}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart CTA */}
                  {qtyInCart === 0 ? (
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="w-full py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                      style={{ background: '#1F3D2B', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}
                    >
                      Add to Cart <ArrowIcon />
                    </button>
                  ) : (
                    <div
                      className="w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-3"
                      style={{ background: '#FF683F', color: '#fff' }}
                    >
                      <button
                        onClick={() => handleUpdateQty(p.id, -1)}
                        className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white font-bold text-base transition-colors"
                      >
                        −
                      </button>
                      <span className="text-xs font-bold">{qtyInCart} in cart</span>
                      <button
                        onClick={() => handleUpdateQty(p.id, 1)}
                        className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white font-bold text-base transition-colors"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore CTA */}
        <div className="text-center mt-12">
          <a
            href="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{ background: '#FF683F', color: '#fff', boxShadow: '0 8px 32px rgba(255,104,63,0.3)' }}
          >
            Explore Full Shop Collection <ArrowIcon />
          </a>
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
                src={quickViewProduct.image}
                alt={quickViewProduct.title}
                className="max-h-[220px] object-contain drop-shadow-2xl"
              />
            </div>

            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
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
