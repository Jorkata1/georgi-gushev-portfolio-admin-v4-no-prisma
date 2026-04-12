"use client";

import { motion } from "framer-motion";

const tools = [
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Blender",
  "Cinema 4D",
  "CorelDRAW",
  "HTML / CSS",
  "Python",
  "Jira",
  "Git",
  "Next.js",
  "Tailwind CSS",
  "Vercel",
  "Supabase",
];

export function ToolsMarquee() {
  // Double the array for seamless loop
  const items = [...tools, ...tools];

  return (
    <div className="relative overflow-hidden py-8 sm:py-12">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

      <motion.div
        className="flex w-max gap-4 sm:gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      >
        {items.map((tool, index) => (
          <div
            key={`${tool}-${index}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-5 py-2.5 text-sm text-slate-300 backdrop-blur-sm transition-colors duration-300 hover:border-accent/25 hover:text-white sm:px-6 sm:py-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
            {tool}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
