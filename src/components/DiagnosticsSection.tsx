import { Box, Thermometer, FlaskConical, Wind, Cpu, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Box,
    title: "3D Laser Scanning",
    description: "±3mm accuracy. Finds hidden wall cavities. Detects structural inconsistencies.",
    comparison: "Standard inspectors use: tape measure (±10cm)"
  },
  {
    icon: Thermometer,
    title: "Thermal Imaging",
    description: "Detects temperature differences of 0.1°C. Finds hidden water leaks and electrical hotspots.",
    comparison: "Standard: visual check only"
  },
  {
    icon: FlaskConical,
    title: "Mold Testing",
    description: "Laboratory-grade air quality analysis. Identifies 200+ mold species.",
    comparison: "Standard: none or basic visual check"
  },
  {
    icon: Wind,
    title: "Air Quality Analysis",
    description: "VOC detection, CO2 levels, humidity monitoring. Health risk assessment.",
    comparison: "Standard: not included"
  },
  {
    icon: Cpu,
    title: "AI Defect Analysis",
    description: "Machine learning identifies patterns. Predicts future maintenance needs.",
    comparison: "Standard: human eye only"
  },
  {
    icon: Camera,
    title: "360° Documentation",
    description: "Complete digital twin of your property. Access anytime, anywhere.",
    comparison: "Standard: basic photos"
  }
];

const comparisonRows = [
  { feature: "Thermal Imaging", you: true, standard: false, premium: false },
  { feature: "3D Laser Scanning", you: true, standard: false, premium: false },
  { feature: "Laboratory Mold Testing", you: true, standard: false, premium: true },
  { feature: "Air Quality Analysis", you: true, standard: false, premium: false },
  { feature: "AI Defect Detection", you: true, standard: false, premium: false },
  { feature: "360° Documentation", you: true, standard: false, premium: true },
  { feature: "Moisture Mapping", you: true, standard: false, premium: true },
  { feature: "Electrical Safety Scan", you: true, standard: true, premium: true },
  { feature: "Plumbing Diagnostics", you: true, standard: true, premium: true },
  { feature: "HVAC Efficiency Check", you: true, standard: false, premium: true },
  { feature: "Energy Loss Assessment", you: true, standard: false, premium: false },
  { feature: "Structural Analysis", you: true, standard: true, premium: true },
  { feature: "Maintenance Forecast", you: true, standard: false, premium: false },
  { feature: "Legal Compliance Review", you: true, standard: false, premium: true },
  { feature: "5-Year Warranty", you: true, standard: false, premium: true }
];

export const DiagnosticsSection = () => {
  return (
    <section className="py-20" style={{ backgroundColor: '#F0F2F5' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 
            className="font-inter text-3xl md:text-4xl font-bold uppercase mb-6"
            style={{ 
              color: 'hsl(var(--authority-blue))',
              letterSpacing: '1px'
            }}
          >
            Building Diagnostics, Not Just Snagging
          </h2>
          <p className="font-lora text-lg" style={{ color: 'hsl(var(--text-gray))' }}>
            Our Advanced Diagnostic Approach
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border"
                style={{ 
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  borderColor: '#E0E0E0'
                }}
              >
                <div className="mb-4">
                  <div 
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'hsl(var(--precision-blue) / 0.1)' }}
                  >
                    <Icon className="w-7 h-7" style={{ color: 'hsl(var(--precision-blue))' }} />
                  </div>
                  <h3 
                    className="font-inter text-xl font-semibold mb-2"
                    style={{ color: 'hsl(var(--authority-blue))' }}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p 
                  className="font-lora text-base mb-3"
                  style={{ color: 'hsl(var(--text-gray))' }}
                >
                  {feature.description}
                </p>
                <div 
                  className="text-sm font-inter p-2 rounded"
                  style={{ 
                    backgroundColor: 'rgba(195, 100, 47, 0.05)',
                    color: 'hsl(var(--authority-blue))'
                  }}
                >
                  vs. {feature.comparison}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header Row */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="p-4"></div>
                <div className="p-4 rounded-t-lg text-center" style={{ backgroundColor: 'hsl(var(--authority-blue))' }}>
                  <span className="font-inter font-bold text-sm" style={{ color: 'hsl(var(--clinical-white))' }}>
                    Dubai Property Inspection
                  </span>
                </div>
                <div className="p-4 rounded-t-lg text-center" style={{ backgroundColor: '#D0D0D0' }}>
                  <span className="font-inter font-semibold text-sm" style={{ color: 'hsl(var(--text-gray))' }}>
                    Standard Competitors
                  </span>
                </div>
                <div className="p-4 rounded-t-lg text-center" style={{ backgroundColor: '#D0D0D0' }}>
                  <span className="font-inter font-semibold text-sm" style={{ color: 'hsl(var(--text-gray))' }}>
                    Premium Competitors
                  </span>
                </div>
              </div>

              {/* Data Rows */}
              {comparisonRows.map((row, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-4 gap-2 mb-1 transition-all duration-200 hover:shadow-md"
                  style={{ 
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(192, 160, 110, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <div className="p-4 flex items-center">
                    <span className="font-inter text-sm" style={{ color: 'hsl(var(--text-gray))' }}>
                      {row.feature}
                    </span>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    {row.you ? (
                      <span className="text-2xl" style={{ color: 'hsl(var(--precision-blue))' }}>✓</span>
                    ) : (
                      <span className="text-2xl" style={{ color: '#999' }}>×</span>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    {row.standard ? (
                      <span className="text-2xl" style={{ color: '#666' }}>✓</span>
                    ) : (
                      <span className="text-2xl" style={{ color: '#999' }}>×</span>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    {row.premium ? (
                      <span className="text-2xl" style={{ color: '#666' }}>✓</span>
                    ) : (
                      <span className="text-2xl" style={{ color: '#999' }}>×</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More About Our Advantage
          </Button>
        </div>
      </div>
    </section>
  );
};
