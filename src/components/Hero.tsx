import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award } from "lucide-react";
import heroImage from "@/assets/dubai-skyline-hero.jpg";

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
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2022/11/07/138366-769531947_large.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img src={heroImage} alt="Dubai skyline" className="w-full h-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-3xl animate-fade-in-up">
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-primary-foreground text-sm font-medium">ISO/IEC 17025:2017</span>
            </div>
            <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-primary-foreground text-sm font-medium">InterNACHI Certified</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Protect Your
            <span className="block bg-gradient-to-r from-accent to-amber-300 bg-clip-text text-transparent">
              Investment
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Dubai's premier property inspection service. AI-powered analysis meets international standards for complete peace of mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="xl" 
              variant="premium"
              onClick={() => scrollToSection('pricing')}
              className="group"
            >
              Calculate Price Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="xl" 
              variant="premium-outline"
              onClick={() => scrollToSection('booking')}
            >
              Book Inspection
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20">
            <div>
              <div className="text-3xl font-bold text-accent mb-1">2000+</div>
              <div className="text-sm text-primary-foreground/80">Inspections</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">98%</div>
              <div className="text-sm text-primary-foreground/80">Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">24h</div>
              <div className="text-sm text-primary-foreground/80">Report Delivery</div>
            </div>
          </div>
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
