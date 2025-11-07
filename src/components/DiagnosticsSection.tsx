import { Box, Thermometer, FlaskConical, Wind, Cpu, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ComparisonTableModal } from "./ComparisonTableModal";

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
                className="p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-2 relative overflow-hidden group"
                style={{ 
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  borderColor: 'hsl(var(--authority-blue) / 0.2)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(29,44,77,0.03) 100%)'
                }}
              >
                {/* Decorative corner accent */}
                <div 
                  className="absolute top-0 left-0 w-24 h-24 opacity-10 transform -translate-x-8 -translate-y-8"
                  style={{ 
                    background: 'radial-gradient(circle, hsl(var(--authority-blue)) 0%, transparent 70%)'
                  }}
                />
                
                <div className="mb-4 relative z-10">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      backgroundColor: 'hsl(var(--precision-blue) / 0.15)',
                      boxShadow: '0 4px 12px rgba(0, 174, 239, 0.2)'
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: 'hsl(var(--precision-blue))' }} />
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

        {/* CTA */}
        <div className="text-center">
          <ComparisonTableModal />
        </div>
      </div>
    </section>
  );
};
