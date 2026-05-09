"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { REVIEWS, SHOP } from "@/lib/constants";

type Lang = "nl" | "en";

const T = {
  nl: { label: "Beoordelingen", heading: "Wat klanten zeggen", cta: "Lees alle reviews op Google" },
  en: { label: "Reviews", heading: "What clients say", cta: "Read all reviews on Google" },
};

export default function Reviews({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % REVIEWS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const review = REVIEWS[current];

  return (
    <section className="py-28 md:py-36" style={{ background: "#0A1210" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader label={t.label} heading={t.heading} />

        {/* Rating badge */}
        <SectionReveal className="flex items-center justify-center gap-2 mb-12">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" fill="#6BC4BB" className="w-4 h-4">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-body text-sm font-500" style={{ color: "rgba(245,245,247,0.45)" }}>
            {SHOP.rating} / 5 · {SHOP.reviewCount}+ reviews
          </span>
        </SectionReveal>

        {/* Review card */}
        <div className="max-w-2xl mx-auto mb-10 relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex gap-0.5 mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="#6BC4BB" className="w-3.5 h-3.5">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "rgba(245,245,247,0.65)" }}>
                &ldquo;{review.text[lang]}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(62,125,118,0.15)" }}>
                  <span className="font-display text-sm" style={{ color: "#6BC4BB" }}>{review.name[0]}</span>
                </div>
                <div>
                  <p className="font-body text-sm font-500" style={{ color: "#F0EDE8" }}>{review.name}</p>
                  <p className="font-body text-xs" style={{ color: "rgba(245,245,247,0.30)" }}>{review.date}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mb-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "1.25rem" : "0.375rem",
                height: "0.375rem",
                background: i === current ? "#3E7D76" : "rgba(245,245,247,0.15)",
              }}
            />
          ))}
        </div>

        <SectionReveal className="text-center">
          <a href="https://maps.google.com/?q=Barber+Oz+Den+Haag" target="_blank" rel="noopener noreferrer"
            className="font-body text-sm transition-colors underline underline-offset-4"
            style={{ color: "rgba(107,196,187,0.7)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6BC4BB"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(107,196,187,0.7)"; }}
          >
            {t.cta} →
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
