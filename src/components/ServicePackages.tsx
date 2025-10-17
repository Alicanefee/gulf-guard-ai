import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Building2, Users, Home, Heart, TrendingUp } from "lucide-react";
import { useBooking } from "./booking/BookingProvider";

export const ServicePackages = () => {
  const useCtaLabel = (pkg: any) => {
    // If CTA contains a price (digits or 'AED'), return a generic label without price.
    const hasPrice = /\d|AED/i.test(pkg.cta || "");
    if (!pkg.cta) return "Book Now";
    if (!hasPrice) return pkg.cta;
    // Try to infer action word from CTA, otherwise default to 'Book Now'
    const lowered = pkg.cta.toLowerCase();
    if (lowered.includes("upgrade")) return "Upgrade";
    if (lowered.includes("vip")) return "Go VIP";
    if (lowered.includes("start")) return "Start Now";
    if (lowered.includes("protect")) return "Protect Now";
    return "Book Now";
  };

  const packages = [
    {
      name: "Essential",
      icon: Home,
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
    },
    {
      name: "Comprehensive",
      icon: Sparkles,
      popular: true,
      cta: "Upgrade to 2,999 AED – get 3D scan",
      features: [
        "Everything in Essential",
        "Mold test x3",
        "Full inspection video (1 year storage)",
        "3D LiDAR scan",
      ],
    },
    {
      name: "VIP",
      icon: TrendingUp,
      popular: false,
      cta: "Go VIP for 4,000 AED – 2nd check free",
      features: [
        "Everything in Comprehensive",
        "Advanced air quality check",
        "Pre/post-repair report (1 in 3 months)",
      ],
    },
    {
      name: "Estate",
      icon: Building2,
      popular: false,
      cta: "Enjoy estate status benefits",
      features: [
        "Everything in VIP",
        "Dedicated team",
        "Custom pre-report",
        "24/7 priority booking",
        "Root cause analysis",
      ],
    },
    {
      name: "Air Quality Pack",
      icon: Heart,
      popular: false,
      cta: "Start healthy at 2,700 AED",
      features: [
        "Negative pressure test",
        "Mold measurement",
        "Full air quality analysis",
      ],
    },
    {
      name: "Investor Pack",
      icon: Users,
      popular: false,
      cta: "Protect your investment: Go VIP",
      features: [
        "3 full + 2 quick inspections",
        "Thermal & damage assessment",
        "Electrical/water test",
        "1 VIP service included",
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

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {packages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} useCtaLabel={useCtaLabel} />
          ))}
        </div>

        {/* Detailed Comparison Table removed per request */}

        <div className="text-center">
          <p className="text-lg font-semibold text-foreground/90 mb-2">
            Book directly on our website to unlock premium savings and perks—designed for discerning clients who value both quality and exclusivity.
          </p>
        </div>
      </div>
    </section>
  );
};

// PackageCard subcomponent (scoped to this file)
const PackageCard: React.FC<any> = ({ pkg, useCtaLabel }) => {
  const { openBookingCard, bookingPackage } = useBooking();

  const onCardClick = () => openBookingCard(pkg.name);

  return (
    <div>
      <Card
        onClick={onCardClick}
        className={`relative p-6 transition-all duration-300 hover:scale-105 flex flex-col h-full cursor-pointer ${
          pkg.popular
            ? "border-2 border-accent shadow-[0_8px_30px_-4px_hsl(43_74%_66%/0.3)]"
            : "border hover:border-accent/50"
        } ${bookingPackage && bookingPackage !== pkg.name ? 'booking-package--inactive' : ''} ${bookingPackage===pkg.name? 'booking-package--selected':''}`}
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
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Core Features</h4>
            <ul className="space-y-2">
              {pkg.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-auto">
          <Button variant={pkg.popular ? "premium" : "outline"} className="w-full text-sm" size="lg" onClick={(e:any)=>{e.stopPropagation(); openBookingCard(pkg.name);}}>
            {useCtaLabel(pkg)}
          </Button>
        </div>
      </Card>
    </div>
  );
};
