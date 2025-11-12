import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { InteractiveComparisonSlider } from "@/components/InteractiveComparisonSlider";
import { ServicePackages } from "@/components/ServicePackages";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Testimonials } from "@/components/Testimonials";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhySection />
      <InteractiveComparisonSlider />
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
