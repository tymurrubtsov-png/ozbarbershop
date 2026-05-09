"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { SHOP } from "@/lib/constants";

type Lang = "nl" | "en";

const NAV = {
  nl: [
    { key: "services", label: "Diensten", href: "#services" },
    { key: "work",     label: "Werk",     href: "#gallery"  },
    { key: "story",    label: "Verhaal",  href: "#story"    },
    { key: "contact",  label: "Contact",  href: "#contact"  },
  ],
  en: [
    { key: "services", label: "Services", href: "#services" },
    { key: "work",     label: "Work",     href: "#gallery"  },
    { key: "story",    label: "Story",    href: "#story"    },
    { key: "contact",  label: "Contact",  href: "#contact"  },
  ],
};

export default function Navbar({
  lang, setLang, onOpenBooking,
}: {
  lang: Lang; setLang: (l: Lang) => void; onOpenBooking: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* ── Navbar ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Glass bar */}
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(9,9,11,0.85)"
              : "rgba(9,9,11,0.60)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="group flex items-center gap-1">
              <span className="font-display text-xl tracking-[0.15em] uppercase font-600 text-snow group-hover:text-blue-light transition-colors duration-200">
                Barber
              </span>
              <span className="font-display text-xl tracking-[0.15em] uppercase font-600 text-blue-light">
                &nbsp;Oz
              </span>
            </a>


            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-2">
              {NAV[lang].map((l, i) => (
                <div key={l.href} className="flex items-center">
                  {i > 0 && (
                    <span className="block w-px h-4 mx-2" style={{ background: "rgba(255,255,255,0.18)" }} />
                  )}
                  <a
                    href={l.href}
                    className="px-3 py-2 rounded-lg transition-colors duration-200"
                    style={{ color: "rgba(240,237,232,0.60)", fontFamily: "var(--font-dm-sans)", fontSize: "15px", fontWeight: 600, letterSpacing: "0.02em" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F0EDE8"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(240,237,232,0.60)"; }}
                  >
                    {l.label}
                  </a>
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher lang={lang} setLang={setLang} />

              {/* Desktop Book button */}
              <button
                onClick={onOpenBooking}
                className="hidden md:flex items-center gap-1.5 bg-blue-oz text-snow text-sm font-body font-500 px-5 py-2 rounded-full hover:bg-blue-light transition-all duration-200 hover:shadow-[0_0_20px_rgba(62,125,118,0.4)]"
              >
                {lang === "nl" ? "Afspraak" : "Book Now"}
              </button>

              {/* Hamburger — mobile only */}
              <button
                className="md:hidden p-1.5 text-snow/60 hover:text-snow"
                onClick={() => setOpen(!open)}
                aria-label="Menu"
              >
                <div className="w-5 flex flex-col gap-[5px]">
                  <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                  <span className={`block h-[1.5px] bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
                  <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40"
            style={{
              background: "rgba(9,9,11,0.96)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex flex-col">
              {NAV[lang].map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-6 py-5 font-display text-2xl font-600 text-snow/70 hover:text-snow transition-colors duration-200"
                  style={i < NAV[lang].length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.08)" } : {}}
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-3 px-6 py-5 border-t border-white/8">
                <a href={SHOP.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2.5 font-body text-sm text-snow/55 hover:text-snow rounded-xl hover:bg-white/5 transition-all">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
                <button onClick={() => { setOpen(false); onOpenBooking(); }}
                  className="flex-1 bg-blue-oz text-snow text-sm font-body font-500 py-3 rounded-full text-center">
                  {lang === "nl" ? "Afspraak Maken" : "Book Now"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
