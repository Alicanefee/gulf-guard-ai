import React, { useState } from "react";
import CountdownScarcity from "./CountdownScarcity";
import { getSlots } from "./slotUtils";

type Props = {
  pkgId: string;
  onClose?: () => void;
};

export const InlineBookingCard: React.FC<Props> = ({ pkgId, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmedSlot, setConfirmedSlot] = useState<string | null>(null);
  const [propertySize, setPropertySize] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(3600);
  const [benefitActive, setBenefitActive] = useState(true);

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
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setConfirmed(true);
    setConfirmedSlot(selectedSlot);
    if (onClose) setTimeout(onClose, 1200);
  };

  if (confirmed) return <div className="booking-toast">Appointment Confirmed — your private booking is reserved{confirmedSlot?` for ${confirmedSlot}`:''}</div>;

  return (
    <div className="booking-modal p-4 my-4">
      <div className="mb-2 font-semibold">Booking — {pkgId}</div>
      <form onSubmit={submit} className="space-y-3">
        <input className="booking-input" placeholder="Full name" autoComplete="name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input className="booking-input" placeholder="Email" autoComplete="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <div>
          <label className="text-sm font-medium text-foreground">Select Appointment Slot *</label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {getSlots().map((s) => (
              <button
                type="button"
                key={s.value}
                className={`booking-slot-chip ${selectedSlot===s.value? 'booking-slot-chip--selected':''}`}
                onClick={() => setSelectedSlot(s.value)}
                aria-pressed={selectedSlot===s.value}
                disabled={s.disabled}
              >
                {s.label}
              </button>
            ))}
          </div>
          {/* Hidden select for accessibility */}
          <select className="hidden" value={selectedSlot ?? ''} onChange={(e)=>setSelectedSlot(e.target.value)} required>
            <option value="">Select slot</option>
            {getSlots().map(s=> <option key={s.value} value={s.value} disabled={s.disabled}>{s.label}</option>)}
          </select>
        </div>
        <input className="booking-input" placeholder="Property Size (sqft)" value={propertySize} onChange={(e)=>setPropertySize(e.target.value)} required />
        {benefitActive && (
          <div>
            <div className="booking-banner">Offer activated – expires in {Math.floor(secondsLeft/60)}m {secondsLeft%60}s</div>
            <div className="mb-2 text-sm font-semibold text-accent">{benefitMap[pkgId] || 'Private benefit activated for you.'}</div>
          </div>
        )}
        <CountdownScarcity timeLeftOverride={secondsLeft} />
        <div className="booking-trustbar">InterNACHI® certified – 10+ years experience</div>
        <button className="booking-btn mt-2" type="submit">{loading ? 'Processing...' : 'Confirm & Redeem'}</button>
      </form>
    </div>
  );
};

export default InlineBookingCard;
