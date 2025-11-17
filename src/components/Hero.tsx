import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import heroVideo from "@/assets/videos/hero-video-2.mp4";
import heroImage from "@/assets/new-hero-image.png";
import QuickQuotation from "@/components/QuickQuotation";

const WarningSignsSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      // Calculate progress for warning signs section (from 100vh to 200vh)
      const sectionStart = viewportHeight;
      const sectionHeight = viewportHeight;
      const progress = Math.min(Math.max((scrollY - sectionStart) / sectionHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const warningTexts = [
    'Roof defect details',
    'Electrical hazard details',
    'Structural concern details',
    'Moisture ingress details',
    'HVAC concern details'
  ];

  return (
    <section className="relative w-full h-screen bg-black flex items-center overflow-hidden">
      {/* Warning Signs */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        {warningTexts.map((text, idx) => {
          const appearThreshold = idx * 0.2; // Each sign appears at 20% intervals
          const isVisible = scrollProgress > appearThreshold;
          const opacity = isVisible ? Math.min((scrollProgress - appearThreshold) / 0.1, 1) : 0;

          return (
            <div
              key={idx}
              className="absolute"
              style={{
                left: `${15 + idx * 17}%`, // Spread across the screen
                top: `${20 + idx * 12}%`, // Stagger vertically
                animation: isVisible ? `pulse 2s ease-in-out infinite ${idx * 0.3}s` : 'none',
                zIndex: 20
              }}
            >
              <AlertTriangle
                className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                fill="rgba(250,204,21,0.3)"
                style={{ opacity }}
              />
              <div
                className="warning-label"
                style={{
                  position: 'absolute',
                  left: '44px',
                  top: '-6px',
                  background: 'rgba(255,255,255,0.9)',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  color: '#1f2937',
                  fontSize: '13px',
                  opacity: opacity,
                  transform: 'translateY(0)',
                  transition: 'opacity 200ms ease, transform 200ms ease',
                  zIndex: 30
                }}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Title that appears at the end */}
      {scrollProgress > 0.8 && (
        <div className="container relative z-10 mx-auto px-4 text-center" style={{ zIndex: 50 }}>
          <h2
            className="font-inter text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wide"
            style={{
              opacity: Math.min((scrollProgress - 0.8) / 0.2, 1),
              transform: `translateY(${20 - 20 * Math.min((scrollProgress - 0.8) / 0.2, 1)}px)`
            }}
          >
            Comprehensive Property Inspection
          </h2>
        </div>
      )}
    </section>
  );
};

export const Hero = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [showTrustBadges, setShowTrustBadges] = useState(false);
  const [showImageSection, setShowImageSection] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Show CTA after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show trust badges and title after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTrustBadges(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll for image section and warnings
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Show image section when scrolling starts (immediately)
      // Release sticky after one viewport height of scrolling (1 viewport height total)
      if (scrollY > 0 && scrollY < viewportHeight) {
        setShowImageSection(true);
      } else if (scrollY >= viewportHeight) {
        setShowImageSection(false);
      } else {
        setShowImageSection(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Video Section */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          {/* Blue overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: `hsl(var(--authority-blue))`,
              opacity: 0.7
            }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            {/* Trust badges - show after 3s */}
            <div
              className="flex flex-wrap justify-center gap-3 mb-8 transition-all duration-700"
              style={{
                opacity: showTrustBadges ? 1 : 0,
                transform: showTrustBadges ? 'translateY(0)' : 'translateY(-20px)',
                pointerEvents: showTrustBadges ? 'auto' : 'none'
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

            <h1
              className="font-inter text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-wide transition-all duration-700"
              style={{
                color: 'hsl(var(--clinical-white))',
                letterSpacing: '1.5px',
                opacity: showTrustBadges ? 1 : 0,
                transform: showTrustBadges ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              See the unseen, Protect Your Investment
            </h1>

            {/* CTAs - show after 1s */}
            <div
              className="flex flex-col sm:flex-row gap-4 transition-all duration-700"
              style={{
                opacity: showCTA ? 1 : 0,
                transform: showCTA ? 'translateY(0)' : 'translateY(20px)',
                pointerEvents: showCTA ? 'auto' : 'none'
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
      </section>

      {/* Image Section - sticks when scrolling */}
      <div
        className="w-full h-screen overflow-hidden transition-opacity duration-500"
        style={{
          opacity: showImageSection ? 1 : 0,
          position: showImageSection ? 'fixed' : 'relative',
          top: showImageSection ? '0' : 'auto',
          left: showImageSection ? '0' : 'auto',
          zIndex: showImageSection ? 40 : 'auto'
        }}
      >
        {/* Image Background */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Blue overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: `hsl(var(--authority-blue))`,
              opacity: 0.7
            }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1
              className="font-inter text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-wide"
              style={{
                color: 'hsl(var(--clinical-white))',
                letterSpacing: '1.5px'
              }}
            >
              Increase Return Investment Not Cost
            </h1>

            <p
              className="font-lora text-lg md:text-xl mb-8 leading-relaxed"
              style={{
                color: 'hsl(var(--clinical-white))'
              }}
            >
              Smart inspections maximize your investment value.
            </p>
          </div>
        </div>
      </div>

      {/* Warning Signs Section */}
      <WarningSignsSection />
    </>
  );
};

// CSS animations
const styles = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.1);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
