import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Building2, Users } from "lucide-react";

export const ServicePackages = () => {
  const packages = [
    {
      name: "Property Owner",
      icon: Building2,
      price: "1,500",
      popular: false,
      features: [
        "Indoor air quality (CO₂, VOC, PM2.5/PM10)",
        "Humidity & moisture mapping",
        "Thermal imaging inspection",
        "Electrical system safety check",
        "HVAC performance test",
        "Water leak detection",
        "24-hour report delivery",
        "Basic consultation (30 min)",
      ],
    },
    {
      name: "Investor Package",
      icon: Sparkles,
      price: "2,800",
      popular: true,
      features: [
        "Everything in Property Owner",
        "Structural integrity assessment",
        "Investment risk analysis",
        "Market value impact report",
        "Negotiation support documentation",
        "Priority scheduling",
        "Extended consultation (60 min)",
        "5-year inspection history",
      ],
    },
    {
      name: "Corporate",
      icon: Users,
      price: "Custom",
      popular: false,
      features: [
        "Portfolio-wide inspections",
        "Compliance documentation (ISO/InterNACHI)",
        "Risk management dashboard",
        "Quarterly property health reports",
        "Dedicated account manager",
        "Custom SLA agreements",
        "Bulk pricing discounts",
        "API integration available",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your
            <span className="block text-accent">Protection Level</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            International standards, Dubai expertise, transparent pricing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative p-8 transition-all duration-300 hover:scale-105 ${
                pkg.popular
                  ? "border-2 border-accent shadow-[0_8px_30px_-4px_hsl(43_74%_66%/0.3)]"
                  : "border hover:border-accent/50"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <pkg.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm text-muted-foreground">AED</span>
                  <span className="text-4xl font-bold text-foreground">{pkg.price}</span>
                  {pkg.price !== "Custom" && (
                    <span className="text-sm text-muted-foreground">/inspection</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.popular ? "premium" : "outline"}
                className="w-full"
                size="lg"
              >
                {pkg.price === "Custom" ? "Contact Sales" : "Book Now"}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            All packages include ISO/IEC 17025:2017 compliant testing and detailed PDF reports
          </p>
          <Button variant="link" className="text-accent">
            View detailed comparison table →
          </Button>
        </div>
      </div>
    </section>
  );
};
