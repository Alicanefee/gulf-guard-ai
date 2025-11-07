import { Droplets, Zap, Wind, Hammer, AlertTriangle, ClipboardCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const risks = [
  {
    icon: Droplets,
    percentage: "67%",
    title: "Water Problems",
    description: "Behind walls, in ceilings, behind AC units. Discovered 3-6 months after move-in. Repair cost: AED 50,000+. Property devaluation: 15-25%"
  },
  {
    icon: Zap,
    percentage: "45%",
    title: "Efficiency Issues",
    description: "20% energy waste. Annual loss: AED 8,000-15,000. Over 10 years: AED 80,000-150,000 wasted"
  },
  {
    icon: Wind,
    percentage: "38%",
    title: "Indoor Air Quality",
    description: "Hidden mold, poor ventilation. Health risks for children and elderly. Treatment costs: AED 30,000+"
  },
  {
    icon: Hammer,
    percentage: "55%",
    title: "Construction Defects",
    description: "Structural issues, poor workmanship. After warranty expires: AED 100,000+ for repairs"
  },
  {
    icon: AlertTriangle,
    percentage: "42%",
    title: "Safety Hazards",
    description: "Electrical issues, fire risks, structural weaknesses. Insurance claims denied: AED 200,000+ exposure"
  },
  {
    icon: ClipboardCheck,
    percentage: "72%",
    title: "Documentation Gaps",
    description: "Missing permits, undisclosed modifications. Legal complications. Resale value impact: 10-20%"
  }
];

const warnings = [
  "DIY Inspections miss 60% of real issues",
  "Visual checks cannot detect hidden problems",
  "Friend's advice is not a professional diagnosis"
];

export const RiskSection = () => {
  return (
    <section id="why" className="py-20" style={{ backgroundColor: 'hsl(var(--clinical-white))' }}>
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
            You Found Your Dream Home. Now Protect Your Investment With Us.
          </h2>
          <h3 
            className="font-inter text-xl md:text-2xl font-semibold mb-4"
            style={{ color: 'hsl(var(--authority-blue))' }}
          >
            Common Property Risks in Dubai
          </h3>
          <p className="font-lora text-lg" style={{ color: 'hsl(var(--text-gray))' }}>
            60-80% of properties have defects. Avoid regret from hidden defects.
          </p>
        </div>

        {/* Risk Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {risks.map((risk, index) => {
            const Icon = risk.icon;
            return (
              <Card 
                key={index}
                className="p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-2 relative overflow-hidden group"
                style={{ 
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  borderColor: 'hsl(var(--precision-blue) / 0.2)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(0,174,239,0.03) 100%)'
                }}
              >
                {/* Decorative corner accent */}
                <div 
                  className="absolute top-0 right-0 w-24 h-24 opacity-10 transform translate-x-8 -translate-y-8"
                  style={{ 
                    background: 'radial-gradient(circle, hsl(var(--precision-blue)) 0%, transparent 70%)'
                  }}
                />
                
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      backgroundColor: 'hsl(var(--precision-blue) / 0.15)',
                      boxShadow: '0 4px 12px rgba(0, 174, 239, 0.2)'
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: 'hsl(var(--precision-blue))' }} />
                  </div>
                  <div>
                    <div 
                      className="font-inter text-3xl font-bold"
                      style={{ color: 'hsl(var(--precision-blue))' }}
                    >
                      {risk.percentage}
                    </div>
                    <h4 
                      className="font-inter text-lg font-semibold"
                      style={{ color: 'hsl(var(--authority-blue))' }}
                    >
                      {risk.title}
                    </h4>
                  </div>
                </div>
                <p 
                  className="font-lora text-base leading-relaxed"
                  style={{ color: 'hsl(var(--text-gray))' }}
                >
                  {risk.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Warning Cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {warnings.map((warning, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border-l-4 text-center"
              style={{ 
                backgroundColor: 'rgba(195, 100, 47, 0.05)',
                borderColor: 'hsl(var(--precision-blue))'
              }}
            >
              <p className="font-inter font-semibold text-sm" style={{ color: 'hsl(var(--authority-blue))' }}>
                ⚠️ {warning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
