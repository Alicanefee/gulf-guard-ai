import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useBooking } from './booking/BookingProvider';

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openBookingCard } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <Button
        variant="premium"
        size="lg"
        onClick={() => openBookingCard('Professional')}
        className="shadow-2xl animate-pulse font-inter"
        style={{
          animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      >
        BOOK NOW
      </Button>
    </div>
  );
};
