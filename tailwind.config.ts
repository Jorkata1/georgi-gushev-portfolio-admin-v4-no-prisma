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
        background: "#060e1a",
        foreground: "#e8edf6",
        surface: "#0b1a30",
        surfaceAlt: "#091425",
        card: "rgba(10, 20, 40, 0.8)",
        border: "rgba(138, 161, 197, 0.18)",
        primary: "#4f9cf7",
        primaryGlow: "#7ab8ff",
        accent: "#e8a44a",
        accentGlow: "#f4c97a",
        amber: "#e8a44a",
        amberGlow: "#f4c97a",
        muted: "#8a9bbd",
        subtle: "rgba(255, 255, 255, 0.04)"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(79, 156, 247, 0.12), 0 24px 80px rgba(10, 30, 70, 0.5)",
        soft: "0 20px 50px rgba(3, 8, 20, 0.4)",
        "accent-glow": "0 0 30px rgba(232, 164, 74, 0.15)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(79, 156, 247, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 156, 247, 0.05) 1px, transparent 1px)",
        "premium-radial":
          "radial-gradient(circle at top, rgba(79, 156, 247, 0.14), transparent 28%), radial-gradient(circle at 80% 20%, rgba(232, 164, 74, 0.1), transparent 20%), radial-gradient(circle at 10% 70%, rgba(79, 156, 247, 0.08), transparent 24%)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;