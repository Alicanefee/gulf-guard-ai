import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Sparkles, Building2, Users, Home, Heart, TrendingUp } from "lucide-react";

export const ServicePackages = () => {
  const packages = [
    {
      name: "Essential",
      icon: Home,
      basePrice: "2 AED/sqft",
      minPrice: "1,200 AED",
      minArea: "600 sqft+",
      popular: false,
      cta: "Lock in for 1,199 AED",
      features: [
        "Moisture & leak mapping",
        "Thermal imaging",
        "Electrical/plumbing leak test",
        "AI risk score",
        "Endoscopy",
        "Noise & particle measurement",
        "Mold test (1 session)",
      ],
      freeExtras: ["Same-day report", "1x Online consult", "Mold (1)"],
      discounts: "10-20% based on size",
    },
    {
      name: "Comprehensive",
      icon: Sparkles,
      basePrice: "2.5 AED/sqft",
      addOns: "+ 300 AED video + 1.5 AED/sqft 3D",
      popular: true,
      cta: "Upgrade to 2,999 AED – get 3D scan",
      features: [
        "Everything in Essential",
        "Mold test x3",
        "Full inspection video (1 year storage)",
        "3D LiDAR scan",
      ],
      freeExtras: ["Free Negative Pressure Test"],
      discounts: "10-20% based on size",
    },
    {
      name: "VIP",
      icon: TrendingUp,
      basePrice: "3 AED/sqft",
      addOns: "+ 1.5 AED/sqft neg + 2 AED/sqft air",
      popular: false,
      cta: "Go VIP for 4,000 AED – 2nd check free",
      features: [
        "Everything in Comprehensive",
        "Advanced air quality check",
        "Pre/post-repair report (1 in 3 months)",
      ],
      freeExtras: ["2nd inspection (1x)"],
      discounts: "10-20% based on size",
    },
    {
      name: "Estate",
      icon: Building2,
      basePrice: "3.5 AED/sqft",
      addOns: "+ all premium add-ons",
      popular: false,
      cta: "Enjoy estate status benefits",
      features: [
        "Everything in VIP",
        "Dedicated team",
        "Custom pre-report",
        "24/7 priority booking",
        "Root cause analysis",
      ],
      freeExtras: ["Pre-report", "2nd check"],
      discounts: "15-25% for estates",
    },
    {
      name: "Air Quality Pack",
      icon: Heart,
      basePrice: "1.5 AED/sqft",
      addOns: "+ 0.5 AED/sqft mold + 2 AED/sqft air",
      popular: false,
      cta: "Start healthy at 2,700 AED",
      features: [
        "Negative pressure test",
        "Mold measurement",
        "Full air quality analysis",
      ],
      freeExtras: ["Post-fix check (free)"],
      discounts: "10-20% based on size",
    },
    {
      name: "Investor Pack",
      icon: Users,
      basePrice: "Fixed price",
      minPrice: "6,500-12,500 AED",
      popular: false,
      cta: "Protect your investment: Go VIP",
      features: [
        "3 full + 2 quick inspections",
        "Thermal & damage assessment",
        "Electrical/water test",
        "1 VIP service included",
      ],
      freeExtras: ["1 quick scan", "5 consults"],
      discounts: "Fixed pricing",
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

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative p-6 transition-all duration-300 hover:scale-105 ${
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

              <div className="text-center mb-6">
                <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                  <pkg.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
                <div className="text-sm text-muted-foreground mb-1">{pkg.basePrice}</div>
                {pkg.minPrice && (
                  <div className="text-xs text-muted-foreground">min {pkg.minPrice}</div>
                )}
                {pkg.addOns && (
                  <div className="text-xs text-muted-foreground mt-1">{pkg.addOns}</div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Core Features</h4>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-accent mb-2">Free Extras</h4>
                  <ul className="space-y-1">
                    {pkg.freeExtras.map((extra, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground">
                        ✓ {extra}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Discounts:</span> {pkg.discounts}
                </div>
              </div>

              <Button
                variant={pkg.popular ? "premium" : "outline"}
                className="w-full text-sm"
                size="lg"
              >
                {pkg.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="max-w-7xl mx-auto mb-12">
          <Card className="p-6">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Detailed Comparison Table
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Package</TableHead>
                    <TableHead className="font-bold">Base Pricing</TableHead>
                    <TableHead className="font-bold">Add-ons</TableHead>
                    <TableHead className="font-bold">Free Extras</TableHead>
                    <TableHead className="font-bold">Tiered Discounts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">Essential</TableCell>
                    <TableCell>2 AED/sqft<br />(min 1,200 AED for 600 sqft+)</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>Same-day report, 1x consult, Mold (1)</TableCell>
                    <TableCell className="text-xs">600–1,000: 10%<br />1,000–2,000: 15%<br />&gt;2,000: 20%</TableCell>
                  </TableRow>
                  <TableRow className="bg-accent/5">
                    <TableCell className="font-semibold">Comprehensive</TableCell>
                    <TableCell>2.5 AED/sqft</TableCell>
                    <TableCell>+300 AED (video)<br />+1.5 AED/sqft (3D scan)</TableCell>
                    <TableCell>Free Negative Test</TableCell>
                    <TableCell className="text-xs">600–1,000: 10%<br />1,000–2,000: 15%<br />&gt;2,000: 20%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">VIP</TableCell>
                    <TableCell>3 AED/sqft</TableCell>
                    <TableCell>+1.5 AED/sqft (neg)<br />+2 AED/sqft (air)</TableCell>
                    <TableCell>2nd inspection (1x)</TableCell>
                    <TableCell className="text-xs">600–1,000: 10%<br />1,000–2,000: 15%<br />&gt;2,000: 20%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Estate</TableCell>
                    <TableCell>3.5 AED/sqft</TableCell>
                    <TableCell>+2 AED/sqft (air)<br />+1.5 AED/sqft (neg+3D)<br />+300 AED (video)</TableCell>
                    <TableCell>Pre-report, 2nd check</TableCell>
                    <TableCell className="text-xs">2,000–3,000: 15%<br />3,000–5,000: 20%<br />&gt;5,000: 25%</TableCell>
                  </TableRow>
                  <TableRow className="bg-accent/5">
                    <TableCell className="font-semibold">Air Quality Pack</TableCell>
                    <TableCell>1.5 AED/sqft</TableCell>
                    <TableCell>+0.5 AED/sqft (mold)<br />+2 AED/sqft (air)</TableCell>
                    <TableCell>Post-fix check (free)</TableCell>
                    <TableCell className="text-xs">600–1,000: 10%<br />1,000–2,000: 15%<br />&gt;2,000: 20%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Investor Pack</TableCell>
                    <TableCell>≤3,000: 6,500 AED<br />3,001–6,000: 9,500 AED<br />&gt;6,000: 12,500 AED</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>1 quick scan, 5 consults</TableCell>
                    <TableCell>Fixed price, no discounts</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            All packages include ISO/IEC 17025:2017 compliant testing and detailed PDF reports
          </p>
          <p className="text-sm text-accent font-medium mb-2">
            ⏰ Book within 48 hours and get an additional 5% discount!
          </p>
        </div>
      </div>
    </section>
  );
};
