import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { ServicePackages } from "@/components/ServicePackages";
import { BookingSection } from "@/components/BookingSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhySection />
      <ServicePackages />
      <BookingSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
