import React, { useEffect, useState } from "react";
import CountdownScarcity from "./CountdownScarcity";
import { useBooking } from "./BookingProvider";

type Props = {
  selectedPackage?: string | null;
  slotsRemaining?: number;
  offerExpiry?: string;
};

export const BookingCard: React.FC<Props> = ({ selectedPackage, slotsRemaining = 5, offerExpiry }) => {
  const { closeBookingCard } = useBooking();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [datetime, setDatetime] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [visitedBanner, setVisitedBanner] = useState<string | null>(null);

  useEffect(() => {
    const v = localStorage.getItem("visited");
    if (v === null) {
      setVisitedBanner("Welcome! Unlock your complimentary Mold Test");
      // persist visited only when banner shown
      localStorage.setItem("visited", "1");
    } else setVisitedBanner("Welcome back! Continue booking your VIP inspection");
  }, []);

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    // simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    localStorage.setItem("visited", "1");
    setLoading(false);
    setConfirmed(true);
    // close modal after a short delay
    setTimeout(() => {
      closeBookingCard();
    }, 2000);
  };

  if (confirmed) {
    return <div className="booking-toast">Appointment Confirmed</div>;
  }

  return (
    <div className="booking-modal-backdrop" role="dialog" aria-modal="true">
      <div className="booking-modal">
        {visitedBanner && <div className="booking-banner">{visitedBanner}</div>}

        <div className="booking-modal__header">
          <div>
            <div className="text-sm text-muted-foreground">Booking</div>
            <div className="text-lg font-bold">{selectedPackage || "Service"}</div>
          </div>
          <div>
            <button onClick={closeBookingCard} aria-label="Close">✕</button>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <input
            className="booking-input"
            placeholder="Full name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="booking-input"
            placeholder="Email"
            autoComplete="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="booking-input"
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />

          <CountdownScarcity slotsInitial={slotsRemaining} offerExpiry={offerExpiry} packageId={selectedPackage ?? undefined} />

          <div className="booking-trustbar">InterNACHI® certified – 10+ years experience</div>

          <div>
            <button type="submit" className="booking-btn">
              {loading ? "Processing..." : "Confirm & Redeem"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingCard;
