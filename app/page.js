import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import DoctorsSection from "./components/DoctorsSection";
import ProductsSection from "./components/ProductsSection";
import ReelsSection from "./components/ReelsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ComparisonSection from "./components/ComparisonSection";
import FounderSection from "./components/FounderSection";
import FAQSection from "./components/FAQSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white pt-[48px] sm:pt-[48px]">
      <Navbar />
      
      {/* 1st Section: Hero Banner */}
      <Hero />



      {/* 2nd Section: Start With A Favorite */}
      <div className="wrap">
        <ProductsSection />
      </div>

      {/* 3rd Section: Reels */}
      <ReelsSection />

      {/* 4th Section: Recommended by Doctors & Dieticians */}
      <DoctorsSection />

      {/* Comparison Section directly after Doctors Section */}
      <ComparisonSection />

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
