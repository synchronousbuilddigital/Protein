import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ProteinWhySection from "./components/ProteinWhySection";
import ProductsSection from "./components/ProductsSection";
import ReelsSection from "./components/ReelsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ComparisonSection from "./components/ComparisonSection";
import FounderSection from "./components/FounderSection";
import FAQSection from "./components/FAQSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import LifestyleSection from "./components/LifestyleSection";
import SectionDivider from "./components/SectionDivider";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#F8F6F2' }}>
      <Navbar />

      {/* 1st Section: Hero Banner & Trust Marquee */}
      <Hero />
      <Marquee />

      {/* Why We Need Protein & Solution Section */}
      <ProteinWhySection />

      {/* Products Section */}
      <ProductsSection />

      {/* 3rd Section: Reels */}
      <ReelsSection />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Built For Real Life Lifestyle Section */}
      <LifestyleSection />

      {/* Separation Divider */}
      <SectionDivider />

      <TestimonialsSection />

      <div className="wrap">
        <FounderSection />
        <FAQSection />
      </div>

      <NewsletterSection />
      <Footer />
    </main>
  );
}
