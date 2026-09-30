'use client';

import { useState, useMemo, useDeferredValue, useRef, useLayoutEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import NewsletterSection from '../components/NewsletterSection';
import { BLOG_ARTICLES } from './blogData';

/*
 * Journal — dark hero with search, sticky category rail, editorial featured story,
 * then the article grid. Cards that mount after a filter change animate in with CSS
 * (.bl-card, keyed on the filter) because ScrollReveal only wires elements present on mount.
 * Styles: "Blog" in globals.css (reuses the shop hero).
 */

const CATEGORIES = ['All', 'Nutrition & Science', 'Recipes & Shakes', 'Doctor Insights', 'Hormone Health'];

const TOPICS = [
  { cat: 'Nutrition & Science', note: 'How protein works in Indian diets', d: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3M7.5 15h9' },
  { cat: 'Recipes & Shakes', note: 'Two-minute shakes and desi twists', d: 'M5 11h14l-1.5 8.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5zM8 11a4 4 0 0 1 8 0M12 3v2' },
  { cat: 'Doctor Insights', note: 'Safety, testing and what to look for', d: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6zM9 12l2 2 4-4' },
  { cat: 'Hormone Health', note: 'PCOS, energy and women’s health', d: 'M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z' },
];

const POPULAR = [
  { label: 'Gut health', q: 'gut' },
  { label: 'PCOS', q: 'PCOS' },
  { label: 'Smoothies', q: 'smoothie' },
  { label: 'Lab testing', q: 'NABL' },
];

// Wide, text-free shot for the full-bleed featured card (article pages keep their own cover).
const FEATURE_ART = '/products/coffee-crew-3.webp';

function Arrow({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Meta({ article, light }) {
  return (
    <div className={`bl-meta${light ? ' bl-meta--light' : ''}`}>
      <span>{article.date}</span>
      <i aria-hidden />
      <span>{article.readTime}</span>
    </div>
  );
}

function Author({ article, size = 'sm', light }) {
  return (
    <div className={`bl-author bl-author--${size}${light ? ' bl-author--light' : ''}`}>
      <img src={article.authorAvatar} alt="" loading="lazy" />
      <span>
        <strong>{article.author}</strong>
        {size === 'lg' && <small>{article.authorRole}</small>}
      </span>
    </div>
  );
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const query = useDeferredValue(searchQuery.trim().toLowerCase());

  const counts = useMemo(() => {
    const c = { All: BLOG_ARTICLES.length };
    BLOG_ARTICLES.forEach((a) => (c[a.category] = (c[a.category] || 0) + 1));
    return c;
  }, []);

  const filteredArticles = useMemo(
    () =>
      BLOG_ARTICLES.filter((a) => {
        const inCategory = selectedCategory === 'All' || a.category === selectedCategory;
        const hay = `${a.title} ${a.excerpt} ${a.author} ${a.category}`.toLowerCase();
        return inCategory && (!query || hay.includes(query));
      }),
    [selectedCategory, query]
  );

  const featuredArticle = BLOG_ARTICLES.find((a) => a.featured) || BLOG_ARTICLES[0];
  const showFeatured = selectedCategory === 'All' && !query;
  const gridArticles = showFeatured ? filteredArticles.filter((a) => a.slug !== featuredArticle.slug) : filteredArticles;
  const gridKey = `${selectedCategory}|${query}`;
  const stackArticles = [featuredArticle, ...BLOG_ARTICLES.filter((a) => a.slug !== featuredArticle.slug)].slice(0, 3);

  // Slide the dark highlight under the active pill (DOM write, no re-render).
  const trackRef = useRef(null);
  const indRef = useRef(null);
  useLayoutEffect(() => {
    const track = trackRef.current;
    const ind = indRef.current;
    if (!track || !ind) return;
    const place = () => {
      const btn = track.querySelector(`[data-cat="${CSS.escape(selectedCategory)}"]`);
      if (!btn) return;
      ind.style.width = `${btn.offsetWidth}px`;
      ind.style.transform = `translateX(${btn.offsetLeft}px)`;
      ind.style.opacity = '1';
      const { scrollLeft, clientWidth } = track;
      if (btn.offsetLeft < scrollLeft || btn.offsetLeft + btn.offsetWidth > scrollLeft + clientWidth) {
        track.scrollTo({ left: btn.offsetLeft - (clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' });
      }
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(track);
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, [selectedCategory]);

  const reset = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <main className="shop blog min-h-screen text-[#141414]">
      <Navbar />
      <ScrollReveal />

      {/* ── hero: copy + search | fanned cover stack ── */}
      <section className="shop-hero bl-hero" aria-labelledby="blog-title">
        <div className="shop-hero-glow" aria-hidden />
        <div className="shop-hero-grain" aria-hidden />
        <span className="shop-hero-ghost" aria-hidden data-parallax="0.25">
          JOURNAL
        </span>
        <div className="bl-hero-grid">
          <div className="bl-hero-copy" data-reveal-stagger="0.1">
            <span className="shop-kicker">
              <i aria-hidden />
              Clean science &amp; wellness
            </span>
            <h1 id="blog-title" className="shop-hero-title bl-hero-title" data-split>
              The Proteinest <em>Journal.</em>
            </h1>
            <p className="shop-hero-sub">
              Doctor-reviewed nutrition, plant-based recipes, gut health and hormone science, written for Indian bodies and Indian kitchens.
            </p>
            <form className="bl-search" role="search" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="blog-search" className="sr-only">
                Search the journal
              </label>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <input
                id="blog-search"
                type="search"
                placeholder="Search articles, recipes, doctor tips…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </form>
            <div className="bl-popular">
              <span>Popular</span>
              {POPULAR.map((p) => (
                <button key={p.q} type="button" onClick={() => { setSelectedCategory('All'); setSearchQuery(p.q); }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bl-stack" aria-hidden data-reveal="left">
            {stackArticles.map((a, i) => (
              <a key={a.slug} href={`/blog/${a.slug}`} tabIndex={-1} className="bl-stack-card" style={{ '--n': i }}>
                <img src={a.image} alt="" />
                {i === 0 && (
                  <span className="bl-stack-cap">
                    <small>{a.category}</small>
                    <strong>{a.title}</strong>
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── category rail ── */}
      <nav className="bl-rail" aria-label="Article categories">
        <div className="bl-rail-track" ref={trackRef}>
          <span className="bl-pill-ind" ref={indRef} aria-hidden />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className="bl-pill"
              data-cat={cat}
            >
              {cat}
              <span>{counts[cat] || 0}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="bl-body">
        <div className="bl-body-glow" aria-hidden />
        <div className="bl-body-dots" aria-hidden />

        {/* ── featured (cinematic) + topics ── */}
        {showFeatured && (
          <section className="bl-section bl-featured-wrap" aria-label="Featured story and topics">
            <div className="bl-lead">
              <article className="bl-feature" data-reveal="up">
                <img src={FEATURE_ART} alt="" className="bl-feature-img" />
                <div className="bl-feature-shade" aria-hidden />
                <span className="bl-flag">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="m12 2 2.9 6.9L22 9.3l-5.5 4.8 1.7 7.2L12 17.6 5.8 21.3l1.7-7.2L2 9.3l7.1-.4z" />
                  </svg>
                  Editor&apos;s pick
                </span>
                <div className="bl-feature-copy">
                  <span className="bl-cat">{featuredArticle.category}</span>
                  <h2>
                    <a href={`/blog/${featuredArticle.slug}`} className="bl-feature-link">
                      {featuredArticle.title}
                    </a>
                  </h2>
                  <p>{featuredArticle.excerpt}</p>
                  <div className="bl-feature-foot">
                    <Author article={featuredArticle} size="lg" light />
                    <Meta article={featuredArticle} light />
                    <span className="shop-cta bl-read" aria-hidden>
                      Read the story <Arrow />
                    </span>
                  </div>
                </div>
              </article>

              <aside className="bl-topics" aria-labelledby="bl-topics-title" data-reveal="right">
                <h2 id="bl-topics-title">
                  Browse <em>topics</em>
                </h2>
                <ul>
                  {TOPICS.map((t, i) => (
                    <li key={t.cat}>
                      <button type="button" onClick={() => setSelectedCategory(t.cat)} className="bl-topic">
                        <span className="bl-topic-icon" aria-hidden>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d={t.d} />
                          </svg>
                        </span>
                        <span className="bl-topic-text">
                          <strong>{t.cat}</strong>
                          <small>{t.note}</small>
                        </span>
                        <span className="bl-topic-count">{String(counts[t.cat] || 0).padStart(2, '0')}</span>
                        <span className="bl-topic-num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <a href="/calculator" className="bl-topics-cta">
                  <span>
                    <small>Not sure where to start?</small>
                    <strong>Find your daily protein target</strong>
                  </span>
                  <Arrow />
                </a>
              </aside>
            </div>
          </section>
        )}

        {/* ── grid ── */}
        <section className="bl-section bl-grid-wrap" aria-labelledby="bl-latest">
          <header className="bl-grid-head">
            <h2 id="bl-latest">
              {query ? (
                <>
                  Results for <em>“{searchQuery.trim()}”</em>
                </>
              ) : selectedCategory === 'All' ? (
                <>
                  Latest <em>stories</em>
                </>
              ) : (
                <em>{selectedCategory}</em>
              )}
            </h2>
            <span aria-live="polite">
              {gridArticles.length} {gridArticles.length === 1 ? 'story' : 'stories'}
            </span>
          </header>

          {gridArticles.length === 0 ? (
            <div className="bl-empty">
              <span className="bl-empty-icon" aria-hidden>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-3.5-3.5M8.5 11h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <h3>No stories found</h3>
              <p>Try a different keyword or browse another category.</p>
              <button type="button" onClick={reset} className="shop-cta">
                Show all stories
              </button>
            </div>
          ) : (
            <div className="bl-grid" key={gridKey} data-bento={gridArticles.length >= 4 && gridArticles.length % 3 === 1 ? '' : undefined}>
              {gridArticles.map((article, i) => (
                <article key={article.slug} className="bl-card" style={{ '--i': i }}>
                  <a href={`/blog/${article.slug}`} className="bl-card-link">
                    <span className="bl-card-img">
                      <img src={article.image} alt="" loading="lazy" />
                      <span className="bl-chip">{article.category}</span>
                    </span>
                    <span className="bl-card-body">
                      <Meta article={article} />
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <span className="bl-card-foot">
                        <Author article={article} />
                        <span className="bl-card-go" aria-hidden>
                          <Arrow size={14} />
                        </span>
                      </span>
                    </span>
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <NewsletterSection />
      <Footer />
    </main>
  );
}
