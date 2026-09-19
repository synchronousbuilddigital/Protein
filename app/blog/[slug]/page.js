'use client';

import { use } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BLOG_ARTICLES } from '../blogData';

export default function BlogArticlePage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  const relatedArticles = BLOG_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  if (!article) {
    return (
      <main className="min-h-screen bg-[#FBF7F1] pt-[48px] text-[#111111] font-['Inter',sans-serif] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto text-center py-24 px-6">
          <h1 className="font-['Anton'] text-4xl uppercase tracking-wider mb-4">Article Not Found</h1>
          <p className="text-sm text-gray-600 mb-8">The journal article you are looking for does not exist or has been moved.</p>
          <a
            href="/blog"
            className="inline-block bg-[#EF5A32] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-[#111111] transition-colors"
          >
            Back to Journal
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF7F1] pt-[48px] text-[#111111] font-['Inter',sans-serif]">
      <Navbar />

      {/* Article Header */}
      <section className="bg-[#111111] text-white pt-14 pb-20 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb / Back button */}
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-[#EF5A32] mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Journal
          </a>

          <div className="flex items-center gap-3 text-xs font-bold text-[#EF5A32] uppercase tracking-widest mb-4">
            <span>{article.category}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/70 font-medium">{article.readTime}</span>
          </div>

          <h1 className="font-['Anton'] text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-tight mb-8">
            {article.title}
          </h1>

          {/* Author info bar */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6 flex-wrap gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={article.authorAvatar}
                alt={article.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#EF5A32]"
              />
              <div>
                <div className="text-sm font-bold text-white">{article.author}</div>
                <div className="text-xs text-white/60">{article.authorRole}</div>
              </div>
            </div>

            <div className="text-xs text-white/50 font-medium">Published on {article.date}</div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] bg-gray-200 border-4 border-white">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover object-center" />
        </div>
      </div>

      {/* Article Body Content */}
      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* Intro Excerpt Lead */}
        <p className="text-lg sm:text-xl text-gray-800 font-medium leading-relaxed mb-10 pb-8 border-b border-gray-200/80">
          {article.excerpt}
        </p>

        {/* Dynamic Markdown Content Sections */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wide text-[#111111] mt-10 mb-4 pt-4 border-t border-gray-200/60">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="font-bold text-lg text-[#EF5A32] mt-8 mb-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={idx} className="bg-orange-50 border-l-4 border-[#EF5A32] p-6 rounded-r-2xl my-8 text-gray-800 font-semibold text-base italic shadow-sm">
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            if (paragraph.startsWith('---')) {
              return <hr key={idx} className="my-8 border-gray-200" />;
            }
            return (
              <p key={idx} className="text-base text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Doctor Quality Seal Banner */}
        <div className="mt-14 bg-white border border-gray-200 p-8 rounded-2xl shadow-md flex flex-col sm:flex-row items-center gap-6">
          <img
            src={article.authorAvatar}
            alt={article.author}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#EF5A32] shrink-0"
          />
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#EF5A32]">Medical Reviewer</span>
            <h4 className="font-['Anton'] text-xl uppercase tracking-wide text-[#111111] mt-0.5">{article.author}</h4>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Reviewed by certified health practitioners at The Proteinest to ensure strict medical and nutritional accuracy.
            </p>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wide text-[#111111]">
              More Stories You Might Like
            </h3>
            <a href="/blog" className="text-xs font-bold text-[#EF5A32] hover:text-[#111111] uppercase tracking-wider">
              View All Journal →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((rel) => (
              <a
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group bg-[#FBF7F1] rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-gray-200">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-[#EF5A32] uppercase tracking-wider block mb-2">{rel.category}</span>
                    <h4 className="font-['Anton'] text-lg uppercase tracking-wide text-[#111111] group-hover:text-[#EF5A32] transition-colors leading-snug line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{rel.excerpt}</p>
                  </div>
                </div>
                <div className="p-6 pt-0 text-xs font-semibold text-gray-400">
                  {rel.readTime}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
