// GSAP imports - using dynamic imports for better build compatibility
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import heroVideo from "@/assets/videos/hero.mp4";
import QuickQuotation from "@/components/QuickQuotation";

// WhySection imports and data
import { Card } from "@/components/ui/card";
import { Droplets, Zap, Wind, Shield, Skull, Droplet } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import { caseStudyImages } from "./CaseStudyImages";

// Dynamic GSAP imports
let gsap: any;
let ScrollTrigger: any;
let ScrollToPlugin: any;

// Function to initialize GSAP animations after GSAP is loaded
const initializeGSAPAnimations = () => {
  // GSAP ScrollTrigger animations for warning signs
  const warningSignsElements = document.querySelectorAll('.warning-symbol');
  warningSignsElements.forEach((sign, index) => {
    if (!sign) return;

    gsap.fromTo(sign,
      {
        y: 0, // Start position
        x: 0,
        opacity: 1
      },
      {
        y: `${20 + index * 13}vh`, // Move to final position (percentage area)
        x: '-35vw', // Move left to next to percentages
        opacity: 0, // Fade out as it scrolls
        ease: "power2.out",
        duration: 2,
        scrollTrigger: {
          trigger: document.querySelector('.relative.w-full.overflow-hidden'),
          start: "top top",
          end: "150vh top",
          scrub: 1, // Smooth scrubbing
          markers: false // Set to true for debugging
        }
      }
    );
  });

  // Scroll-snap functionality
  const sections = gsap.utils.toArray('.section');
  sections.forEach((section: any) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom-=1",
      end: "bottom top+=1",
      onEnter: () => {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: section.offsetTop, autoKill: false },
          ease: "power2.inOut"
        });
      },
      onEnterBack: () => {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: section.offsetTop, autoKill: false },
          ease: "power2.inOut"
        });
      }
    });
  });
};

const loadGSAP = async () => {
  if (typeof window !== 'undefined') {
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    const scrollToModule = await import('gsap/ScrollToPlugin');

    gsap = gsapModule.gsap;
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    ScrollToPlugin = scrollToModule.ScrollToPlugin;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Initialize animations after GSAP is loaded
    initializeGSAPAnimations();
  }
};

// Certificate images array
const certificateImages = [
  "basic.png",
  "advanced.png",
  "insulation.png",
  "deck.png",
  "maintenance.png",
  "new-construction.png",
  "warranty.png",
  "roof.png",
  "exterior.png",
  "repair.png",
  "workplace.png",
  "plumbing.png",
  "mold.png",
  "thermal.png",
  "energy.png",
  "foundation.png",
  "code.png",
  "electrical.png",
  "standard.png",
];

