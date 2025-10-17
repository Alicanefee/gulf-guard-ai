import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award } from "lucide-react";
import heroImage from "@/assets/dubai-skyline-hero.jpg";
import heroVideo from "@/assets/videos/hero.mp4";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroImage}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-3xl animate-fade-in-up">
          {/* Trust Bar */}
          <div className="bg-background/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-accent/30 mb-8">
            <p className="text-primary-foreground text-sm font-medium text-center">
              InterNACHI® certified – 10+ years engineering expertise – Global service network
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Your Investment.
            <span className="block">
              Your Health.
            </span>
            <span className="block bg-gradient-to-r from-accent to-amber-300 bg-clip-text text-transparent">
              Verified.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Engineer-led inspections with AI risk analysis, 3D scans & premium air quality testing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="xl" 
              variant="premium"
              onClick={() => scrollToSection('booking')}
              className="group"
            >
              Calculate Your AI Risk Score
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="xl" 
              variant="premium-outline"
              onClick={() => scrollToSection('booking')}
            >
              Schedule Your Concierge Inspection
            </Button>
          </div>

          {/* Stats removed as requested */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};
