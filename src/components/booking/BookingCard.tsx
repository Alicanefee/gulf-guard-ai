import React, { useEffect, useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar as DayPickerCalendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Form, FormItem, FormLabel, FormControl, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
// TimeSlotPicker removed in favor of compact dropdown select
import BenefitBanner from './BenefitBanner';
import { toast } from '@/components/ui/sonner';
import { useBooking } from './BookingProvider';
import type { BookingFormData } from '@/types/booking';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

/**
 * Booking form Zod schema
 */
const bookingSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  date: z.date({ required_error: 'Select a date' }).nullable(),
  timeSlot: z.string().min(1, 'Select a time slot'),
  sqft: z
    .number({ invalid_type_error: 'Enter property area in sq ft' })
    .min(500, 'Minimum area is 500 sq ft')
    .max(50000, 'Maximum area is 50000 sq ft'),
});

type Props = {
  selectedPackage?: string | null;
};

const defaultValues: Partial<BookingFormData> = {
  name: '',
  email: '',
  date: null,
  timeSlot: '',
  sqft: null,
};

export const BookingCard: React.FC<Props> = ({ selectedPackage }) => {
  const { closeBookingCard, bookingPackage, setBenefitActive } = useBooking();
  const [open, setOpen] = useState<boolean>(!!bookingPackage);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setOpen(!!bookingPackage), [bookingPackage]);

  // When dialog opens on small screens, ensure it scrolls into view and focus the first input
  useEffect(() => {
    if (open && dialogRef.current) {
      // small delay to wait for dialog animation
      setTimeout(() => {
        dialogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const firstInput = dialogRef.current?.querySelector<HTMLInputElement>('input, button, [tabindex]');
        firstInput?.focus();
      }, 120);
    }
  }, [open]);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: defaultValues as any,
    mode: 'onBlur',
  });

  const [submitting, setSubmitting] = useState(false);
  const [soldOutSlots, setSoldOutSlots] = useState<string[]>([]);

  const benefitTextMap: Record<string, string> = {
    essential: "Mold Test included as part of your exclusive booking.",
    comprehensive: "Negative Pressure Test included as part of your exclusive booking.",
    vip: "Negative Pressure Test & Second Follow-Up included as part of your exclusive booking.",
    estate: "Air Quality Test included as part of your exclusive booking.",
    airquality: "Post-Improvement Verification included as part of your exclusive booking.",
    investor: "Unique Investor Code 'NEW20' activated exclusively for your booking.",
  };

  useEffect(() => {
    // if a package has benefit, mark active
    if (bookingPackage) setBenefitActive(true);
  }, [bookingPackage, setBenefitActive]);

  useEffect(() => {
    // simulate 2-3 sold out slots
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
    const picks = new Set<string>();
    const count = Math.floor(Math.random() * 2) + 2;
    while (picks.size < count) {
      const idx = Math.floor(Math.random() * ALL_SLOTS.length);
      picks.add(ALL_SLOTS[idx]);
    }
    setSoldOutSlots(Array.from(picks));
  }, []);

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    setSubmitting(true);
    try {
      // simulated network delay
      await new Promise((r) => setTimeout(r, 2000));

      // Toast message
      const benefitLabel = selectedPackage ?? bookingPackage ?? 'premium benefit';
      const benefitText = `${benefitLabel}`;
      const slot = values.timeSlot;
      const sqft = values.sqft;

      let message = `Your booking is confirmed. ${benefitText} included as part of your premium inspection.`;
      if (benefitLabel === 'investor') {
        message += ` Unique Investor Code 'NEW20' activated. Use at payment.`;
      }

      toast.success(message + ` Slot: ${slot}. Area: ${sqft} sq ft.`);

      // close modal after short delay
      setTimeout(() => {
        form.reset();
        setSubmitting(false);
        setBenefitActive(false);
        closeBookingCard();
      }, 1500);
    } catch (e) {
      toast.error('There was an error confirming your booking. Please try again.');
      setSubmitting(false);
    }
  };

  return (
  <Dialog open={open} onOpenChange={(val) => { if (!val) closeBookingCard(); }}>
    <DialogContent ref={(el:any)=>dialogRef.current = el} className="w-[90%] max-w-2xl sm:w-[600px] max-h-[90vh] p-0">
      <Card>
        <CardHeader>
          <CardTitle>Book an Inspection</CardTitle>
          <CardDescription>Secure your preferred time — limited slots available.</CardDescription>
        </CardHeader>

        <CardContent>
          {bookingPackage && (
            <BenefitBanner packageType={bookingPackage} onExpiry={() => setBenefitActive(false)} />
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} aria-label="Full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="email" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@domain.com" type="email" {...field} aria-label="Email address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Date & Time side-by-side on md, stacked on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormField name="date" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Date *</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="w-full flex items-center justify-between gap-2 rounded-md border border-input px-3 py-2 text-sm hover:bg-accent"
                              aria-label="Select date"
                            >
                              <span>{field.value ? format(field.value as Date, 'MMM d, yyyy') : 'Select date'}</span>
                              <CalendarIcon className="h-4 w-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <div className="p-2">
                              <DayPickerCalendar
                                mode="single"
                                selected={field.value ?? undefined}
                                onSelect={(d: Date | undefined) => field.onChange(d ?? null)}
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div>
                  <FormField name="timeSlot" control={form.control} render={({ field }) => {
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
                    const dateSelected = !!form.getValues('date');

                    return (
                      <FormItem>
                        <FormLabel>Select Time Slot *</FormLabel>
                        <FormControl>
                          <Select value={field.value ?? ''} onValueChange={(v) => field.onChange(v)}>
                            <SelectTrigger className="w-full" aria-label="Select time slot" disabled={!dateSelected}>
                              <SelectValue>{field.value ? field.value : (dateSelected ? 'Select time slot' : 'Select a date first')}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {ALL_SLOTS.map((slot) => (
                                <SelectItem key={slot} value={slot} disabled={soldOutSlots.includes(slot)}>
                                  {slot}{soldOutSlots.includes(slot) ? ' — Sold Out' : ''}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }} />
                </div>
              </div>

              <FormField name="sqft" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Property area (sq ft)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 2500"
                      type="number"
                      value={field.value as any ?? ''}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      aria-label="Property area in square feet"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {/* Social proof bar */}
              <div className="rounded-md border bg-background/50 p-3 flex items-center justify-between text-sm">
                <div className="font-medium">Trusted by 2,400+ clients across Dubai</div>
                <div className="text-muted-foreground">InterNACHI® certified · 10+ years experience</div>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <Button variant="outline" onClick={() => closeBookingCard()} aria-label="Cancel booking">Cancel</Button>
          <Button type="submit" variant="premium" disabled={submitting} onClick={form.handleSubmit(onSubmit)} aria-label="Confirm and redeem">
            {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Confirm & Redeem
          </Button>
        </CardFooter>
      </Card>
    </DialogContent>
  </Dialog>
  );
};

export default BookingCard;
