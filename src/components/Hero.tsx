import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award } from "lucide-react";
import heroImage from "@/assets/dubai-skyline-hero.jpg";
import heroVideo from "@/assets/videos/hero.mp4";
import QuickQuotation from '@/components/QuickQuotation';

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
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-background/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-accent/30">
              <p className="text-primary-foreground text-sm font-medium text-center">
                InterNACHI® certified
              </p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-accent/30">
              <p className="text-primary-foreground text-sm font-medium text-center">
                10+ years engineering expertise
              </p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-accent/30">
              <p className="text-primary-foreground text-sm font-medium text-center">
                Global service network
              </p>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Protect Your Dubai Investment From Hidden Defects
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Same-Day 3D Home Scan, Advanced Air-Quality Testing & AI-Powered Risk Report
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="xl" 
              variant="premium"
              onClick={() => scrollToSection('booking')}
              className="group"
            >
              Get Your Free AI Risk Assessment
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="xl" 
              variant="premium-outline"
              onClick={() => scrollToSection('booking')}
            >
              View Our Exclusive Packages
            </Button>
            <QuickQuotation />
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
