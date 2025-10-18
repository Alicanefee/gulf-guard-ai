export type Slot = { value: string; label: string; disabled?: boolean };

export function getSlots(): Slot[] {
  // Slots from 08:00 to next day 02:00 every 2 hours
  const slots: Slot[] = [];
  const startHour = 8; // 08:00
  // 08..24 then 0..2
  const hours: number[] = [];
  for (let h = startHour; h < 24; h += 2) hours.push(h);
  for (let h = 0; h <= 2; h += 2) hours.push(h);

  for (let i = 0; i < hours.length; i++) {
    const h1 = hours[i];
    const h2 = (h1 + 2) % 24;
    const pad = (n: number) => String(n).padStart(2, '0');
    const label = `${pad(h1)}:00–${pad(h2)}:00`;
    const value = `${pad(h1)}-${pad(h2)}`;
    slots.push({ value, label, disabled: false });
  }

  return slots;
}
