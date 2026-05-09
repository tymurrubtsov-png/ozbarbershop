"use client";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICES, SHOP } from "@/lib/constants";

type Lang = "nl" | "en";

const TIME_SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30","18:00",
];

const DAYS = {
  nl: ["zo","ma","di","wo","do","vr","za"],
  en: ["sun","mon","tue","wed","thu","fri","sat"],
};
const MONTHS = {
  nl: ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"],
  en: ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],
};

function getNext7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });
}

interface BookingState {
  service: string | null;
  date: Date | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
  note: string;
}

const empty: BookingState = {
  service: null, date: null, time: null,
  name: "", phone: "", email: "", note: "",
};

const T = {
  nl: {
    title: "Maak een Afspraak",
    confirmed: "Afspraak Bevestigd!",
    s1: "Kies Dienst", s2: "Datum & Tijd", s3: "Jouw Gegevens",
    popular: "Populair", cancel: "Annuleren", back: "Terug",
    next: "Volgende", confirm: "Bevestig Afspraak",
    chooseDay: "Kies een dag", chooseTime: "Kies een tijd",
    name: "Naam", phone: "Telefoon / WhatsApp", email: "E-mail (optioneel)",
    note: "Opmerking (optioneel)",
    namePh: "Jan de Vries", phonePh: "+31 6 00 000 000",
    emailPh: "jan@email.com", notePh: "Eventuele wensen...",
    successSub: "Oz neemt zo snel mogelijk contact op via WhatsApp om jouw afspraak te bevestigen.",
    successPhone: "Of bel direct:",
    close: "Sluiten",
    sumService: "Dienst", sumDate: "Datum", sumTime: "Tijd", sumName: "Naam",
  },
  en: {
    title: "Book an Appointment",
    confirmed: "Appointment Confirmed!",
    s1: "Choose Service", s2: "Date & Time", s3: "Your Details",
    popular: "Popular", cancel: "Cancel", back: "Back",
    next: "Next", confirm: "Confirm Appointment",
    chooseDay: "Choose a day", chooseTime: "Choose a time",
    name: "Name", phone: "Phone / WhatsApp", email: "Email (optional)",
    note: "Note (optional)",
    namePh: "John Smith", phonePh: "+31 6 00 000 000",
    emailPh: "john@email.com", notePh: "Any wishes...",
    successSub: "Oz will get in touch as soon as possible via WhatsApp to confirm your appointment.",
    successPhone: "Or call directly:",
    close: "Close",
    sumService: "Service", sumDate: "Date", sumTime: "Time", sumName: "Name",
  },
};

const slideEase = [0.32, 0.72, 0, 1] as [number, number, number, number];

