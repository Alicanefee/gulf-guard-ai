import React, { useEffect, useState } from "react";
import CountdownScarcity from "./CountdownScarcity";
import { useBooking } from "./BookingProvider";

type Props = {
  selectedPackage?: string | null;
  slotsRemaining?: number;
  offerExpiry?: string;
};

export const BookingCard: React.FC<Props> = ({ selectedPackage, slotsRemaining = 5, offerExpiry }) => {
  const { closeBookingCard, abVariant } = useBooking();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [datetime, setDatetime] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmedSlot, setConfirmedSlot] = useState<string | null>(null);
  const [visitedBanner, setVisitedBanner] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(3600); // 1 hour by default
  const [benefitActive, setBenefitActive] = useState<boolean>(false);
  const [investorCode, setInvestorCode] = useState<string | null>(null);

  useEffect(() => {
    const v = localStorage.getItem("visited");
    if (v === null) {
      setVisitedBanner(abVariant === 'B' ? "Welcome! Your private benefits await — reserved when you book" : "Welcome! Unlock exclusive benefits when you book");
      // persist visited only when banner shown
      localStorage.setItem("visited", "1");
    } else setVisitedBanner("Welcome back! Continue booking your VIP inspection");
  }, []);

  // Start 1-hour private benefit timer when modal opens
  useEffect(() => {
    setSecondsLeft(3600);
    setBenefitActive(true);
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        const next = Math.max(0, s - 1);
        if (next === 0) setBenefitActive(false);
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [selectedPackage]);

  const benefitMap: Record<string, string> = {
    'Essential': "Exclusive offer activated: Mold Test included for your booking.",
    'Comprehensive': "Exclusive offer activated: Negative Pressure Test included for your booking.",
    'VIP': "Exclusive offer activated: Negative Pressure Test & Second Follow-Up included for your booking.",
    'Estate': "Exclusive offer activated: Air Quality Test included for your booking.",
    'Air Quality Pack': "Exclusive offer activated: Post-Improvement Verification included for your booking.",
    'Investor Pack': "Exclusive offer activated: Unique Investor Code 'NEW20' reserved for your booking.",
  };

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!propertySize) return alert('Please enter property size (sqft) to personalize your booking.');
    if (!selectedSlot) return alert('Please select an appointment time slot.');
    setLoading(true);
    // simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    localStorage.setItem("visited", "1");
    setLoading(false);
    setConfirmed(true);
    setConfirmedSlot(selectedSlot);
    // investor package: set code
    if (selectedPackage === 'Investor Pack') {
      setInvestorCode('NEW20');
    }
    // close modal after a short delay
    setTimeout(() => {
      closeBookingCard();
    }, 2000);
  };

  if (confirmed) {
    return (
      <div>
        <div className="booking-toast">Appointment Confirmed — your private booking is reserved{confirmedSlot?` for ${confirmedSlot}`:''}</div>
        {investorCode && (
          <div className="booking-toast" style={{ top: '4rem' }}>
            Your unique Investor code: {investorCode} is activated and reserved for you. Use it during payment.
          </div>
        )}
      </div>
    );
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

          <div>
            
            </div>
          </div>

          <input
            className="booking-input"
            placeholder="Property Size (sqft)"
            value={propertySize}
            onChange={(e) => setPropertySize(e.target.value)}
            required
          />

          {/* Private benefits and expiry visible only inside booking flow */}
          {benefitActive && (
            <div>
              <div className="booking-banner">Offer activated – expires in {Math.floor(secondsLeft/60)}m {secondsLeft%60}s</div>
              <div className="mb-2 text-sm font-semibold text-accent">{benefitMap[selectedPackage ?? ''] || 'Private benefit activated for you.'}</div>
            </div>
          )}

          <CountdownScarcity slotsInitial={slotsRemaining} offerExpiry={offerExpiry} packageId={selectedPackage ?? undefined} timeLeftOverride={secondsLeft} onExpire={() => setBenefitActive(false)} />

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
