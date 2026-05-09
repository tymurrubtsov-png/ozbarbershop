import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F7F2EC",
          dark: "#EDE5D8",
        },
        blue: {
          oz: "#3A5A7C",
          light: "#5578A0",
          dark: "#2A4260",
        },
        brown: {
          oz: "#8B6347",
          light: "#A8785A",
          dark: "#6A4A32",
        },
        ink: "#1A1A1A",
        muted: "#6B6560",
        accent: "#E8D9C8",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem,8vw,7rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem,5vw,4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem,3.5vw,3rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        section: "clamp(4rem,8vw,8rem)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25,0.46,0.45,0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
