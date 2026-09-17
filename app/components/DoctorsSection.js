import docAnkit from "../../public/doc-ankit.png";
import docBandana from "../../public/doc-bandana.png";
import docDishaa from "../../public/doc-dishaa.png";
import docPayal from "../../public/doc-payal.png";
import docRinshu from "../../public/doc-rinshu.png";

export default function DoctorsSection() {
  const doctors = [
    {
      name: "Dr Ankit Bhartia",
      role: "Orthopedic surgeon",
      image: docAnkit.src,
    },
    {
      name: "Bandana",
      role: "Nutrition expert",
      image: docBandana.src,
    },
    {
      name: "Dr Dishaa Bansal",
      role: "Gynecologist",
      image: docDishaa.src,
    },
    {
      name: "Payal Rangar",
      role: "Certified nutritionist",
      image: docPayal.src,
    },
    {
      name: "Dr Rinshu Jain",
      role: "Dentist",
      image: docRinshu.src,
    },
  ];

  return (
    <div className="doctors">
      <div className="wrap">
        <section>
          <div className="section-head center">
            <h2>Recommended by doctors &amp; dieticians</h2>
          </div>
          <div className="doc-row">
            {doctors.map((doc, idx) => (
              <div key={idx} className="doc-card">
                <div className="doc-photo">
                  <img src={doc.image} alt={doc.name} />
                </div>
                <h3>{doc.name}</h3>
                <div className="role">{doc.role}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
