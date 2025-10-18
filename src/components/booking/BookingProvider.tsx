import React, { createContext, useContext, useState } from "react";

type BookingContextType = {
  openBookingCard: (packageId: string) => void;
  closeBookingCard: () => void;
  bookingPackage?: string | null;
  bookingSession?: string | null;
  abVariant?: "A" | "B";
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingPackage, setBookingPackage] = useState<string | null>(null);
  const [bookingSession, setBookingSession] = useState<string | null>(null);
  const [abVariant, setAbVariant] = useState<"A" | "B">("A");

  const openBookingCard = (packageId: string) => {
    setBookingPackage(packageId);
    const sessionId = `${packageId}-${Date.now()}`;
    setBookingSession(sessionId);
    // Simple AB assignment: 50/50
    const variant = Math.random() > 0.5 ? "A" : "B";
    setAbVariant(variant as "A" | "B");
    sessionStorage.setItem("booking_ab_variant", variant);
  };
  const closeBookingCard = () => setBookingPackage(null);

  return (
    <BookingContext.Provider value={{ openBookingCard, closeBookingCard, bookingPackage, bookingSession, abVariant }}>
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
