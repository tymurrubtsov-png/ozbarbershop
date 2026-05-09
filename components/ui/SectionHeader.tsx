"use client";
import SectionReveal from "./SectionReveal";

export default function SectionHeader({
  label,
  heading,
  sub,
  align = "center",
}: {
  label: string;
  heading: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <SectionReveal className={`mb-16 ${center ? "text-center" : ""}`}>
      {/* Label row */}
      <div className={`flex items-center gap-4 mb-6 ${center ? "justify-center" : ""}`}>
        <div className="h-px w-8" style={{ background: "rgba(62,125,118,0.5)" }} />
        <span
          className="font-body text-[11px] tracking-[0.35em] uppercase font-500"
          style={{ color: "rgba(107,196,187,0.8)" }}
        >
          {label}
        </span>
        <div className="h-px w-8" style={{ background: "rgba(62,125,118,0.5)" }} />
      </div>

      {/* Heading */}
      <h2 className="font-display heading-lg" style={{ color: "#F0EDE8" }}>
        {heading}
      </h2>

      {/* Sub */}
      {sub && (
        <p
          className={`font-body text-base md:text-lg leading-relaxed mt-5 ${center ? "mx-auto" : ""} max-w-xl`}
          style={{ color: "rgba(245,245,247,0.55)" }}
        >
          {sub}
        </p>
      )}
    </SectionReveal>
  );
}
