import { Building2, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-accent" />
              <span className="text-xl font-bold">Dubai Home Inspection</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              International standards, Dubai expertise. Protecting your property investment since 2015.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#why" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Why Inspect?
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#booking" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Book Inspection
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Sample Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-semibold mb-4">Certifications</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>InterNACHI Certified</li>
              <li>Dubai Municipality Approved</li>
              <li>RERA Registered</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <a href="tel:+97150123456" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  +971 50 123 4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <a href="mailto:info@dubaihomeinspection.ae" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  info@dubaihomeinspection.ae
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  Dubai Marina, UAE
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {currentYear} Dubai Home Inspection. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">GDPR Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
