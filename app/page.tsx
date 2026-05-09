"use client";
import { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Gallery from "@/components/sections/Gallery";
import Story from "@/components/sections/Story";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
// Booking section replaced by full-screen modal
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { BookingModal } from "@/components/ui/BookingModal";

type Lang = "nl" | "en";

export default function Home() {
  const [lang, setLang] = useState<Lang>("nl");
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Navbar lang={lang} setLang={setLang} onOpenBooking={() => setBookingOpen(true)} />
      <main>
        <Hero lang={lang} onOpenBooking={() => setBookingOpen(true)} />
        <Services lang={lang} onOpenBooking={() => setBookingOpen(true)} />
        <Experience lang={lang} />
        <Gallery lang={lang} />
        <Story lang={lang} onOpenBooking={() => setBookingOpen(true)} />
        <Reviews lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <WhatsAppFloat />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} lang={lang} />
    </>
  );
}
