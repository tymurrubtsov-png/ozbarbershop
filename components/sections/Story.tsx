"use client";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";

type Lang = "nl" | "en";

const T = {
  nl: {
    label: "Het Verhaal",
    heading: "Wie is Oz?",
    p1: "Oz begon zijn reis als kapper meer dan 8 jaar geleden, gedreven door één simpele overtuiging: een goede knipbeurt verandert hoe je je voelt. Niet zomaar verandering — een verschuiving in zelfvertrouwen.",
    p2: "In zijn atelier aan de Waldorpstraat in Den Haag heeft hij een plek gebouwd waar vakmanschap centraal staat. Geen haast, geen standaard behandeling — elk bezoek is persoonlijk.",
    quote: "\"Ik knip geen haar. Ik bouw karakter.\"",
    cta: "Boek bij Oz",
    stats: [{ v: "8+", l: "Jaar Ervaring" }, { v: "1000+", l: "Tevreden Klanten" }, { v: "4.9★", l: "Google Rating" }],
  },
  en: {
    label: "The Story",
    heading: "Who is Oz?",
    p1: "Oz began his journey as a barber over 8 years ago, driven by one simple belief: a great haircut changes how you feel. Not just change — a shift in confidence.",
    p2: "In his studio on Waldorpstraat in Den Haag, he has built a place where craftsmanship is central. No rush, no standard treatment — every visit is personal.",
    quote: "\"I don't cut hair. I build character.\"",
    cta: "Book with Oz",
    stats: [{ v: "8+", l: "Years Experience" }, { v: "1000+", l: "Happy Clients" }, { v: "4.9★", l: "Google Rating" }],
  },
};

export default function Story({ lang, onOpenBooking }: { lang: Lang; onOpenBooking: () => void }) {
  const t = T[lang];
  return (
    <section id="story" className="py-28 md:py-36" style={{ background: "#080E0D" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <SectionReveal className="flex items-center gap-4 mb-16">
          <div className="h-px w-10" style={{ background: "rgba(62,125,118,0.5)" }} />
          <span className="font-body text-[11px] tracking-[0.35em] uppercase font-500" style={{ color: "rgba(107,196,187,0.8)" }}>
            {t.label}
          </span>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Image */}
          <SectionReveal direction="left">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85" alt="Barber Oz" fill className="object-cover" unoptimized />
              </div>
              {/* Floating stats */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 rounded-2xl p-5"
                style={{ background: "rgba(22,22,26,0.95)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <div className="flex gap-5">
                  {t.stats.map((s) => (
                    <div key={s.l} className="text-center">
                      <p className="font-display text-xl" style={{ color: "#6BC4BB" }}>{s.v}</p>
                      <p className="font-body text-[10px] uppercase tracking-wider mt-0.5 whitespace-nowrap" style={{ color: "rgba(245,245,247,0.35)" }}>
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full -z-10"
                style={{ background: "rgba(62,125,118,0.06)" }} />
            </div>
          </SectionReveal>

          {/* Text */}
          <SectionReveal direction="right" delay={0.1}>
            <h2 className="font-display heading-lg mb-7" style={{ color: "#F0EDE8" }}>{t.heading}</h2>
            <p className="font-body text-base leading-relaxed mb-4" style={{ color: "rgba(245,245,247,0.60)" }}>{t.p1}</p>
            <p className="font-body text-base leading-relaxed mb-7" style={{ color: "rgba(245,245,247,0.60)" }}>{t.p2}</p>
            <blockquote className="font-display text-2xl italic leading-snug mb-8 pl-5"
              style={{ color: "#6BC4BB", borderLeft: "2px solid #3E7D76" }}>
              {t.quote}
            </blockquote>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 font-body text-sm font-500 px-7 py-3.5 rounded-full transition-all duration-300"
              style={{ background: "#3E7D76", color: "#F0EDE8" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#4E9E95";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(62,125,118,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#3E7D76";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {t.cta}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
