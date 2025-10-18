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
@@ -131,7 +140,7 @@
{benefitActive && (
<div>
<div className="booking-banner">Offer activated – expires in {Math.floor(secondsLeft/60)}m {secondsLeft%60}s</div>
              <div className="mb-2 text-sm font-semibold text-accent">{selectedPackage === 'Essential' ? 'Mold Test included as part of your exclusive booking.' : selectedPackage === 'Investor Pack' ? 'Your unique Investor code will be reserved for you upon confirmation.' : 'Private benefit activated for you.'}</div>
              <div className="mb-2 text-sm font-semibold text-accent">{benefitMap[selectedPackage ?? ''] || 'Private benefit activated for you.'}</div>
</div>
)}