// ─── Step indicator ────────────────────────────────────────────────────────
function StepIndicator({ step, lang }: { step: number; lang: Lang }) {
  const tx = T[lang];
  const labels = [tx.s1, tx.s2, tx.s3];
  return (
    <div className="flex items-center gap-0">
      {labels.map((label, i) => {
        const active = i + 1 === step;
        const done = i + 1 < step;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-600 transition-all duration-300 ${
                  done
                    ? "bg-blue-oz text-cream"
                    : active
                    ? "border-2 border-blue-oz text-blue-oz"
                    : "border border-white/20 text-white/30"
                }`}
              >
                {done ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`mt-1 text-[10px] tracking-wide whitespace-nowrap hidden sm:block ${
                active ? "text-blue-light" : done ? "text-white/40" : "text-white/20"
              }`}>
                {label}
              </span>
            </div>
            {i < 2 && (
              <div className={`mx-2 mb-3 sm:mb-5 h-px w-8 sm:w-12 transition-all duration-300 ${
                done ? "bg-blue-oz" : "bg-white/15"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main modal ────────────────────────────────────────────────────────────
export function BookingModal({
  isOpen,
  onClose,
  lang,
}: {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [booking, setBooking] = useState<BookingState>(empty);
  const tx = T[lang];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => { setStep(1); setConfirmed(false); setBooking(empty); setDir(1); }, 400);
  }, [onClose]);

  const goNext = () => { setDir(1); setStep((s) => Math.min(s + 1, 3)); };
  const goPrev = () => { setDir(-1); setStep((s) => Math.max(s - 1, 1)); };

  const canNext = () => {
    if (step === 1) return !!booking.service;
    if (step === 2) return !!booking.date && !!booking.time;
    if (step === 3) return !!booking.name.trim() && !!booking.phone.trim();
    return false;
  };

  const stepVariants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: slideEase } },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.22 } }),
  };

  const selectedService = SERVICES.find((s) => s.id === booking.service);
  const dateStr = booking.date
    ? `${DAYS[lang][booking.date.getDay()]} ${booking.date.getDate()} ${MONTHS[lang][booking.date.getMonth()]}`
    : "—";

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: slideEase }}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl md:inset-0 md:rounded-none"
            style={{
              maxHeight: "100dvh",
              height: "100%",
              background: "rgba(22, 22, 26, 0.97)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 md:px-10 flex-shrink-0 border-b border-white/8">
              <div>
                <p className="font-body text-xs tracking-[0.25em] uppercase text-blue-light font-500">
                  Barber Oz
                </p>
                <h2 className="font-display text-xl text-white mt-0.5">
                  {confirmed ? tx.confirmed : tx.title}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/40 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Step indicator */}
            {!confirmed && (
              <div className="flex-shrink-0 px-6 py-4 md:px-10 border-b border-white/5">
                <StepIndicator step={step} lang={lang} />
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-10">
              {confirmed ? (
                <ConfirmedView
                  booking={booking}
                  selectedService={selectedService}
                  dateStr={dateStr}
                  onClose={handleClose}
                  tx={tx}
                />
              ) : (
                <AnimatePresence custom={dir} mode="wait">
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {step === 1 && <Step1 booking={booking} setBooking={setBooking} lang={lang} tx={tx} />}
                    {step === 2 && <Step2 booking={booking} setBooking={setBooking} lang={lang} tx={tx} />}
                    {step === 3 && (
                      <Step3
                        booking={booking}
                        setBooking={setBooking}
                        selectedService={selectedService}
                        dateStr={dateStr}
                        lang={lang}
                        tx={tx}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {!confirmed && (
              <div className="flex items-center justify-between px-6 py-4 md:px-10 flex-shrink-0 border-t border-white/8"
                style={{ background: "rgba(22,22,26,0.8)" }}>
                <button
                  onClick={step === 1 ? handleClose : goPrev}
                  className="font-body text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  {step === 1 ? tx.cancel : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                      {tx.back}
                    </>
                  )}
                </button>
                {step < 3 ? (
                  <button
                    onClick={goNext}
                    disabled={!canNext()}
                    className={`flex items-center gap-2 rounded-full px-7 py-3 font-body text-sm font-500 tracking-wide transition-all duration-200 ${
                      canNext()
                        ? "bg-blue-oz text-cream hover:bg-blue-dark"
                        : "bg-white/8 text-white/25 cursor-not-allowed"
                    }`}
                  >
                    {tx.next}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmed(true)}
                    disabled={!canNext()}
                    className={`flex items-center gap-2 rounded-full px-7 py-3 font-body text-sm font-500 tracking-wide transition-all duration-200 ${
                      canNext()
                        ? "bg-blue-oz text-cream hover:bg-blue-dark"
                        : "bg-white/8 text-white/25 cursor-not-allowed"
                    }`}
                  >
                    {tx.confirm}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ─── Step 1: Service ──────────────────────────────────────────────────────
function Step1({ booking, setBooking, lang, tx }: {
  booking: BookingState;
  setBooking: (b: BookingState) => void;
  lang: Lang;
  tx: typeof T.nl;
}) {
  return (
    <div>
      <h3 className="font-display text-xl text-white mb-6">{tx.s1}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SERVICES.map((s) => {
          const selected = booking.service === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setBooking({ ...booking, service: s.id })}
              className={`relative text-left rounded-2xl p-5 transition-all duration-200 border ${
                selected ? "border-blue-oz" : "border-white/10 hover:border-white/20"
              }`}
              style={{ background: selected ? "rgba(47,104,97,0.15)" : "rgba(255,255,255,0.03)" }}
            >
              {s.popular && (
                <span className="absolute top-3 right-3 rounded-full bg-blue-oz/20 border border-blue-oz/30 px-2 py-0.5 font-body text-[10px] text-blue-light tracking-wide">
                  {tx.popular}
                </span>
              )}
              {selected && (
                <div className="absolute top-3 left-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-oz">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
              <div className="flex items-start justify-between pr-10">
                <div>
                  <p className="font-display text-base text-white">{s.name[lang]}</p>
                  <p className="font-body text-xs text-white/40 mt-0.5">{s.duration[lang]}</p>
                </div>
              </div>
              <p className="font-display text-xl text-blue-light mt-3">{s.price}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: Date & Time ──────────────────────────────────────────────────
function Step2({ booking, setBooking, lang, tx }: {
  booking: BookingState;
  setBooking: (b: BookingState) => void;
  lang: Lang;
  tx: typeof T.nl;
}) {
  const days = getNext7Days();
  return (
    <div>
      <h3 className="font-display text-xl text-white mb-6">{tx.s2}</h3>
      <p className="font-body text-xs tracking-widest uppercase text-white/30 mb-3">{tx.chooseDay}</p>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-7">
        {days.map((day) => {
          const selected = booking.date?.toDateString() === day.toDateString();
          return (
            <button
              key={day.toISOString()}
              onClick={() => setBooking({ ...booking, date: day, time: null })}
              className={`flex-shrink-0 flex flex-col items-center rounded-xl px-3 py-3 transition-all duration-200 border min-w-[54px] ${
                selected ? "border-blue-oz" : "border-white/10 hover:border-white/20"
              }`}
              style={{ background: selected ? "rgba(47,104,97,0.15)" : "rgba(255,255,255,0.03)" }}
            >
              <span className={`font-body text-[10px] tracking-wide ${selected ? "text-blue-light" : "text-white/30"}`}>
                {DAYS[lang][day.getDay()]}
              </span>
              <span className={`font-display text-lg mt-0.5 ${selected ? "text-blue-light" : "text-white"}`}>
                {day.getDate()}
              </span>
              <span className={`font-body text-[10px] ${selected ? "text-blue-light/70" : "text-white/30"}`}>
                {MONTHS[lang][day.getMonth()]}
              </span>
            </button>
          );
        })}
      </div>

      {booking.date && (
        <>
          <p className="font-body text-xs tracking-widest uppercase text-white/30 mb-3">{tx.chooseTime}</p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
            {TIME_SLOTS.map((time) => {
              const selected = booking.time === time;
              return (
                <button
                  key={time}
                  onClick={() => setBooking({ ...booking, time })}
                  className={`rounded-xl py-2.5 font-body text-sm font-500 transition-all duration-200 border ${
                    selected
                      ? "border-blue-oz bg-blue-oz text-cream"
                      : "border-white/10 text-white/60 hover:border-blue-oz/40 hover:text-white"
                  }`}
                  style={{ background: selected ? undefined : "rgba(255,255,255,0.03)" }}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Step 3: Details ──────────────────────────────────────────────────────
function Step3({ booking, setBooking, selectedService, dateStr, lang, tx }: {
  booking: BookingState;
  setBooking: (b: BookingState) => void;
  selectedService: typeof SERVICES[0] | undefined;
  dateStr: string;
  lang: Lang;
  tx: typeof T.nl;
}) {
  return (
    <div>
      <h3 className="font-display text-xl text-white mb-6">{tx.s3}</h3>
      {/* Summary */}
      <div className="rounded-2xl p-4 mb-6 grid grid-cols-2 gap-3"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <SummaryItem label={tx.sumService} value={selectedService?.name[lang] ?? "—"} sub={selectedService?.price} />
        <SummaryItem label={tx.sumDate} value={dateStr} />
        <SummaryItem label={tx.sumTime} value={booking.time ?? "—"} />
      </div>
      {/* Inputs */}
      <div className="flex flex-col gap-4">
        <BInput label={`${tx.name} *`} placeholder={tx.namePh} value={booking.name}
          onChange={(v) => setBooking({ ...booking, name: v })} />
        <BInput label={`${tx.phone} *`} placeholder={tx.phonePh} type="tel" value={booking.phone}
          onChange={(v) => setBooking({ ...booking, phone: v })} />
        <BInput label={tx.email} placeholder={tx.emailPh} type="email" value={booking.email}
          onChange={(v) => setBooking({ ...booking, email: v })} />
        <div>
          <label className="block font-body text-xs tracking-wide uppercase text-white/30 mb-2">{tx.note}</label>
          <textarea
            placeholder={tx.notePh}
            value={booking.note}
            onChange={(e) => setBooking({ ...booking, note: e.target.value })}
            rows={3}
            className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder:text-white/25 outline-none resize-none focus:ring-1 focus:ring-blue-oz/40"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="font-body text-[10px] tracking-widest uppercase text-white/30">{label}</p>
      <p className="font-display text-sm text-white mt-0.5">{value}</p>
      {sub && <p className="font-body text-xs text-blue-light">{sub}</p>}
    </div>
  );
}

function BInput({ label, placeholder, type = "text", value, onChange }: {
  label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block font-body text-xs tracking-wide uppercase text-white/30 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder:text-white/25 outline-none focus:ring-1 focus:ring-blue-oz/40"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      />
    </div>
  );
}

// ─── Confirmed ────────────────────────────────────────────────────────────
function ConfirmedView({ booking, selectedService, dateStr, onClose, tx }: {
  booking: BookingState;
  selectedService: typeof SERVICES[0] | undefined;
  dateStr: string;
  onClose: () => void;
  tx: typeof T.nl;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-full text-center py-10"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{ background: "rgba(47,104,97,0.15)", border: "1px solid rgba(47,104,97,0.3)" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5578A0" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="font-display text-2xl text-white mb-2">{tx.confirmed}</h3>
      <p className="font-body text-white/40 mb-8 max-w-xs leading-relaxed">{tx.successSub}</p>
      <div className="w-full max-w-xs rounded-2xl p-5 mb-8 text-left"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex flex-col gap-3">
          <SummaryItem label={tx.sumName} value={booking.name} />
          <SummaryItem label={tx.sumService} value={selectedService?.name.nl ?? "—"} sub={selectedService?.price} />
          <SummaryItem label={tx.sumDate} value={dateStr} />
          <SummaryItem label={tx.sumTime} value={booking.time ?? "—"} />
        </div>
      </div>
      <p className="font-body text-xs text-white/30 mb-6">
        {tx.successPhone}{" "}
        <a href={`tel:${SHOP.phone}`} className="text-blue-light hover:text-blue-oz transition-colors">
          {SHOP.phone}
        </a>
      </p>
      <button
        onClick={onClose}
        className="rounded-full border border-white/15 px-7 py-3 font-body text-sm text-white/50 hover:text-white hover:border-white/30 transition-all duration-200"
      >
        {tx.close}
      </button>
    </motion.div>
  );
}
