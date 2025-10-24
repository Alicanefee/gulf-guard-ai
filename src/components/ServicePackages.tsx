import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Building2, Users, Home, Heart, TrendingUp } from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export const ServicePackages = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

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
    <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-muted/30 via-background to-secondary/40 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-64 h-64 bg-accent rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Choose Your
              <span className="block text-accent mt-2">Protection Level</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground px-4">
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
        <div className="relative mb-16 px-4 md:px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[autoplayRef.current]}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-4 py-12">
              {packages.map((pkg, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <PackageCard
                    pkg={pkg}
                    useCtaLabel={useCtaLabel}
                    isActive={current === index}
                    isCenter={true}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:left-0 z-30" />
            <CarouselNext className="-right-4 md:right-0 z-30" />
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
    <div className={`h-full ${isActive ? "" : "opacity-70"}`}>
      <Card
        onClick={onCardClick}
        className={`relative p-6 pt-8 transition-all duration-500 ease-in-out flex flex-col h-full cursor-pointer overflow-visible ${
          pkg.popular
            ? "border-2 border-accent shadow-[0_8px_30px_-4px_hsl(43_74%_66%/0.3)]"
            : "border hover:border-accent/50"
        } ${
          isActive
            ? "border-2 border-accent shadow-[0_12px_40px_-8px_hsl(43_74%_66%/0.5)] bg-accent/5"
            : "bg-muted/50"
        } ${bookingPackage && bookingPackage !== pkg.name ? 'booking-package--inactive' : ''} ${bookingPackage===pkg.name? 'booking-package--selected':''}`}
      >
        {pkg.popular && (
          <div className={`${isActive ? "absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold" : "hidden"}`}>
            Most Popular
          </div>
        )}

        <div className="text-center mb-6">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${isActive ? "bg-accent/10" : "bg-muted/50"}`}>
            <pkg.icon className={`w-7 h-7 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
          </div>
          <h3 className={`text-xl font-bold mb-2 ${isActive ? "text-foreground" : "text-muted-foreground font-medium"}`}>
            {pkg.name}
          </h3>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className={`text-sm font-semibold mb-2 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
              Core Features
            </h4>
            <ul className="space-y-2">
              {pkg.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                  <span className={`text-xs ${isActive ? "text-muted-foreground" : "text-muted/60"}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-auto">
          <p className={`text-xs mb-2 ${isActive ? "text-muted-foreground" : "text-muted/60"}`}>
            Hidden Defects & Health Risks — Increase Future Costs
          </p>
          {hookText && (
            <div className={`text-sm font-semibold mb-3 ${isActive ? "text-accent" : "text-muted-foreground"}`}>
              {hookText}
            </div>
          )}
          <Button
            variant={pkg.popular ? "premium" : "outline"}
            className={`w-full text-sm ${isActive ? "" : "opacity-70"}`}
            size="lg"
            onClick={(e:any)=>{e.stopPropagation(); openBookingCard(pkg.name);}}
          >
            {ctaLabel}
          </Button>
        </div>
      </Card>
    </div>
  );
};
