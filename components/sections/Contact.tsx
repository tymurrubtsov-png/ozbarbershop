"use client";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { SHOP } from "@/lib/constants";

type Lang = "nl" | "en";

const T = {
  nl: { label: "Vind Ons", heading: "Kom langs", address: "Adres", hours: "Openingstijden", phone: "Telefoon", directions: "Route Plannen" },
  en: { label: "Find Us", heading: "Visit us", address: "Address", hours: "Opening Hours", phone: "Phone", directions: "Get Directions" },
};

export default function Contact({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <section id="contact" className="py-28 md:py-36" style={{ background: "#080E0D" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader label={t.label} heading={t.heading} />

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {/* Address */}
          <SectionReveal delay={0}>
            <div className="rounded-2xl p-7 h-full transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(62,125,118,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(62,125,118,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(62,125,118,0.12)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#6BC4BB" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <p className="font-body text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,245,247,0.30)" }}>{t.address}</p>
              <p className="font-body text-sm font-500" style={{ color: "#F0EDE8" }}>{SHOP.address}</p>
              <p className="font-body text-sm" style={{ color: "rgba(245,245,247,0.50)" }}>{SHOP.city}</p>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(SHOP.address + " " + SHOP.city)}`} target="_blank" rel="noopener noreferrer"
                className="inline-block mt-4 font-body text-xs underline underline-offset-2 transition-colors"
                style={{ color: "rgba(107,196,187,0.65)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6BC4BB"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(107,196,187,0.65)"; }}
              >
                {t.directions} →
              </a>
            </div>
          </SectionReveal>

          {/* Hours */}
          <SectionReveal delay={0.08}>
            <div className="rounded-2xl p-7 h-full transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(62,125,118,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(62,125,118,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(62,125,118,0.12)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#6BC4BB" strokeWidth="1.5" className="w-5 h-5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <p className="font-body text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(245,245,247,0.30)" }}>{t.hours}</p>
              <p className="font-body text-sm" style={{ color: "#F0EDE8" }}>{SHOP.hours.weekdays}</p>
              <p className="font-body text-sm mt-1" style={{ color: "#F0EDE8" }}>{SHOP.hours.saturday}</p>
              <p className="font-body text-sm mt-1" style={{ color: "rgba(245,245,247,0.30)" }}>{SHOP.hours.sunday}</p>
            </div>
          </SectionReveal>

          {/* Phone + Instagram */}
          <SectionReveal delay={0.16}>
            <div className="rounded-2xl p-7 h-full transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(62,125,118,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(62,125,118,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(62,125,118,0.12)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#6BC4BB" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.07 2.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <p className="font-body text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(245,245,247,0.30)" }}>{t.phone}</p>
              <a href={`tel:${SHOP.phone}`} className="font-body text-sm font-500 transition-colors"
                style={{ color: "#F0EDE8" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6BC4BB"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#F0EDE8"; }}
              >
                {SHOP.phone}
              </a>
              <div className="mt-4 flex flex-col gap-2">
                <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-xs transition-opacity hover:opacity-80"
                  style={{ color: "#25D366" }}>
                  <svg viewBox="0 0 24 24" fill="#25D366" className="w-3.5 h-3.5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a href={SHOP.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-xs transition-colors"
                  style={{ color: "rgba(245,245,247,0.40)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F0EDE8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,245,247,0.40)"; }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @barber_oz
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Map */}
        <SectionReveal>
          <div className="rounded-2xl overflow-hidden h-72 md:h-88"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent("Waldorpstraat 273, 2521 CJ Den Haag")}&output=embed`}
              width="100%" height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Barber Oz location"
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
