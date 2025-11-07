import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Services', path: '/#services', onClick: () => scrollToSection('services') },
    { label: 'Why Us', path: '/#why', onClick: () => scrollToSection('why') },
    { label: 'About', path: '/about-us' },
    { label: 'FAQ', path: '/#faq', onClick: () => scrollToSection('faq') }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`} style={{ backgroundColor: 'hsl(var(--clinical-white))' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <div className="text-accent font-bold text-xl">D</div>
            </div>
            <span className="font-inter font-semibold uppercase tracking-wide text-sm md:text-base" style={{ color: 'hsl(var(--authority-blue))', letterSpacing: '1px' }}>
              Dubai Property Inspection
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.onClick ? (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className="font-inter font-medium text-base transition-colors hover:text-accent"
                  style={{ color: 'hsl(var(--text-gray))' }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`font-inter font-medium text-base transition-colors hover:text-accent ${isActive(link.path) ? 'font-bold' : ''}`}
                  style={{ color: isActive(link.path) ? 'hsl(var(--authority-blue))' : 'hsl(var(--text-gray))' }}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Button 
              variant="premium" 
              size="default"
              onClick={() => scrollToSection('booking')}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" style={{ color: 'hsl(var(--authority-blue))' }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: 'hsl(var(--authority-blue))' }} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t" style={{ borderColor: '#E0E0E0' }}>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.onClick ? (
                  <button
                    key={link.label}
                    onClick={link.onClick}
                    className="font-inter font-medium text-base text-left py-2 transition-colors hover:text-accent"
                    style={{ color: 'hsl(var(--text-gray))' }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="font-inter font-medium text-base py-2 transition-colors hover:text-accent"
                    style={{ color: 'hsl(var(--text-gray))' }}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <Button 
                variant="premium" 
                size="default"
                className="w-full"
                onClick={() => {
                  scrollToSection('booking');
                  setIsOpen(false);
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: '#E0E0E0' }} />
    </nav>
  );
};
