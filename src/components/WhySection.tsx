// only store filenames here; we'll build full URL with Vite's base at runtime
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

import { Card } from "@/components/ui/card";
import { Droplets, Zap, Wind, Shield, Skull, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

export const WhySection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(0);
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
        }) as any]} className="w-full max-w-6xl mx-auto perspective-1000">
            <CarouselContent className="-ml-4">
              {risks.map((risk, index) => <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="p-8 border-2 hover:border-accent transition-all duration-500 h-full flex flex-col hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] sm:hover:scale-105 lg:hover:scale-110 group cursor-pointer">
                    <div className="bg-accent/10 w-16 h-16 rounded-lg mx-auto flex items-center justify-center mb-6">
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
            }) as any]}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {certificateImages.map((image, index) => {
                // Construct full URL using the image name from the array.
                // Images are located in the 'public/certificate/' folder
                const imgSrc = `/certificate/${image}`;

                return (
                  <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <div className="flex items-center justify-center h-24 bg-background border border-accent/20 rounded-lg p-4">
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
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>

        {/* Case Studies Carousel */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Real Case Studies</h3>
          <Carousel opts={{
            align: "center",
            loop: true
          }} plugins={[new Autoplay({
            delay: 8000
          }) as any]} className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {/* Case Study #1 */}
              <CarouselItem>
                <Card className="p-8 md:p-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Shield className="w-8 h-8 text-accent" />
                      <span className="text-accent font-semibold">Real Case Study #1</span>
                    </div>
                    <h3 className="text-4xl font-bold mb-6">Dubai Marina Villa</h3>
                    <p className="text-primary-foreground/90 mb-8 leading-relaxed text-lg max-w-2xl mx-auto">
                      Pre-purchase inspection revealed hidden water damage in AC ducts and electrical safety violations.
                      Client negotiated AED 85,000 price reduction, recovering 12× the inspection cost.
                    </p>
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

              {/* Case Study #2 */}
              <CarouselItem>
                <Card className="p-8 md:p-12 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground border-none">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Shield className="w-8 h-8 text-primary" />
                      <span className="text-primary font-semibold">Real Case Study #2</span>
                    </div>
                    <h3 className="text-4xl font-bold mb-6">Palm Jumeirah Apartment</h3>
                    <p className="text-accent-foreground/90 mb-8 leading-relaxed text-lg max-w-2xl mx-auto">
                      Advanced thermal imaging detected hidden moisture behind bathroom tiles.
                      Buyer avoided property purchase that would have required AED 95,000 in immediate repairs.
                    </p>
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

                    <Button variant="premium" size="xl" onClick={() => scrollToSection('booking')} className="group shadow-2xl hover:shadow-accent/20 transition-all text-lg px-12 py-6 animate-pulse">
                      <Shield className="mr-2 w-6 h-6" />
                      Start Protect Now
                    </Button>
                  </div>
                </Card>
              </CarouselItem>

              {/* Case Study #3 */}
              <CarouselItem>
                <Card className="p-8 md:p-12 bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground border-none">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <Shield className="w-8 h-8 text-primary" />
                      <span className="text-primary font-semibold">Real Case Study #3</span>
                    </div>
                    <h3 className="text-4xl font-bold mb-6">Jumeirah Beach Residence</h3>
                    <p className="text-secondary-foreground/90 mb-8 leading-relaxed text-lg max-w-2xl mx-auto">
                      Air quality monitoring revealed formaldehyde levels 3× above safe limits from new furniture.
                      Family moved out temporarily while levels normalized, preventing chronic health issues.
                    </p>
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
