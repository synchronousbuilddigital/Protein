'use client';

/**
 * "Others vs The Proteinest" comparison.
 * Desktop: one grid where every feature row spans both columns, so each pair lines up.
 * Mobile: the same cells re-ordered into two stacked cards (Others, then The Proteinest).
 * Rows reveal with a stagger when the section scrolls into view. Styles: "Comparison card" in globals.css.
 */
import leftImg from '../../public/image.png';
import rightImg from '../../public/protein.png';

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.2 6.2L4.8 9.2L9.8 2.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 4C20 4 18 14 12 18C6 22 2 20 2 20C2 20 4 10 10 6C16 2 20 4 20 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
      <path d="M2 20L10 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function DnaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3C7 3 9 7 12 9C15 11 17 15 17 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 3C17 3 15 7 12 9C9 11 7 15 7 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.5 6.5H15.5M8.5 17.5H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function MuscleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 10C6 10 4 11 4 13C4 15 5.5 16 7 16H9L10 18H14L15 16H17C18.5 16 20 15 20 13C20 11 18 10 18 10L16 8C16 8 14.5 6 12 6C9.5 6 8 8 8 8L6 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21C12 21 3 14.5 3 8.5C3 5.4 5.4 3 8.5 3C10.2 3 11.8 3.9 12 5C12.2 3.9 13.8 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
    </svg>
  );
}

/* Each row is a matched pair: what others do vs what The Proteinest does. */
const ROWS = [
  { label: 'Digestion', no: ['Often causes bloating', 'Harder to digest'], yes: ['Light & easy to enjoy', 'Gentle on your stomach'] },
  { label: 'Ingredients', no: ['Artificial fillers', 'Unnecessary additives'], yes: ['Clean ingredients', 'No unnecessary additives'] },
  { label: 'Sweetener', no: ['Artificial sweeteners', 'Leaves an unnatural aftertaste'], yes: ['Sweetened with monk fruit', 'Naturally delicious'] },
  { label: 'Protein source', no: ['Dairy whey blends', 'Can feel heavy'], yes: ['100% plant isolate', 'Pea & brown rice'] },
];

const TRUST = [
  { icon: <LeafIcon />, label: '100% Plant-Based', tone: 'green' },
  { icon: <DnaIcon />, label: 'Gut Friendly', tone: 'orange' },
  { icon: <MuscleIcon />, label: 'Builds Lean Muscle', tone: 'orange' },
  { icon: <HeartIcon />, label: 'No Whey, No Bloat', tone: 'orange' },
];

export default function ComparisonSection() {
  const n = ROWS.length;

  return (
    <section id="compare" className="cmp band band--sage" data-reveal-class="cmp-in" aria-labelledby="cmp-title">
      <div className="cmp-glow" aria-hidden data-parallax="0.3" />

      <div className="cmp-wrap">
        <div className="cmp-head" data-reveal-stagger="0.12">
          <span className="cmp-kicker">
            <i aria-hidden />
            The honest comparison
            <i aria-hidden />
          </span>
          <h2 id="cmp-title" className="cmp-title" data-split>
            Others <em>vs.</em> <span>The Proteinest</span>
          </h2>
          <p className="cmp-sub editorial">Same scoop. A very different story.</p>
        </div>

        <div className="cmp-card">
          {/* ── column heads ── */}
          <div className="cmp-cell cmp-cell--no cmp-colhead" style={{ order: 1 }}>
            <span className="cmp-eyebrow">Others</span>
            <div className="cmp-product">
              <img src={leftImg.src} alt="A typical protein tub" className="cmp-product-img cmp-product-img--no" loading="lazy" />
            </div>
            <h3 className="cmp-colname">Others</h3>
            <p className="cmp-tagline">Might fill you up, but at a cost.</p>
          </div>
          <div className="cmp-cell cmp-cell--yes cmp-colhead" style={{ order: n + 2 }}>
            <span className="cmp-vs" aria-hidden>
              VS
            </span>
            <span className="cmp-eyebrow cmp-eyebrow--yes">The Proteinest</span>
            <div className="cmp-product cmp-product--yes">
              <img src={rightImg.src} alt="The Proteinest Choco Buddy with the steel shaker" className="cmp-product-img" loading="lazy" />
              <span className="cmp-pick">Our pick</span>
            </div>
            <h3 className="cmp-colname cmp-colname--yes">The Proteinest</h3>
            <p className="cmp-tagline cmp-tagline--yes">Clean nutrition. Real results.</p>
          </div>

          {/* ── feature rows (grid keeps each pair on one line on desktop) ── */}
          {ROWS.map((r, i) => (
            <div key={r.label} className="contents">
              <div className="cmp-cell cmp-cell--no cmp-row" style={{ order: i + 2, '--i': i }}>
                <span className="cmp-rowlabel">{r.label}</span>
                <span className="cmp-mark cmp-mark--no">
                  <XIcon />
                </span>
                <span className="cmp-text">
                  <strong>{r.no[0]}</strong>
                  <small>{r.no[1]}</small>
                </span>
              </div>
              <div className="cmp-cell cmp-cell--yes cmp-row" style={{ order: n + 3 + i, '--i': i }}>
                <span className="cmp-rowlabel cmp-rowlabel--yes">{r.label}</span>
                <span className="cmp-mark cmp-mark--yes">
                  <CheckIcon />
                </span>
                <span className="cmp-text cmp-text--yes">
                  <strong>{r.yes[0]}</strong>
                  <small>{r.yes[1]}</small>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="cmp-cta-row" data-reveal="up">
          <a href="/shop" className="cmp-cta">
            Discover The Proteinest <ArrowRightIcon />
          </a>
        </div>

        <ul className="cmp-trust" aria-label="Product promises" data-reveal-stagger="0.07">
          {TRUST.map((t) => (
            <li key={t.label} className="cmp-chip">
              <span className={`cmp-chip-icon cmp-chip-icon--${t.tone}`}>{t.icon}</span>
              {t.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
