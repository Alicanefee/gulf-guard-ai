import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Legal() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'hsl(var(--clinical-white))' }}>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 
            className="font-inter text-4xl md:text-5xl font-bold uppercase mb-8 text-center"
            style={{ 
              color: 'hsl(var(--authority-blue))',
              letterSpacing: '1px'
            }}
          >
            Legal Information
          </h1>

          <Tabs defaultValue="disclaimer" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
              <TabsTrigger value="disclaimer">Legal Disclaimer</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="disclaimer">
              <div 
                className="p-8 rounded-lg border-l-4"
                style={{ 
                  backgroundColor: '#F0F2F5',
                  borderColor: 'hsl(var(--precision-blue))'
                }}
              >
                <h2 
                  className="font-inter text-2xl font-bold mb-6 uppercase"
                  style={{ color: 'hsl(var(--authority-blue))' }}
                >
                  Important Legal Disclaimer
                </h2>
                
                <div className="space-y-4 font-lora text-base" style={{ color: 'hsl(var(--text-gray))' }}>
                  <p>
                    This inspection and report are based on a non-invasive visual examination conducted in accordance with InterNACHI Standards of Practice. This inspection does NOT include destructive testing, X-ray analysis, or specialist inspections (e.g., pest control, swimming pool, or asbestos testing) unless explicitly stated in your service package.
                  </p>

                  <p>
                    <strong>What We Do NOT Inspect:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Areas that are inaccessible, obstructed, or unsafe to enter</li>
                    <li>Cosmetic issues (e.g., minor paint chips, small scratches)</li>
                    <li>Systems or components that are shut down or winterized</li>
                    <li>Future performance or remaining life expectancy of systems</li>
                    <li>Compliance with building codes (unless "Code Compliance Review" is purchased)</li>
                  </ul>

                  <p>
                    <strong>Limitations of Thermal Imaging and 3D Scanning:</strong> While our advanced technology significantly increases defect detection accuracy, it cannot guarantee the discovery of every concealed defect. Thermal imaging is effective for detecting temperature anomalies but does not show actual moisture content, structural integrity, or the interior of walls.
                  </p>

                  <p>
                    <strong>Client Responsibility:</strong> The client is responsible for verifying all property documentation, permits, and legal compliance with relevant authorities (e.g., Dubai Municipality, RERA). Our inspection is not a substitute for legal or architectural advice.
                  </p>

                  <p>
                    <strong>Warranty Conditions:</strong> Any warranties provided apply only to the inspection date and the systems inspected. Changes, repairs, or modifications made after the inspection void the warranty for affected systems.
                  </p>

                  <p>
                    <strong>Liability Limitation:</strong> Our maximum liability for any claim arising from this inspection is limited to the fee paid for the inspection service, except where prohibited by law.
                  </p>

                  <p className="mt-6">
                    For complete terms and conditions, please refer to our{" "}
                    <a 
                      href="#" 
                      className="font-semibold underline"
                      style={{ color: 'hsl(var(--precision-blue))' }}
                    >
                      Inspection Agreement
                    </a>.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy">
              <div 
                className="p-8 rounded-lg"
                style={{ backgroundColor: 'white' }}
              >
                <h2 
                  className="font-inter text-2xl font-bold mb-6 uppercase"
                  style={{ color: 'hsl(var(--authority-blue))' }}
                >
                  Privacy Policy
                </h2>
                
                <div className="space-y-4 font-lora text-base" style={{ color: 'hsl(var(--text-gray))' }}>
                  <p><strong>Effective Date:</strong> January 1, 2025</p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    1. Information We Collect
                  </h3>
                  <p>
                    We collect personal information you provide (name, email, phone, property address), property data (inspection reports, photos, 3D scans), and technical data (IP address, browser type, device information).
                  </p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    2. How We Use Your Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To provide inspection services and deliver reports</li>
                    <li>To communicate with you about your inspection</li>
                    <li>To improve our services and technology</li>
                    <li>To comply with legal obligations</li>
                    <li>With your consent, to send marketing communications</li>
                  </ul>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    3. Data Security
                  </h3>
                  <p>
                    We implement industry-standard security measures to protect your data. All property data is encrypted and stored on secure servers in compliance with UAE data protection laws.
                  </p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    4. Your Rights
                  </h3>
                  <p>
                    You have the right to access, correct, or delete your personal information. Contact us at privacy@dubaipropertyinspection.ae to exercise these rights.
                  </p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    5. Contact Us
                  </h3>
                  <p>
                    For privacy-related inquiries, email us at privacy@dubaipropertyinspection.ae or call +971 XX XXX XXXX.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="terms">
              <div 
                className="p-8 rounded-lg"
                style={{ backgroundColor: 'white' }}
              >
                <h2 
                  className="font-inter text-2xl font-bold mb-6 uppercase"
                  style={{ color: 'hsl(var(--authority-blue))' }}
                >
                  Terms of Service
                </h2>
                
                <div className="space-y-4 font-lora text-base" style={{ color: 'hsl(var(--text-gray))' }}>
                  <p><strong>Effective Date:</strong> January 1, 2025</p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    1. Service Agreement
                  </h3>
                  <p>
                    By booking an inspection with Dubai Property Inspection L.L.C., you agree to these terms and conditions. Our services are provided "as-is" in accordance with InterNACHI Standards of Practice.
                  </p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    2. Booking and Payment
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payment is required at the time of booking</li>
                    <li>Cancellations made 48+ hours before inspection: full refund</li>
                    <li>Cancellations made 24-48 hours before: 50% refund</li>
                    <li>Cancellations made less than 24 hours before: no refund</li>
                  </ul>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    3. Client Responsibilities
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide access to all areas of the property</li>
                    <li>Ensure utilities (water, electricity) are operational</li>
                    <li>Disclose known issues or previous repairs</li>
                    <li>Be present or arrange for property access</li>
                  </ul>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    4. Report Delivery
                  </h3>
                  <p>
                    Reports are typically delivered within 24-48 hours after inspection. Reports are for the client's personal use and may not be distributed without our written consent.
                  </p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    5. Limitation of Liability
                  </h3>
                  <p>
                    Our liability is limited to the amount paid for the inspection service. We are not liable for consequential damages, property repairs, or transaction losses.
                  </p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    6. Governing Law
                  </h3>
                  <p>
                    These terms are governed by the laws of the United Arab Emirates. Any disputes shall be resolved in the courts of Dubai.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cookies">
              <div 
                className="p-8 rounded-lg"
                style={{ backgroundColor: 'white' }}
              >
                <h2 
                  className="font-inter text-2xl font-bold mb-6 uppercase"
                  style={{ color: 'hsl(var(--authority-blue))' }}
                >
                  Cookie Policy
                </h2>
                
                <div className="space-y-4 font-lora text-base" style={{ color: 'hsl(var(--text-gray))' }}>
                  <p><strong>Last Updated:</strong> January 1, 2025</p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    What Are Cookies?
                  </h3>
                  <p>
                    Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience and analyze how our site is used.
                  </p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    Types of Cookies We Use
                  </h3>
                  
                  <h4 className="font-inter text-lg font-semibold mt-4" style={{ color: 'hsl(var(--authority-blue))' }}>
                    1. Essential Cookies
                  </h4>
                  <p>Required for the website to function properly. These cannot be disabled.</p>

                  <h4 className="font-inter text-lg font-semibold mt-4" style={{ color: 'hsl(var(--authority-blue))' }}>
                    2. Analytics Cookies
                  </h4>
                  <p>Help us understand how visitors interact with our website (e.g., Google Analytics).</p>

                  <h4 className="font-inter text-lg font-semibold mt-4" style={{ color: 'hsl(var(--authority-blue))' }}>
                    3. Marketing Cookies
                  </h4>
                  <p>Used to show you relevant advertisements and track campaign effectiveness.</p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    Managing Cookies
                  </h3>
                  <p>
                    You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
                  </p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    Third-Party Cookies
                  </h3>
                  <p>
                    We use services like Google Analytics and Facebook Pixel. These services may set their own cookies. Please review their privacy policies for more information.
                  </p>

                  <h3 className="font-inter text-xl font-semibold mt-6" style={{ color: 'hsl(var(--authority-blue))' }}>
                    Contact Us
                  </h3>
                  <p>
                    For questions about our cookie policy, contact us at info@dubaipropertyinspection.ae
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
