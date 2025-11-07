import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/dubai-skyline-hero.jpg";
import heroVideo from "@/assets/videos/hero.mp4";

export const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const scrolled = Math.abs(rect.top);
        const progress = Math.min((scrolled / sectionHeight) * 100, 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const getHeadline = () => {
    if (scrollProgress < 10) return "See Your Investment's DNA";
    if (scrollProgress < 40) return "We Look Beyond the Surface";
    if (scrollProgress < 70) return "We Detect the Smallest Anomaly";
    return "Your Investment, Secured";
  };

  const getSubtitle = () => {
    if (scrollProgress < 10) return "We look beyond the surface. Digital precision. Investment protection.";
    return null;
  };

  const getOverlayOpacity = () => {
    if (scrollProgress < 10) return 0.7;
    if (scrollProgress < 40) return 0.5 + (scrollProgress - 10) / 60;
    if (scrollProgress < 70) return 0.5;
    return 0.4;
  };

  const getThermalEffect = () => {
    if (scrollProgress >= 40 && scrollProgress < 70) {
      return {
        background: `linear-gradient(135deg, hsl(var(--precision-blue)) 0%, hsl(var(--premium-gold)) 100%)`,
        mixBlendMode: 'overlay' as const,
        opacity: (scrollProgress - 40) / 30
      };
    }
    return {};
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroImage}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: scrollProgress < 40 ? 1 - (scrollProgress / 40) * 0.3 : 0.7,
            filter: scrollProgress >= 10 ? `blur(${Math.min((scrollProgress - 10) / 10, 2)}px)` : 'none'
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{ 
            backgroundColor: `hsl(var(--authority-blue))`,
            opacity: getOverlayOpacity()
          }} 
        />
        {/* Thermal Effect Overlay */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={getThermalEffect()}
        />
        {/* Seal of Approval */}
        {scrollProgress >= 70 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-48 h-48 rounded-full border-8 flex items-center justify-center animate-fade-in"
              style={{ 
                borderColor: 'hsl(var(--premium-gold))',
                backgroundColor: 'rgba(192, 160, 110, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-2">✓</div>
                <div className="font-inter font-bold text-sm" style={{ color: 'hsl(var(--premium-gold))' }}>
                  APPROVED
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-3xl animate-fade-in-up">
          {scrollProgress < 10 && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
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
          )}

          <h1 
            className="font-inter text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-wide transition-all duration-500"
            style={{ 
              color: 'hsl(var(--clinical-white))',
              letterSpacing: '1.5px'
            }}
          >
            {getHeadline()}
          </h1>
          
          {getSubtitle() && (
            <p className="font-lora text-lg md:text-xl mb-8 leading-relaxed" style={{ color: 'hsl(var(--clinical-white))' }}>
              {getSubtitle()}
            </p>
          )}

          {(scrollProgress < 10 || scrollProgress >= 70) && (
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button 
                size="xl" 
                variant="premium"
                onClick={() => scrollToSection('booking')}
                className="group font-inter"
              >
                Book Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              {scrollProgress < 10 && (
                <Button 
                  size="xl" 
                  variant="premium-outline"
                  onClick={() => scrollToSection('why')}
                  className="font-inter"
                >
                  Learn More
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {scrollProgress < 5 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-wider" style={{ color: 'hsl(var(--precision-blue))' }}>
              Scroll to explore
            </span>
            <ChevronDown className="w-6 h-6" style={{ color: 'hsl(var(--precision-blue))' }} />
          </div>
        </div>
      )}
    </section>
  );
};
