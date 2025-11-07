import { AlertTriangle } from "lucide-react";

export const LegalDisclaimer = () => {
  return (
    <section className="py-12" style={{ backgroundColor: '#F0F2F5' }}>
      <div className="container mx-auto px-4">
        <div 
          className="max-w-4xl mx-auto p-6 rounded-lg border-l-4"
          style={{ 
            backgroundColor: 'white',
            borderColor: 'hsl(var(--precision-blue))'
          }}
        >
          <div className="flex items-start gap-4">
            <AlertTriangle 
              className="w-6 h-6 flex-shrink-0 mt-1" 
              style={{ color: 'hsl(var(--precision-blue))' }}
            />
            <div>
              <h3 
                className="font-inter text-xl font-bold mb-4 uppercase"
                style={{ 
                  color: 'hsl(var(--authority-blue))',
                  letterSpacing: '0.5px'
                }}
              >
                Important Legal Disclaimer
              </h3>
              <div className="font-lora text-sm leading-relaxed space-y-3" style={{ color: 'hsl(var(--text-gray))' }}>
                <p>
                  This inspection and report are based on a non-invasive visual examination conducted in accordance with InterNACHI Standards of Practice. This inspection does NOT include destructive testing, X-ray analysis, or specialist inspections (e.g., structural engineering, pest control, or asbestos testing) unless explicitly contracted separately.
                </p>
                <p>
                  Our reports identify visible defects and areas of concern at the time of inspection. We cannot guarantee the discovery of all defects, predict future conditions, or assess compliance with building codes unless specifically stated. Hidden defects behind walls, under floors, or in inaccessible areas may not be detected without invasive procedures.
                </p>
                <p>
                  This inspection is not a warranty, insurance policy, or guarantee of property condition. Clients are advised to seek specialist consultations for concerns beyond the scope of this inspection. Our liability is limited to the inspection fee paid.
                </p>
                <p>
                  By proceeding with our services, you acknowledge that you have read, understood, and agreed to our full Terms of Service and Inspection Agreement.
                </p>
                <p className="pt-2">
                  For complete terms, visit:{" "}
                  <a 
                    href="#" 
                    className="font-semibold underline transition-colors"
                    style={{ color: 'hsl(var(--precision-blue))' }}
                  >
                    Legal Terms & Conditions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
