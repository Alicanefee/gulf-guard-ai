import { Card } from "@/components/ui/card";
import { AlertTriangle, Droplets, Zap, Wind, TrendingUp, Shield, Skull, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhySection = () => {
  const risks = [
    {
      icon: Droplets,
      title: "Water Damage",
      stat: "67%",
      description: "of Dubai properties show signs of water intrusion due to high humidity",
      source: "(Dubai Municipality 2025 Climate Report)",
    },
    {
      icon: Wind,
      title: "Sand & Dust",
      stat: "45%",
      description: "HVAC efficiency loss from desert climate impact",
      source: "(Emirates Environmental Agency, HVAC Impact Study 2024)",
    },
    {
      icon: Zap,
      title: "Electrical Issues",
      stat: "38%",
      description: "of inspected properties have code violations",
      source: "(Dubai Electricity & Water Authority Annual Inspection Data 2025)",
    },
    {
      icon: Skull,
      title: "Air Quality Risks",
      stat: "52%",
      description: "of homes exceed safe VOC and PM2.5 levels affecting respiratory health",
      source: "(WHO Indoor Air Quality Guidelines; UAE Ministry of Health VOC Monitoring 2024)",
    },
    {
      icon: Droplet,
      title: "Mold & Allergens",
      stat: "41%",
      description: "of properties have hidden mold growth causing allergies and asthma",
      source: "(InterNACHI® Global Inspection Statistics 2025)",
    },
  ];

  return (
    <section id="why" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">Critical Insights</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Hidden Defects & Health Risks
            <span className="block text-accent">Increase Future Costs</span>
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Dubai's extreme climate and rapid construction growth create unique risks. 
            Early detection saves an average of AED 47,000 in repair costs.
          </p>
        </div>

        {/* Risk Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {risks.map((risk, index) => (
            <Card 
              key={index}
              className="p-6 border-2 hover:border-accent transition-all duration-300 hover:shadow-[0_8px_30px_-4px_hsl(215_35%_20%/0.15)] animate-scale-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-accent/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <risk.icon className="w-7 h-7 text-accent" />
              </div>
              
              <div className="text-4xl font-bold text-accent mb-2">{risk.stat}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{risk.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">{risk.description}</p>
              <p className="text-xs text-muted-foreground/70">{risk.source}</p>
            </Card>
          ))}
        </div>

        {/* Case Studies */}
        <div className="space-y-6">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                  <span className="text-accent font-semibold">Real Case Study #1</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">Dubai Marina Villa</h3>
                <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                  Pre-purchase inspection revealed hidden water damage in AC ducts and electrical safety violations. 
                  Client negotiated AED 85,000 price reduction, recovering 12× the inspection cost.
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-bold text-accent">AED 85K</div>
                    <div className="text-sm text-primary-foreground/80">Saved</div>
                  </div>
                  <div className="h-12 w-px bg-primary-foreground/20" />
                  <div>
                    <div className="text-2xl font-bold text-accent">12×</div>
                    <div className="text-sm text-primary-foreground/80">ROI</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-background/10 backdrop-blur-sm p-4 rounded-lg border border-accent/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Issues Found</span>
                    <span className="text-accent font-bold">23</span>
                  </div>
                  <div className="h-2 bg-background/20 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[85%]" />
                  </div>
                </div>
                
                <div className="bg-background/10 backdrop-blur-sm p-4 rounded-lg border border-accent/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Critical Risks</span>
                    <span className="text-accent font-bold">7</span>
                  </div>
                  <div className="h-2 bg-background/20 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[60%]" />
                  </div>
                </div>

                <Button variant="premium" className="w-full mt-4">
                  <TrendingUp className="mr-2 w-5 h-5" />
                  Start Risk Analysis
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-8 md:p-12 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-accent" />
              <span className="text-accent font-semibold">Real Case Study #2</span>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Developer Success Story</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Stand out in a crowded market—by showcasing a 3D virtual tour and lab-grade air-quality report upfront, this developer generated 87% more qualified leads and slashed time on market from 45 to 18 days. The result: a 3% premium, netting AED 30,000 above the AED 1 M listing price.
            </p>
            <p className="text-sm text-muted-foreground/70 italic">
              Source: PropTech Dubai "3D Tour Impact Study" 2024
            </p>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Based on 10,000+ global inspections conducted by our certified network
        </p>
      </div>
    </section>
  );
};
