export default function DifferentiatorsSection() {
  const diffs = [
    {
      num: "01",
      title: "Clean ingredients",
      desc: "No fillers, gums, or artificial sweeteners. Every ingredient is accountable, every dosage is published.",
    },
    {
      num: "02",
      title: "Zero bloat",
      desc: "Ultra-fine pea and brown rice protein your gut can process without discomfort.",
    },
    {
      num: "03",
      title: "Precision formulated",
      desc: "Built around science, not trends. Clinically researched doses, not proprietary blends.",
    },
    {
      num: "04",
      title: "NABL lab tested",
      desc: "Every batch verified for purity, heavy metals, and pesticide residue. No exceptions.",
    },
  ];

  return (
    <section>
      <div className="section-head">
        <h2 style={{ fontFamily: 'var(--font-fira-sans)', fontWeight: 800 }}>
          The standard others avoid
        </h2>
        <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 300 }}>
          Four things that separate The Proteinest from every other tub on the shelf.
        </p>
      </div>
      <div className="diff-grid">
        {diffs.map((item, idx) => (
          <div key={idx} className="diff-card">
            <div className="icon-dot">{item.num}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
