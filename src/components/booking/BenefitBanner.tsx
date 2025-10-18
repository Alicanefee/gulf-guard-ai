import React, { useEffect, useState } from 'react';
import { ensureBenefitTimer, clearBenefitTimer, formatSecondsMMSS } from '@/lib/timers';
import type { PackageType } from '@/types/booking';
import { format } from 'date-fns';

/**
 * BenefitBanner props
 * - packageType: package key
 * - onExpiry: callback when timer reaches zero
 */
const MAPPING: Record<string, string> = {
  essential: 'Mold Test',
  comprehensive: 'Negative Pressure Test',
  vip: 'Negative Pressure Test & Second Follow-Up',
  estate: 'Air Quality Test',
  airquality: 'Post-Improvement Verification',
  investor: "Unique Investor Code 'NEW20'",
};

type Props = {
  packageType: PackageType;
  onExpiry?: () => void;
};

export default function BenefitBanner({ packageType, onExpiry }: Props) {
  const key = String(packageType || 'essential');
  const [seconds, setSeconds] = useState<number>(() => {
    try {
      return ensureBenefitTimer(key);
    } catch (e) {
      return 3600;
    }
  });

  useEffect(() => {
    let mounted = true;
    const tick = () => {
      const now = new Date();
      const rem = ensureBenefitTimer(key, now);
      if (!mounted) return;
      setSeconds(rem);
      if (rem <= 0) {
        clearBenefitTimer(key);
        onExpiry?.();
      }
    };

    const id = setInterval(tick, 1000);
    // initial tick
    tick();
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [key, onExpiry]);

  if (seconds <= 0) return null;

  const benefitText = MAPPING[key] ?? MAPPING['essential'];

  return (
    <div className="w-full rounded-md border p-3 mb-3 bg-background/50 flex items-center justify-between">
      <div className="text-sm">
        <span className="font-medium">Exclusive offer activated:</span>{' '}
        <span className="">{benefitText} included for your booking.</span>
      </div>
      <div
        aria-live="polite"
        className={`ml-3 font-semibold text-accent ${seconds < 600 ? 'animate-pulse' : ''}`}
      >
        Expires in {formatSecondsMMSS(seconds)}
      </div>
    </div>
  );
}
