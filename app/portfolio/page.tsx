"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Wrench } from "lucide-react";
import { Container } from "@/components/shared/container";
import { useLanguage } from "@/lib/language-context";

// Target: 21 April 2026, 00:00 Sofia time (5 days from 16 April).
// Using a fixed ISO date instead of Date.now() + 5d so the countdown
// doesn't restart every time someone reloads the page.
// Update this value if you want to change the target date.
const TARGET_DATE = new Date("2026-04-21T00:00:00+03:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function calculateTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false
  };
}

export default function PortfolioPage() {
  const { locale } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // Hydration-safe: compute time only on the client so the server-rendered
  // HTML doesn't embed a stale timestamp that mismatches the browser clock.
  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const copy =
    locale === "bg"
      ? {
          eyebrow: "Профилактика",
          title: "Страницата в момента е в профилактика",
          description:
            "Работим по подобрения, за да заредим проектите по-бързо и качествено. Извиняваме се за причиненото неудобство.",
          countdownTitle: "Услугата ще бъде възстановена след",
          labels: { days: "Дни", hours: "Часа", minutes: "Мин.", seconds: "Сек." },
          backHome: "Върни се в началото",
          contact: "Свържи се с мен"
        }
      : {
          eyebrow: "Maintenance",
          title: "This page is currently under maintenance",
          description:
            "We're working on improvements to load projects faster and better. Sorry for the inconvenience.",
          countdownTitle: "Service will be restored in",
          labels: { days: "Days", hours: "Hours", minutes: "Min.", seconds: "Sec." },
          backHome: "Back to home",
          contact: "Get in touch"
        };

  const units: Array<{ key: keyof Omit<TimeLeft, "expired">; label: string }> = [
    { key: "days", label: copy.labels.days },
    { key: "hours", label: copy.labels.hours },
    { key: "minutes", label: copy.labels.minutes },
    { key: "seconds", label: copy.labels.seconds }
  ];

  return (
    <section className="section-padding min-h-[70vh] flex items-center">
      <Container>
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Wrench size={28} className="text-accent" />
          </motion.div>

          <span className="eyebrow justify-center">{copy.eyebrow}</span>

          <h1 className="display-title mt-5 text-balance">{copy.title}</h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            {copy.description}
          </p>

          {/* Countdown */}
          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              {copy.countdownTitle}
            </p>

            <div
              className="mt-5 grid grid-cols-4 gap-2 sm:gap-4"
              role="timer"
              aria-live="polite"
              aria-atomic="true"
              aria-label={copy.countdownTitle}
            >
              {units.map(({ key, label }) => {
                const value = timeLeft ? timeLeft[key] : 0;
                return (
                  <motion.div
                    key={key}
                    className="surface flex flex-col items-center justify-center p-3 sm:p-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <span
                      className="text-2xl font-semibold tabular-nums text-white sm:text-4xl"
                      suppressHydrationWarning
                    >
                      {timeLeft ? String(value).padStart(2, "0") : "--"}
                    </span>
                    <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                      {label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-accent/30 hover:bg-accent/10 hover:text-white"
            >
              <ArrowLeft size={16} />
              {copy.backHome}
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accentGlow transition hover:bg-accent/20"
            >
              {copy.contact}
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}