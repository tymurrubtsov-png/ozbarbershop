"use client";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeader from "@/components/ui/SectionHeader";

type Lang = "nl" | "en";

const T = {
  nl: {
    label: "De Ervaring", heading: "Meer dan een knipbeurt.",
    sub: "Bij Barber Oz koop je geen knipbeurt — je boekt een ritueel.",
    items: [
      { icon: "☕", title: "Welkomstdrankje", desc: "Welkom met een koffie of thee naar keuze." },
      { icon: "🎸", title: "Jouw Sfeer", desc: "Muziek, gesprek of stilte — jij bepaalt de toon." },
      { icon: "✂️", title: "Persoonlijk Advies", desc: "Oz luistert en geeft eerlijk advies." },
      { icon: "🪒", title: "Warm Doek", desc: "Traditioneel warm handdoek ritueel bij baard." },
      { icon: "🪞", title: "Perfecte Afwerking", desc: "Elke lijn scherp, elk detail klopt." },
      { icon: "✦", title: "Jij Verlaat Anders", desc: "Je voelt het verschil direct buiten." },
    ],
  },
  en: {
    label: "The Experience", heading: "More than a haircut.",
    sub: "At Barber Oz you don't buy a haircut — you book a ritual.",
    items: [
      { icon: "☕", title: "Welcome Drink", desc: "Start with a coffee or tea of your choice." },
      { icon: "🎸", title: "Your Vibe", desc: "Music, conversation or silence — you set the tone." },
      { icon: "✂️", title: "Personal Advice", desc: "Oz listens and gives honest advice." },
      { icon: "🪒", title: "Hot Towel", desc: "Traditional hot towel ritual with every beard service." },
      { icon: "🪞", title: "Perfect Finish", desc: "Every line sharp, every detail right." },
      { icon: "✦", title: "You Leave Different", desc: "You feel the difference immediately." },
    ],
  },
};

export default function Experience({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <section className="py-28 md:py-36" style={{ background: "#080E0D" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader label={t.label} heading={t.heading} sub={t.sub} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {t.items.map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.06}>
              <div
                className="rounded-2xl p-6 h-full transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(62,125,118,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(62,125,118,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <h3 className="font-display text-lg mb-2" style={{ color: "#F0EDE8" }}>{item.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,245,247,0.50)" }}>{item.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
