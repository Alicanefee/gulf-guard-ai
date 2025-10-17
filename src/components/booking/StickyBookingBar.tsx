import React, { useEffect, useState } from "react";
import { useBooking } from "./BookingProvider";

export const StickyBookingBar: React.FC<{ selectedPackage?: string }> = ({ selectedPackage }) => {
  const { openBookingCard } = useBooking();
  const [slots, setSlots] = useState(5);

  useEffect(() => {
    // in real app fetch slots from API; here simulate
    const id = setInterval(() => setSlots((s) => Math.max(1, s - (Math.random() > 0.995 ? 1 : 0))), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="booking-stickybar">
      <div className="flex items-center gap-3">
        <div className="font-semibold">{selectedPackage || 'Selected Package'}</div>
        <div className="text-sm text-muted-foreground">• {slots} slots</div>
      </div>
      <div>
        <button className="booking-stickybar__btn" onClick={() => openBookingCard(selectedPackage || 'Essential')}>Book Now</button>
      </div>
    </div>
  );
};

export default StickyBookingBar;
