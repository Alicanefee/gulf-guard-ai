import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import heroVideo from "@/assets/videos/hero-video-2.mp4";
import heroImage from "@/assets/new-hero-image.png";
import QuickQuotation from "@/components/QuickQuotation";

export const Hero = () => {
  const [showCTA, setShowCTA] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const warningRef = useRef<HTMLDivElement>(null);

  // Show CTA after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Pause video after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      videoRef.current?.pause();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-snap and warning symbol animation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !warningRef.current) return;

      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight;
      
      // Calculate which section we're in (0 = video, 1 = image)
      const currentSection = Math.floor(scrollY / sectionHeight);
      
      // Move warning symbols down as we scroll
      const scrollProgress = (scrollY % sectionHeight) / sectionHeight;
      const translateY = scrollProgress * 100; // Move from 0 to 100vh
      
      if (currentSection === 1) {
        // Warning symbols visible and moving on second section (image)
        warningRef.current.style.transform = `translateY(${translateY}vh)`;
        warningRef.current.style.opacity = '1';
      } else {
        warningRef.current.style.opacity = '0';
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
    <div ref={containerRef} className="relative" style={{ scrollSnapType: 'y mandatory' }}>
      {/* Section 1: Video */}
      <section 
        id="section-one" 
        className="section relative h-screen w-full flex items-center overflow-hidden"
        style={{ scrollSnapAlign: 'start' }}
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
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['InterNACHI® certified', '10+ years engineering expertise', 'Global service network'].map((badge) => (
                <div key={badge} className="bg-background/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-accent/30">
                  <p className="text-primary-foreground text-sm font-medium text-center">
                    {badge}
                  </p>
                </div>
              ))}
            </div>

            <h1 
              className="font-inter text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-wide"
              style={{
                color: 'hsl(var(--clinical-white))',
                letterSpacing: '1.5px'
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

      {/* Section 2: Image with Warning Symbols */}
      <section 
        id="section-two" 
        className="section relative h-screen w-full flex items-center overflow-hidden"
        style={{ scrollSnapAlign: 'start' }}
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

        {/* Animated Warning Symbols */}
        <div 
          ref={warningRef}
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{ 
            opacity: 0,
            zIndex: 5
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

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
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

        /* Smooth scroll snap */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};
