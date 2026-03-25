import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#07111f",
        foreground: "#e8edf6",
        surface: "#0c1830",
        surfaceAlt: "#0a1427",
        card: "rgba(11, 22, 43, 0.75)",
        border: "rgba(138, 161, 197, 0.22)",
        primary: "#57a6ff",
        primaryGlow: "#86c5ff",
        amber: "#d8ab62",
        amberGlow: "#f0cb90",
        muted: "#97a5c6"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(87, 166, 255, 0.15), 0 24px 80px rgba(17, 40, 89, 0.45)",
        soft: "0 20px 50px rgba(3, 10, 24, 0.35)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(87,166,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(87,166,255,0.06) 1px, transparent 1px)",
        "premium-radial":
          "radial-gradient(circle at top, rgba(87,166,255,0.16), transparent 28%), radial-gradient(circle at 80% 20%, rgba(216,171,98,0.13), transparent 20%), radial-gradient(circle at 10% 70%, rgba(87,166,255,0.1), transparent 24%)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
