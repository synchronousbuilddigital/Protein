export default function Marquee() {
  const items = [
    "Made for the Indian body",
    "NABL lab tested for purity",
    "No-bloat promise",
    "Clean & safe",
    "Healthy indulgence",
    "Made for the Indian body",
    "NABL lab tested for purity",
    "No-bloat promise",
    "Clean & safe",
    "Healthy indulgence",
  ];

  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((item, idx) => (
          <span key={idx}>
            {item} &nbsp;&#9679;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
