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
        <h2>Why we created The Proteinest</h2>
        <p>
          For years I woke up tired, went to bed tired, and felt like my body was working against me. Everything changed when I fixed one thing: my protein. I noticed almost every Indian home is unknowingly low on it — the one nutrient quietly powering energy, hormones, mood, and strength.
        </p>
        <p className="pull">
          One scoop a day. A stronger you. And the strongest family.
        </p>
        <a
          href="#shop"
          className="btn btn-white"
          style={{ background: "var(--black)", color: "#fff", marginTop: "26px", display: "inline-block" }}
        >
          Explore Our Products
        </a>
      </div>
    </section>
  );
}
