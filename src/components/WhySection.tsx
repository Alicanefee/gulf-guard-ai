import { Card } from "@/components/ui/card";
import { Droplets, Zap, Wind, Shield, Skull, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
const certificateImages = [
  "/assets/certificate/basic.png",
  "/assets/certificate/advanced.png",
  "/assets/certificate/insulation.png",
  "/assets/certificate/deck.png",
  "/assets/certificate/maintenance.png",
  "/assets/certificate/new-construction.png",
  "/assets/certificate/warranty.png",
  "/assets/certificate/roof.png",
  "/assets/certificate/exterior.png",
  "/assets/certificate/repair.png",
  "/assets/certificate/workplace.png",
  "/assets/certificate/plumbing.png",
  "/assets/certificate/mold.png",
  "/assets/certificate/thermal.png",
  "/assets/certificate/energy.png",
  "/assets/certificate/foundation.png",
  "/assets/certificate/code.png",
  "/assets/certificate/electrical.png",
  "/assets/certificate/standard.png",
];
export const WhySection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);
  const titles = ["Breathe easy - live healthy", "Inspect before invest"];
  const stories = ["Detecting hidden mold in my new flat avoided AED 18,000 in repairs—inspection pays off.", "Early air quality test stopped my daughter's asthma attacks. Peace of mind earned.", "Minor sand infiltration saved my HVAC 35% efficiency—don't skip inspection.", "Initial wiring check caught code violations, saved AED 12,500 instantly.", "Mold inspection meant I could rent out my flat 4x faster and at premium."];
  const risks = [{
    icon: Droplets,
    title: "Water Damage",
    stat: "67%",
    description: "of Dubai properties show signs of water intrusion due to high humidity",
    source: "(Dubai Municipality 2025 Climate Report)"
  }, {
    icon: Wind,
    title: "Sand & Dust",
    stat: "45%",
    description: "HVAC efficiency loss from desert climate impact",
    source: "(Emirates Environmental Agency, HVAC Impact Study 2024)"
  }, {
    icon: Zap,
    title: "Electrical Issues",
    stat: "38%",
    description: "of inspected properties have code violations",
    source: "(Dubai Electricity & Water Authority Annual Inspection Data 2025)"
  }, {
    icon: Skull,
    title: "Air Quality Risks",
    stat: "52%",
    description: "of homes exceed safe VOC and PM2.5 levels affecting respiratory health",
    source: "(WHO Indoor Air Quality Guidelines; UAE Ministry of Health VOC Monitoring 2024)"
  }, {
    icon: Droplet,
    title: "Mold & Allergens",
    stat: "41%",
    description: "of properties have hidden mold growth causing allergies and asthma",
    source: "(InterNACHI® Global Inspection Statistics 2025)"
  }];
  const caseStudies = [{
    title: "Health Issue: Not Mold, But Hidden Gases!",
    description: "A family suffered from headaches and constant fatigue. Mold tests came back negative. Advanced air quality monitoring revealed formaldehyde levels between 1.4–1.7 ppm—about 18 times higher than the World Health Organization limit (0.08 ppm).",
    source: "Investigation of Indoor Air Quality inside Houses From UAE - Bani Mfarrej, 2020",
    cta: "Don't rely on mold testing alone—get detailed VOC and particulate measurements for truly healthy living!"
  }, {
    title: "Hidden Moisture Detected Before Rental",
    description: "In 2025, a Dubai apartment was thermal-imaged just before leasing. Hidden wall moisture was detected, and the landlord resolved the issue before move-in. Real inspection reports show that 33% of properties in Dubai hide moisture or leakage problems.",
    source: "Top 10 Property Defects Caught During Inspections in Dubai - SnagProperty, 2025",
    cta: "Before renting or buying, request hidden moisture and leakage checks—avoid expensive surprises later!"
  }, {
    title: "Post-Renovation Electrical Problem Prevented Costly Losses",
    description: "In 2024, a third-party electrical inspection after renovations found overloads in the main panel and electrical leakage risks in sockets. Early detection allowed repairs before the walls were closed—preventing around 1,800 AED in extra work and days of delays.",
    source: "Third-Party Electrical Inspection Services in UAE and GCC, 2024",
    cta: "Always get your electrical system inspected after renovations—hidden faults can cost you dearly!"
  }];
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
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section id="why" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-accent/10 px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5 text-accent" />
            <span className="text-[1.2rem] font-semibold text-foreground">Critical Insights</span>
          </div>
          
          <div className="relative h-24 mb-4">
            {titles.map((title, index) => <h2 key={index} className={`text-4xl md:text-5xl font-bold text-foreground absolute inset-0 flex items-center justify-center transition-all duration-1000 ${index === currentTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="block text-accent">{title}</span>
              </h2>)}
          </div>

          <p className={`text-xl text-muted-foreground leading-relaxed transition-opacity duration-1000 ${currentTitle === 0 ? 'opacity-0' : 'opacity-100'}`}>
            Dubai's extreme climate and rapid construction growth create unique risks.
            Early detection saves an average of AED 47,000 in repair costs.
          </p>
        </div>

        {/* Risk Cards Carousel with 3D Effect */}
        <div className="relative mb-16">
          <Carousel opts={{
          align: "center",
          loop: true
        }} plugins={[new Autoplay({
          delay: 3000
        })]} className="w-full max-w-6xl mx-auto perspective-1000">
            <CarouselContent className="-ml-4">
              {risks.map((risk, index) => <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-8 border-2 hover:border-accent transition-all duration-500 h-full flex flex-col hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] sm:hover:scale-105 lg:hover:scale-110 group cursor-pointer">
                    <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                      <risk.icon className="w-8 h-8 text-accent" />
                    </div>

                    <div className="stat-display text-5xl font-bold text-accent mb-3">{risk.stat}</div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">{risk.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3 flex-grow">{risk.description}</p>
                    <p className="text-xs text-muted-foreground/70 mt-auto">{risk.source}</p>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>

          {/* Single CTA Below Banner */}
          <div className="text-center mt-12">
            
          </div>
        </div>

        {/* Animated Story Section */}
        <div className="mb-16 py-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
          <div className="relative max-w-4xl mx-auto text-center px-4">
            {stories.map((story, index) => <p key={index} className={`text-xl md:text-2xl font-medium text-foreground/90 italic transition-all duration-1000 absolute inset-0 flex items-center justify-center px-6 ${index === currentStory ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                "{story}"
              </p>)}
            <div className="opacity-0 text-xl md:text-2xl font-medium px-6 py-4">
              "{stories[0]}"
            </div>
          </div>
        </div>

        {/* Certificate Images Scroll Banner */}
        <div className="mb-8">
          <Carousel
            opts={{
              align: "center",
              loop: true
            }}
            plugins={[new Autoplay({
              delay: 2000
            })]}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {certificateImages.map((image, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="flex items-center justify-center h-24 bg-background border border-accent/20 rounded-lg p-4">
                    <img src={image} alt={`Certificate ${index + 1}`} className="max-h-full max-w-full object-contain" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>

        {/* Case Studies Carousel with Auto CTA Card */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Real Success Stories</h3>
          <Carousel opts={{
          align: "center",
          loop: true
        }} plugins={[new Autoplay({
          delay: 10000
        })]} className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {caseStudies.map((study, index) => (
                <CarouselItem key={index}>
                  <Card className={`p-8 md:p-12 ${index === 0 ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none' : 'bg-accent/5 border-2 border-accent/30'} ${index === 2 ? 'bg-black/80 text-white' : ''}`}>
                    <div className="max-w-4xl mx-auto">
                      <div className="flex items-center gap-2 mb-6">
                        <Shield className="w-6 h-6 text-accent" />
                        <span className="text-accent font-semibold">Case Study #{index + 1}</span>
                      </div>

                      <h3 className={`text-3xl font-bold mb-6 ${index === 2 ? 'text-white' : 'text-foreground'}`}>
                        {study.title}
                      </h3>

                      <p className={`leading-relaxed mb-6 ${index === 0 ? 'text-primary-foreground/90' : index === 2 ? 'text-gray-200' : 'text-muted-foreground'}`}>
                        {study.description}
                      </p>

                      <div className="bg-white/10 backdrop-blur-sm border border-accent/30 rounded-lg p-4 mb-6">
                        <p className={`text-sm font-medium mb-2 ${index === 2 ? 'text-gray-300' : 'text-accent'}`}>
                          {study.cta}
                        </p>
                        <p className={`text-xs ${index === 0 ? 'text-primary-foreground/70' : index === 2 ? 'text-gray-400' : 'text-muted-foreground/70'}`}>
                          Source: {study.source}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}

              {/* New CTA Card */}
              <CarouselItem>
                <Card className="relative p-0 md:p-0 bg-gradient-to-br from-primary via-accent/20 to-primary border-none animate-scale-in overflow-hidden" style={{
                  backgroundImage: 'url(/3d-scan.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  {/* darken overlay to ensure contrast */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                  <div className="relative p-8 md:p-12 flex flex-col items-center min-h-[320px]">
                    <Shield className="w-16 h-16 text-accent mx-auto mb-6 relative z-10" />

                    <div className="relative z-10 inline-block px-4 py-2 rounded-md">
                      <span className="absolute inset-0 -z-10 rounded-md bg-black/40 backdrop-blur-sm" />
                      <h3 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                        Ready to Protect Your Investment?
                      </h3>
                    </div>

                    <div className="mt-auto w-full flex justify-center relative z-10">
                      <Button variant="premium" size="xl" onClick={() => scrollToSection('booking')} className="group shadow-2xl hover:shadow-accent/20 transition-all text-lg px-12 py-6 animate-pulse">
                        <Shield className="mr-2 w-6 h-6" />
                        Start Protect Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Based on 10,000+ global inspections conducted by our certified network
        </p>
      </div>
    </section>;
};
