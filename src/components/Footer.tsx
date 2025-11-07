import { Building2, Mail, Phone, MapPin, Shield, Award, FileText, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'hsl(var(--authority-blue))', color: 'hsl(var(--clinical-white))' }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8" style={{ color: 'hsl(var(--precision-blue))' }} />
              <span className="text-xl font-bold font-inter uppercase tracking-wide">
                Dubai Property Inspection
              </span>
            </div>
            <p className="text-sm font-lora leading-relaxed" style={{ color: 'rgba(248, 249, 250, 0.8)' }}>
              International standards, Dubai expertise. Protecting your property investment with advanced diagnostics and engineering precision since 2015.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded border" style={{ borderColor: 'rgba(248, 249, 250, 0.2)' }}>
                <Shield className="w-4 h-4" style={{ color: 'hsl(var(--precision-blue))' }} />
                <span className="text-xs font-inter">InterNACHI Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded border" style={{ borderColor: 'rgba(248, 249, 250, 0.2)' }}>
                <Award className="w-4 h-4" style={{ color: 'hsl(var(--precision-blue))' }} />
                <span className="text-xs font-inter">RERA Registered</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded border" style={{ borderColor: 'rgba(248, 249, 250, 0.2)' }}>
                <FileText className="w-4 h-4" style={{ color: 'hsl(var(--precision-blue))' }} />
                <span className="text-xs font-inter">Insured & Bonded</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="font-inter font-semibold mb-3 text-sm">Get Property Tips Monthly</h4>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="premium" size="default">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-inter font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm font-lora">
              <li>
                <a href="/#services" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Property Inspection
                </a>
              </li>
              <li>
                <a href="/#services" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  3D Laser Scanning
                </a>
              </li>
              <li>
                <a href="/#services" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Thermal Imaging
                </a>
              </li>
              <li>
                <a href="/#services" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Mold Testing
                </a>
              </li>
              <li>
                <a href="/#services" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Air Quality Analysis
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-inter font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm font-lora">
              <li>
                <a href="/about-us" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/#why" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="/#faq" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-inter font-semibold mb-4 text-sm uppercase tracking-wider">Legal & Contact</h3>
            <ul className="space-y-2 text-sm font-lora mb-6">
              <li>
                <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Inspection Agreement
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--clinical-white))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
                  Cookie Policy
                </a>
              </li>
            </ul>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--precision-blue))' }} />
                <a href="tel:+97150123456" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.8)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--precision-blue))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.8)'}>
                  +971 50 123 4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--precision-blue))' }} />
                <a href="mailto:info@dubaihomeinspection.ae" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.8)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--precision-blue))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.8)'}>
                  info@dubaihomeinspection.ae
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--precision-blue))' }} />
                <span style={{ color: 'rgba(248, 249, 250, 0.8)' }}>
                  Dubai Marina, UAE
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ borderColor: 'rgba(248, 249, 250, 0.2)' }}>
          <p style={{ color: 'rgba(248, 249, 250, 0.5)' }}>
            © {currentYear} Dubai Property Inspection L.L.C. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--precision-blue))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--precision-blue))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--precision-blue))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="transition-colors" style={{ color: 'rgba(248, 249, 250, 0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(var(--precision-blue))'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248, 249, 250, 0.7)'}>
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
