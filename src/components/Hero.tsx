import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import heroVideo from "@/assets/videos/hero-video-2.mp4";
import QuickQuotation from "@/components/QuickQuotation";

export const Hero = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [showTrustBadges, setShowTrustBadges] = useState(false);
  const [warningSignPosition, setWarningSignPosition] = useState({ top: '50%', left: '50%' });
  const [warningSignVisible, setWarningSignVisible] = useState(false);
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

  // Show warning sign after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setWarningSignVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Control video playback (4 seconds)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 4) {
        video.currentTime = 0; // Loop back to start
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  // Handle warning sign movement with scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (!warningSignVisible) return;

      // Calculate position based on scroll
      // Start position: center of hero (50%, 50%)
      // End position: left of numbers in why section

      // Why section starts around 100vh, numbers are around 150vh
      const startScroll = 0;
      const endScroll = viewportHeight * 1.5; // 150vh

      const progress = Math.min(Math.max((scrollY - startScroll) / (endScroll - startScroll), 0), 1);

      // Interpolate position
      const startTop = 50; // 50%
      const endTop = 65; // Position near the numbers in why section
      const startLeft = 50; // 50%
      const endLeft = 15; // Left side for the numbers

      const currentTop = startTop + (endTop - startTop) * progress;
      const currentLeft = startLeft + (endLeft - startLeft) * progress;

      setWarningSignPosition({
        top: `${currentTop}%`,
        left: `${currentLeft}%`
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [warningSignVisible]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            clipPath: 'inset(0 0 20px 0)' // Cut 20px from bottom
          }}
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

      {/* Warning Sign */}
      {warningSignVisible && (
        <div
          className="absolute z-50 transition-all duration-1000 ease-out"
          style={{
            top: warningSignPosition.top,
            left: warningSignPosition.left,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <AlertTriangle
            className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-pulse"
            fill="rgba(250,204,21,0.3)"
          />
        </div>
      )}

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
  );
};
