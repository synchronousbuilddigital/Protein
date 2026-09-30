import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import catalog from '@/public/products/manifest.json';

export const metadata = {
  title: 'About Us — The Proteinest',
  description:
    'Why we created The Proteinest: clean, gentle, great-tasting plant protein formulated for the Indian body and backed by medical experts.',
};

/*
 * About — told in chapters (hook → problem → answer → founder → experts → formulas → CTA).
 * Server component; scroll choreography comes from ScrollReveal (data-reveal / data-split / .band).
 * Styles: "About" in globals.css (reuses the shop hero, kicker and band backdrops).
 */

const photo = (slug) => catalog[slug]?.images?.[0];

const STATS = [
  { v: '24', u: 'g', l: 'Plant protein per scoop' },
  { v: '5.5', u: 'g', l: 'Natural BCAAs' },
  { v: '0', u: 'g', l: 'Added sugar' },
  { v: '100', u: '%', l: 'NABL lab tested' },
];

const Svg = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const PILLARS = [
  {
    t: 'NABL-accredited testing',
    d: 'Every batch is checked by independent certified labs: no amino-spiking, no heavy metals, and label accuracy you can trust.',
    icon: (
      <Svg>
        <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" />
        <path d="M7.5 15h9" />
      </Svg>
    ),
  },
  {
    t: 'Multi-enzyme digest blend',
    d: 'DigeZyme enzymes break protein down quickly for smooth digestion, so you feel light instead of bloated.',
    icon: (
      <Svg>
        <path d="M20 4s-2 10-8 14-10 2-10 2 2-10 8-14 10-2 10-2z" />
        <path d="M2 20 10 12" />
      </Svg>
    ),
  },
  {
    t: 'Desi taste profiles',
    d: 'Real Spanish cocoa in Choco Buddy, royal badam kulfi in Kulfi Mate, Arabica in Coffee Crew. No chemical aftertaste.',
    icon: (
      <Svg>
        <path d="M5 11h14l-1.5 8.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5z" />
        <path d="M8 11a4 4 0 0 1 8 0" />
        <path d="M12 3v2" />
      </Svg>
    ),
  },
  {
    t: 'Clean energy, 0 g sugar',
    d: 'No maltodextrin, gums, thickeners or hidden sugars. Just functional nourishment for everyday vitality.',
    icon: (
      <Svg>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </Svg>
    ),
  },
];

const EXPERTS = [
  { name: 'Dr Dishaa Bansal', role: 'Gynecologist', img: '/experts/Dr_Dishaa_Bansal_2.jpg', pos: '50% 20%' },
  { name: 'Payal Rangar', role: 'Certified nutritionist', img: '/experts/Payal_Rangar.png', pos: '50% 25%' },
  { name: 'Dr Rinshu Jain', role: 'Dentist', img: '/experts/Dr_Rinshu_Jain_3.jpg', pos: '50% 20%' },
  { name: 'Dr Ankit Bhartia', role: 'Orthopedic surgeon', img: '/doc-ankit.png', pos: '50% 20%' },
  { name: 'Bandana', role: 'Nutrition expert', img: '/doc-bandana.png', pos: '50% 20%' },
];

const FORMULAS = [
  { id: 'choco-buddy', name: 'Choco Buddy', note: 'Spanish cocoa', accent: '#B25A2C' },
  { id: 'kulfi-mate', name: 'Kulfi Mate', note: 'Royal badam kulfi', accent: '#C9971C' },
  { id: 'coffee-crew', name: 'Coffee Crew', note: 'Arabica cold brew', accent: '#8A5A2E' },
];

function Arrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className="shop about min-h-screen text-[#141414]">
      <Navbar />
      <ScrollReveal />

      {/* ── hook ── */}
      <section className="shop-hero" aria-labelledby="about-title">
        <div className="shop-hero-glow" aria-hidden />
        <div className="shop-hero-grain" aria-hidden />
        <span className="shop-hero-ghost" aria-hidden data-parallax="0.25">
          FINEST
        </span>
        <div className="shop-hero-inner" data-reveal-stagger="0.1">
          <span className="shop-kicker">
            <i aria-hidden />
            Our story
            <i aria-hidden />
          </span>
          <h1 id="about-title" className="shop-hero-title" data-split>
            Fueling the <em>finest you.</em>
          </h1>
          <p className="shop-hero-sub">
            A brand of Gizinest Wellness Pvt Ltd, on one mission: clean, gentle, genuinely delicious protein in every Indian kitchen — with zero bloat and no compromise on quality.
          </p>
          <dl className="ab-stats">
            {STATS.map((s) => (
              <div key={s.l}>
                <dd>
                  {s.v}
                  <span>{s.u}</span>
                </dd>
                <dt>{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── chapter 01: the problem ── */}
      <section className="ab-section band band--sand" aria-labelledby="ab-problem">
        <div className="ab-split">
          <div className="ab-copy" data-reveal-stagger="0.08">
            <span className="ab-chapter">
              <b>01</b> The Indian dilemma
            </span>
            <h2 id="ab-problem" className="cx-big ab-h2" data-split>
              Why <em>80% of Indians</em> fall short on protein
            </h2>
            <p>Traditional Indian meals are nourishing and comforting, but they lean heavily on carbohydrates and fats. A bowl of dal gives barely 7–9 g of protein alongside 30 g or more of carbs.</p>
            <p>Meanwhile the supplement shelf was full of harsh powders built for western bodybuilders: bloating, cramps, acne and a synthetic aftertaste.</p>
            <p className="ab-strong">We refused that trade-off. Daily protein should be as gentle as a home-cooked meal, taste wonderful, and genuinely work.</p>
          </div>

          <div className="ab-compare" data-reveal="right">
            <div className="ab-compare-head">
              <span>One serving, compared</span>
              <strong>Protein per portion</strong>
            </div>
            {[
              { n: 'Bowl of dal', s: '180 g · 160 kcal', g: 8, max: 24 },
              { n: '2 rotis', s: '80 g · 240 kcal', g: 6, max: 24 },
              { n: 'The Proteinest', s: '1 scoop · 118 kcal', g: 24, max: 24, hero: true },
            ].map((r) => (
              <div key={r.n} className="ab-row" data-hero={!!r.hero}>
                <div className="ab-row-top">
                  <span>
                    <strong>{r.n}</strong>
                    <small>{r.s}</small>
                  </span>
                  <b>{r.g} g</b>
                </div>
                <span className="ab-bar" aria-hidden>
                  <i style={{ width: `${(r.g / r.max) * 100}%` }} />
                </span>
              </div>
            ))}
            <p className="ab-compare-foot">Reaching 24 g from dal alone takes about three big bowls and 450+ kcal.</p>
          </div>
        </div>
      </section>

      {/* ── chapter 02: our answer ── */}
      <section className="ab-section band band--sage" aria-labelledby="ab-answer">
        <div className="cx-wrap">
          <div className="cx-head" data-reveal-stagger="0.1">
            <span className="ab-chapter ab-chapter--center">
              <b>02</b> Our answer
            </span>
            <h2 id="ab-answer" className="cx-big" data-split>
              Built <em>differently.</em>
            </h2>
            <p className="cx-lead">Four standards every pouch has to meet before it reaches you.</p>
          </div>
          <div className="ab-pillars" data-reveal-stagger="0.08">
            {PILLARS.map((p, i) => (
              <article key={p.t} className="ab-pillar">
                <span className="ab-pillar-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ab-pillar-icon">{p.icon}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── chapter 03: founder ── */}
      <section className="ab-section band band--ivory" aria-labelledby="ab-founder">
        <div className="ab-founder">
          <div className="ab-founder-glow" aria-hidden />
          <figure className="ab-founder-photo" data-reveal="left">
            <img src="/founder-real.jpg" alt="Founder of The Proteinest" loading="lazy" />
            <figcaption>
              <strong>Founder</strong>
              <span>The Proteinest</span>
            </figcaption>
          </figure>
          <div className="ab-founder-copy" data-reveal-stagger="0.08">
            <span className="ab-chapter ab-chapter--light">
              <b>03</b> Founder&apos;s note
            </span>
            <h2 id="ab-founder" className="ab-founder-title" data-split>
              Why I created <em>The Proteinest</em>
            </h2>
            <p>For years I woke up tired, went to bed tired, and felt like my body was working against me. Everything changed when I fixed one simple thing: my daily protein.</p>
            <p>Then I noticed almost every Indian home is quietly running low on the nutrient that powers energy, hormones, skin, strength and satiety. I wanted to change that.</p>
            <blockquote className="editorial">“One scoop a day. A stronger you. And the strongest family.”</blockquote>
            <p>Today The Proteinest is trusted by working professionals, homemakers, athletes and doctors across the country.</p>
            <div className="ab-actions">
              <a href="/shop" className="shop-cta ab-cta">
                Explore products <Arrow />
              </a>
              <a href="/calculator" className="ab-ghost">
                Calculate your target
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── chapter 04: experts ── */}
      <section className="ab-section band band--blush" aria-labelledby="ab-experts">
        <div className="cx-wrap">
          <div className="cx-head" data-reveal-stagger="0.1">
            <span className="ab-chapter ab-chapter--center">
              <b>04</b> The experts
            </span>
            <h2 id="ab-experts" className="cx-big" data-split>
              Recommended by <em>doctors & dieticians.</em>
            </h2>
            <p className="cx-lead">Medical professionals who recommend The Proteinest to their patients and clients.</p>
          </div>
          <div className="ab-experts" data-reveal-stagger="0.08">
            {EXPERTS.map((e) => (
              <figure key={e.name} className="ab-expert">
                <img src={e.img} alt={e.name} style={{ objectPosition: e.pos }} loading="lazy" />
                <figcaption>
                  <strong>{e.name}</strong>
                  <span>{e.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── formulas ── */}
      <section className="ab-section band band--peach" aria-labelledby="ab-formulas">
        <div className="cx-wrap">
          <div className="cx-head" data-reveal-stagger="0.1">
            <span className="ab-chapter ab-chapter--center">
              <b>05</b> The formulas
            </span>
            <h2 id="ab-formulas" className="cx-big" data-split>
              Meet the <em>flagship three.</em>
            </h2>
            <p className="cx-lead">Made for easy digestion, instant mixing and genuinely good taste.</p>
          </div>
          <div className="ab-formulas" data-reveal-stagger="0.1">
            {FORMULAS.map((f) => (
              <a key={f.id} href={`/shop#${f.id}`} className="ab-formula" style={{ '--accent': f.accent }}>
                <span className="ab-formula-img">
                  <img src={photo(f.id)} alt={f.name} loading="lazy" />
                </span>
                <span className="ab-formula-body">
                  <strong>{f.name}</strong>
                  <small>{f.note} · 24 g protein</small>
                  <span className="ab-formula-foot">
                    <b>From ₹1,499</b>
                    <em>
                      Shop <Arrow />
                    </em>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── closing CTA ── */}
      <section className="ab-section ab-close-wrap" aria-labelledby="ab-close">
        <div className="ab-close" data-reveal="up">
          <div className="ab-close-glow" aria-hidden />
          <h2 id="ab-close" className="ab-close-title" data-split>
            Start with <em>your number.</em>
          </h2>
          <p>Find your daily protein target in under a minute, then pick the flavour that gets you there.</p>
          <div className="ab-actions ab-actions--center">
            <a href="/calculator" className="shop-cta ab-cta">
              Protein calculator <Arrow />
            </a>
            <a href="/shop" className="ab-ghost ab-ghost--light">
              Shop all products
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
