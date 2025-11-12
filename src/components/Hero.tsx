import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/new-hero-image.png";
import heroImage2 from "@/assets/new-hero-image-2.png";
import heroVideo from "@/assets/videos/hero-video-2.mp4";
import QuickQuotation from "@/components/QuickQuotation";

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showUI, setShowUI] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Video sequence: video (4s) → show UI
  useEffect(() => {
    const showUITimer = setTimeout(() => {
      setShowUI(true);
      setCanScroll(true);
    }, 4000);

    const pauseVideoTimer = setTimeout(() => {
      videoRef.current?.pause();
    }, 4000);

    return () => {
      clearTimeout(showUITimer);
      clearTimeout(pauseVideoTimer);
    };
  }, []);

  // Handle wheel events for slide transitions
  useEffect(() => {
    if (!canScroll) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0 && currentSlide < 2) {
        // Scroll down
        setCurrentSlide(prev => prev + 1);
      } else if (e.deltaY < 0 && currentSlide > 0) {
        // Scroll up
        setCurrentSlide(prev => prev - 1);
      } else if (e.deltaY > 0 && currentSlide === 2) {
        // Allow normal scrolling after last slide
        setCanScroll(false);
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSlide, canScroll]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const slides = [
    {
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

  const currentSlideData = slides[currentSlide];

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center overflow-hidden"
      style={{
        position: canScroll ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 10
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {currentSlideData.background}

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
        <div className="max-w-3xl animate-fade-in-up">
          {/* Trust badges (only on first slide after UI shows) */}
          {currentSlideData.trustBadges && currentSlide === 0 && (
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
            className="font-inter text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-wide transition-all duration-500"
            style={{
              color: 'hsl(var(--clinical-white))',
              letterSpacing: '1.5px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              transform: `translateY(${currentSlide * 20}px)`,
              opacity: 1 - (currentSlide * 0.1)
            }}
          >
            {currentSlideData.headline}
          </h1>

          {/* Subtitle */}
          {currentSlideData.subtitle && (
            <p
              className="font-lora text-lg md:text-xl mb-8 leading-relaxed transition-all duration-500"
              style={{
                color: 'hsl(var(--clinical-white))',
                transform: `translateY(${currentSlide * 15}px)`,
                opacity: 1 - (currentSlide * 0.1)
              }}
            >
              {currentSlideData.subtitle}
            </p>
          )}

          {/* CTAs */}
          {currentSlideData.showCTAs && (
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in transition-all duration-500"
              style={{
                transform: `translateY(${currentSlide * 10}px)`,
                opacity: 1 - (currentSlide * 0.1)
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
          )}
        </div>
      </div>

      {/* Scroll indicator (only on first slide) */}
      {currentSlide === 0 && !showUI && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-wider" style={{ color: 'hsl(var(--precision-blue))' }}>
              Scroll to explore
            </span>
            <ChevronDown className="w-6 h-6" style={{ color: 'hsl(var(--precision-blue))' }} />
          </div>
        </div>
      )}

      {/* Slide indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
