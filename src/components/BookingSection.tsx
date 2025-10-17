import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, Home, Package, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const BookingSection = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showCalculation, setShowCalculation] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Contact Info
    name: "",
    email: "",
  phoneCountry: "+971",
  phone: "",
    
  // Step 2: Project Details
  location: "",
  propertyCountry: "+971",
  propertySize: "",
  rooms: "",
    
    // Step 3: Package & Add-ons
    packageType: "",
    addOns: {
      threeDScan: false,
      inspectionVideo: false,
      negativePressure: false,
      consultations: false,
      moldTest: false,
    },
  });

  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  useEffect(() => {
    if (showCalculation && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCalculation, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const calculatePrice = () => {
    if (!formData.propertySize || !formData.packageType) return;

    const size = parseInt(formData.propertySize);
    if (isNaN(size) || size <= 0) return;

    let basePrice = 0;
    let discount = 0;

    // Base package pricing
    switch (formData.packageType) {
      case "essential":
        basePrice = size * 2;
        if (size >= 600 && size <= 1000) discount = 0.1;
        else if (size > 1000 && size <= 2000) discount = 0.15;
        else if (size > 2000) discount = 0.2;
        basePrice = Math.max(basePrice, 1200);
        break;
      case "comprehensive":
        basePrice = size * 2.5 + (formData.addOns.inspectionVideo ? 300 : 0) + (formData.addOns.threeDScan ? size * 1.5 : 0);
        if (size >= 600 && size <= 1000) discount = 0.1;
        else if (size > 1000 && size <= 2000) discount = 0.15;
        else if (size > 2000) discount = 0.2;
        break;
      case "vip":
        basePrice = size * 3 + (formData.addOns.negativePressure ? size * 1.5 : 0) + (formData.addOns.threeDScan ? size * 2 : 0);
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
        basePrice = size * 1.5 + (formData.addOns.moldTest ? size * 0.5 : 0) + size * 2;
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

    // Apply add-on costs
    if (formData.addOns.consultations) basePrice += 500;

    const discountedPrice = basePrice * (1 - discount);
    const finalDiscount = discountedPrice * discount;
    
    setDiscountAmount(Math.round(finalDiscount));
    setCalculatedPrice(Math.round(discountedPrice));
    setShowCalculation(true);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Received",
      description: "We'll contact you within 2 hours to confirm your inspection.",
    });
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return (
          formData.location &&
          formData.propertyCountry &&
          formData.propertySize &&
          formData.rooms
        );
      case 3:
        return formData.packageType;
      default:
        return true;
    }
  };

  const steps = [
    { number: 1, title: "Contact Info" },
    { number: 2, title: "Project Details" },
    { number: 3, title: "Package & Add-ons" },
    { number: 4, title: "Confirmation" },
  ];

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
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        currentStep > step.number
                          ? "bg-accent text-accent-foreground"
                          : currentStep === step.number
                          ? "bg-accent text-accent-foreground ring-4 ring-accent/20"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className="text-xs mt-2 font-medium text-muted-foreground hidden sm:block">
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all ${
                        currentStep > step.number ? "bg-accent" : "bg-secondary"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 md:p-12 shadow-[0_8px_30px_-4px_hsl(215_35%_20%/0.12)]">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Contact Info */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <Input
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone *</label>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div className="flex items-center w-full">
                        <Select
                          value={formData.phoneCountry}
                          onValueChange={(value) => setFormData({ ...formData, phoneCountry: value })}
                          required
                        >
                          <SelectTrigger className="w-28 mr-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+971">🇦🇪 +971 (UAE)</SelectItem>
                            <SelectItem value="+1">🇺🇸 +1 (US)</SelectItem>
                            <SelectItem value="+44">🇬🇧 +44 (UK)</SelectItem>
                            <SelectItem value="+966">🇸🇦 +966 (SA)</SelectItem>
                            <SelectItem value="+91">🇮🇳 +91 (IN)</SelectItem>
                            <SelectItem value="+61">🇦🇺 +61 (AU)</SelectItem>
                            {/* European country codes */}
                            <SelectItem value="+33">🇫🇷 +33 (France)</SelectItem>
                            <SelectItem value="+49">🇩🇪 +49 (Germany)</SelectItem>
                            <SelectItem value="+39">🇮🇹 +39 (Italy)</SelectItem>
                            <SelectItem value="+34">🇪🇸 +34 (Spain)</SelectItem>
                            <SelectItem value="+31">🇳🇱 +31 (Netherlands)</SelectItem>
                            <SelectItem value="+46">🇸🇪 +46 (Sweden)</SelectItem>
                            <SelectItem value="+41">🇨🇭 +41 (Switzerland)</SelectItem>
                            <SelectItem value="+43">🇦🇹 +43 (Austria)</SelectItem>
                            <SelectItem value="+32">🇧🇪 +32 (Belgium)</SelectItem>
                            <SelectItem value="+420">🇨🇿 +420 (Czech Republic)</SelectItem>
                          </SelectContent>
                        </Select>

                        <Input
                          type="tel"
                          placeholder="50 123 4567"
                          className="flex-1"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          autoComplete="tel"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Project Details</h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Property Location *</label>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div className="flex items-center w-full">
                        <Select
                          value={formData.propertyCountry}
                          onValueChange={(value) => setFormData({ ...formData, propertyCountry: value })}
                          required
                        >
                          <SelectTrigger className="w-28 mr-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+971">🇦🇪 +971 (UAE)</SelectItem>
                            <SelectItem value="+1">🇺🇸 +1 (US)</SelectItem>
                            <SelectItem value="+44">🇬🇧 +44 (UK)</SelectItem>
                            <SelectItem value="+966">🇸🇦 +966 (SA)</SelectItem>
                            <SelectItem value="+91">🇮🇳 +91 (IN)</SelectItem>
                            <SelectItem value="+61">🇦🇺 +61 (AU)</SelectItem>
                            {/* European country codes */}
                            <SelectItem value="+33">🇫🇷 +33 (France)</SelectItem>
                            <SelectItem value="+49">🇩🇪 +49 (Germany)</SelectItem>
                            <SelectItem value="+39">🇮🇹 +39 (Italy)</SelectItem>
                            <SelectItem value="+34">🇪🇸 +34 (Spain)</SelectItem>
                            <SelectItem value="+31">🇳🇱 +31 (Netherlands)</SelectItem>
                            <SelectItem value="+46">🇸🇪 +46 (Sweden)</SelectItem>
                            <SelectItem value="+41">🇨🇭 +41 (Switzerland)</SelectItem>
                            <SelectItem value="+43">🇦🇹 +43 (Austria)</SelectItem>
                            <SelectItem value="+32">🇧🇪 +32 (Belgium)</SelectItem>
                            <SelectItem value="+420">🇨🇿 +420 (Czech Republic)</SelectItem>
                          </SelectContent>
                        </Select>

                        <Input
                          placeholder="Dubai Marina, JBR..."
                          className="flex-1"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          autoComplete="street-address"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Property Size (sqft) *</label>
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
                      <label className="text-sm font-medium text-foreground">Number of Rooms *</label>
                      <Input
                        type="number"
                        placeholder="3"
                        value={formData.rooms}
                        onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Region removed per request */}
                </div>
              )}

              {/* Step 3: Package & Add-ons */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Package & Add-ons</h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Package Type *</label>
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

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground">Add-on Services</label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="threeDScan"
                          checked={formData.addOns.threeDScan}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              addOns: { ...formData.addOns, threeDScan: checked as boolean },
                            })
                          }
                        />
                        <label
                          htmlFor="threeDScan"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          3D Home Scan
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="inspectionVideo"
                          checked={formData.addOns.inspectionVideo}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              addOns: { ...formData.addOns, inspectionVideo: checked as boolean },
                            })
                          }
                        />
                        <label
                          htmlFor="inspectionVideo"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Full Inspection Video
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="negativePressure"
                          checked={formData.addOns.negativePressure}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              addOns: { ...formData.addOns, negativePressure: checked as boolean },
                            })
                          }
                        />
                        <label
                          htmlFor="negativePressure"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Negative Pressure Test
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="consultations"
                          checked={formData.addOns.consultations}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              addOns: { ...formData.addOns, consultations: checked as boolean },
                            })
                          }
                        />
                        <label
                          htmlFor="consultations"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Three Online Consultations
                        </label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="moldTest"
                          checked={formData.addOns.moldTest}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              addOns: { ...formData.addOns, moldTest: checked as boolean },
                            })
                          }
                        />
                        <label
                          htmlFor="moldTest"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          Mold Test
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Review & Confirm</h3>

                  {!showCalculation ? (
                    <div className="text-center py-12">
                      <Button
                        type="button"
                        variant="premium"
                        size="xl"
                        onClick={calculatePrice}
                        className="mx-auto"
                      >
                        Calculate Total Cost
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/30 rounded-lg p-6">
                        <div className="text-center mb-4">
                          <p className="text-sm text-muted-foreground mb-2">Your Total Price</p>
                          <p className="text-5xl font-bold text-accent mb-2">{calculatedPrice} AED</p>
                          <p className="text-sm text-muted-foreground">
                            Discount applied: {discountAmount} AED
                          </p>
                        </div>

                        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
                          <p className="text-sm font-semibold text-destructive mb-2">
                            ⏰ Discount valid for: {formatTime(timeLeft)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Discount valid only for this email. Restart or different email voids offer.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm">
                        <h4 className="font-semibold text-foreground">Order Summary:</h4>
                        <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                          <span>Property Size:</span>
                          <span className="text-foreground font-medium">{formData.propertySize} sqft</span>
                          <span>Package:</span>
                          <span className="text-foreground font-medium capitalize">{formData.packageType}</span>
                          <span>Location:</span>
                          <span className="text-foreground font-medium">{formData.location}</span>
                        </div>
                        {Object.entries(formData.addOns).some(([_, value]) => value) && (
                          <>
                            <h4 className="font-semibold text-foreground pt-2">Selected Add-ons:</h4>
                            <ul className="list-disc list-inside text-muted-foreground">
                              {formData.addOns.threeDScan && <li>3D Home Scan</li>}
                              {formData.addOns.inspectionVideo && <li>Full Inspection Video</li>}
                              {formData.addOns.negativePressure && <li>Negative Pressure Test</li>}
                              {formData.addOns.consultations && <li>Three Online Consultations</li>}
                              {formData.addOns.moldTest && <li>Mold Test</li>}
                            </ul>
                          </>
                        )}
                      </div>

                      <Button type="submit" variant="premium" size="xl" className="w-full">
                        Confirm Booking
                      </Button>
                    </>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-8 border-t">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Previous
                  </Button>
                )}
                {currentStep < 4 && (
                  <Button
                    type="button"
                    variant="premium"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceedToNextStep()}
                    className="ml-auto"
                  >
                    Next
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
