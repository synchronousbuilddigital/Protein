/**
 * Footer: brand column with socials, three link columns, legal bar, back-to-top, and a giant
 * wordmark bleeding off the bottom edge. Styles: "Footer" in globals.css.
 */
import Link from 'next/link';

const STORE = 'https://theproteinest.com';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'Choco Buddy', href: '/shop#choco-buddy' },
      { label: 'Kulfi Mate', href: '/shop#kulfi-mate' },
      { label: 'Coffee Crew', href: '/shop#coffee-crew' },
      { label: 'Steel Shaker', href: '/shop#steel-shaker' },
      { label: 'All products', href: '/shop' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Protein calculator', href: '/calculator' },
      { label: 'FAQs', href: '/#learn' },
      { label: 'Our story', href: '/#about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: `${STORE}/pages/contact`, external: true },
      { label: 'Track my order', href: 'https://www.shiprocket.in/shipment-tracking/', external: true },
      { label: 'Affiliates', href: `${STORE}/pages/affiliate`, external: true },
    ],
  },
];

const LEGAL = [
  { label: 'Privacy', href: `${STORE}/policies/privacy-policy` },
  { label: 'Terms', href: `${STORE}/policies/terms-of-service` },
  { label: 'Shipping', href: `${STORE}/policies/shipping-policy` },
  { label: 'Refunds', href: `${STORE}/policies/refund-policy` },
];

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z" />
    </svg>
  );
}
function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="ft" id="contact">
      <div className="ft-grain" aria-hidden />
      <div className="wrap ft-wrap">
        <div className="ft-grid" data-reveal-stagger="0.1">
          {/* brand */}
          <div className="ft-brand">
            <Link href="/" className="ft-logo">
              The Proteinest
            </Link>
            <p className="ft-tag editorial">Fueling the finest you.</p>
            <p className="ft-desc">Premium plant-based protein. Clean, potent, responsibly sourced. A brand of Gizinest Wellness Pvt Ltd.</p>
            <div className="ft-social">
              <a href="https://www.instagram.com/theproteinest/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/theproteinest" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
            <p className="ft-cert">Certified · Lab tested · Made in India</p>
          </div>

          {/* link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} className="ft-col" aria-label={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="ft-bottom">
          <span className="ft-copy">© {new Date().getFullYear()} The Proteinest. All rights reserved.</span>
          <ul className="ft-legal">
            {LEGAL.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#top" className="ft-top" aria-label="Back to top">
            <ArrowUpIcon />
          </a>
        </div>
      </div>

      <div className="ft-word" aria-hidden data-parallax="-0.15">
        The Proteinest
      </div>
    </footer>
  );
}
