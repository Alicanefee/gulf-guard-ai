import React, { useEffect, useState } from "react";

type Props = {
  slotsInitial?: number;
  offerExpiry?: string; // ISO timestamp
  packageId?: string;
};

export const CountdownScarcity: React.FC<Props> = ({ slotsInitial = 5, offerExpiry, packageId }) => {
  const [slots, setSlots] = useState<number>(slotsInitial);
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (!offerExpiry) return 3600;
    const diff = Math.max(0, Math.floor((new Date(offerExpiry).getTime() - Date.now()) / 1000));
    return diff || 3600;
  });

  useEffect(() => {
    const s = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(s);
  }, []);

  useEffect(() => {
    let aborted = false;
    if (packageId && (window as any).fetch) {
      fetch(`/api/slots?packageId=${encodeURIComponent(String(packageId))}`)
        .then((res) => res.json())
        .then((data) => {
          if (!aborted && data?.slots) setSlots(Number(data.slots));
        })
        .catch(() => {});
    }

    return () => {
      aborted = true;
    };
  }, [packageId]);

  useEffect(() => {
    // simple simulated slots decrement over time for demo (only if >1)
    if (slots > 1) {
      const id = setInterval(() => setSlots((v) => Math.max(1, v - (Math.random() > 0.98 ? 1 : 0))), 5000);
      return () => clearInterval(id);
    }
  }, [slots]);

  const format = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}h ${m}m ${sec}s`;
    if (m > 0) return `${m}m ${sec}s`;
    return `${sec}s`;
  };

  return (
    <div className="booking-countdown flex items-center gap-4 text-sm" style={{ color: "var(--color-accent)" }}>
      <div className="font-semibold">Only {slots} slots left</div>
      <div>•</div>
      <div>Offer expires in {format(timeLeft)}</div>
    </div>
  );
};

export default CountdownScarcity;
