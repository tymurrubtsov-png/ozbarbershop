"use client";

type Lang = "nl" | "en";

export default function LanguageSwitcher({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="relative flex items-center bg-ink/8 rounded-full p-0.5 border border-ink/10">
      {/* Sliding pill */}
      <div
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-blue-oz transition-all duration-300 ease-in-out"
        style={{ left: lang === "nl" ? "2px" : "calc(50%)" }}
      />
      {(["nl", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`relative z-10 px-3 py-1 font-body text-xs tracking-widest uppercase font-500 transition-colors duration-300 ${
            lang === l ? "text-cream" : "text-ink/50 hover:text-ink/80"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
