export default function DifferentiatorsSection() {
  const diffs = [
    {
      num: "01",
      title: "Clean & safe",
      desc: "No fillers, gums, or artificial sweeteners in any batch.",
    },
    {
      num: "02",
      title: "No-bloat promise",
      desc: "Ultra-fine pea and rice protein your gut can actually process.",
    },
    {
      num: "03",
      title: "Made for the Indian body",
      desc: "Formulated around Indian diets, digestion, and daily routines.",
    },
    {
      num: "04",
      title: "NABL lab tested",
      desc: "Every batch checked for purity, heavy metals, and pesticides.",
    },
  ];

  return (
    <section>
      <div className="section-head">
        <h2>Built differently, felt differently</h2>
        <p>Four things that separate The Proteinest from every other tub on the shelf.</p>
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
