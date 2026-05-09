"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SHOP } from "@/lib/constants";

type Lang = "nl" | "en";

const T = {
  nl: {
    pre: "Den Haag · Waldorpstraat 273",
    h1: "Gemaakt,",
    h2: "niet zomaar",
    h3: "geknipt.",
    sub: "Premium barbershop in Den Haag. Precisie, karakter en vakmanschap — in elke knipbeurt.",
    cta: "Maak een Afspraak",
    wa: "WhatsApp",
    s1n: "8+",  s1l: "Jaar",
    s2n: "1K+", s2l: "Klanten",
    s3n: "4.9", s3l: "Google",
    tag: "Cut · Shave · Trim",
  },
  en: {
    pre: "Den Haag · Waldorpstraat 273",
    h1: "Crafted,",
    h2: "not just",
    h3: "cut.",
    sub: "Premium barbershop in Den Haag. Precision, character and craft — in every haircut.",
    cta: "Book Your Visit",
    wa: "WhatsApp",
    s1n: "8+",  s1l: "Years",
    s2n: "1K+", s2l: "Clients",
    s3n: "4.9", s3l: "Google",
    tag: "Cut · Shave · Trim",
  },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as any },
});

export default function Hero({
  lang,
  onOpenBooking,
}: {
  lang: Lang;
  onOpenBooking: () => void;
}) {
  const t = T[lang];

  return (
    <section className="relative min-h-screen flex overflow-hidden" style={{
      background: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(62,125,118,0.18) 0%, #080E0D 65%)"
    }}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/photos/interior.jpg"
          alt="Barber Oz interior"
          fill
          priority
          className="object-cover object-center opacity-75"
          unoptimized
        />
        {/* Left fade so text is legible, right stays visible */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, #080E0D 30%, rgba(8,14,13,0.55) 55%, rgba(8,14,13,0.05) 100%)"
        }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{
          background: "linear-gradient(to top, #080E0D, transparent)"
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col justify-center pt-28 pb-16 min-h-screen">
        <div className="max-w-3xl">

          {/* Pre-label */}
          <motion.div {...fadeUp(0.15)} className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px bg-blue-oz" />
            <span className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(107,196,187,0.8)" }}>
              {t.pre}
            </span>
          </motion.div>

          {/* Main headline — 3 lines */}
          <div className="mb-8 overflow-hidden">
            {[
              { text: t.h1, italic: false },
              { text: t.h2, italic: false },
              { text: t.h3, italic: true },
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] as any }}
              >
                <span
                  className={`font-display heading-hero block ${line.italic ? "italic" : ""}`}
                  style={{ color: line.italic ? "#6BC4BB" : "#F0EDE8" }}
                >
                  {line.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Services tag */}
          <motion.p {...fadeUp(0.65)}
            className="font-body text-xs tracking-[0.35em] uppercase mb-6"
            style={{ color: "rgba(245,245,247,0.28)" }}
          >
            {t.tag}
          </motion.p>

          {/* Sub */}
          <motion.p {...fadeUp(0.75)}
            className="font-body text-base md:text-lg leading-relaxed mb-10 max-w-md"
            style={{ color: "rgba(245,245,247,0.60)" }}
          >
            {t.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.88)} className="flex flex-wrap gap-3 mb-16">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2.5 font-body font-500 text-sm px-8 py-4 rounded-full transition-all duration-300"
              style={{
                background: "#3E7D76",
                color: "#F0EDE8",
                boxShadow: "0 0 0 0 rgba(62,125,118,0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(62,125,118,0.45)";
                (e.currentTarget as HTMLElement).style.background = "#4E9E95";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(62,125,118,0)";
                (e.currentTarget as HTMLElement).style.background = "#3E7D76";
              }}
            >
              {t.cta}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <a
              href={`https://wa.me/${SHOP.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-body font-500 text-sm px-8 py-4 rounded-full transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(245,245,247,0.85)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.11)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
            >
              <svg viewBox="0 0 24 24" fill="#25D366" className="w-4 h-4 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.wa}
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="flex items-center gap-10 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { n: t.s1n, l: t.s1l },
              { n: t.s2n, l: t.s2l },
              { n: t.s3n, l: t.s3l },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-display text-2xl font-600" style={{ color: "#6BC4BB" }}>{s.n}</p>
                <p className="font-body text-xs mt-0.5 tracking-wide" style={{ color: "rgba(245,245,247,0.35)" }}>
                  {s.l}
                </p>
              </div>
            ))}
            {/* Divider + Instagram */}
            <div className="ml-auto flex items-center gap-3">
              <a
                href={SHOP.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-xs transition-colors duration-200"
                style={{ color: "rgba(245,245,247,0.35)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,245,247,0.85)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,245,247,0.35)"; }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @barber_oz
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, rgba(62,125,118,0.6), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
