import React, { useEffect, useState } from 'react';
import { useBooking } from './BookingProvider';
import { Button } from '@/components/ui/button';

/**
 * StickyBookingBar shows package info and a Book Now CTA.
 */
export const StickyBookingBar: React.FC<{ selectedPackage?: string }> = ({ selectedPackage = 'essential' }) => {
  const { openBookingCard } = useBooking();
  const [slotsLeft, setSlotsLeft] = useState<number>(() => Math.floor(Math.random() * 6) + 3); // 3-8

  useEffect(() => {
    const id = setInterval(() => {
      setSlotsLeft((s) => Math.max(1, s - (Math.random() > 0.85 ? 1 : 0)));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-xl border bg-background/80 backdrop-blur-sm p-3 shadow-lg flex items-center justify-between gap-3"
      role="region"
      aria-label="Booking bar"
    >
      <div className="flex items-center gap-3">
        <div className="text-sm font-semibold capitalize">{selectedPackage}</div>
        <div className="text-sm text-muted-foreground">• {slotsLeft} slots left</div>
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
