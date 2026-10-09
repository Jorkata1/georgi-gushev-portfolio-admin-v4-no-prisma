"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
  /** "compact" keeps the hero stats inside the first screen on laptops. */
  size?: "default" | "compact";
};

const NUMBER_SIZE_CLASSES = {
  default: "text-3xl sm:text-4xl lg:text-5xl",
  compact: "text-3xl sm:text-4xl"
} as const;

const COUNT_EASE = [0.16, 1, 0.3, 1] as const;

export function AnimatedCounter({ value, suffix = "", label, duration = 2, size = "default" }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  // Start from the real value so the server HTML (search engines, link previews, no-JS) never shows "0+".
  const [count, setCount] = useState(value);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }
    if (!isInView) return;

    // The block is still fading in at this point, so restarting from 0 is not visible as a jump.
    const controls = animate(0, value, {
      duration,
      ease: COUNT_EASE,
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value, duration, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-1 sm:gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="sr-only">
        {value}
        {suffix} {label}
      </span>
      <span aria-hidden="true" className={`${NUMBER_SIZE_CLASSES[size]} font-bold tabular-nums text-white`}>
        {count}
        <span className="text-accent">{suffix}</span>
      </span>
      <span
        aria-hidden="true"
        className="text-center text-[9px] uppercase tracking-[0.12em] text-slate-400 sm:text-xs sm:tracking-[0.2em]"
      >
        {label}
      </span>
    </motion.div>
  );
}
