import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/new-hero-image.png";
import heroImage2 from "@/assets/new-hero-image-2.png";
import heroVideo from "@/assets/videos/hero-video-2.mp4";
import QuickQuotation from "@/components/QuickQuotation";

export const Hero = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showUI, setShowUI] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Video sequence: video (4s) → show UI
  useEffect(() => {
    const showUITimer = setTimeout(() => setShowUI(true), 4000);
    const pauseVideoTimer = setTimeout(() => {
      videoRef.current?.pause();
    }, 4000);

    return () => {
      clearTimeout(showUITimer);
      clearTimeout(pauseVideoTimer);
    };
  }, []);

  // Handle scroll snap and section tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const sections = containerRef.current.querySelectorAll('.hero-section');
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sections = [
    {
      id: 'hero-video',
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
      ),
      headline: "See the unseen, Protect Your Investment",
      subtitle: null,
      showCTAs: showUI,
      trustBadges: showUI
    },
    {
      id: 'hero-image1',
      background: (
        <img
          src={heroImage}
          alt="Property inspection"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      headline: "See the unseen, Protect Your Investment",
      subtitle: "We look beyond the surface. Digital precision. Investment protection.",
      showCTAs: true,
      trustBadges: false
    },
    {
      id: 'hero-image2',
      background: (
        <img
          src={heroImage2}
          alt="Investment returns visualization"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ),
      headline: "Increase return investment not cost",
      subtitle: null,
      showCTAs: true,
      trustBadges: false
    }
  ];

  return (
    <>
      {/* Snap Scroll CSS */}
      <style>{`
        .hero-container {
          scroll-snap-type: y mandatory;
        }
        .hero-section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
        }
      `}</style>

      <div ref={containerRef} className="hero-container">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="hero-section relative h-screen flex items-center overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
              {section.background}

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
            <div className="container relative z-10 mx-auto px-4 py-20">
              <div className="max-w-3xl animate-fade-in-up">
                {/* Trust badges (only on first section after UI shows) */}
                {section.trustBadges && currentSection === 0 && (
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {['InterNACHI® certified', '10+ years engineering expertise', 'Global service network'].map((badge) => (
                      <div key={badge} className="bg-background/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-accent/30">
                        <p className="text-primary-foreground text-sm font-medium text-center">
                          {badge}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Headline */}
                <h1
                  className="font-inter text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-wide"
                  style={{
                    color: 'hsl(var(--clinical-white))',
                    letterSpacing: '1.5px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {section.headline}
                </h1>

                {/* Subtitle */}
                {section.subtitle && (
                  <p className="font-lora text-lg md:text-xl mb-8 leading-relaxed" style={{ color: 'hsl(var(--clinical-white))' }}>
                    {section.subtitle}
                  </p>
                )}

                {/* CTAs */}
                {section.showCTAs && (
                  <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
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
                )}
              </div>
            </div>

            {/* Scroll indicator (only on first section) */}
            {index === 0 && !showUI && (
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
        ))}
      </div>
    </>
  );
};
