import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = '971501234567'; // Replace with actual business WhatsApp number
  const defaultMessage = 'Hello! I would like to book a home inspection service.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isExpanded && (
          <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-xs animate-in slide-in-from-bottom-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Gulf Guard AI</div>
                  <div className="text-xs text-muted-foreground">Typically replies instantly</div>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Hi there! 👋 How can we help you with your home inspection needs?
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
              size="sm"
            >
              Start Chat on WhatsApp
            </Button>
          </div>
        )}
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          aria-label="Open WhatsApp chat"
        >
          {isExpanded ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </>
  );
};

export default WhatsAppButton;
