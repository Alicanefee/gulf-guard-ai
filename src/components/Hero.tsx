import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/videos/hero-video-2.mp4";
import heroImage from "@/assets/new-hero-image.png";
import QuickQuotation from "@/components/QuickQuotation";

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

  // Handle scroll for image section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Show image section when scrolling starts, release after 1 viewport height
      if (scrollY > 0 && scrollY < viewportHeight) {
        setShowImageSection(true);
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

      {/* Image Section - sticks for 1 scroll then releases */}
      {showImageSection && (
        <div
          className="w-full h-screen overflow-hidden transition-opacity duration-500"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 40,
            opacity: showImageSection ? 1 : 0
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
                className="font-inter text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-wide transition-all duration-700"
                style={{
                  color: 'hsl(var(--clinical-white))',
                  letterSpacing: '1.5px',
                  opacity: showImageSection ? 1 : 0,
                  transform: showImageSection ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                Increase Return Investment Not Cost
              </h1>

              <p
                className="font-lora text-lg md:text-xl mb-8 leading-relaxed transition-all duration-700"
                style={{
                  color: 'hsl(var(--clinical-white))',
                  opacity: showImageSection ? 1 : 0,
                  transform: showImageSection ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                Smart inspections maximize your investment value.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};




