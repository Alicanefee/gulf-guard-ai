import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { BookingProvider } from "./components/booking/BookingProvider";
import BookingCard from "./components/booking/BookingCard";
import StickyBookingBar from "./components/booking/StickyBookingBar";
import { useBooking } from "./components/booking/BookingProvider";

const queryClient = new QueryClient();

const BookingRoot = () => {
  const { bookingPackage } = useBooking();
  return (
    <>
      {bookingPackage && <BookingCard selectedPackage={bookingPackage} slotsRemaining={5} offerExpiry={undefined} />}
      <StickyBookingBar selectedPackage={bookingPackage ?? 'Essential'} />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BookingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <BookingRoot />
      </BookingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
