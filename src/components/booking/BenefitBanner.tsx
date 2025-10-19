
import React, { useEffect, useState } from 'react';
import { ensureBenefitTimer, clearBenefitTimer, formatSecondsMMSS } from '@/lib/timers';
import type { PackageType } from '@/types/booking';

/**
 * BenefitBanner
 * Props:
 * - packageType: name of the package
 * - onExpiry: optional callback when timer ends
 */
type Props = {
  packageType: PackageType;
  onExpiry?: () => void;
};

const MAPPING: Record<string, { title: string; description: string }> = {
  essential: {
    title: "Exclusive Campaign: Complimentary Mold Test",
    description:
      "Dubai'de en sık karşılaşılan nem & mantar sorununa karşı, sadece bu paketi rezerve eden misafirlerimize sunulan ayrıcalıklı mold testi.",
  },
  comprehensive: {
    title: "Exclusive Campaign: Complimentary Negative Pressure Test",
    description:
      "Kapalı ortamda hava sızıntısı riskini ölçen negatif basınç testi, kapsamlı inspection’a eklenen seçkin hizmet.",
  },
  vip: {
    title: "Exclusive Campaign: Complimentary Negative Pressure Test & Second Follow-Up",
    description:
      "İlk inspection sonrası, 3 ay içinde sağlanan ikinci kontrol desteği ve premium negatif basınç testi.",
  },
  estate: {
    title: "Exclusive Campaign: Complimentary Premium Air Quality Test",
    description:
      "Lüks konutlarda, tam kapsamlı hava kalitesi ölçümü (VOC, PM2.5, CO2 vs.) ayrıcalıklı olarak sunulur.",
  },
  airquality: {
    title: "Exclusive Campaign: Complimentary Post-Improvement Verification",
    description:
      "Yapılan iyileştirmelerin 3 ay içindeki doğrulaması, misafirlerimize özel sunulan ayrıcalık.",
  },
  investor: {
    title: "Exclusive Campaign: 20% Discount Code 'NEW20'",
    description: "Yatırımcılar için sunulan benzersiz %20 indirim kodu, portföyünüze değer katar.",
  },
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
    tick();
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [key, onExpiry]);

  if (seconds <= 0) return null;

  const info = MAPPING[key] ?? MAPPING['essential'];

  return (
    <div className="w-full mb-4 rounded-md bg-gradient-to-r from-accent/10 to-transparent p-[1px]">
      <div className="rounded-md bg-background px-4 py-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-foreground">{info.title}</div>
          <div className="text-xs text-muted-foreground mt-1">{info.description}</div>
        </div>
        <div aria-live="polite" className={`ml-4 text-accent font-semibold ${seconds < 600 ? 'animate-pulse' : ''}`}>
          Expires in {formatSecondsMMSS(seconds)}
        </div>
      </div>
    </div>
  );
}
