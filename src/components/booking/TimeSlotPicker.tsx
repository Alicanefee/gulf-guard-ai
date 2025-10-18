import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TimeSlotPickerProps } from '@/types/booking';

/**
 * TimeSlotPicker
 * Props:
 * - selectedDate: selected date to render for context (not required for slots)
 * - onSelect: callback when a slot is selected
 * - disabledSlots: optional list of slot strings that should be disabled
 */
const ALL_SLOTS = [
  '08:00-10:00',
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00',
  '16:00-18:00',
  '18:00-20:00',
  '20:00-22:00',
  '22:00-00:00',
  '00:00-02:00',
];

export default function TimeSlotPicker({ selectedDate, onSelect, disabledSlots = [] }: TimeSlotPickerProps) {
  const [soldOut, setSoldOut] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    // simulate 2-3 random sold out slots on mount
    const picks = new Set<string>();
    const count = Math.floor(Math.random() * 2) + 2; // 2-3
    while (picks.size < count) {
      const idx = Math.floor(Math.random() * ALL_SLOTS.length);
      picks.add(ALL_SLOTS[idx]);
    }
    // merge with provided disabledSlots
    setSoldOut(Array.from(new Set([...Array.from(picks), ...disabledSlots])));
  }, []);

  const isDisabled = (slot: string) => soldOut.includes(slot) || disabledSlots.includes(slot);

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
      {ALL_SLOTS.map((slot) => {
        const disabled = isDisabled(slot);
        const isActive = active === slot;
        return (
          <button
            key={slot}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`Time slot ${slot} ${disabled ? 'sold out' : ''}`}
            onClick={() => {
              if (disabled) return;
              setActive(slot);
              onSelect(slot);
            }}
            disabled={disabled}
            className={cn(
              'min-h-[44px] w-full rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
              isActive ? 'bg-accent text-accent-foreground ring-2 ring-accent/60' : 'bg-background',
              disabled ? 'opacity-50 cursor-not-allowed line-through' : 'hover:opacity-90',
            )}
          >
            <span className="block truncate">{slot}</span>
            {disabled && <span className="sr-only">Sold out</span>}
          </button>
        );
      })}
    </div>
  );
}
