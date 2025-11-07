import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X } from "lucide-react";

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

export const ComparisonTableModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="font-inter text-base font-semibold"
          style={{
            borderColor: 'hsl(var(--authority-blue))',
            color: 'hsl(var(--authority-blue))',
          }}
        >
          View Detailed Comparison Table
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle 
            className="font-inter text-2xl font-bold uppercase mb-4"
            style={{ color: 'hsl(var(--authority-blue))' }}
          >
            Service Comparison
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              <div className="p-4"></div>
              <div 
                className="p-4 rounded-t-lg text-center"
                style={{ backgroundColor: 'hsl(var(--authority-blue))' }}
              >
                <span 
                  className="font-inter font-bold text-sm"
                  style={{ color: 'hsl(var(--clinical-white))' }}
                >
                  Dubai Property Inspection
                </span>
              </div>
              <div 
                className="p-4 rounded-t-lg text-center"
                style={{ backgroundColor: '#D0D0D0' }}
              >
                <span 
                  className="font-inter font-semibold text-sm"
                  style={{ color: 'hsl(var(--text-gray))' }}
                >
                  Standard Competitors
                </span>
              </div>
              <div 
                className="p-4 rounded-t-lg text-center"
                style={{ backgroundColor: '#D0D0D0' }}
              >
                <span 
                  className="font-inter font-semibold text-sm"
                  style={{ color: 'hsl(var(--text-gray))' }}
                >
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
                  <span 
                    className="font-inter text-sm"
                    style={{ color: 'hsl(var(--text-gray))' }}
                  >
                    {row.feature}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-center">
                  {row.you ? (
                    <CheckCircle2 className="w-6 h-6" style={{ color: 'hsl(var(--precision-blue))' }} />
                  ) : (
                    <X className="w-6 h-6" style={{ color: '#999' }} />
                  )}
                </div>
                <div className="p-4 flex items-center justify-center">
                  {row.standard ? (
                    <CheckCircle2 className="w-6 h-6" style={{ color: '#666' }} />
                  ) : (
                    <X className="w-6 h-6" style={{ color: '#999' }} />
                  )}
                </div>
                <div className="p-4 flex items-center justify-center">
                  {row.premium ? (
                    <CheckCircle2 className="w-6 h-6" style={{ color: '#666' }} />
                  ) : (
                    <X className="w-6 h-6" style={{ color: '#999' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
