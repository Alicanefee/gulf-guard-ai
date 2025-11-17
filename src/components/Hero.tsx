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
  const [docked, setDocked] = useState(false);

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
      // Smooth scroll to second section
      document.getElementById('section-two')?.scrollIntoView({ behavior: 'smooth' });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-snap and warning symbol animation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // 4 sticky sections: video, image1, image2, warnings-moving
      // Each section takes full viewport scroll to complete
      const totalStickyHeight = viewportHeight * 4;
      
      // Calculate current section (0-3)
      const rawSection = scrollY / viewportHeight;
      const section = Math.floor(rawSection);
      const sectionProgress = rawSection - section; // 0 to 1 within current section
      
      setCurrentSection(section);
      setStickyProgress(sectionProgress);
      
      // Section 0 (video): stays sticky, no fading
      
      // Section 1 (image1): title fades out as soon as scroll starts
      if (section === 1 && section2TitleRef.current) {
        const titleOpacity = 1 - sectionProgress; // Fades from 1 to 0
        section2TitleRef.current.style.opacity = titleOpacity.toString();
      }

      // Section 2 (image2): title fades out as scroll starts, warnings appear
      if (section === 2 && section3TitleRef.current && warningRef.current) {
        // Title fades out immediately on scroll
        const titleOpacity = 1 - sectionProgress;
        section3TitleRef.current.style.opacity = titleOpacity.toString();
        
        // Warnings appear as soon as scroll starts (stay in place)
        if (sectionProgress > 0) {
          warningRef.current.style.opacity = '1';
          warningRef.current.style.transform = 'translateY(0)';
        } else {
          warningRef.current.style.opacity = '0';
        }
      }

      // Section 3 (warnings moving): screen moves with warnings, new title appears at 50%
      if (section === 3 && warningRef.current) {
        // Warnings move down 100vh to next section
        const translateY = sectionProgress * 100;
        warningRef.current.style.transform = `translateY(${translateY}vh)`;
        warningRef.current.style.opacity = '1';

        // New title appears when warnings are 50% moved
        if (newTitleRef.current) {
          if (sectionProgress > 0.5) {
            const titleOpacity = (sectionProgress - 0.5) / 0.5; // 0 to 1 from 50% to 100%
            newTitleRef.current.style.opacity = titleOpacity.toString();
          } else {
            newTitleRef.current.style.opacity = '0';
          }
        }

        // Docking: when almost finished moving, mark as docked so section-four shows the same warnings
        if (sectionProgress >= 0.98) {
          setDocked(true);
        } else {
          setDocked(false);
        }
      } else {
        if (newTitleRef.current) newTitleRef.current.style.opacity = '0';
        if (section > 3) {
          // fully past warnings movement - keep docked
          setDocked(true);
        } else if (section < 3) {
          setDocked(false);
        }
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
      {/* Spacer to allow scrolling through 4 sticky sections */}
      <div style={{ height: '400vh' }} />
      
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

        {/* Section 2: First Image with Title - visible during section 1 */}
        <section 
          ref={sectionTwoRef}
          id="section-two" 
          className="section absolute inset-0 w-full h-full flex items-center"
          style={{ 
            opacity: currentSection === 1 ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            pointerEvents: currentSection === 1 ? 'auto' : 'none'
          }}
        >
        {/* Image Background */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Property inspection"
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
        <div className="container relative z-10 mx-auto px-4">
          <div ref={section2TitleRef} className="max-w-3xl transition-opacity duration-500">
            <h1 
              className="font-inter text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-wide"
              style={{
                color: 'hsl(var(--clinical-white))',
                letterSpacing: '1.5px'
              }}
            >
              See the unseen, Protect Your Investment
            </h1>

            <p 
              className="font-lora text-lg md:text-xl mb-8 leading-relaxed"
              style={{ color: 'hsl(var(--clinical-white))' }}
            >
              We look beyond the surface. Digital precision. Investment protection.
            </p>
          </div>
        </div>
      </section>

        {/* Section 3: Second Image with Warnings - visible during sections 2 & 3 */}
        <section 
          ref={sectionThreeRef}
          id="section-three" 
          className="section absolute inset-0 w-full h-full flex items-center"
          style={{ 
            opacity: currentSection >= 2 && currentSection <= 3 ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            pointerEvents: currentSection >= 2 && currentSection <= 3 ? 'auto' : 'none'
          }}
        >
        {/* Image Background */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Investment returns"
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
            </div>
          ))}
        </div>

      </section>
      </div>

      {/* Empty white section to receive warnings (3 left, 3 right) */}
      <section id="section-four" className="relative w-full min-h-screen bg-white flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6 py-12">
              {/* Left column: docked warnings will appear here when docking completes */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-800" />
                </div>
                <div>{docked ? 'Issue: Roof defect details' : ''}</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-800" />
                </div>
                <div>{docked ? 'Issue: Electrical hazard details' : ''}</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-800" />
                </div>
                <div>{docked ? 'Issue: Structural concern details' : ''}</div>
              </div>
            </div>

            <div className="space-y-6 py-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-800" />
                </div>
                <div>{docked ? 'Issue: Moisture ingress details' : ''}</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-800" />
                </div>
                <div>{docked ? 'Issue: HVAC concern details' : ''}</div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-800" />
                </div>
                <div>{docked ? 'Issue: Safety/accessibility details' : ''}</div>
              </div>
            </div>
          </div>

          {/* Hidden title that appears when warnings fully placed */}
          <div ref={newTitleRef} className="text-center mt-12 opacity-0 transition-opacity duration-700">
            <h2 className="text-3xl font-bold">All Issues Identified</h2>
            {docked && (
              <p className="mt-3 text-lg text-muted-foreground">These warnings have been collected and mapped to the inspection report.</p>
            )}
          </div>
        </div>
      </section>

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
