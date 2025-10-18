import React, { createContext, useContext, useState } from "react";

type BookingContextType = {
  openBookingCard: (packageId: string) => void;
  closeBookingCard: () => void;
  bookingPackage?: string | null;
  benefitActive: boolean;
  setBenefitActive: (active: boolean) => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingPackage, setBookingPackage] = useState<string | null>(null);
  const [benefitActive, setBenefitActive] = useState<boolean>(false);

  const openBookingCard = (packageId: string) => setBookingPackage(packageId);
  const closeBookingCard = () => setBookingPackage(null);

  return (
    <BookingContext.Provider value={{ openBookingCard, closeBookingCard, bookingPackage, benefitActive, setBenefitActive }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};

export default BookingProvider;
