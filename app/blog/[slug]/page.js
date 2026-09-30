import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollReveal from '../../components/ScrollReveal';
import { BLOG_ARTICLES } from '../blogData';
import { renderArticle } from '../_lib/markdown';
import ArticleAside from './ArticleAside';

/*
 * Journal article — dark editorial header, wide cover, sticky outline + share rail,
 * long-form prose, reviewer card, "put it into practice" CTA and related stories.
 * Styles: "Article" in globals.css (reuses the shop hero and the blog cards).
 */

const find = (slug) => BLOG_ARTICLES.find((a) => a.slug === slug);

// The journal is a fixed list: unknown slugs get a real 404 (root not-found) instead of a 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = find(slug);
  if (!article) return { title: 'Article not found — The Proteinest Journal' };
  return {
    title: `${article.title} — The Proteinest Journal`,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: [article.image], type: 'article' },
  };
}

function Arrow({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const article = find(slug);
  if (!article) notFound();

  const { nodes, outline } = renderArticle(article.content);
  const related = [
    ...BLOG_ARTICLES.filter((a) => a.slug !== slug && a.category === article.category),
    ...BLOG_ARTICLES.filter((a) => a.slug !== slug && a.category !== article.category),
  ].slice(0, 3);

  return (
    <main className="shop article min-h-screen text-[#141414]">
      <Navbar />
      <ScrollReveal />

      {/* ── header ── */}
      <section className="shop-hero ar-hero" aria-labelledby="ar-title">
        <div className="shop-hero-glow" aria-hidden />
        <div className="shop-hero-grain" aria-hidden />
        <div className="ar-hero-inner" data-reveal-stagger="0.08">
          <nav className="ar-crumbs" aria-label="Breadcrumb">
            <Link href="/blog">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Journal
            </Link>
            <span aria-hidden>/</span>
            <span>{article.category}</span>
          </nav>
          <h1 id="ar-title" className="ar-title" data-split>
            {article.title}
          </h1>
          <p className="ar-dek">{article.excerpt}</p>
          <div className="ar-byline">
            <div className="ar-byline-author">
              <img src={article.authorAvatar} alt="" />
              <span>
                <strong>{article.author}</strong>
                <small>{article.authorRole}</small>
              </span>
            </div>
            <dl className="ar-byline-meta">
              <div>
                <dt>Published</dt>
                <dd>{article.date}</dd>
              </div>
              <div>
                <dt>Reading time</dt>
                <dd>{article.readTime}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <figure className="ar-cover" data-reveal="up">
        <img src={article.image} alt={article.title} />
      </figure>

      {/* ── body ── */}
      <div className="ar-layout">
        <ArticleAside outline={outline} title={article.title} />

        <div className="ar-main">
          <article className="ar-prose">{nodes}</article>

          <aside className="ar-reviewer" aria-label="About the author" data-reveal="up">
            <img src={article.authorAvatar} alt="" />
            <div>
              <span>Written &amp; reviewed by</span>
              <strong>{article.author}</strong>
              <small>{article.authorRole}</small>
              <p>Reviewed by health practitioners at The Proteinest for medical and nutritional accuracy.</p>
            </div>
          </aside>

          <aside className="ar-practice" aria-labelledby="ar-practice-title" data-reveal="up">
            <div className="ar-practice-glow" aria-hidden />
            <span className="ar-practice-kicker">Put it into practice</span>
            <h2 id="ar-practice-title">
              How much protein do <em>you</em> need?
            </h2>
            <p>Get your personal daily target in under a minute, then find the flavour that gets you there.</p>
            <div className="ar-practice-actions">
              <a href="/calculator" className="shop-cta">
                Protein calculator <Arrow />
              </a>
              <a href="/shop" className="ar-ghost">
                Shop the range
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* ── related ── */}
      <section className="ar-related" aria-labelledby="ar-related-title">
        <header className="bl-grid-head">
          <h2 id="ar-related-title">
            Keep <em>reading</em>
          </h2>
          <Link href="/blog" className="ar-all">
            All stories <Arrow size={13} />
          </Link>
        </header>
        <div className="bl-grid" data-reveal-stagger="0.08">
          {related.map((a) => (
            <article key={a.slug} className="bl-card ar-card">
              <a href={`/blog/${a.slug}`} className="bl-card-link">
                <span className="bl-card-img">
                  <img src={a.image} alt="" loading="lazy" />
                  <span className="bl-chip">{a.category}</span>
                </span>
                <span className="bl-card-body">
                  <span className="bl-meta">
                    <span>{a.date}</span>
                    <i aria-hidden />
                    <span>{a.readTime}</span>
                  </span>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                  <span className="bl-card-foot">
                    <span className="bl-author bl-author--sm">
                      <img src={a.authorAvatar} alt="" loading="lazy" />
                      <span>
                        <strong>{a.author}</strong>
                      </span>
                    </span>
                    <span className="bl-card-go" aria-hidden>
                      <Arrow size={14} />
                    </span>
                  </span>
                </span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
