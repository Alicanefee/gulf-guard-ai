import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { InteractiveComparisonSlider } from "@/components/InteractiveComparisonSlider";
import { ServicePackages } from "@/components/ServicePackages";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Testimonials } from "@/components/Testimonials";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Index = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Show navbar 3 seconds after video starts
    const navbarTimer = setTimeout(() => {
      setShowNavbar(true);
    }, 3000);

    return () => clearTimeout(navbarTimer);
  }, []);

  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}
      <Hero />
      <WhySection />
      <ServicePackages />
      <ProcessTimeline />
      <Testimonials />
      <FAQSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
