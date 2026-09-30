import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <main className="shop article min-h-screen text-[#141414]">
      <Navbar />
      <section className="shop-hero ar-hero ar-missing" aria-labelledby="ar-missing-title">
        <div className="shop-hero-glow" aria-hidden />
        <div className="shop-hero-grain" aria-hidden />
        <div className="shop-hero-inner">
          <span className="shop-kicker">
            <i aria-hidden />
            404
            <i aria-hidden />
          </span>
          <h1 id="ar-missing-title" className="shop-hero-title">
            Page <em>not found.</em>
          </h1>
          <p className="shop-hero-sub">This page doesn&apos;t exist or has moved. Try the journal, or head back to the shop.</p>
          <div className="ar-missing-actions">
            <Link href="/blog" className="shop-cta">
              Read the journal
            </Link>
            <Link href="/shop" className="ar-ghost">
              Shop the range
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