export const Hero = () => {
  // WhySection data
  const titles = ["Breathe easy - live healthy", "Inspect before invest"];
  const stories = ["Detecting hidden mold in my new flat avoided AED 18,000 in repairs—inspection pays off.", "Early air quality test stopped my daughter's asthma attacks. Peace of mind earned.", "Minor sand infiltration saved my HVAC 35% efficiency—don't skip inspection.", "Initial wiring check caught code violations, saved AED 12,500 instantly.", "Mold inspection meant I could rent out my flat 4x faster and at premium."];
  const risks = [{
    icon: Droplets,
    title: "💧 High Humidity Risks",
    stat: "67%",
    description: "of local properties struggle with water issues caused by extreme humidity",
    source: "(Dubai Municipality 2025 Climate Report)"
  }, {
    icon: Wind,
    title: "🌬️ Efficiency Loss from Dust",
    stat: "45%",
    description: "Desert dust severely impacts your AC, causing up to 45% in cooling efficiency loss",
    source: "(Emirates Environmental Agency, HVAC Impact Study 2024)"
  }, {
    icon: Zap,
    title: "⚡ Hidden Electrical Risks",
    stat: "38%",
    description: "Nearly 4 out of 10 properties have electrical wiring issues that don't meet safety standards",
    source: "(Dubai Electricity & Water Authority Annual Inspection Data 2025)"
  }, {
    icon: Skull,
    title: "😮‍💨 Unhealthy Indoor Air",
    stat: "52%",
    description: "of homes have unsafe levels of pollutants (VOCs/PM2.5) that affect breathing and health",
    source: "(WHO Indoor Air Quality Guidelines; UAE Ministry of Health VOC Monitoring 2024)"
  }, {
    icon: Droplet,
    title: "🍄 Hidden Mold & Health",
    stat: "41%",
    description: "of properties harbor hidden mold that triggers allergies and respiratory problems",
    source: "(InterNACHI® Global Inspection Statistics 2025)"

  }];

  const [showCTA, setShowCTA] = useState(false);
  const [showTrustBadges, setShowTrustBadges] = useState(false);
  const [warningSigns, setWarningSigns] = useState(
    risks.map((risk, index) => {
      // Random position on right side (35%+ from right, which is 65%+ from left)
      const randomTop = 15 + Math.random() * 50; // Random vertical position
      const randomLeft = 65 + Math.random() * 30; // Right side: 65-95% from left
      
      return {
        id: index,
        visible: false,
        startPosition: { top: `${randomTop}%`, left: `${randomLeft}%` }, // Start positions on right side
        currentPosition: { top: `${randomTop}%`, left: `${randomLeft}%` },
        finalPosition: { // Target positions next to the percentages in why section
          top: `${20 + index * 13}%`, // Distribute vertically next to each percentage
          left: '2%' // Far left side, next to percentages
        },
        stat: risk.stat // Store the stat value for positioning logic
      };
    })
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const warningSignsRef = useRef<HTMLDivElement[]>([]);

  // Register GSAP ScrollTrigger
  useEffect(() => {
    loadGSAP();
  }, []);

  // WhySection state
  const [currentStory, setCurrentStory] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [selectedRisk, setSelectedRisk] = useState<typeof risks[0] | null>(null);

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



  // Control video playback (stop after 5 seconds)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 5) {
        video.pause(); // Pause instead of looping
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  // Show warning signs when user starts scrolling
  useEffect(() => {
    const handleScrollStart = () => {
      const scrollY = window.scrollY;
      
      // Show warning signs when user scrolls past the video section (100px)
      if (scrollY > 100) {
        setWarningSigns(prev => prev.map(sign => ({ ...sign, visible: true })));
        // Remove this listener after first trigger
        window.removeEventListener('scroll', handleScrollStart);
      }
    };

    window.addEventListener('scroll', handleScrollStart, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollStart);
  }, []);

  // WhySection effects
  useEffect(() => {
    const storyInterval = setInterval(() => {
      setCurrentStory(prev => (prev + 1) % stories.length);
    }, 4000);
    const titleInterval = setInterval(() => {
      setCurrentTitle(prev => (prev + 1) % titles.length);
    }, 5000);
    return () => {
      clearInterval(storyInterval);
      clearInterval(titleInterval);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={mainContainerRef} className="relative w-full overflow-hidden" style={{
      scrollSnapType: 'y mandatory',
      scrollBehavior: 'smooth'
    }}>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center overflow-hidden section" id="hero-section" style={{
        scrollSnapAlign: 'start'
      }}>
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

        {/* Warning Signs */}
        {warningSigns.map((sign, index) => (
          sign.visible && (
            <div
              key={sign.id}
              ref={(el) => {
                if (el && !warningSignsRef.current[index]) {
                  warningSignsRef.current[index] = el;
                }
              }}
              className="absolute z-50 warning-symbol"
              style={{
                top: sign.currentPosition.top,
                left: sign.currentPosition.left,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <AlertTriangle
                className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-pulse"
                fill="rgba(250,204,21,0.3)"
              />
            </div>
          )
        ))}

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

      {/* Why Section */}
      <section id="why" className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-muted/30 relative overflow-hidden section" style={{
        scrollSnapAlign: 'start',
        minHeight: '100vh'
      }}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-accent/10 px-4 py-2 rounded-[6px] mb-6">
              <Shield className="w-5 h-5 text-accent" />
              <span className="font-inter text-[1.2rem] font-semibold text-foreground">Why Inspect?</span>
            </div>

            <div className="relative h-24 mb-4">
              {titles.map((title, index) => <h2 key={index} className={`font-inter text-4xl md:text-[40px] font-bold text-primary uppercase tracking-wide absolute inset-0 flex items-center justify-center transition-all duration-1000 ${index === currentTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <span className="block">{title}</span>
                </h2>)}
            </div>

            <p className={`font-lora text-lg text-muted-foreground leading-relaxed transition-opacity duration-1000 ${currentTitle === 0 ? 'opacity-0' : 'opacity-100'}`}>
              Dubai's extreme climate and rapid construction growth create unique risks.
              Early detection saves an average of AED 47,000 in repair costs.
            </p>
          </div>

          {/* Risk Problems Static Buttons */}
          <div className="mb-12 md:mb-16">
            <h4 className="font-inter text-2xl md:text-[40px] font-bold text-center mb-8 text-primary uppercase tracking-wide">Common Property Risks in Dubai</h4>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-2">
              {risks.map((risk, index) => {
                const buttonNames = [
                  "Water Problems",
                  "Efficiency Issues",
                  "Electrical Problems",
                  "Air Quality Problems",
                  "Mold Problems"
                ];
                return (
                  <div key={index} className="flex flex-col items-center gap-2 min-w-[140px]">
                    <div className="text-5xl md:text-7xl font-bold text-accent drop-shadow-lg">
                      {risk.stat}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedRisk(risk)}
                      className="bg-background/80 backdrop-blur-sm hover:bg-accent/10 border-accent/50 hover:border-accent transition-all duration-300 py-3 px-4 md:px-6 w-full"
                    >
                      <div className="flex items-center gap-2">
                        <risk.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="font-semibold text-sm md:text-base">{buttonNames[index]}</span>
                      </div>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animated Story Section */}
          <div className="mb-12 md:mb-16 py-8 md:py-12 relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
            <div className="relative max-w-4xl mx-auto text-center px-4 md:px-8">
              {stories.map((story, index) => <p key={index} className={`text-lg md:text-2xl font-medium text-foreground/90 italic transition-all duration-1000 absolute inset-0 flex items-center justify-center px-4 md:px-6 ${index === currentStory ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  "✨ {story}"
                </p>)}
              <div className="opacity-0 text-lg md:text-2xl font-medium px-4 md:px-6 py-4">
                "✨ {stories[0]}"
              </div>
            </div>
          </div>

          {/* Certificate Images Scroll Banner */}
          <div className="mb-12 md:mb-16">
            <h3 className="font-inter text-2xl md:text-[40px] font-bold text-center mb-8 text-primary uppercase tracking-wide">Certified in Every Inspection Discipline</h3>
            <Carousel
              opts={{
                align: "center",
                loop: true
              }}
              plugins={[new Autoplay({
                delay: 1500
              })]}
              className="w-full max-w-7xl mx-auto"
            >
              <CarouselContent className="-ml-2">
                {certificateImages.map((image, index) => {
                  // Construct full URL using the image name from the array.
                  // Images are located in the 'public/certificate/' folder
                  const imgSrc = `/certificate/${image}`;

                  return (
                    <CarouselItem key={index} className="pl-2 basis-1/3 md:basis-1/4 lg:basis-1/6">
                      <div className="flex items-center justify-center h-28 md:h-32 bg-background/80 backdrop-blur-sm border border-accent/30 rounded-lg p-3 md:p-4 hover:border-accent/60 hover:shadow-lg transition-all duration-300">
                        <img
                          src={imgSrc}
                          alt={`${image} Certificate`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="-left-2" />
              <CarouselNext className="-right-2" />
            </Carousel>
          </div>

          {/* Case Studies Carousel */}
          <div className="mb-12 md:mb-16">
            <h3 className="font-inter text-2xl md:text-[40px] font-bold text-center mb-8 text-primary uppercase tracking-wide">Real Case Studies</h3>
            <Carousel
              opts={{
                align: "center",
                loop: true
              }}
              plugins={[new Autoplay({
                delay: 8000
              })]}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {/* Case Study #1 - Dubai Marina Villa */}
                <CarouselItem>
                  <Card className="relative p-8 md:p-12 border-none h-[450px] md:h-[550px] flex flex-col overflow-hidden">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${caseStudyImages.marina})` }}
                    />
                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75" />

                    <div className="relative z-10 text-center flex flex-col h-full justify-between text-white">
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-6">
                          <Shield className="w-8 h-8 text-accent" />
                          <span className="text-accent font-semibold">Real Case Study #1</span>
                        </div>
                        <h3 className="text-4xl font-bold mb-6">Dubai Marina Villa</h3>
                        <p className="text-primary-foreground/90 mb-8 leading-relaxed text-lg max-w-2xl mx-auto">
                          Pre-purchase inspection revealed hidden water damage in AC ducts and electrical safety violations.
                          Client negotiated AED 85,000 price reduction, recovering 12× the inspection cost.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-accent">AED 85K</div>
                          <div className="text-sm text-primary-foreground/80">Saved</div>
                        </div>
                        <div className="h-16 w-px bg-primary-foreground/20" />
                        <div className="text-center">
                          <div className="text-4xl font-bold text-accent">12×</div>
                          <div className="text-sm text-primary-foreground/80">ROI</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>

                {/* Case Study #2 - Palm Jumeirah */}
                <CarouselItem>
                  <Card className="relative p-8 md:p-12 border-none h-[450px] md:h-[550px] flex flex-col overflow-hidden">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${caseStudyImages.palm})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/95 via-accent/85 to-accent/75" />

                    <div className="relative z-10 text-center flex flex-col h-full justify-between text-accent-foreground">
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-6">
                          <Shield className="w-8 h-8 text-primary" />
                          <span className="text-primary font-semibold">Real Case Study #2</span>
                        </div>
                        <h3 className="text-4xl font-bold mb-6">Palm Jumeirah Apartment</h3>
                        <p className="text-accent-foreground/90 mb-8 leading-relaxed text-lg max-w-2xl mx-auto">
                          Advanced thermal imaging detected hidden moisture behind bathroom tiles.
                          Buyer avoided property purchase that would have required AED 95,000 in immediate repairs.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary">AED 95K</div>
                          <div className="text-sm text-accent-foreground/80">Avoided Loss</div>
                        </div>
                        <div className="h-16 w-px bg-accent-foreground/20" />
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary">100%</div>
                          <div className="text-sm text-accent-foreground/80">Prevention</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>

                {/* CTA Card - Middle */}
                <CarouselItem>
                  <Card className="relative p-0 border-none overflow-hidden h-[400px] md:h-[500px]" style={{
                    backgroundImage: 'url(/assets/3d-scan.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}>
                    {/* darken overlay to ensure contrast */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    <div className="relative flex flex-col items-center justify-center h-full p-8">
                      <Shield className="w-20 h-20 text-accent mx-auto mb-8 animate-pulse" />

                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center drop-shadow-lg">
                        Ready to Protect Your Investment?
                      </h3>
                      <p className="text-lg text-gray-200 mb-8 text-center max-w-lg drop-shadow-md">
                        Don't risk thousands in hidden repairs. Inspect before you invest.
                      </p>

                      <Button variant="premium" size="xl" onClick={() => scrollToSection('booking')} className="group shadow-2xl hover:shadow-accent/20 transition-all text-lg px-12 py-6">
                        <Shield className="mr-2 w-6 h-6" />
                        Start Protect Now
                      </Button>
                    </div>
                  </Card>
                </CarouselItem>

                {/* Case Study #3 - JBR */}
                <CarouselItem>
                  <Card className="relative p-8 md:p-12 border-none h-[450px] md:h-[550px] flex flex-col overflow-hidden">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${caseStudyImages.jbr})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/70" />

                    <div className="relative z-10 text-center flex flex-col h-full justify-between text-white">
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-6">
                          <Shield className="w-8 h-8 text-primary" />
                          <span className="text-primary font-semibold">Real Case Study #3</span>
                        </div>
                        <h3 className="text-4xl font-bold mb-6">Jumeirah Beach Residence</h3>
                        <p className="text-secondary-foreground/90 mb-8 leading-relaxed text-lg max-w-2xl mx-auto">
                          Air quality monitoring revealed formaldehyde levels 3× above safe limits from new furniture.
                          Family moved out temporarily while levels normalized, preventing chronic health issues.
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary">Health</div>
                          <div className="text-sm text-secondary-foreground/80">Protected</div>
                        </div>
                        <div className="h-16 w-px bg-secondary-foreground/20" />
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary">3×</div>
                          <div className="text-sm text-secondary-foreground/80">Above Limit</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>

                {/* CTA Card - End */}
                <CarouselItem>
                  <Card className="relative p-0 border-none overflow-hidden h-[400px] md:h-[500px]" style={{
                    backgroundImage: 'url(/assets/3d-scan.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}>
                    {/* darken overlay to ensure contrast */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    <div className="relative flex flex-col items-center justify-center h-full p-8">
                      <Shield className="w-20 h-20 text-accent mx-auto mb-8 animate-pulse" />

                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center drop-shadow-lg">
                        Ready to Protect Your Investment?
                      </h3>
                      <p className="text-lg text-gray-200 mb-8 text-center max-w-lg drop-shadow-md">
                        Don't risk thousands in hidden repairs. Inspect before you invest.
                      </p>

                      <Button variant="premium" size="xl" onClick={() => scrollToSection('booking')} className="group shadow-2xl hover:shadow-accent/20 transition-all text-lg px-12 py-6">
                        <Shield className="mr-2 w-6 h-6" />
                        Start Protect Now
                      </Button>
                    </div>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <p className="text-center text-xs md:text-sm text-muted-foreground mt-8 px-4">
            Based on 10,000+ global inspections conducted by our certified network
          </p>
        </div>

        {/* Risk Detail Popup */}
        <Dialog open={!!selectedRisk} onOpenChange={() => setSelectedRisk(null)}>
          <DialogContent className="w-[90%] max-w-lg">
            {selectedRisk && (
              <Card className="border-none shadow-lg">
                <div className="p-8">
                  <div className="bg-accent/10 w-16 h-16 rounded-lg mx-auto flex items-center justify-center mb-6">
                    <selectedRisk.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-accent mb-3">{selectedRisk.stat}</div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">{selectedRisk.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{selectedRisk.description}</p>
                    <p className="text-xs text-muted-foreground/70">{selectedRisk.source}</p>
                  </div>
                </div>
              </Card>
            )}
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
};
