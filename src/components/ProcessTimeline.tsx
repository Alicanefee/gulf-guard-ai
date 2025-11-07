import { FileText, Scan, Search, FileCheck, Wrench, Bell } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Submit Your Property",
    description: "Instantly start with location, size, and your priorities.",
    duration: "2 minutes"
  },
  {
    icon: Scan,
    title: "Full Property Scan",
    description: "We map your villa or apartment as a true 3D digital twin.",
    duration: "3-5 hours"
  },
  {
    icon: Search,
    title: "Deep-Dive Diagnostics",
    description: "Thermal, moisture, air quality, and structural analysis.",
    duration: "Analysis phase"
  },
  {
    icon: FileCheck,
    title: "Comprehensive Report",
    description: "Clear, visual report with findings, risks, and recommendations.",
    duration: "24-48 hours"
  },
  {
    icon: Wrench,
    title: "Maintenance Actions",
    description: "Prioritized action plan with cost estimates and contractor referrals.",
    duration: "Ongoing support"
  },
  {
    icon: Bell,
    title: "Follow-up & Warranty",
    description: "12-month warranty and optional annual re-inspection.",
    duration: "1 year+"
  }
];

export const ProcessTimeline = () => {
  return (
    <section className="py-20" style={{ backgroundColor: 'hsl(var(--clinical-white))' }}>
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
            How It Works
          </h2>
          <p className="font-lora text-lg" style={{ color: 'hsl(var(--text-gray))' }}>
            Our proven 6-step process ensures nothing is missed
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          {/* Connection Line */}
          <div 
            className="absolute top-16 left-0 right-0 h-1"
            style={{ backgroundColor: 'hsl(var(--precision-blue) / 0.2)' }}
          />

          <div className="grid grid-cols-6 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Icon Circle */}
                  <div className="flex justify-center mb-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center relative z-10 border-4"
                      style={{ 
                        backgroundColor: 'white',
                        borderColor: 'hsl(var(--precision-blue))'
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: 'hsl(var(--precision-blue))' }} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 
                      className="font-inter text-lg font-semibold mb-2"
                      style={{ color: 'hsl(var(--authority-blue))' }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="font-lora text-sm mb-2"
                      style={{ color: 'hsl(var(--text-gray))' }}
                    >
                      {step.description}
                    </p>
                    <span 
                      className="text-xs font-inter font-medium"
                      style={{ color: 'hsl(var(--precision-blue))' }}
                    >
                      {step.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: 'hsl(var(--precision-blue))'
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'hsl(var(--precision-blue))' }} />
                  </div>
                  {index < steps.length - 1 && (
                    <div 
                      className="w-0.5 h-12 mx-auto mt-2"
                      style={{ backgroundColor: 'hsl(var(--precision-blue) / 0.3)' }}
                    />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-6">
                  <h3 
                    className="font-inter text-lg font-semibold mb-1"
                    style={{ color: 'hsl(var(--authority-blue))' }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="font-lora text-sm mb-1"
                    style={{ color: 'hsl(var(--text-gray))' }}
                  >
                    {step.description}
                  </p>
                  <span 
                    className="text-xs font-inter font-medium"
                    style={{ color: 'hsl(var(--precision-blue))' }}
                  >
                    {step.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
