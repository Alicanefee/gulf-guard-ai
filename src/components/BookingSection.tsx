import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, Home, Package, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const BookingSection = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const [formData, setFormData] = useState({
    // Step 1: Contact Info
    name: "",
    email: "",
    phoneCountry: "+971",
    phone: "",

    // Step 2: Project Details
    selectedCity: "dubai",
    location: "Dubai",
    customLocation: "",
    propertySize: "",

    // Step 3: Protection Level
    userType: "", // "buyer", "investor", "agency"
    packageType: "", // Based on userType
  });

  useEffect(() => {
    if (calculatedPrice !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [calculatedPrice, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-calculation when all required data is available
  useEffect(() => {
    if (formData.propertySize && formData.packageType) {
      calculatePrice();
    }
  }, [formData.propertySize, formData.packageType]);

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
        basePrice = size * 2.5;
        if (size >= 600 && size <= 1000) discount = 0.1;
        else if (size > 1000 && size <= 2000) discount = 0.15;
        else if (size > 2000) discount = 0.2;
        break;
      case "vip":
        basePrice = size * 3;
        if (size >= 600 && size <= 1000) discount = 0.1;
        else if (size > 1000 && size <= 2000) discount = 0.15;
        else if (size > 2000) discount = 0.2;
        break;
      case "air-quality":
        basePrice = size * 1.5;
        if (size >= 600 && size <= 1000) discount = 0.1;
        else if (size > 1000 && size <= 2000) discount = 0.15;
        else if (size > 2000) discount = 0.2;
        break;
      case "investor":
        if (size <= 3000) basePrice = 6500;
        else if (size <= 6000) basePrice = 9500;
        else basePrice = 12500;
        break;
      case "agency-contact":
        basePrice = 0; // Agency gets contact only
        break;
    }

    const discountedPrice = basePrice * (1 - discount);
    const finalDiscount = discountedPrice * discount;

    setDiscountAmount(Math.round(finalDiscount));
    setCalculatedPrice(Math.round(discountedPrice));
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
        return formData.propertySize && (formData.selectedCity !== "other" || formData.customLocation);
      case 3:
        return formData.userType && (formData.userType === "agency" || formData.packageType);
      default:
        return true;
    }
  };

  const steps = [
    { number: 1, title: "Contact Info" },
    { number: 2, title: "Project Details" },
    { number: 3, title: "Protection Level" },
    { number: 4, title: "Confirmation" },
  ];

  const uaeCities = [
    { value: "dubai", label: "Dubai" },
    { value: "abu-dhabi", label: "Abu Dhabi" },
    { value: "sharjah", label: "Sharjah" },
    { value: "ajman", label: "Ajman" },
    { value: "ras-al-khaimah", label: "Ras Al Khaimah" },
    { value: "fujairah", label: "Fujairah" },
    { value: "umm-al-quwain", label: "Umm Al Quwain" },
    { value: "other", label: "Other City" },
  ];

  const handleNext = () => {
    if (currentStep === 3 && formData.userType === "agency" && canProceedToNextStep()) {
      // Agency skips package selection and goes directly to confirmation
      setCurrentStep(4);
      return;
    }
    if (canProceedToNextStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Schedule Your
              <span className="block text-accent">Protection</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Same-day availability for urgent requests
            </p>
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
                <>
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Project Details</h3>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Location in UAE *</label>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <Select
                          value={formData.selectedCity}
                          onValueChange={(value) => {
                            const cityData = uaeCities.find(c => c.value === value);
                            setFormData({
                              ...formData,
                              selectedCity: value,
                              location: cityData ? cityData.label : formData.customLocation || "Dubai"
                            });
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {uaeCities.map((city) => (
                              <SelectItem key={city.value} value={city.value}>
                                {city.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.selectedCity === "other" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Specify Location *</label>
                        <Input
                          placeholder="Enter city/town name"
                          value={formData.customLocation}
                          onChange={(e) => setFormData({
                            ...formData,
                            customLocation: e.target.value,
                            location: e.target.value
                          })}
                          required
                        />
                      </div>
                    )}

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
                  </div>

                  {/* Progress Indicator integrated into card after Step 2 */}
                  <div className="mt-8 mb-8">
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
                </>
              )}

              {/* Step 3: Protection Level */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Choose Protection Level</h3>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground">Are you a buyer, investor, or agency? *</label>

                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        type="button"
                        variant={formData.userType === "buyer" ? "premium" : "outline"}
                        onClick={() => setFormData({ ...formData, userType: "buyer", packageType: "" })}
                        className="p-4 h-auto flex flex-col gap-2"
                      >
                        <Package className="w-8 h-8" />
                        <span className="text-sm font-semibold">Buyer</span>
                        <span className="text-xs opacity-70">Residential Purchase</span>
                      </Button>

                      <Button
                        type="button"
                        variant={formData.userType === "investor" ? "premium" : "outline"}
                        onClick={() => setFormData({ ...formData, userType: "investor", packageType: "investor" })}
                        className="p-4 h-auto flex flex-col gap-2"
                      >
                        <Package className="w-8 h-8" />
                        <span className="text-sm font-semibold">Investor</span>
                        <span className="text-xs opacity-70">Investment Property</span>
                      </Button>

                      <Button
                        type="button"
                        variant={formData.userType === "agency" ? "premium" : "outline"}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            userType: "agency",
                            packageType: "agency-contact"
                          });
                        }}
                        className="p-4 h-auto flex flex-col gap-2"
                      >
                        <Package className="w-8 h-8" />
                        <span className="text-sm font-semibold">Agency</span>
                        <span className="text-xs opacity-70">Contact Only</span>
                      </Button>
                    </div>
                  </div>

                  {/* Package Selection based on User Type */}
                  {formData.userType && formData.userType !== "agency" && (
                    <div className="space-y-4 mt-8">
                      {formData.userType === "buyer" && (
                        <>
                          <label className="text-sm font-medium text-foreground">Select Protection Package</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button
                              type="button"
                              variant={formData.packageType === "essential" ? "premium" : "outline"}
                              onClick={() => setFormData({ ...formData, packageType: "essential" })}
                              className="p-4 h-auto text-left"
                            >
                              <div className="font-semibold">Essential Package</div>
                              <div className="text-sm opacity-70">Basic inspection coverage</div>
                            </Button>

                            <Button
                              type="button"
                              variant={formData.packageType === "comprehensive" ? "premium" : "outline"}
                              onClick={() => setFormData({ ...formData, packageType: "comprehensive" })}
                              className="p-4 h-auto text-left"
                            >
                              <div className="font-semibold">Comprehensive Package</div>
                              <div className="text-sm opacity-70">Full property analysis</div>
                            </Button>

                            <Button
                              type="button"
                              variant={formData.packageType === "vip" ? "premium" : "outline"}
                              onClick={() => setFormData({ ...formData, packageType: "vip" })}
                              className="p-4 h-auto text-left"
                            >
                              <div className="font-semibold">VIP Package</div>
                              <div className="text-sm opacity-70">Premium service & reports</div>
                            </Button>

                            <Button
                              type="button"
                              variant={formData.packageType === "air-quality" ? "premium" : "outline"}
                              onClick={() => setFormData({ ...formData, packageType: "air-quality" })}
                              className="p-4 h-auto text-left"
                            >
                              <div className="font-semibold">Air Quality Package</div>
                              <div className="text-sm opacity-70">Health & environment focus</div>
                            </Button>
                          </div>
                        </>
                      )}

                      {formData.userType === "investor" && (
                        <>
                          <div className="text-center p-4 bg-accent/10 rounded-lg">
                            <h4 className="font-semibold mb-2">Investor Protection Package</h4>
                            <p className="text-sm text-muted-foreground">
                              Fixed pricing for investment properties
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {formData.userType === "agency" && (
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Agency Contact Service</h4>
                      <p className="text-sm text-muted-foreground">
                        For agencies, we'll provide contact information only for lead generation
                      </p>
                    </div>
                  )}
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

              {/* Progress Indicator integrated into card after Step 2 */}
              {currentStep > 2 && (
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
                    onClick={handleNext}
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

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.



New problems detected after saving the file:
src/components/BookingSection.tsx
- [ts Error] Line 490: Cannot find name 'showCalculation'.
- [ts Error] Line 533: Property 'addOns' does not exist on type '{ name: string; email: string; phoneCountry: string; phone: string; selectedCity: string; location: string; customLocation: string; propertySize: string; userType: string; packageType: string; }'.
- [ts Error] Line 537: Property 'addOns' does not exist on type '{ name: string; email: string; phoneCountry: string; phone: string; selectedCity: string; location: string; customLocation: string; propertySize: string; userType: string; packageType: string; }'.
- [ts Error] Line 538: Property 'addOns' does not exist on type '{ name: string; email: string; phoneCountry: string; phone: string; selectedCity: string; location: string; customLocation: string; propertySize: string; userType: string; packageType: string; }'.
- [ts Error] Line 539: Property 'addOns' does not exist on type '{ name: string; email: string; phoneCountry: string; phone: string; location: string; customLocation: string; propertySize: string; userType: string; packageType: string; }'.
- [ts Error] Line 540: Property 'addOns' does not exist on type '{ name: string; email: string; phoneCountry: string; phone: string; selectedCity: string; location: string; customLocation: string; propertySize: string; userType: string; packageType: string; }'.
- [ts Error] Line 541: Property 'addOns' does not exist on type '{ name: string; email: string; phoneCountry: string; phone: string; selectedCity: string; location: string; customLocation: string; propertySize: string; userType: string; packageType: string; }'.

# TODO LIST 

You've made 40 API requests without a todo list. Consider creating one to track remaining work.





1. To create or update a todo list, include the current task:

   - [ ] Fix Step 4 Confirmation section to remove showCalculation and addOns references

2. Create a complete task list for the Booking Section overhaul:

   - [x] Update Project Details step with UAE city dropdown (defaults to Dubai)

   - [x] Implement custom location input for "Other City" selection

   - [x] Remove rooms field, keep only property size

   - [x] Change Step 3 title to "Choose Protection Level"

   - [x] Add buyer/investor/agency selection buttons

   - [x] Implement package selection based on user type:
     - Buyer: Essential, Comprehensive, VIP, Air Quality
     - Investor: Investment Pack
     - Agency: Contact information only

   - [ ] Remove addOns from formData structure and calculation

   - [ ] Update Step 4 Confirmation to show direct calculation

   - [ ] Update navigation logic for agency skipping

   - [ ] Update order summary to remove addOns and show userType

3. Modify the list to reflect the exact requirements again:

   - Location defaults to Dubai ✓

   - UAE cities dropdown plus "Other City" ✓

   - Custom location input when "Other" selected ✓

   - Only ask for property size ✓

   - Protection Level with buyer/investor/agency ✓

   - Packages shown in same row based on user type ✓

   - No add-on section ✓

   - Direct calculation ✓

   - Order summary updated

4. Technical tasks completed:

   - Fixed formData structure ✓

   - Updated calculatePrice function ✓

   - Fixed canProceedToNextStep logic ✓

   - Updated steps titles ✓

   - Created handleNext function ✓

   - Fixed navigation button onClick ✓

5. Remaining issues to fix:

   - Step 4 still shows showCalculation variable which was removed ✓ (needs fixing)

   - addOns references in Step 4 need to be removed ✓ (needs fixing)

   - Order summary needs to show userType instead of package ✓ (needs fixing)<replace_in_file>
<path>src/components/BookingSection.tsx</path>
<diff>------- SEARCH
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
              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Review & Confirm</h3>

                  {calculatedPrice !== null ? (
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
                          <span>User Type:</span>
                          <span className="text-foreground font-medium capitalize">{formData.userType}</span>
                          <span>Package:</span>
                          <span className="text-foreground font-medium capitalize">{formData.packageType}</span>
                          <span>Location:</span>
                          <span className="text-foreground font-medium">{formData.location}</span>
                        </div>
                      </div>

                      <Button type="submit" variant="premium" size="xl" className="w-full">
                        Confirm Booking
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground">Calculating price...</p>
                    </div>
                  )}
                </div>
              )}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
