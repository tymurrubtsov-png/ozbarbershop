"use client";
import { motion } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/constants";

type Lang = "nl" | "en";

const T = {
  nl: { label: "Onze Diensten", heading: "Wat wij bieden", sub: "Elke dienst is een ambacht — precisie en karakter bij elke knipbeurt.", popular: "Populair", book: "Boek Nu" },
  en: { label: "Our Services", heading: "What we offer", sub: "Every service is a craft — precision and character with every cut.", popular: "Popular", book: "Book Now" },
};

export default function Services({ lang, onOpenBooking }: { lang: Lang; onOpenBooking: () => void }) {
  const t = T[lang];
  return (
    <section id="services" className="py-28 md:py-36" style={{ background: "#0A1210" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader label={t.label} heading={t.heading} sub={t.sub} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {SERVICES.map((s, i) => (
            <SectionReveal key={s.id} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative h-full flex flex-col rounded-2xl p-7 cursor-default transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(62,125,118,0.35)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(62,125,118,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {s.popular && (
                  <span
                    className="absolute top-4 right-4 text-[10px] font-body tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                    style={{ background: "rgba(62,125,118,0.2)", border: "1px solid rgba(62,125,118,0.3)", color: "#6BC4BB" }}
                  >
                    {t.popular}
                  </span>
                )}
                <div className="text-2xl mb-5" style={{ color: "#6BC4BB" }}>{s.icon}</div>
                <h3 className="font-display text-xl mb-2" style={{ color: "#F0EDE8" }}>{s.name[lang]}</h3>
                <p className="font-body text-sm leading-relaxed flex-1" style={{ color: "rgba(245,245,247,0.50)" }}>{s.desc[lang]}</p>
                <div className="flex items-end justify-between mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div>
                    <span className="font-display text-2xl font-600" style={{ color: "#6BC4BB" }}>{s.price}</span>
                    <p className="font-body text-xs mt-0.5" style={{ color: "rgba(245,245,247,0.30)" }}>{s.duration[lang]}</p>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="font-body text-xs transition-colors duration-200 underline underline-offset-2"
                    style={{ color: "rgba(107,196,187,0.6)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6BC4BB"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(107,196,187,0.6)"; }}
                  >
                    {t.book}
                  </button>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
