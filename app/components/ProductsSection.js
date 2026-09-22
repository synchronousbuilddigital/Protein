'use client';

import { useState } from "react";
import proteinImg from "../../public/protein.png";

/* ── SVG Icon Components ─────────────────────────────────────── */
function FireIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C12 2 10 6 7 8C4 10 3 13 3 15C3 19.4 7.1 22 12 22C16.9 22 21 19.4 21 15C21 13 20 10 17 8C14 6 12 2 12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.18"/>
      <path d="M12 22C12 22 10 18 12 15C14 12 12 9 12 9C12 9 15 12 14 16C13.5 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.25"/>
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

function XSmIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
import kulfiImg from "../../public/badamkhulfi.png";
import shakerImg from "../../public/steel-shaker.png";

const PRODUCTS = [
  {
    id: "choco-buddy",
    category: "protein",
    tag: "BEST SELLER",
    tagColor: "bg-[#FF683F] text-white badge-glow-orange",
    discount: "6% OFF",
    title: "Choco Buddy",
    subtitle: "Rich Chocolate Flavor Protein",
    rating: 4.9,
    reviews: 184,
    price: 1499,
    oldPrice: 1599,
    image: proteinImg.src,
    bgGradient: "from-amber-900/10 via-orange-500/5 to-transparent",
    isFeatured: true,
    highlights: ["24g Plant Isolate", "0g Added Sugar", "5.5g BCAAs"],
    sizes: [
      { label: "1 KG (30 Servings)", price: 1499, oldPrice: 1599 },
      { label: "2 KG (60 Servings)", price: 2799, oldPrice: 2999 },
    ],
    details: {
      description: "Crafted for intense recovery & supreme dark chocolate flavor. Packed with 24g pure organic pea & brown rice plant protein isolate per scoop, zero added sugar, and digestive enzymes for zero bloat.",
      nutrition: [
        { label: "Protein / scoop", val: "24g" },
        { label: "BCAAs", val: "5.5g" },
        { label: "Glutamine", val: "4.2g" },
        { label: "Sugar", val: "0g Added" },
        { label: "Calories", val: "118 kcal" },
      ],
      benefits: [
        "Ultra-clean 100% Organic Plant Protein Isolate",
        "Rich, creamy Belgian dark chocolate taste",
        "Fast absorption formula for post-workout muscle repair",
        "Informed Choice Certified & Lab Tested",
      ]
    }
  },
  {
    id: "kulfi-mate",
    category: "protein",
    tag: "NEW FLAVOR",
    tagColor: "bg-amber-500 text-white shadow-md shadow-amber-500/30",
    discount: "EXCLUSIVE",
    title: "Kulfi Mate",
    subtitle: "Authentic Kulfi Flavor Protein",
    rating: 4.85,
    reviews: 96,
    price: 1499,
    oldPrice: null,
    image: kulfiImg.src,
    bgGradient: "from-amber-200/20 via-orange-100/10 to-transparent",
    isFeatured: false,
    highlights: ["24g Plant Isolate", "Saffron & Pistachio", "Easy Digestion"],
    sizes: [
      { label: "1 KG (30 Servings)", price: 1499, oldPrice: null },
      { label: "2 KG (60 Servings)", price: 2799, oldPrice: 2999 },
    ],
    details: {
      description: "An authentic royal Indian treat transformed into performance nutrition. Infused with natural cardamom, saffron threads, and real pistachio bits.",
      nutrition: [
        { label: "Protein / scoop", val: "24g" },
        { label: "BCAAs", val: "5.4g" },
        { label: "Glutamine", val: "4.0g" },
        { label: "Sugar", val: "0g Added" },
        { label: "Calories", val: "120 kcal" },
      ],
      benefits: [
        "Traditional Indian Kulfi flavor profile",
        "Real pistachio nuts and saffron essence",
        "Zero chalky aftertaste, effortless mixing",
        "Added DigeZyme® for smooth digestion",
      ]
    }
  },
  {
    id: "steel-shaker",
    category: "accessory",
    tag: "PREMIUM GEAR",
    tagColor: "bg-zinc-900 text-white badge-glow-dark",
    discount: "28% OFF",
    title: "Steel Shaker",
    subtitle: "Insulated Stainless Steel Shaker",
    rating: 4.95,
    reviews: 312,
    price: 999,
    oldPrice: 1399,
    image: shakerImg.src,
    bgGradient: "from-slate-300/20 via-slate-100/10 to-transparent",
    isFeatured: false,
    highlights: ["750ml Capacity", "24h Cold Insulation", "100% Leak-Proof"],
    sizes: [
      { label: "750 ml Standard", price: 999, oldPrice: 1399 },
    ],
    details: {
      description: "Double-wall vacuum insulated stainless steel shaker bottle built to keep your protein shake icy cold for up to 24 hours. Odor-resistant and heavy-duty steel construction.",
      nutrition: [
        { label: "Material", val: "304 Stainless Steel" },
        { label: "Capacity", val: "750 ml / 25 oz" },
        { label: "Insulation", val: "24 Hours Cold" },
        { label: "BPA Free", val: "100% Safe" },
      ],
      benefits: [
        "Surgical grade stainless steel - zero plastic smell",
        "Includes surgical steel whisk ball for clump-free mixing",
        "Ergonomic leak-proof flip cap with twist lock",
        "Sweat-proof powder coat grip exterior",
      ]
    }
  }
];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState({
    "choco-buddy": 0,
    "kulfi-mate": 0,
    "steel-shaker": 0,
  });
  const [cartCount, setCartCount] = useState({
    "choco-buddy": 0,
    "kulfi-mate": 0,
    "steel-shaker": 0,
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSizeChange = (productId, index) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: index }));
  };

  const handleAddToCart = (product) => {
    const sizeIdx = selectedSizes[product.id] || 0;
    const sizeObj = product.sizes[sizeIdx];
    setCartCount((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    showToast(`Added ${product.title} (${sizeObj.label}) to your cart!`);
  };

  const handleUpdateQty = (productId, delta) => {
    setCartCount((prev) => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  return (
    <section id="shop" className="relative pt-6 sm:pt-8 pb-10 sm:pb-14">
      {/* Background Accent Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-r from-[#FF683F]/10 via-amber-400/5 to-transparent blur-3xl rounded-full opacity-70" />
      </div>

      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="max-w-xl">
          <h2 className="font-['Fira_Sans'] font-extrabold text-3xl sm:text-4xl tracking-tight text-[#141414] uppercase leading-none">
            Start With A Favorite
          </h2>
          <p className="mt-2 text-[#4A4642] text-sm sm:text-base font-normal leading-relaxed">
            Ultra-pure isolate protein blends and insulated thermal gear designed for peak performance &amp; taste.
          </p>
        </div>

        {/* Filter Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#F8F6F2] p-1 rounded-xl border border-black/10 self-start md:self-end shadow-inner">
          {[
            { id: "all", label: "All Products" },
            { id: "protein", label: "Protein Blends" },
            { id: "accessory", label: "Gear & Shaker" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 uppercase tracking-wider ${
                activeTab === tab.id
                  ? "bg-[#141414] text-white shadow-md shadow-black/15 scale-[1.02]"
                  : "text-[#4A4642] hover:text-[#141414] hover:bg-black/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((p) => {
          const currentSizeIdx = selectedSizes[p.id] || 0;
          const currentSize = p.sizes[currentSizeIdx];
          const qtyInCart = cartCount[p.id] || 0;

          return (
            <div
              key={p.id}
              className={`prod-card-enhanced relative flex flex-col bg-[#F8F6F2] rounded-2xl border border-black/10 overflow-hidden ${
                p.isFeatured ? "featured-card ring-2 ring-[#FF683F]/30" : ""
              }`}
            >
              {/* Product Top Image Banner - Full Width Edge-to-Edge */}
              <div className="relative aspect-[4/3] w-full overflow-hidden group">
                {/* Floating Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${p.tagColor}`}>
                    {p.tag}
                  </span>
                </div>

                {p.discount && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-[#141414] text-white text-[9px] font-extrabold tracking-wider uppercase shadow-md">
                      {p.discount}
                    </span>
                  </div>
                )}

                {/* Main Product Image - Full Edge-to-Edge Cover */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Quick View Floating Button Overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <button
                    onClick={() => setQuickViewProduct(p)}
                    className="px-4 py-2 rounded-full bg-white/95 text-[#141414] text-[11px] font-bold uppercase tracking-wider shadow-lg hover:bg-[#FF683F] hover:text-white transition-all transform hover:scale-105 flex items-center gap-1.5"
                  >
                    <SearchIcon /> Quick View
                  </button>
                </div>
              </div>

              {/* Card Body - Compact Padding */}
              <div className="flex-1 flex flex-col p-4 sm:p-5">
                {/* Rating & Reviews */}
                <div className="flex items-center gap-1.5 mb-1 text-[11px]">
                  <div className="flex text-amber-500">
                    {"★".repeat(Math.floor(p.rating))}
                  </div>
                  <span className="font-bold text-[#141414]">{p.rating}</span>
                  <span className="text-[#4A4642]">({p.reviews})</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-['Fira_Sans'] font-extrabold text-xl sm:text-2xl uppercase tracking-wide text-[#141414]">
                  {p.title}
                </h3>
                <p className="text-[11px] text-[#4A4642] mt-0.5 mb-2.5 font-medium line-clamp-1">
                  {p.subtitle}
                </p>

                {/* Feature Highlight Chips */}
                <div className="flex flex-nowrap items-center gap-1 mb-3 overflow-x-auto no-scrollbar whitespace-nowrap">
                  {p.highlights.map((feat, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-black/10 text-[9.5px] xl:text-[10px] font-semibold text-[#4A4642] shrink-0"
                    >
                      <CheckSmIcon /> {feat}
                    </span>
                  ))}
                </div>

                {/* Variant / Size Options (Compact Row) */}
                {p.sizes.length > 1 && (
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold text-[#141414] uppercase tracking-wider">
                      Size:
                    </span>
                    <div className="flex gap-1">
                      {p.sizes.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSizeChange(p.id, idx)}
                          className={`py-0.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${
                            currentSizeIdx === idx
                              ? "bg-[#141414] text-white border-[#141414]"
                              : "bg-white text-[#4A4642] border-black/10 hover:border-black/30"
                          }`}
                        >
                          {s.label.split(" ")[0]} {s.label.split(" ")[1]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price & Add to Cart Section */}
                <div className="mt-auto pt-3 border-t border-black/10 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-['Fira_Sans'] font-extrabold text-xl text-[#141414]">
                        ₹{currentSize.price.toLocaleString("en-IN")}
                      </span>
                      {currentSize.oldPrice && (
                        <span className="text-[11px] text-[#4A4642] line-through font-normal">
                          ₹{currentSize.oldPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    {currentSize.oldPrice && (
                      <span className="text-[9px] font-extrabold text-[#FF683F] uppercase tracking-wide">
                        Save ₹{(currentSize.oldPrice - currentSize.price).toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Add Button or Quantity Selector */}
                  {qtyInCart === 0 ? (
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="px-4 py-2 rounded-full bg-[#141414] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#FF683F] active:scale-95 transition-all shadow-md flex items-center gap-1 group"
                    >
                      <span>Add</span>
                      <span className="group-hover:translate-x-0.5 transition-transform"><ArrowIcon /></span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-[#141414] text-white rounded-full px-2.5 py-1 text-[11px] font-bold shadow-md animate-check">
                      <button
                        onClick={() => handleUpdateQty(p.id, -1)}
                        className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-[#141414] transition-colors text-[10px]"
                      >
                        -
                      </button>
                      <span className="px-1 text-[10px]">{qtyInCart} in cart</span>
                      <button
                        onClick={() => handleUpdateQty(p.id, 1)}
                        className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-[#141414] transition-colors text-[10px]"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section Explore Shop CTA Button */}
      <div className="mt-10 text-center">
        <a
          href="/shop"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FF683F] text-white hover:bg-[#141414] text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#FF683F]/25 hover:shadow-2xl hover:scale-105 group"
        >
          <span>Explore Full Shop Collection</span>
          <span className="group-hover:translate-x-1 transition-transform">
            <ArrowIcon />
          </span>
        </a>
      </div>

      {/* Quick View Interactive Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-modal-backdrop bg-black/60 backdrop-blur-md">
          <div
            className="relative w-full max-w-2xl bg-[#F8F6F2] rounded-3xl border border-black/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-[#141414] font-bold flex items-center justify-center transition-colors"
            >
              <XSmIcon />
            </button>

            {/* Modal Left Image */}
            <div className={`w-full md:w-1/2 p-8 bg-gradient-to-b ${quickViewProduct.bgGradient} flex flex-col items-center justify-center relative`}>
              <span className={`self-start mb-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${quickViewProduct.tagColor}`}>
                {quickViewProduct.tag}
              </span>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.title}
                className="max-h-[220px] object-contain drop-shadow-2xl my-auto"
              />
            </div>

            {/* Modal Right Info */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-amber-500 text-sm">{"★".repeat(Math.floor(quickViewProduct.rating))}</span>
                <span className="text-xs font-bold text-[#141414]">{quickViewProduct.rating}</span>
                <span className="text-xs text-[#4A4642]">({quickViewProduct.reviews} reviews)</span>
              </div>

              <h3 className="font-['Fira_Sans'] font-extrabold text-3xl uppercase tracking-tight text-[#141414]">
                {quickViewProduct.title}
              </h3>
              <p className="text-xs text-[#FF683F] font-bold uppercase tracking-wider mb-3">
                {quickViewProduct.subtitle}
              </p>

              <p className="text-xs text-[#4A4642] leading-relaxed mb-4">
                {quickViewProduct.details.description}
              </p>

              {/* Nutrition / Specs Table */}
              <div className="bg-white rounded-xl p-3 border border-black/10 mb-4">
                <div className="text-[11px] font-bold text-[#141414] uppercase tracking-wider mb-2">
                  Key Specs &amp; Nutrition:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {quickViewProduct.details.nutrition.map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-black/5 pb-1">
                      <span className="text-[#4A4642]">{item.label}</span>
                      <span className="font-bold text-[#141414]">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="mb-6 space-y-1">
                {quickViewProduct.details.benefits.map((b, idx) => (
                  <div key={idx} className="text-[11px] text-[#4A4642] flex items-center gap-1.5">
                    <span className="text-[#FF683F] font-bold"><CheckSmIcon /></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Modal Footer CTA */}
              <div className="mt-auto pt-4 border-t border-black/10 flex items-center justify-between">
                <div>
                  <div className="font-['Fira_Sans'] font-extrabold text-2xl text-[#141414]">
                    ₹{quickViewProduct.price.toLocaleString("en-IN")}
                  </div>
                  {quickViewProduct.oldPrice && (
                    <div className="text-[10px] text-[#FF683F] font-extrabold uppercase">
                      Save ₹{(quickViewProduct.oldPrice - quickViewProduct.price).toLocaleString("en-IN")}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="px-6 py-3 rounded-full bg-[#FF683F] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#D94D28] transition-colors shadow-lg shadow-[#FF683F]/30 flex items-center gap-2"
                >
                  Add To Cart <BagIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#141414] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between gap-3 animate-toast">
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs opacity-70 hover:opacity-100 font-bold"
          >
            <XSmIcon />
          </button>
        </div>
      )}
    </section>
  );
}
