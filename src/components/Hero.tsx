import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import heroVideo from "@/assets/videos/hero-video-2.mp4";
import heroImage from "@/assets/new-hero-image.png";
import QuickQuotation from "@/components/QuickQuotation";

export const Hero = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [showTrustBadges, setShowTrustBadges] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [stickyProgress, setStickyProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const warningRef = useRef<HTMLDivElement>(null);
  const sectionTitleRef = useRef<HTMLDivElement>(null);
  const sectionOneRef = useRef<HTMLElement>(null);
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

  // Scroll-snap and warning symbol animation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // 1 section: warnings-moving
      // Section takes 80vh scroll to complete (reduced by 60% from 200vh)
      
      // Calculate section progress (0 to 1)
      const sectionProgress = Math.min(scrollY / (viewportHeight * 0.8), 1);
      
      setCurrentSection(0);
      setStickyProgress(sectionProgress);
      
      // Release sticky when warnings start moving (at 40%)
      if (sectionProgress > 0.4) {
        containerRef.current.style.position = 'relative';
        containerRef.current.style.top = 'auto';
        containerRef.current.style.left = 'auto';
      } else {
        containerRef.current.style.position = 'fixed';
        containerRef.current.style.top = '0';
        containerRef.current.style.left = '0';
      }
      
      // Section 0 (warnings moving): title appears first, then warnings come, then text fades left to right, then warnings move
      if (warningRef.current) {
        // Title appears at start, fades out as scroll starts
        if (sectionTitleRef.current) {
          sectionTitleRef.current.style.opacity = Math.max(0, 1 - sectionProgress).toString();
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
        if (sectionTitleRef.current) sectionTitleRef.current.style.opacity = '1';
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
      {/* Spacer to allow scrolling through 1 section (reduced by 60%) */}
      <div style={{ height: '80vh' }} />
      
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{ zIndex: 50 }}
      >
        {/* Section 1: Warnings with image background - visible during section 0 */}
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

        {/* Title that fades out on scroll */}
        <div className="container relative z-10 mx-auto px-4">
          <div ref={sectionTitleRef} className="max-w-3xl transition-opacity duration-500">
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
