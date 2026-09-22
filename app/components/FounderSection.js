import founderImg from "../../public/founder.png";

export default function FounderSection() {
  return (
    <section className="founder" id="about">
      <div className="founder-img">
        <img
          src={founderImg.src}
          alt="Founder of The Proteinest"
        />
      </div>
      <div className="founder-copy">
        <h2 style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800 }}>
          Built for people who refuse to settle
        </h2>
        <p>
          For years, I watched Indian kitchens run low on the one nutrient quietly powering energy, hormones, and strength. Most options on the shelf were loud, synthetic, and not built for how we actually eat and live.
        </p>
        <p style={{ marginTop: '14px' }}>
          The Proteinest was built differently. Clean, potent, responsibly sourced ingredients — including Spanish-sourced cocoa and plant-based pea protein — engineered for serious results. Not for everyone. Made for the finest version of you.
        </p>
        <p className="pull">
          "One scoop. One standard. No compromise."
        </p>
        <a
          href="/shop"
          className="btn btn-orange"
          style={{ marginTop: '28px', display: 'inline-block' }}
        >
          Shop Protein Now
        </a>
      </div>
    </section>
  );
}
