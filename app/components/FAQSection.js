'use client';

/**
 * FAQ: sticky intro column (kicker, title, "still curious?" card) beside numbered, tagged
 * accordion cards. Answers open with a smooth height transition (grid-template-rows) and the
 * plus icon turns into a minus. One answer open at a time; the first is open by default.
 * Styles: "FAQ" in globals.css.
 */
import { useState } from 'react';

const FAQS = [
  {
    tag: 'Ingredients',
    q: 'What is super-fine grade pea protein?',
    a: 'Ultra-fine pea protein isolate processed to remove grittiness and chalkiness. It blends clean, digests easily, and delivers a complete amino acid profile without compromise.',
  },
  {
    tag: 'Science',
    q: 'Why combine pea protein with rice protein?',
    a: 'Together they form a complete amino acid profile — the same science behind traditional Indian meals that pair grains with lentils. Maximum absorption. Zero waste.',
  },
  {
    tag: 'Health',
    q: 'Is it safe for PCOS or hormonal conditions?',
    a: 'Yes. Low in additives, gut-friendly, and formulated with a pumpkin seed and flax seed blend specifically chosen for hormonal balance. Every ingredient is accountable.',
  },
  {
    tag: 'Storage',
    q: 'What is the shelf life?',
    a: '12 months from the date of manufacturing. Store in a cool, dry place away from direct sunlight.',
  },
  {
    tag: 'Sourcing',
    q: 'Where do your ingredients come from?',
    a: 'Every source is traceable. Our cocoa is Spanish-sourced. Pea protein and brown rice protein are single-origin. Radical transparency is not a marketing claim — it is a standard.',
  },
];

const pad = (n) => String(n).padStart(2, '0');

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function FAQSection() {
  const [open, setOpen] = useState(0);
  const toggle = (i) => setOpen((o) => (o === i ? null : i));

  return (
    <section id="learn" className="faq" aria-labelledby="faq-title">
      <div className="faq-wrap">
        {/* ── intro column ── */}
        <div className="faq-intro" data-reveal-stagger="0.12">
          <span className="faq-kicker">
            <i aria-hidden />
            Frequently asked questions
          </span>
          <h2 id="faq-title" className="faq-title" data-split>
            Every ingredient, <em>every answer.</em>
          </h2>
          <p className="faq-sub">Straight answers about what goes in the pouch, why, and where it comes from.</p>

          <div className="faq-card">
            <span className="faq-card-mark" aria-hidden>
              ?
            </span>
            <strong>Still curious?</strong>
            <p>Ask us anything on Instagram, or find your daily protein number in under a minute.</p>
            <div className="faq-card-actions">
              <a href="https://www.instagram.com/theproteinest/" target="_blank" rel="noopener noreferrer" className="faq-btn faq-btn--solid">
                <InstagramIcon /> Ask on Instagram
              </a>
              <a href="/calculator" className="faq-btn">
                Protein calculator <ArrowIcon />
              </a>
            </div>
          </div>
        </div>

        {/* ── accordion ── */}
        <div className="faq-list" data-reveal-stagger="0.08">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <article key={f.q} className="faq-item" data-open={isOpen}>
                <button type="button" className="faq-q" onClick={() => toggle(i)} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`}>
                  <span className="faq-num">{pad(i + 1)}</span>
                  <span className="faq-q-body">
                    <span className="faq-tag">{f.tag}</span>
                    <span className="faq-q-text">{f.q}</span>
                  </span>
                  <span className="faq-icon" aria-hidden>
                    <i />
                    <i />
                  </span>
                </button>
                <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div className="faq-a-inner">
                    <p>{f.a}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
