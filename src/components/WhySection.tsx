import { Card } from "@/components/ui/card";
import { Droplets, Zap, Wind, Shield, Skull, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
export const WhySection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);
  const titles = ["Breathe health, not risk.", "Invest in peace of mind, not unexpected costs."];
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
    title: "Dubai Marina Villa",
    description: "Pre-purchase inspection revealed hidden water damage in AC ducts and electrical safety violations. Client negotiated AED 85,000 price reduction, recovering 12× the inspection cost.",
    saved: "AED 85K",
    roi: "12×",
    issues: 23,
    critical: 7
  }, {
    title: "Developer Success Story",
    description: "Stand out in a crowded market—by showcasing a 3D virtual tour and lab-grade air-quality report upfront, this developer generated 87% more qualified leads and slashed time on market from 45 to 18 days. The result: a 3% premium, netting AED 30,000 above the AED 1 M listing price.",
    stat1: "87%",
    stat1Label: "More Leads",
    stat2: "18 Days",
    stat2Label: "Time to Sell"
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
          
          <div className="relative h-32 mb-6">
            {titles.map((title, index) => <h2 key={index} className={`text-4xl md:text-5xl font-bold text-foreground absolute inset-0 flex items-center justify-center transition-all duration-1000 ${index === currentTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="block text-accent">{title}</span>
              </h2>)}
          </div>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Dubai's extreme climate and rapid construction growth create unique risks. 
            Early detection saves an average of AED 47,000 in repair costs.
          </p>
        </div>

        {/* Risk Cards Carousel with 3D Effect */}
        <div className="relative mb-16">
          <Carousel opts={{
          align: "center",
          loop: true
        }} plugins={[Autoplay({
          delay: 3000
        })]} className="w-full max-w-6xl mx-auto perspective-1000">
            <CarouselContent className="-ml-4">
              {risks.map((risk, index) => <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-8 border-2 hover:border-accent transition-all duration-500 h-full flex flex-col transform hover:scale-110 hover:rotate-y-6 hover:shadow-2xl" style={{
                transformStyle: "preserve-3d"
              }}>
                    <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                      <risk.icon className="w-8 h-8 text-accent" />
                    </div>
                    
                    <div className="text-5xl font-bold text-accent mb-3">{risk.stat}</div>
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

        {/* Case Studies Carousel with Auto CTA Card */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Real Success Stories</h3>
          <Carousel opts={{
          align: "center",
          loop: true
        }} plugins={[Autoplay({
          delay: 6000
        })]} className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem>
                <Card className="p-8 md:p-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-6 h-6 text-accent" />
                        <span className="text-accent font-semibold">Real Case Study #1</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-4">{caseStudies[0].title}</h3>
                      <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                        {caseStudies[0].description}
                      </p>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-2xl font-bold text-accent">{caseStudies[0].saved}</div>
                          <div className="text-sm text-primary-foreground/80">Saved</div>
                        </div>
                        <div className="h-12 w-px bg-primary-foreground/20" />
                        <div>
                          <div className="text-2xl font-bold text-accent">{caseStudies[0].roi}</div>
                          <div className="text-sm text-primary-foreground/80">ROI</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-background/10 backdrop-blur-sm p-4 rounded-lg border border-accent/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Issues Found</span>
                          <span className="text-accent font-bold">{caseStudies[0].issues}</span>
                        </div>
                        <div className="h-2 bg-background/20 rounded-full overflow-hidden">
                          <div className="h-full bg-accent w-[85%]" />
                        </div>
                      </div>
                      
                      <div className="bg-background/10 backdrop-blur-sm p-4 rounded-lg border border-accent/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Critical Risks</span>
                          <span className="text-accent font-bold">{caseStudies[0].critical}</span>
                        </div>
                        <div className="h-2 bg-background/20 rounded-full overflow-hidden">
                          <div className="h-full bg-accent w-[60%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem>
                <Card className="p-8 md:p-12 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-6 h-6 text-accent" />
                    <span className="text-accent font-semibold">Real Case Study #2</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">{caseStudies[1].title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {caseStudies[1].description}
                  </p>
                  <div className="flex items-center gap-6 mb-4">
                    <div>
                      <div className="text-3xl font-bold text-accent">{caseStudies[1].stat1}</div>
                      <div className="text-sm text-muted-foreground">{caseStudies[1].stat1Label}</div>
                    </div>
                    <div className="h-12 w-px bg-border" />
                    <div>
                      <div className="text-3xl font-bold text-accent">{caseStudies[1].stat2}</div>
                      <div className="text-sm text-muted-foreground">{caseStudies[1].stat2Label}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground/70 italic">
                    Source: PropTech Dubai "3D Tour Impact Study" 2024
                  </p>
                </Card>
              </CarouselItem>

              {/* New CTA Card */}
              <CarouselItem>
                <Card className="p-8 md:p-12 bg-gradient-to-br from-primary via-accent/20 to-primary border-none animate-scale-in">
                  <div className="text-center">
                    <Shield className="w-16 h-16 text-accent mx-auto mb-6" />
                    <h3 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-8">
                      Ready to Protect Your Investment?
                    </h3>
                    <Button variant="premium" size="xl" onClick={() => scrollToSection('booking')} className="group shadow-2xl hover:shadow-accent/20 transition-all text-lg px-12 py-6 animate-pulse">
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

        <p className="text-center text-sm text-muted-foreground mt-8">
          Based on 10,000+ global inspections conducted by our certified network
        </p>
      </div>
    </section>;
};