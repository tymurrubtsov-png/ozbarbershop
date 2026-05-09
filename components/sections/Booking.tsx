"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import { SERVICES, SHOP } from "@/lib/constants";

type Lang = "nl" | "en";

const T = {
  nl: {
    label: "Afspraak", heading: "Boek jouw bezoek",
    sub: "Vul het formulier in — Oz neemt zo snel mogelijk contact op om te bevestigen.",
    step1: "Jouw gegevens", step2: "Dienst & Moment", step3: "Klaar!",
    name: "Naam", phone: "Telefoon / WhatsApp", service: "Kies een dienst",
    pref: "Voorkeur datum/tijd (optioneel)", note: "Opmerking (optioneel)",
    next: "Volgende", back: "Terug", send: "Stuur Aanvraag",
    success1: "Aanvraag verstuurd!", success2: "Oz neemt zo snel mogelijk contact op via WhatsApp om jouw afspraak te bevestigen.",
    whatsapp: "Of boek direct via WhatsApp",
  },
  en: {
    label: "Booking", heading: "Book your visit",
    sub: "Fill in the form — Oz will get in touch as soon as possible to confirm.",
    step1: "Your details", step2: "Service & Time", step3: "Done!",
    name: "Name", phone: "Phone / WhatsApp", service: "Choose a service",
    pref: "Preferred date/time (optional)", note: "Note (optional)",
    next: "Next", back: "Back", send: "Send Request",
    success1: "Request sent!", success2: "Oz will get in touch as soon as possible via WhatsApp to confirm your appointment.",
    whatsapp: "Or book directly via WhatsApp",
  },
};

export default function Booking({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "", pref: "", note: "" });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSend = () => {
    setDone(true);
  };

  return (
    <section id="booking" className="py-section bg-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: heading */}
          <SectionReveal direction="left" className="md:sticky md:top-24">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-blue-oz mb-3">{t.label}</p>
            <h2 className="font-display text-display-lg text-ink mb-5">{t.heading}</h2>
            <p className="font-body text-base text-ink/50 leading-relaxed mb-8">{t.sub}</p>

            {/* Step indicators */}
            {!done && (
              <div className="flex items-center gap-3">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-500 transition-colors duration-300 ${step >= s ? "bg-blue-oz text-cream" : "bg-ink/10 text-ink/40"}`}>
                      {s}
                    </div>
                    <span className={`font-body text-sm transition-colors ${step === s ? "text-ink" : "text-ink/40"}`}>
                      {s === 1 ? t.step1 : t.step2}
                    </span>
                    {s < 2 && <div className={`w-8 h-px transition-colors ${step > s ? "bg-blue-oz" : "bg-ink/15"}`} />}
                  </div>
                ))}
              </div>
            )}

            {/* WhatsApp direct */}
            <a
              href={`https://wa.me/${SHOP.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-sm font-body text-ink/50 hover:text-ink transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="#25D366" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.whatsapp}
            </a>
          </SectionReveal>

          {/* Right: form */}
          <SectionReveal direction="right" delay={0.1}>
            <div className="bg-white rounded-2xl p-8 border border-ink/5 shadow-sm">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-14 h-14 bg-blue-oz/10 rounded-full flex items-center justify-center mx-auto mb-5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#3A5A7C" strokeWidth="2" className="w-7 h-7">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl text-ink mb-3">{t.success1}</h3>
                    <p className="font-body text-sm text-ink/60 leading-relaxed max-w-xs mx-auto">{t.success2}</p>
                    <button
                      onClick={() => { setDone(false); setStep(1); setForm({ name: "", phone: "", service: "", pref: "", note: "" }); }}
                      className="mt-6 font-body text-sm text-blue-oz underline underline-offset-2"
                    >
                      {lang === "nl" ? "Nieuwe aanvraag" : "New request"}
                    </button>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h3 className="font-display text-xl text-ink mb-6">{t.step1}</h3>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="font-body text-xs uppercase tracking-widest text-ink/40 mb-1.5 block">{t.name} *</label>
                        <input
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          className="w-full border border-ink/15 rounded-xl px-4 py-3 font-body text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-blue-oz transition-colors"
                          placeholder="Jan de Vries"
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs uppercase tracking-widest text-ink/40 mb-1.5 block">{t.phone} *</label>
                        <input
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          className="w-full border border-ink/15 rounded-xl px-4 py-3 font-body text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-blue-oz transition-colors"
                          placeholder="+31 6 00 000 000"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => form.name && form.phone && setStep(2)}
                      disabled={!form.name || !form.phone}
                      className="mt-6 w-full bg-blue-oz text-cream font-body font-500 text-sm py-3.5 rounded-xl hover:bg-blue-dark transition-colors disabled:opacity-40"
                    >
                      {t.next}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <h3 className="font-display text-xl text-ink mb-6">{t.step2}</h3>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="font-body text-xs uppercase tracking-widest text-ink/40 mb-1.5 block">{t.service} *</label>
                        <select
                          value={form.service}
                          onChange={(e) => set("service", e.target.value)}
                          className="w-full border border-ink/15 rounded-xl px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-blue-oz transition-colors bg-white"
                        >
                          <option value="">{t.service}</option>
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.id}>{s.name[lang]} — {s.price}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="font-body text-xs uppercase tracking-widest text-ink/40 mb-1.5 block">{t.pref}</label>
                        <input
                          value={form.pref}
                          onChange={(e) => set("pref", e.target.value)}
                          className="w-full border border-ink/15 rounded-xl px-4 py-3 font-body text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-blue-oz transition-colors"
                          placeholder={lang === "nl" ? "bv. Vrijdag middag" : "e.g. Friday afternoon"}
                        />
                      </div>
                      <div>
                        <label className="font-body text-xs uppercase tracking-widest text-ink/40 mb-1.5 block">{t.note}</label>
                        <textarea
                          value={form.note}
                          onChange={(e) => set("note", e.target.value)}
                          rows={3}
                          className="w-full border border-ink/15 rounded-xl px-4 py-3 font-body text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-blue-oz transition-colors resize-none"
                          placeholder={lang === "nl" ? "Eventuele wensen..." : "Any wishes..."}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 border border-ink/15 text-ink font-body font-500 text-sm py-3.5 rounded-xl hover:border-ink/40 transition-colors"
                      >
                        {t.back}
                      </button>
                      <button
                        onClick={handleSend}
                        disabled={!form.service}
                        className="flex-[2] bg-blue-oz text-cream font-body font-500 text-sm py-3.5 rounded-xl hover:bg-blue-dark transition-colors disabled:opacity-40"
                      >
                        {t.send}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
