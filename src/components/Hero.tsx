import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/new-hero-image.png";
import heroImage2 from "@/assets/new-hero-image-2.png";
import heroVideo from "@/assets/videos/hero.mp4";
import QuickQuotation from "@/components/QuickQuotation";

export const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoPhase, setVideoPhase] = useState<'video' | 'image1' | 'image2'>('video');
  const [showUI, setShowUI] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const progress = Math.min((Math.abs(rect.top) / rect.height) * 100, 100);
      setScrollProgress(progress);

      // Transition to image1 after video ends on scroll
      if (progress > 10 && videoEnded && videoPhase === 'video') {
        setVideoPhase('image1');
      }

      // Transition to second image at 50% scroll
      if (progress >= 50 && videoPhase === 'image1') {
        setVideoPhase('image2');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [videoPhase, videoEnded]);

  // Video sequence: video (4s) → pause + show UI → image1 on scroll
  useEffect(() => {
    const showUITimer = setTimeout(() => setShowUI(true), 4000);

    const pauseVideoTimer = setTimeout(() => {
      videoRef.current?.pause();
      setVideoEnded(true);
    }, 4000);

    return () => {
      clearTimeout(showUITimer);
      clearTimeout(pauseVideoTimer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculate overlay opacity based on scroll
  const overlayOpacity = scrollProgress < 10 ? 0.7 
    : scrollProgress < 40 ? 0.5 + (scrollProgress - 10) / 60
    : scrollProgress < 70 ? 0.5 
    : 0.4;

  // Thermal effect overlay (appears between 40-70% scroll)
  const thermalEffect = scrollProgress >= 40 && scrollProgress < 70 ? {
    background: `linear-gradient(135deg, hsl(var(--precision-blue)) 0%, hsl(var(--premium-gold)) 100%)`,
    mixBlendMode: 'overlay' as const,
    opacity: (scrollProgress - 40) / 30
  } : {};

  // Calculate blur based on scroll
  const blur = scrollProgress >= 10 ? `blur(${Math.min((scrollProgress - 10) / 10, 2)}px)` : 'none';

  const getCurrentBackground = () => {
    if (videoPhase === 'video') {
      return (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{ filter: blur }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      );
    }
    
    const imageOpacity = scrollProgress < 40 ? 1 - (scrollProgress / 40) * 0.3 : 0.7;
    const imageSrc = videoPhase === 'image2' && scrollProgress >= 50 ? heroImage2 : heroImage;
    const altText = videoPhase === 'image2' ? "Investment returns visualization" : "Property inspection";

    return (
      <img
        src={imageSrc}
        alt={altText}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        style={{ opacity: imageOpacity, filter: blur }}
      />
    );
  };

  const headline = videoPhase === 'image2' && scrollProgress >= 50
    ? "Increase return investment not cost"
    : "See the unseen, Protect Your Investment";

  const subtitle = videoPhase === 'image1'
    ? "We look beyond the surface. Digital precision. Investment protection."
    : null;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Video/Image with Overlays */}
      <div className="absolute inset-0 overflow-hidden">
        {getCurrentBackground()}
        
        {/* Blue overlay */}
        <div 
          className="absolute inset-0 transition-all duration-300"
          style={{ 
            backgroundColor: `hsl(var(--authority-blue))`,
            opacity: overlayOpacity
          }} 
        />
        
        {/* Thermal effect overlay (40-70% scroll) */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={thermalEffect}
        />
        
        {/* Approval seal (70%+ scroll) */}
        {scrollProgress >= 70 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-48 h-48 rounded-full border-8 flex items-center justify-center animate-fade-in"
              style={{ 
                borderColor: 'hsl(var(--premium-gold))',
                backgroundColor: 'rgba(192, 160, 110, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-2">✓</div>
                <div className="font-inter font-bold text-sm" style={{ color: 'hsl(var(--premium-gold))' }}>
                  APPROVED
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {showUI && (
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-3xl animate-fade-in-up">
            {/* Trust badges (visible at top) */}
            {scrollProgress < 10 && (
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

            {/* Headline with 3D scroll effect */}
            <h1
              className="font-inter text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-wide transition-all duration-500"
              style={{
                color: 'hsl(var(--clinical-white))',
                letterSpacing: '1.5px',
                transform: `perspective(1000px) rotateX(${scrollProgress * 0.1}deg) translateZ(${scrollProgress * 2}px)`,
                textShadow: `0 ${scrollProgress * 0.1}px ${scrollProgress * 0.2}px rgba(0,0,0,0.3)`
              }}
            >
              {headline}
            </h1>

            {/* Subtitle (only on image1) */}
            {subtitle && (
              <p className="font-lora text-lg md:text-xl mb-8 leading-relaxed" style={{ color: 'hsl(var(--clinical-white))' }}>
                {subtitle}
              </p>
            )}

            {/* CTAs (visible at top and bottom) */}
            {(scrollProgress < 10 || scrollProgress >= 70) && (
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
      )}

      {/* Scroll indicator */}
      {scrollProgress < 5 && (
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
  );
};
