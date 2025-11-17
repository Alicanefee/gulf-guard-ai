import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import heroVideo from "@/assets/videos/hero-video-2.mp4";
import heroImage from "@/assets/new-hero-image.png";
// removed heroImage2 per design: we will reuse heroImage for the warning transition
import QuickQuotation from "@/components/QuickQuotation";

export const Hero = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [showTrustBadges, setShowTrustBadges] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [stickyProgress, setStickyProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const warningRef = useRef<HTMLDivElement>(null);
  const section2TitleRef = useRef<HTMLDivElement>(null);
  const section3TitleRef = useRef<HTMLDivElement>(null);
  const newTitleRef = useRef<HTMLDivElement>(null);
  const sectionOneRef = useRef<HTMLElement>(null);
  const sectionTwoRef = useRef<HTMLElement>(null);
  const sectionThreeRef = useRef<HTMLElement>(null);
  const sectionFourRef = useRef<HTMLDivElement>(null);
  const [docked, setDocked] = useState(false);
  const warningTexts = [
    'Roof defect details',
    'Electrical hazard details',
    'Structural concern details',
    'Moisture ingress details',
    'HVAC concern details',
    'Safety/accessibility details'
  ];

  // Show CTA after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show trust badges after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTrustBadges(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Pause video and transition to second image section after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      videoRef.current?.pause();
      // Removed auto-scroll since section-two is removed
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-snap and warning symbol animation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // 2 sections: video, warnings-moving
      // Each section takes full viewport scroll to complete
      
      // Calculate current section (0-1)
      const rawSection = scrollY / viewportHeight;
      const section = Math.floor(rawSection);
      const sectionProgress = rawSection - section; // 0 to 1 within current section
      
      setCurrentSection(section);
      setStickyProgress(sectionProgress);
      
      // Release sticky when warnings start moving (section 1 at 40%)
      if (section === 1 && sectionProgress > 0.4) {
        containerRef.current.style.position = 'relative';
        containerRef.current.style.top = 'auto';
        containerRef.current.style.left = 'auto';
      } else {
        containerRef.current.style.position = 'fixed';
        containerRef.current.style.top = '0';
        containerRef.current.style.left = '0';
      }
      
      // Section 0 (video): stays sticky, no fading
      
      // Section 1 (warnings moving): title appears first, then warnings come, then text fades left to right, then warnings move
      if (section === 1 && warningRef.current) {
        // Title appears at start, fades out as scroll starts
        if (section3TitleRef.current) {
          section3TitleRef.current.style.opacity = Math.max(0, 1 - sectionProgress).toString();
        }
        
        // Warnings appear at 20%
        if (sectionProgress > 0.2) {
          warningRef.current.style.opacity = '1';
          warningRef.current.style.transform = 'translateY(0)';
        } else {
          warningRef.current.style.opacity = '0';
        }
        
        // Text next to warnings fades out left to right at 30%
        const labels = warningRef.current.querySelectorAll('.warning-label');
        if (sectionProgress > 0.3) {
          const fadeProgress = Math.min(Math.max((sectionProgress - 0.3) / 0.1, 0), 1); // fades over 10% scroll
          labels.forEach((el, idx) => {
            const delay = idx * 0.1; // stagger left to right
            const opacity = Math.max(0, 1 - (fadeProgress - delay));
            (el as HTMLElement).style.opacity = opacity.toString();
          });
        } else {
          labels.forEach((el) => {
            (el as HTMLElement).style.opacity = '1';
          });
        }
        
        // Warnings start moving at 40%
        if (sectionProgress > 0.4) {
          const moveProgress = Math.min(Math.max((sectionProgress - 0.4) / 0.6, 0), 1);
          const translateY = moveProgress * 100;
          warningRef.current.style.transform = `translateY(${translateY}vh)`;
        }
      } else {
        if (section3TitleRef.current) section3TitleRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Spacer to allow scrolling through 2 sections */}
      <div style={{ height: '200vh' }} />
      
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{ zIndex: 50 }}
      >
        {/* Section 1: Video - always visible during section 0 */}
        <section 
          ref={sectionOneRef}
          id="section-one" 
          className="section absolute inset-0 w-full h-full flex items-center"
          style={{ 
            opacity: currentSection === 0 ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            pointerEvents: currentSection === 0 ? 'auto' : 'none'
          }}
        >
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
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

        {/* Section 1: Warnings - visible during section 1 */}
        <section 
          ref={sectionThreeRef}
          id="section-two" 
          className="section absolute inset-0 w-full h-full flex items-center"
          style={{ 
            opacity: currentSection === 1 ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            pointerEvents: currentSection === 1 ? 'auto' : 'none',
            backgroundColor: 'black' // or transparent
          }}
        >

        {/* Title that fades out on scroll */}
        <div className="container relative z-10 mx-auto px-4">
          <div ref={section3TitleRef} className="max-w-3xl transition-opacity duration-500">
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
              style={{ color: 'hsl(var(--clinical-white))' }}
            >
              Smart inspections maximize your investment value.
            </p>
          </div>
        </div>

        {/* Animated Warning Symbols */}
        <div 
          ref={warningRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{ 
            opacity: 0,
            zIndex: 60
          }}
        >
          {/* Warning symbols scattered across the image */}
          {[
            { left: '15%', top: '20%' },
            { left: '70%', top: '15%' },
            { left: '30%', top: '45%' },
            { left: '85%', top: '40%' },
            { left: '50%', top: '65%' },
            { left: '20%', top: '75%' }
          ].map((pos, idx) => (
            <div
              key={idx}
              className="absolute"
              style={{
                left: pos.left,
                top: pos.top,
                animation: `pulse 2s ease-in-out infinite ${idx * 0.3}s`
              }}
            >
              <AlertTriangle 
                className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                fill="rgba(250,204,21,0.3)"
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
                  opacity: 0,
                  transform: 'translateY(0)',
                  transition: 'opacity 200ms ease, transform 200ms ease'
                }}
              >
                {warningTexts[idx]}
              </div>
            </div>
          ))}
        </div>

      </section>
      </div>

      {/* CSS animations */}
      <style>{`
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
      `}</style>
    </>
  );
};
