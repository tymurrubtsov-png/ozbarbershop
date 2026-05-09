import { SHOP } from "@/lib/constants";

type Lang = "nl" | "en";

const T = {
  nl: { rights: "Alle rechten voorbehouden" },
  en: { rights: "All rights reserved" },
};

export default function Footer({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <footer className="py-10" style={{ background: "#060608", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg tracking-[0.15em] uppercase font-600" style={{ color: "#F0EDE8" }}>
              Barber <span style={{ color: "#6BC4BB" }}>Oz</span>
            </span>
            <span className="font-body text-xs" style={{ color: "rgba(245,245,247,0.20)" }}>· {SHOP.city}</span>
          </div>
          <div className="flex gap-6">
            {[
              { href: "#services", nl: "Diensten", en: "Services" },
              { href: "#gallery", nl: "Werk", en: "Work" },
              { href: "#story", nl: "Verhaal", en: "Story" },
              { href: "#contact", nl: "Contact", en: "Contact" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="font-body text-xs transition-colors duration-200"
                style={{ color: "rgba(245,245,247,0.35)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F0EDE8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,245,247,0.35)"; }}
              >
                {lang === "nl" ? l.nl : l.en}
              </a>
            ))}
            <a href={SHOP.instagramUrl} target="_blank" rel="noopener noreferrer"
              className="font-body text-xs transition-colors duration-200"
              style={{ color: "rgba(245,245,247,0.35)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F0EDE8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,245,247,0.35)"; }}
            >
              Instagram
            </a>
          </div>
          <p className="font-body text-xs" style={{ color: "rgba(245,245,247,0.20)" }}>
            © {new Date().getFullYear()} Barber Oz · {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
