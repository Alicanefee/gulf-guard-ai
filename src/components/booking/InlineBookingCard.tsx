import React, { useState } from "react";
import CountdownScarcity from "./CountdownScarcity";

type Props = {
  pkgId: string;
  onClose?: () => void;
};

export const InlineBookingCard: React.FC<Props> = ({ pkgId, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [datetime, setDatetime] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setConfirmed(true);
    if (onClose) setTimeout(onClose, 1200);
  };

  if (confirmed) return <div className="booking-toast">Appointment Confirmed</div>;

  return (
    <div className="booking-modal p-4 my-4">
      <div className="mb-2 font-semibold">Booking — {pkgId}</div>
      <form onSubmit={submit} className="space-y-3">
        <input className="booking-input" placeholder="Full name" autoComplete="name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input className="booking-input" placeholder="Email" autoComplete="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input className="booking-input" placeholder="Phone" autoComplete="tel" type="tel" />
        <input className="booking-input" type="datetime-local" value={datetime} onChange={(e)=>setDatetime(e.target.value)} required />
        <CountdownScarcity />
        <div className="booking-trustbar">InterNACHI® certified – 10+ years experience</div>
        <button className="booking-btn mt-2" type="submit">{loading ? 'Processing...' : 'Confirm & Redeem'}</button>
      </form>
    </div>
  );
};

export default InlineBookingCard;
