import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RiskSection } from "@/components/RiskSection";
import { DiagnosticsSection } from "@/components/DiagnosticsSection";
import { ServicePackages } from "@/components/ServicePackages";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Testimonials } from "@/components/Testimonials";
import { FAQSection } from "@/components/FAQSection";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <RiskSection />
      <DiagnosticsSection />
      <ServicePackages />
      <ProcessTimeline />
      <Testimonials />
      <FAQSection />
      <LegalDisclaimer />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
