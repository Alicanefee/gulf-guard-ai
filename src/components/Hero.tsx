import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/new-hero-image.png";
import heroImage2 from "@/assets/new-hero-image-2.png";
import heroVideo from "@/assets/videos/hero-video-2.mp4";
import QuickQuotation from "@/components/QuickQuotation";

export const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showUI, setShowUI] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Video sequence: video (4s) → show UI
  useEffect(() => {
    const showUITimer = setTimeout(() => {
      setShowUI(true);
    }, 4000);

    const pauseVideoTimer = setTimeout(() => {
      videoRef.current?.pause();
    }, 4000);

    return () => {
      clearTimeout(showUITimer);
      clearTimeout(pauseVideoTimer);
    };
  }, []);

  // Track scroll progress - hero is sticky for 3 viewport heights
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 3; // 3 screens worth of scroll
      
      // Progress from 0 to 1 over 3 viewport heights
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      setScrollProgress(progress);
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Determine current content based on scroll progress
  const getCurrentContent = () => {
    if (scrollProgress < 0.33) {
      return {
        headline: "See the unseen, Protect Your Investment",
        subtitle: null,
        showTrustBadges: showUI,
        background: (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        )
      };
    } else if (scrollProgress < 0.66) {
      return {
        headline: "See the unseen, Protect Your Investment",
        subtitle: "We look beyond the surface. Digital precision. Investment protection.",
        showTrustBadges: false,
        background: (
          <img
            src={heroImage}
            alt="Property inspection"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )
      };
    } else {
      return {
        headline: "Increase return investment not cost",
        subtitle: null,
        showTrustBadges: false,
        background: (
          <img
            src={heroImage2}
            alt="Investment returns visualization"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )
      };
    }
  };

  const currentContent = getCurrentContent();

  return (
    <>
      {/* Spacer to allow scrolling through hero content */}
      <div style={{ height: '300vh' }} />
      
      <section
        ref={heroRef}
        className="fixed top-0 left-0 w-full h-screen flex items-center overflow-hidden z-0"
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 transition-opacity duration-1000">
            {currentContent.background}
          </div>

          {/* Blue overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              backgroundColor: `hsl(var(--authority-blue))`,
              opacity: 0.7
            }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-3xl">
            {/* Trust badges */}
            <div 
              className="flex flex-wrap justify-center gap-3 mb-8 transition-all duration-700"
              style={{
                opacity: currentContent.showTrustBadges ? 1 : 0,
                transform: currentContent.showTrustBadges ? 'translateY(0)' : 'translateY(-20px)',
                pointerEvents: currentContent.showTrustBadges ? 'auto' : 'none'
              }}
            >
              {['InterNACHI® certified', '10+ years engineering expertise', 'Global service network'].map((badge) => (
                <div key={badge} className="bg-background/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-accent/30">
                  <p className="text-primary-foreground text-sm font-medium text-center">
                    {badge}
                  </p>
                </div>
              ))}
            </div>

            {/* Headline */}
            <h1 
              className="font-inter text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-wide"
              style={{
                color: 'hsl(var(--clinical-white))',
                letterSpacing: '1.5px',
                transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out'
              }}
            >
              {currentContent.headline}
            </h1>

            {/* Subtitle */}
            <div 
              className="transition-all duration-700"
              style={{
                opacity: currentContent.subtitle ? 1 : 0,
                transform: currentContent.subtitle ? 'translateY(0)' : 'translateY(10px)',
                height: currentContent.subtitle ? 'auto' : '0',
                overflow: 'hidden'
              }}
            >
              {currentContent.subtitle && (
                <p 
                  className="font-lora text-lg md:text-xl mb-8 leading-relaxed"
                  style={{ color: 'hsl(var(--clinical-white))' }}
                >
                  {currentContent.subtitle}
                </p>
              )}
            </div>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row gap-4 transition-all duration-700"
              style={{
                opacity: showUI ? 1 : 0,
                transform: showUI ? 'translateY(0)' : 'translateY(20px)',
                pointerEvents: showUI ? 'auto' : 'none'
              }}
            >
              <QuickQuotation />
              <Button
                size="xl"
                variant="premium-outline"
                onClick={() => scrollToSection('why')}
                className="font-inter"
              >
                Find why
              </Button>
              <Button
                size="xl"
                variant="premium"
                onClick={() => scrollToSection('booking')}
                className="group font-inter"
              >
                Book Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator (only before UI shows) */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-500"
          style={{
            opacity: !showUI ? 1 : 0,
            pointerEvents: !showUI ? 'auto' : 'none'
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-wider" style={{ color: 'hsl(var(--precision-blue))' }}>
              Scroll to explore
            </span>
            <ChevronDown className="w-6 h-6" style={{ color: 'hsl(var(--precision-blue))' }} />
          </div>
        </div>
      </section>
    </>
  );
};
