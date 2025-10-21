import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Building2, Users, Home, Heart, TrendingUp } from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

export const ServicePackages = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollToPackage = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section id="pricing" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your
            <span className="block text-accent">Protection Level</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            International standards, Dubai expertise, transparent pricing
          </p>
        </div>

        {/* Package Selector */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <Button
              key={index}
              variant={current === index ? "premium" : "outline"}
              size="sm"
              onClick={() => scrollToPackage(index)}
              className={`transition-all duration-300 ${
                current === index 
                  ? "scale-105 shadow-lg" 
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <pkg.icon className="w-4 h-4 mr-2" />
              {pkg.name}
            </Button>
          ))}
        </div>

        {/* Package Carousel */}
        <div className="relative mb-16">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              new Autoplay({
                delay: 5000,
                stopOnInteraction: true,
              }),
            ]}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {packages.map((pkg, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className={`transition-all duration-500 ease-in-out ${
                    current === index 
                      ? "scale-110 z-10" 
                      : "scale-95 opacity-80"
                  }`}>
                    <PackageCard pkg={pkg} useCtaLabel={useCtaLabel} isActive={current === index} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

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
const PackageCard: React.FC<any> = ({ pkg, useCtaLabel, isActive }) => {
  const { openBookingCard, bookingPackage } = useBooking();

  const ctaMap: Record<string, string> = {
    "Essential": "Book Essential Package",
    "Comprehensive": "Book Comprehensive Package",
    "VIP": "Book VIP Package",
    "Estate": "Book Estate Package",
    "Air Quality Pack": "Book Air Quality Package",
    "Investor Pack": "Book Investor Package",
  };

  const hookMap: Record<string, string> = {
    "Essential": "Detect hidden leaks instantly — AI-powered inspection included",
    "Comprehensive": "Unlock full-home peace of mind — 3D Scan & Mold Test with every booking",
    "VIP": "Elevate your protection — VIP reinspection service for first 3 months",
    "Estate": "Experience ultra-premium — Private engineer team & rapid results",
    "Air Quality Pack": "Breathe with confidence — Detailed air quality & mold analysis",
    "Investor Pack": "Safeguard multiple investments — Exclusive VIP & fast check combo",
  };

  const ctaLabel = ctaMap[pkg.name] ?? useCtaLabel(pkg);
  const hookText = hookMap[pkg.name];

  const onCardClick = () => openBookingCard(pkg.name);

  return (
    <div>
      <Card
        onClick={onCardClick}
        className={`relative p-6 pt-8 transition-all duration-500 ease-in-out hover:scale-105 flex flex-col h-full cursor-pointer overflow-visible ${
          pkg.popular
            ? "border-2 border-accent shadow-[0_8px_30px_-4px_hsl(43_74%_66%/0.3)]"
            : "border hover:border-accent/50"
        } ${
          isActive 
            ? "border-2 border-accent shadow-[0_12px_40px_-8px_hsl(43_74%_66%/0.5)] bg-accent/5" 
            : ""
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
          <p className="text-xs text-muted-foreground mb-2">Hidden Defects &amp; Health Risks — Increase Future Costs</p>
          {hookText && (
            <div className="text-sm font-semibold text-accent mb-3">{hookText}</div>
          )}
          <Button variant={pkg.popular ? "premium" : "outline"} className="w-full text-sm" size="lg" onClick={(e:any)=>{e.stopPropagation(); openBookingCard(pkg.name);}}>
            {ctaLabel}
          </Button>
        </div>
      </Card>
    </div>
  );
};
