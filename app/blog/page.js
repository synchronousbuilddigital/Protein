'use client';

import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BLOG_ARTICLES } from './blogData';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Nutrition & Science', 'Recipes & Shakes', 'Doctor Insights', 'Hormone Health'];

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = BLOG_ARTICLES.find((a) => a.featured) || BLOG_ARTICLES[0];
  const gridArticles = filteredArticles.filter((a) => a.slug !== (selectedCategory === 'All' && !searchQuery ? featuredArticle.slug : ''));

  return (
    <main className="min-h-screen bg-[#FBF7F1] pt-[48px] text-[#111111] font-['Inter',sans-serif]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#EF5A32] text-white pt-16 pb-20 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/30">
            Clean Science & Wellness Journal
          </span>
          <h1 className="font-['Anton'] text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-none mb-6">
            The Proteinest Journal
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Doctor-approved nutrition advice, plant-based recipe guides, digestive health insights, and pure science tailored for Indian bodies.
          </p>

          {/* Search Input */}
          <div className="max-w-xl mx-auto relative shadow-2xl rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search articles, recipes, doctor tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-white text-[#111111] text-sm sm:text-base outline-none placeholder-gray-400 font-medium"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Decorative background accent */}
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Category Filter Pills */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 flex items-center justify-center gap-2.5 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${selectedCategory === cat
                ? 'bg-[#EF5A32] text-white shadow-lg shadow-[#EF5A32]/20 scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article Banner (Only shown on 'All' and no search query) */}
      {selectedCategory === 'All' && !searchQuery && featuredArticle && (
        <section className="max-w-6xl mx-auto px-6 py-6">
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-0 group hover:border-[#EF5A32]/40 transition-all duration-300">
            <div className="md:col-span-7 aspect-[16/10] md:aspect-auto relative overflow-hidden bg-orange-50">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-[#EF5A32] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                Featured Spotlight
              </span>
            </div>

            <div className="md:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 mb-4">
                  <span className="text-[#EF5A32] font-bold uppercase tracking-wider">{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <a href={`/blog/${featuredArticle.slug}`}>
                  <h2 className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wide text-[#111111] mb-4 hover:text-[#EF5A32] transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                </a>

                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-5 mb-6">
                  <img
                    src={featuredArticle.authorAvatar}
                    alt={featuredArticle.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#EF5A32]"
                  />
                  <div>
                    <div className="text-xs font-bold text-gray-900">{featuredArticle.author}</div>
                    <div className="text-[11px] text-gray-500">{featuredArticle.authorRole}</div>
                  </div>
                </div>

                <a
                  href={`/blog/${featuredArticle.slug}`}
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#111111] hover:bg-[#EF5A32] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-full transition-all duration-300"
                >
                  Read Full Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Articles Grid */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h3 className="font-['Anton'] text-2xl uppercase tracking-wider text-[#111111]">
            {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} (${gridArticles.length})`}
          </h3>
          <span className="text-xs text-gray-500 font-medium">Showing {gridArticles.length} stories</span>
        </div>

        {gridArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-md mx-auto my-12">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h4 className="font-bold text-lg text-gray-800 mb-2">No articles found</h4>
            <p className="text-xs text-gray-500 mb-6">Try searching for different keywords or select another category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="bg-[#EF5A32] text-white text-xs font-bold px-6 py-2.5 rounded-full uppercase tracking-wider hover:bg-[#111111] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <a href={`/blog/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </a>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 font-semibold mb-3">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <a href={`/blog/${article.slug}`}>
                      <h3 className="font-['Anton'] text-xl uppercase tracking-wide text-[#111111] mb-3 leading-snug group-hover:text-[#EF5A32] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </a>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className="w-7 h-7 rounded-full object-cover border border-gray-200"
                    />
                    <span className="text-xs font-medium text-gray-700">{article.author}</span>
                  </div>

                  <a
                    href={`/blog/${article.slug}`}
                    className="text-xs font-bold text-[#EF5A32] hover:text-[#111111] uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-all"
                  >
                    Read
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Signup Banner */}
      <section className="max-w-6xl mx-auto px-6 py-12 my-8">
        <div className="bg-[#EF5A32] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-3">
              Stay Informed
            </span>
            <h3 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-wide mb-3">
              Get Doctor-Backed Nutrition Tips
            </h3>
            <p className="text-xs sm:text-sm text-white/90 mb-8 leading-relaxed">
              Join 25,000+ wellness enthusiasts getting weekly recipe ideas, science breakdowns, and exclusive discounts directly in their inbox.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 rounded-full bg-white text-[#111111] text-xs font-medium outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-[#111111] hover:bg-white hover:text-[#111111] text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
