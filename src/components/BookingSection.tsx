import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Phone, Mail, MapPin, Home, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const BookingSection = () => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 hours in seconds
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    date: "",
    time: "",
    propertySize: "",
    packageType: "",
  });

  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const calculatePrice = (size: number, packageType: string) => {
    let basePrice = 0;
    let discount = 0;

    switch (packageType) {
      case "essential":
        basePrice = size * 2;
        if (size >= 600 && size <= 1000) discount = 0.1;
        else if (size > 1000 && size <= 2000) discount = 0.15;
        else if (size > 2000) discount = 0.2;
        basePrice = Math.max(basePrice, 1200); // minimum
        break;
      case "comprehensive":
        basePrice = size * 2.5 + 300 + size * 1.5;
        if (size >= 600 && size <= 1000) discount = 0.1;
        else if (size > 1000 && size <= 2000) discount = 0.15;
        else if (size > 2000) discount = 0.2;
        break;
      case "vip":
        basePrice = size * 3 + size * 1.5 + size * 2;
        if (size >= 600 && size <= 1000) discount = 0.1;
        else if (size > 1000 && size <= 2000) discount = 0.15;
        else if (size > 2000) discount = 0.2;
        break;
      case "estate":
        basePrice = size * 3.5 + size * 2 + size * 1.5 + size * 1.5 + 300;
        if (size >= 2000 && size <= 3000) discount = 0.15;
        else if (size > 3000 && size <= 5000) discount = 0.2;
        else if (size > 5000) discount = 0.25;
        break;
      case "air-quality":
        basePrice = size * 1.5 + size * 0.5 + size * 2;
        if (size >= 600 && size <= 1000) discount = 0.1;
        else if (size > 1000 && size <= 2000) discount = 0.15;
        else if (size > 2000) discount = 0.2;
        break;
      case "investor":
        if (size <= 3000) basePrice = 6500;
        else if (size <= 6000) basePrice = 9500;
        else basePrice = 12500;
        break;
    }

    const discountedPrice = basePrice * (1 - discount);
    const urgencyDiscount = discountedPrice * 0.05; // 5% for booking within 48h
    return Math.round(discountedPrice - urgencyDiscount);
  };

  useEffect(() => {
    if (formData.propertySize && formData.packageType) {
      const size = parseInt(formData.propertySize);
      if (!isNaN(size) && size > 0) {
        setCalculatedPrice(calculatePrice(size, formData.packageType));
      }
    }
  }, [formData.propertySize, formData.packageType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Received",
      description: "We'll contact you within 2 hours to confirm your inspection.",
    });
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Schedule Your
              <span className="block text-accent">Inspection</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Same-day availability for urgent requests
            </p>
            {timeLeft > 0 && (
              <div className="mt-4 inline-block bg-accent/10 border border-accent/30 rounded-lg px-6 py-3">
                <p className="text-sm font-medium text-accent">
                  ⏰ Book within {formatTime(timeLeft)} and get an additional 5% discount!
                </p>
              </div>
            )}
          </div>

          <Card className="p-8 md:p-12 shadow-[0_8px_30px_-4px_hsl(215_35%_20%/0.12)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <Input
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="+971 50 123 4567"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Property Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Dubai Marina, JBR..."
                      className="pl-10"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Property Size (sqft)</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="1000"
                      className="pl-10"
                      value={formData.propertySize}
                      onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Package Type</label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select
                      value={formData.packageType}
                      onValueChange={(value) => setFormData({ ...formData, packageType: value })}
                      required
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="essential">Essential</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="estate">Estate</SelectItem>
                        <SelectItem value="air-quality">Air Quality Pack</SelectItem>
                        <SelectItem value="investor">Investor Pack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pl-10"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="time"
                      className="pl-10"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {calculatedPrice && (
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/30 rounded-lg p-6 text-center animate-scale-in">
                  <p className="text-sm text-muted-foreground mb-2">Your Total Price</p>
                  <p className="text-4xl font-bold text-accent mb-2">{calculatedPrice} AED</p>
                  <p className="text-xs text-muted-foreground">
                    Including tiered discount + 5% urgency discount
                  </p>
                  <p className="text-xs text-accent font-medium mt-2">
                    💎 Free extras included in your package!
                  </p>
                </div>
              )}

              <div className="bg-secondary/50 p-6 rounded-lg space-y-3">
                <h4 className="font-semibold text-foreground mb-3">What to expect:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">1.</span>
                    Confirmation call within 2 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">2.</span>
                    SMS reminder 24 hours before inspection
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">3.</span>
                    On-site inspection (2-4 hours depending on property size)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">4.</span>
                    Detailed PDF report delivered within 24 hours
                  </li>
                </ul>
              </div>

              <Button type="submit" variant="premium" size="xl" className="w-full">
                Request Inspection
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Urgent inspection needed?{" "}
                <a href="tel:+97150123456" className="text-accent font-medium hover:underline">
                  Call +971 50 123 4567
                </a>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
