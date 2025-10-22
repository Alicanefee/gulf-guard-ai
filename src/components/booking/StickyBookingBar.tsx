import React, { useEffect, useState } from 'react';
import { useBooking } from './BookingProvider';
import { Button } from '@/components/ui/button';

/**
 * StickyBookingBar shows package info and a Book Now CTA with slide animation.
 */
export const StickyBookingBar: React.FC<{ selectedPackage?: string }> = ({ selectedPackage = 'essential' }) => {
  const { openBookingCard } = useBooking();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-xl border bg-background/95 backdrop-blur-sm p-4 shadow-lg flex items-center justify-between gap-3 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
      role="region"
      aria-label="Booking bar"
    >
      <div className="flex items-center gap-3">
        <div className="text-sm font-semibold capitalize">{selectedPackage} Package</div>
      </div>
      <div className="flex-shrink-0">
        <Button
          variant="premium"
          onClick={() => openBookingCard(selectedPackage)}
          aria-label={`Book now for ${selectedPackage}`}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default StickyBookingBar;
