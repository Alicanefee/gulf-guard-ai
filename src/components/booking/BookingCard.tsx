import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormItem, FormLabel, FormControl, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import TimeSlotPicker from './TimeSlotPicker';
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

  useEffect(() => setOpen(!!bookingPackage), [bookingPackage]);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: defaultValues as any,
    mode: 'onBlur',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // if a package has benefit, mark active
    if (bookingPackage) setBenefitActive(true);
  }, [bookingPackage, setBenefitActive]);

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
      <DialogContent className="w-[90%] max-w-2xl sm:w-[600px]">
        <DialogHeader>
          <DialogTitle>Book an Inspection</DialogTitle>
          <DialogDescription className="mb-2">Secure your preferred time — limited slots available.</DialogDescription>
        </DialogHeader>

        {bookingPackage && (
          <BenefitBanner packageType={bookingPackage} onExpiry={() => setBenefitActive(false)} />
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <FormField name="date" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={(d: Date | undefined) => field.onChange(d ?? null)}
                    aria-label="Select booking date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="timeSlot" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Time slot</FormLabel>
                <FormControl>
                  <TimeSlotPicker
                    selectedDate={form.getValues('date') ?? null}
                    onSelect={(slot) => field.onChange(slot)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

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

            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => closeBookingCard()} aria-label="Cancel booking">Cancel</Button>
              <Button type="submit" variant="premium" disabled={submitting} aria-label="Confirm and redeem">
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Confirm & Redeem
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingCard;
