"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";

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

  return (
    <section className="relative overflow-hidden border-b border-white/6">
      <div className="hero-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-x-0 top-[-8rem] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(79,156,247,0.2),transparent_56%)]" />
      <div className="absolute right-0 top-0 h-[20rem] w-[20rem] bg-[radial-gradient(circle,rgba(232,164,74,0.08),transparent_60%)]" />

      <Container className="section-padding relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.span className="eyebrow" variants={fadeUp}>
              <Sparkles size={14} />
              {h.eyebrow}
            </motion.span>

            <motion.h1
              className="hero-title mt-6 text-balance"
              variants={fadeUp}
            >
              {h.title}
              <span className="mt-1 block text-gradient">{h.titleAccent}</span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-lg text-slate-300"
              variants={fadeUp}
            >
              {h.description}
            </motion.p>

            <motion.p
              className="mt-4 max-w-2xl text-base text-slate-400"
              variants={fadeUp}
            >
              {h.tagline}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              variants={fadeUp}
            >
              <Link href="/services">
                <Button>
                  {h.viewServices}
                  <ArrowRight size={16} />
                </Button>
              </Link>

              <Link href="/portfolio">
                <Button variant="secondary">{h.viewProjects}</Button>
              </Link>

              <Link href="/contact">
                <Button variant="ghost">{h.sendInquiry}</Button>
              </Link>

              <a href="/Georgi-Gushev-CV.pdf" download>
                <Button variant="ghost">
                  {h.downloadCV}
                  <Download size={16} />
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <div className="relative pt-10 lg:pt-16">
            <motion.div
              className="pointer-events-none absolute -top-16 right-0 z-20 hidden w-[210px] select-none lg:block xl:-top-20 xl:w-[280px]"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
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
              className="surface-strong relative overflow-hidden p-6 sm:p-8"
              variants={fadeScale}
              initial="hidden"
              animate="show"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,156,247,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(232,164,74,0.1),transparent_25%)]" />

              <div className="relative grid gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 pr-20 lg:pr-28 xl:pr-36">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {h.whatIOffer}
                  </p>

                  <p className="mt-3 text-2xl font-semibold text-white">
                    {h.offerDescription}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {qf.map((fact, index) => (
                    <motion.div
                      key={fact.label}
                      className="flex h-full min-w-0 flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.6 + index * 0.1,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <p className="text-[10px] uppercase tracking-[0.14em] leading-[1.3] text-accent/70">
                        {fact.label}
                      </p>

                      <p className="mt-3 text-base font-semibold leading-snug text-white sm:text-lg">
                        {fact.value}
                      </p>

                      <p className="mt-2 text-sm leading-5 text-slate-400">
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