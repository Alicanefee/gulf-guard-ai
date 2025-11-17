import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import heroVideo from "@/assets/videos/hero-video-2.mp4";
import heroImage from "@/assets/new-hero-image.png";
import heroImage2 from "@/assets/new-hero-image-2.png";
import QuickQuotation from "@/components/QuickQuotation";

export const Hero = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [showTrustBadges, setShowTrustBadges] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const warningRef = useRef<HTMLDivElement>(null);
  const section2TitleRef = useRef<HTMLDivElement>(null);
  const section3TitleRef = useRef<HTMLDivElement>(null);

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
      if (!containerRef.current || !warningRef.current) return;

      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight;
      
      // Calculate which section we're in (0 = video, 1 = image1, 2 = image2 with warnings)
      const section = Math.floor(scrollY / sectionHeight);
      setCurrentSection(section);
      
      // Section 2: Show title, then fade out as scroll continues
      if (section === 1 && section2TitleRef.current) {
        const scrollProgress = (scrollY % sectionHeight) / sectionHeight;
        // Title visible at start, fades out by 30% scroll
        const titleOpacity = scrollProgress < 0.3 ? 1 : 1 - ((scrollProgress - 0.3) / 0.3);
        section2TitleRef.current.style.opacity = Math.max(0, titleOpacity).toString();
      }

      // Section 3: Title fades out, warnings appear and move
      if (section === 2 && section3TitleRef.current && warningRef.current) {
        const scrollProgress = (scrollY % sectionHeight) / sectionHeight;
        
        // Title fades out in first 20% of scroll
        const titleOpacity = scrollProgress < 0.2 ? 1 - (scrollProgress / 0.2) : 0;
        section3TitleRef.current.style.opacity = titleOpacity.toString();
        
        // Warnings appear after title fades (after 20% scroll)
        if (scrollProgress > 0.2) {
          const warningProgress = (scrollProgress - 0.2) / 0.8; // 0 to 1 range
          warningRef.current.style.opacity = '1';
          // Warnings move down 150vh to next section
          const translateY = warningProgress * 150;
          warningRef.current.style.transform = `translateY(${translateY}vh)`;
          // Fade out when reaching next section
          if (warningProgress > 0.8) {
            const fadeOut = 1 - ((warningProgress - 0.8) / 0.2);
            warningRef.current.style.opacity = Math.max(0, fadeOut).toString();
          }
        } else {
          warningRef.current.style.opacity = '0';
        }
      } else if (section !== 2 && warningRef.current) {
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
