import { JetBrains_Mono } from "next/font/google";

/** Monospace for labels, numbers and the code layer; self-hosted by Next.js at build time. */
export const layersMonoFont = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-gl-mono",
});