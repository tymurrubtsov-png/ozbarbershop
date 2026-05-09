"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { GALLERY_IMAGES, BEFORE_AFTER } from "@/lib/constants";

type BeforeAfterItem = { combined: string; label: { nl: string; en: string } } | { before: string; after: string; label: string };

type Lang = "nl" | "en";

const T = {
  nl: { label: "Ons Werk", heading: "Resultaten die spreken", sub: "Elk werk vertelt een verhaal — voor en na, het verschil is alles.", beforeAfter: "Voor & Na", gallery: "Gallerij", before: "Voor", after: "Na" },
  en: { label: "Our Work", heading: "Results that speak", sub: "Every piece tells a story — before and after, the difference is everything.", beforeAfter: "Before & After", gallery: "Gallery", before: "Before", after: "After" },
};

function BeforeAfterSlider({ before, after, label, t }: { before: string; after: string; label: string; t: typeof T.nl }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPos(x * 100);
  };

  return (
    <div className="rounded-2xl overflow-hidden">
      <div
        ref={ref}
        className="relative aspect-[4/5] cursor-col-resize select-none"
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        <Image src={after} alt={`${label} after`} fill className="object-cover" unoptimized />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt={`${label} before`} fill className="object-cover" unoptimized />
        </div>
        <div className="absolute top-0 bottom-0 w-0.5 shadow-md" style={{ left: `${pos}%`, background: "rgba(255,255,255,0.8)" }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full shadow-lg flex items-center justify-center"
            style={{ background: "#F0EDE8" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#3E7D76" strokeWidth="2" className="w-4 h-4">
              <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>
        <span className="absolute top-3 left-3 font-body text-xs tracking-widest uppercase px-2 py-0.5 rounded"
          style={{ color: "rgba(245,245,247,0.8)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
          {t.before}
        </span>
        <span className="absolute top-3 right-3 font-body text-xs tracking-widest uppercase px-2 py-0.5 rounded"
          style={{ color: "rgba(245,245,247,0.8)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
          {t.after}
        </span>
      </div>
      <p className="text-center font-body text-sm mt-3" style={{ color: "rgba(245,245,247,0.40)" }}>{label}</p>
    </div>
  );
}

function CombinedSlider({ src, label, t }: { src: string; label: string; t: typeof T.nl }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div className="rounded-2xl overflow-hidden">
      <div
        ref={ref}
        className="relative aspect-[4/3] cursor-col-resize select-none"
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* After = right half of combined image */}
        <Image src={src} alt={`${label} after`} fill className="object-cover" style={{ objectPosition: "100% center" }} unoptimized />
        {/* Before = left half, clipped to reveal slider position */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={src} alt={`${label} before`} fill className="object-cover" style={{ objectPosition: "0% center" }} unoptimized />
        </div>
        {/* Slider handle */}
        <div className="absolute top-0 bottom-0 w-0.5 shadow-md" style={{ left: `${pos}%`, background: "rgba(255,255,255,0.8)" }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full shadow-lg flex items-center justify-center"
            style={{ background: "#F0EDE8" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#3E7D76" strokeWidth="2" className="w-4 h-4">
              <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>
        <span className="absolute top-3 left-3 font-body text-xs tracking-widest uppercase px-2 py-0.5 rounded"
          style={{ color: "rgba(245,245,247,0.8)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
          {t.before}
        </span>
        <span className="absolute top-3 right-3 font-body text-xs tracking-widest uppercase px-2 py-0.5 rounded"
          style={{ color: "rgba(245,245,247,0.8)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
          {t.after}
        </span>
      </div>
      <p className="text-center font-body text-sm mt-3" style={{ color: "rgba(245,245,247,0.40)" }}>{label}</p>
    </div>
  );
}

export default function Gallery({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [tab, setTab] = useState<"gallery" | "before-after">("gallery");

  return (
    <section id="gallery" className="py-28 md:py-36" style={{ background: "#0A1210" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader label={t.label} heading={t.heading} sub={t.sub} />

        {/* Tab switcher */}
        <SectionReveal className="flex justify-center gap-2 mb-12">
          {(["gallery", "before-after"] as const).map((tab_) => (
            <button
              key={tab_}
              onClick={() => setTab(tab_)}
              className="font-body text-sm px-6 py-2.5 rounded-full transition-all duration-200"
              style={tab === tab_
                ? { background: "#3E7D76", color: "#F0EDE8" }
                : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(245,245,247,0.55)" }
              }
            >
              {tab_ === "gallery" ? t.gallery : t.beforeAfter}
            </button>
          ))}
        </SectionReveal>

        {tab === "gallery" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <SectionReveal key={img.src} delay={i * 0.06}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                  <div className="absolute inset-0 transition-colors duration-300 group-hover:bg-black/20" />
                  <span className="absolute bottom-3 left-3 font-body text-xs tracking-widest uppercase opacity-0 group-hover:opacity-90 transition-opacity duration-300"
                    style={{ color: "#F0EDE8" }}>
                    {img.label}
                  </span>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-8 max-w-3xl mx-auto">
            {BEFORE_AFTER.map((item: BeforeAfterItem, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                {"combined" in item ? (
                  <CombinedSlider src={item.combined} label={typeof item.label === "object" ? item.label[lang] : item.label} t={t} />
                ) : (
                  <BeforeAfterSlider before={item.before} after={item.after} label={item.label} t={t} />
                )}
              </SectionReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
