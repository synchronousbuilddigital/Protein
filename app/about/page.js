import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DoctorsSection from "../components/DoctorsSection";
import Image from "next/image";
import founderImg from "../../public/founder.png";
import proteinImg from "../../public/protein.png";
import kulfiImg from "../../public/badamkhulfi.png";

export const metadata = {
  title: "About Us — The Proteinest",
  description: "Learn why we created The Proteinest: clean, gentle, great-tasting protein formulated specifically for the Indian body and backed by medical experts.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111] flex flex-col antialiased">
      <Navbar />

      {/* Hero / Brand Intro */}
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-20 bg-gradient-to-b from-[#111111] via-[#1c1917] to-[#111111] text-white relative overflow-hidden">
        {/* Glow Accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EF5A32]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="wrap relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-widest text-[#EF5A32] mb-5">
            About The Proteinest
          </div>

          <h1 className="font-['Anton'] text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white mb-6 leading-none">
            Fueling The <span className="text-[#EF5A32]">Finest You</span>
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            A brand of Gizinest Wellness Pvt Ltd. We are on a single-minded mission: to bring clean, gentle, and
            truly delicious protein to every Indian kitchen — with zero bloat and uncompromising quality.
          </p>

          {/* Key Brand Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/15">
            <div className="p-3 text-center">
              <div className="font-['Anton'] text-3xl sm:text-4xl text-[#EF5A32]">25g</div>
              <div className="text-xs text-white/70 uppercase tracking-wider mt-1">Clean Protein/Scoop</div>
            </div>
            <div className="p-3 text-center">
              <div className="font-['Anton'] text-3xl sm:text-4xl text-white">5.5g</div>
              <div className="text-xs text-white/70 uppercase tracking-wider mt-1">Natural BCAAs</div>
            </div>
            <div className="p-3 text-center">
              <div className="font-['Anton'] text-3xl sm:text-4xl text-[#EF5A32]">0g</div>
              <div className="text-xs text-white/70 uppercase tracking-wider mt-1">Added Sugar</div>
            </div>
            <div className="p-3 text-center">
              <div className="font-['Anton'] text-3xl sm:text-4xl text-white">100%</div>
              <div className="text-xs text-white/70 uppercase tracking-wider mt-1">NABL Lab Tested</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Our Mission */}
      <section className="py-16 sm:py-24 bg-[#FBF7F1]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EF5A32] block mb-2">
                The Indian Dilemma
              </span>
              <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase tracking-tight text-[#111111] leading-tight mb-6">
                Why 80% Of Indians Are Low On Protein
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#111111]/75 leading-relaxed">
                <p>
                  Most traditional Indian meals — while nutrient-dense and comforting — are heavily skewed towards carbohydrates and fats. A typical bowl of dal provides barely 7–9 grams of protein alongside 30g+ of carbs.
                </p>
                <p>
                  Meanwhile, the supplement market was filled with harsh, heavy powders designed for western bodybuilders. They caused severe bloating, digestive cramps, acne, and had an overwhelming synthetic aftertaste.
                </p>
                <p className="font-semibold text-[#111111]">
                  We refused to accept that trade-off. Your daily protein should be as gentle on your digestion as a home-cooked meal, taste heavenly, and deliver pure clinical efficacy.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-[#111111]/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#EF5A32]/10 text-[#EF5A32] flex items-center justify-center font-bold text-lg mb-4">
                  🔬
                </div>
                <h3 className="font-bold text-base text-[#111111] mb-2">NABL Accredited Testing</h3>
                <p className="text-xs text-[#111111]/60 leading-relaxed">
                  Every batch is tested by independent certified labs. No amino-spiking, zero heavy metals, and 100% label accuracy guaranteed.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#111111]/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
                  🌿
                </div>
                <h3 className="font-bold text-base text-[#111111] mb-2">Multi-Enzyme Digest Blend</h3>
                <p className="text-xs text-[#111111]/60 leading-relaxed">
                  Fortified with DigeZyme enzymes to actively break down peptide chains, ensuring rapid gastric emptying and zero bloated tummy feeling.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#111111]/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
                  🍨
                </div>
                <h3 className="font-bold text-base text-[#111111] mb-2">Desi Taste Profiles</h3>
                <p className="text-xs text-[#111111]/60 leading-relaxed">
                  Say goodbye to artificial chemical flavours. Indulge in authentic Dutch Cocoa (Choco Buddy) and royal Badam Kulfi (Kulfi Mate).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#111111]/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-4">
                  ⚡
                </div>
                <h3 className="font-bold text-base text-[#111111] mb-2">Clean Energy, 0g Sugar</h3>
                <p className="text-xs text-[#111111]/60 leading-relaxed">
                  No maltodextrin fillers, no cheap thickeners, no hidden sugar rushes. Pure functional nourishment for everyday vitality.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Doctors & Dieticians Section (Moved here as requested) */}
      <DoctorsSection />

      {/* Founder Story Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#111111]/10">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#111111]/10 aspect-[4/5] relative bg-[#FBF7F1]">
                <Image
                  src={founderImg}
                  alt="Founder of The Proteinest"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EF5A32] block mb-2">
                Founder&apos;s Note
              </span>
              <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase tracking-tight text-[#111111] leading-tight mb-6">
                Why We Created The Proteinest
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#111111]/75 leading-relaxed">
                <p>
                  For years I woke up tired, went to bed tired, and felt like my body was working against me. Everything changed when I fixed one simple thing: my daily protein intake.
                </p>
                <p>
                  I realized that almost every Indian home is unknowingly running low on protein — the essential macronutrient quietly orchestrating daily energy, hormonal regulation, skin elasticity, and muscular strength.
                </p>
                <blockquote className="my-6 pl-4 border-l-4 border-[#EF5A32] text-base sm:text-lg italic font-medium text-[#111111]">
                  &ldquo;One scoop a day. A stronger you. And the strongest family. That is our promise to you.&rdquo;
                </blockquote>
                <p>
                  Today, The Proteinest is trusted by thousands of working professionals, fitness enthusiasts, homemakers, and doctors across the country. We can&apos;t wait for you to experience the difference.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/shop"
                  style={{ color: "#ffffff" }}
                  className="inline-block px-7 py-3.5 rounded-full bg-[#111111] hover:bg-[#333333] !text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Explore Our Products →
                </a>
                <a
                  href="/calculator"
                  className="inline-block px-7 py-3.5 rounded-full bg-[#FBF7F1] hover:bg-[#FBE3DC] text-[#111111] font-bold text-xs uppercase tracking-wider border border-[#111111]/15 transition-all cursor-pointer"
                >
                  Calculate Your Target →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blends Showcase */}
      <section className="py-16 sm:py-20 bg-[#FBF7F1] border-t border-[#111111]/10">
        <div className="wrap text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF5A32] block mb-2">
            Formulated With Passion
          </span>
          <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-tight text-[#111111] mb-4">
            Meet The Flagship Formulas
          </h2>
          <p className="text-xs sm:text-sm text-[#111111]/60 mb-10">
            Crafted for rapid digestion, instant mixability, and exceptional taste.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-3xl bg-white border border-[#111111]/10 shadow-sm flex items-center gap-4">
              <div className="w-20 h-20 relative shrink-0 bg-[#FBF7F1] rounded-2xl p-2 flex items-center justify-center">
                <Image src={proteinImg} alt="Choco Buddy" className="w-16 h-16 object-contain" />
              </div>
              <div>
                <h3 className="font-['Anton'] text-xl uppercase text-[#111111]">Choco Buddy</h3>
                <p className="text-xs text-[#111111]/60 mt-0.5">Rich Dutch Cocoa · 25g Protein</p>
                <div className="font-bold text-sm text-[#EF5A32] mt-2">₹2,499</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#111111]/10 shadow-sm flex items-center gap-4">
              <div className="w-20 h-20 relative shrink-0 bg-[#FBF7F1] rounded-2xl p-2 flex items-center justify-center">
                <Image src={kulfiImg} alt="Kulfi Mate" className="w-16 h-16 object-contain" />
              </div>
              <div>
                <h3 className="font-['Anton'] text-xl uppercase text-[#111111]">Kulfi Mate</h3>
                <p className="text-xs text-[#111111]/60 mt-0.5">Royal Badam Kulfi · 25g Protein</p>
                <div className="font-bold text-sm text-[#EF5A32] mt-2">₹2,499</div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a
              href="/shop"
              style={{ color: "#ffffff" }}
              className="inline-block px-8 py-4 rounded-full bg-[#EF5A32] hover:bg-[#C8441F] !text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
            >
              Shop All Products →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
