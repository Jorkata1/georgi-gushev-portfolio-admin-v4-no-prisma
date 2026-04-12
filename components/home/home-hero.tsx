"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import { useEffect, useState } from "react";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function HomeHero() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const h = t.hero;
  const qf = t.quickFacts;
  const [ready, setReady] = useState(false);
  const controls = useAnimationControls();
  const cardControls = useAnimationControls();

  const counters = locale === "bg"
    ? [
        { value: 10, suffix: "+", label: "Проекта" },
        { value: 3, suffix: "+", label: "Години опит" },
        { value: 6, suffix: "", label: "Услуги" },
      ]
    : [
        { value: 10, suffix: "+", label: "Projects" },
        { value: 3, suffix: "+", label: "Years exp." },
        { value: 6, suffix: "", label: "Services" },
      ];

  useEffect(() => {
    function onIntroComplete() {
      setReady(true);
      controls.start("show");
      cardControls.start("show");
    }

    // If intro was already seen (sessionStorage), fire immediately
    if (sessionStorage.getItem("intro-seen") === "true") {
      onIntroComplete();
    }

    window.addEventListener("intro-complete", onIntroComplete);
    return () => window.removeEventListener("intro-complete", onIntroComplete);
  }, [controls, cardControls]);

  return (
    <section className="relative overflow-hidden border-b border-white/6">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-x-0 top-[-8rem] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(79,156,247,0.2),transparent_56%)]" />
      <div className="absolute right-0 top-0 h-[20rem] w-[20rem] bg-[radial-gradient(circle,rgba(232,164,74,0.08),transparent_60%)]" />

      <Container className="section-padding relative">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div variants={stagger} initial="hidden" animate={controls}>
            {/* Eyebrow */}
            <motion.span className="eyebrow" variants={fadeUp}>
              <Sparkles size={14} />
              <span className="sm:hidden">
                {locale === "bg" ? "Дизайн / Уеб / Дигитално" : "Design / Web / Digital"}
              </span>
              <span className="hidden sm:inline">{h.eyebrow}</span>
            </motion.span>

            {/* Title */}
            <motion.h1
              className="mt-4 text-balance font-semibold leading-[1.08] tracking-tight text-white lg:mt-6"
              style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" }}
              variants={fadeUp}
            >
              <span className="text-2xl sm:text-5xl lg:text-7xl">{h.title}</span>
              <span className="mt-1 block text-gradient text-2xl sm:text-5xl lg:text-7xl">
                {h.titleAccent}
              </span>
            </motion.h1>

            {/* Animated gradient line */}
            <motion.div
              className="relative mt-3 h-[2px] overflow-hidden rounded-full sm:mt-5"
              style={{ width: "min(65%, 280px)" }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={ready ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #e8a44a, #7ab8ff, #4f9cf7, #e8a44a)",
                  backgroundSize: "300% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-lg"
              variants={fadeUp}
            >
              <span className="sm:hidden">
                {locale === "bg"
                  ? "Уеб дизайн, бранд идентичност, визуално обновяване и QA подобрения за по-силно дигитално присъствие."
                  : "Web design, brand identity, visual refresh and QA improvements for a stronger digital presence."}
              </span>
              <span className="hidden sm:inline">{h.description}</span>
            </motion.p>

            {/* Tagline — desktop only */}
            <motion.p
              className="mt-3 hidden max-w-2xl text-base text-slate-400 sm:block lg:mt-4"
              variants={fadeUp}
            >
              {h.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4"
              variants={fadeUp}
            >
              <Link href="/services" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  {h.viewServices}
                  <ArrowRight size={16} />
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
                <Link href="/portfolio">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {h.viewProjects}
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {h.sendInquiry}
                  </Button>
                </Link>
              </div>

              <a
                href="/Georgi-Gushev-CV.pdf"
                download
                className="inline-flex items-center justify-center gap-2 text-xs text-slate-400 transition hover:text-accent sm:ml-1 sm:text-sm"
              >
                <Download size={14} />
                {h.downloadCV}
              </a>
            </motion.div>

            {/* Animated counters */}
            <motion.div
              className="mt-8 grid grid-cols-3 gap-4 rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4 sm:mt-10 sm:p-6"
              variants={fadeUp}
            >
              {counters.map((counter) => (
                <AnimatedCounter
                  key={counter.label}
                  value={counter.value}
                  suffix={counter.suffix}
                  label={counter.label}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right column */}
          <div className="relative lg:pt-16">
            {/* Desktop hero image */}
            <motion.div
              className="pointer-events-none absolute -top-16 right-0 z-20 hidden w-[210px] select-none lg:block xl:-top-20 xl:w-[280px]"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Image
                src="/hero/georgi-hero.png"
                alt="Георги Гушев"
                width={900}
                height={1400}
                priority
                className="h-auto w-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              />
            </motion.div>

            <motion.div
              className="surface-strong relative overflow-hidden p-5 sm:p-8"
              variants={fadeScale}
              initial="hidden"
              animate={cardControls}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,156,247,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(232,164,74,0.1),transparent_25%)]" />

              <div className="relative grid gap-3 sm:gap-4">
                <div className="hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 pr-20 sm:block lg:pr-28 xl:pr-36">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {h.whatIOffer}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {h.offerDescription}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {qf.map((fact, index) => (
                    <motion.div
                      key={fact.label}
                      className="flex h-full min-w-0 flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-3 sm:p-4"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.5 + index * 0.12,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      whileHover={{
                        borderColor: "rgba(232, 164, 74, 0.25)",
                        transition: { duration: 0.3 },
                      }}
                    >
                      <p className="text-[9px] uppercase tracking-[0.12em] leading-[1.3] text-accent/70 sm:text-[10px] sm:tracking-[0.14em]">
                        {fact.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-snug text-white sm:mt-3 sm:text-lg">
                        {fact.value}
                      </p>
                      <p className="mt-1 hidden text-sm leading-5 text-slate-400 sm:mt-2 sm:block">
                        {fact.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}