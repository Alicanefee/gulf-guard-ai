/**
 * Type definitions for booking components
 */
export type PackageType = 'essential' | 'comprehensive' | 'vip' | 'estate' | 'airquality' | 'investor' | string;

export interface BookingFormData {
  name: string;
  email: string;
  date: Date | null;
  timeSlot: string;
  sqft: number | null;
}

export interface TimeSlotPickerProps {
  selectedDate: Date | null;
  onSelect: (slot: string) => void;
  disabledSlots?: string[];
}
