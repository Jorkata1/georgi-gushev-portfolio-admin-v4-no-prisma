"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowLeft, ArrowUpRight, Target, Layers, CheckCircle2, X } from "lucide-react";
import { Container } from "@/components/shared/container";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";

const BLUR_DATA_URL =
  "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const staggerList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const listItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

type ProjectDetailsClientProps = { project: Project };

export function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const { locale } = useLanguage();
  const t = translations[locale];
  const p = t.portfolio;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.08]), {
    stiffness: 80,
    damping: 20,
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      {/* ── Cinematic Hero ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[480px] overflow-hidden">
        {/* Parallax image */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroY }}
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

        {/* Content pinned to bottom */}
        <motion.div
          className="absolute inset-x-0 bottom-0"
          style={{ opacity: heroOpacity }}
        >
          <Container className="pb-10 sm:pb-14">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} custom={0}>
                <Link
                  href="/portfolio"
                  className="mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400 transition hover:text-accent"
                >
                  <ArrowLeft size={14} />
                  {p.backToPortfolio}
                </Link>
              </motion.div>

              <motion.span
                className="eyebrow"
                variants={fadeUp}
                custom={0.05}
              >
                {project.category}
              </motion.span>

              <motion.h1
                className="display-title mt-3 max-w-3xl text-balance"
                variants={fadeUp}
                custom={0.12}
              >
                {project.title}
              </motion.h1>

              <motion.div
                className="mt-5 flex flex-wrap items-center gap-3"
                variants={fadeUp}
                custom={0.2}
              >
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accentGlow">
                  {project.year}
                </span>
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm"
                  >
                    {tool}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </motion.div>
      </section>

      {/* ── Summary + Stats ─────────────────────────────────────────── */}
      <section className="section-padding-sm border-b border-white/6">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0}
            >
              <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                {project.summary}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              {[
                { label: p.goals, value: project.goals.length, icon: Target },
                { label: p.steps, value: project.process.length, icon: Layers },
                { label: p.results, value: project.outcome.length, icon: CheckCircle2 },
              ].map(({ label, value, icon: Icon }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  custom={0}
                  className="surface-strong flex flex-col items-center justify-center gap-2 p-5 text-center"
                >
                  <Icon size={16} className="text-accent/70" />
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Gallery ─────────────────────────────────────────────────── */}
      {project.gallery.length > 0 && (
        <section className="section-padding border-b border-white/6">
          <Container>
            <motion.div
              className="grid gap-4 sm:gap-5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              {/* First image — full width */}
              <GalleryImage
                src={project.gallery[0]}
                alt={`${project.title} 1`}
                tall
                onClick={() => setLightboxSrc(project.gallery[0])}
              />

              {/* Remaining — 2 col grid */}
              {project.gallery.length > 1 && (
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {project.gallery.slice(1).map((src, i) => (
                    <GalleryImage
                      key={src}
                      src={src}
                      alt={`${project.title} ${i + 2}`}
                      onClick={() => setLightboxSrc(src)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </Container>
        </section>
      )}

      {/* ── Goals / Process / Outcome ───────────────────────────────── */}
      <section className="section-padding border-b border-white/6">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <InfoCard
              title={p.goals}
              items={project.goals}
              accentColor="accent"
              numberedDots
            />
            <InfoCard
              title={p.process}
              items={project.process}
              accentColor="primary"
              numbered
            />
            <InfoCard
              title={p.result}
              items={project.outcome}
              accentColor="accent"
              checkmarks
            />
          </div>
        </Container>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="section-padding">
        <Container>
          <motion.div
            className="surface-strong relative overflow-hidden p-8 sm:p-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,164,74,0.12),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(79,156,247,0.08),transparent_40%)]" />

            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="eyebrow">{p.nextStep}</span>
                <h2 className="section-title mt-3 text-balance">{p.nextStepTitle}</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  {p.nextStepDescription}
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-semibold text-accentGlow transition-all duration-300 hover:bg-accent/20 hover:shadow-[0_0_24px_rgba(232,164,74,0.2)]"
              >
                {p.letsTalk}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxSrc(null)}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-5xl w-full"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxSrc(null)}
                className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <X size={16} />
              </button>
              <Image
                src={lightboxSrc}
                alt="Gallery image"
                width={1600}
                height={1000}
                className="h-auto max-h-[90vh] w-full rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Gallery Image ────────────────────────────────────────────────────────────

function GalleryImage({
  src,
  alt,
  tall = false,
  onClick,
}: {
  src: string;
  alt: string;
  tall?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      className={`group surface relative cursor-zoom-in overflow-hidden ${tall ? "min-h-[320px] sm:min-h-[500px]" : "min-h-[220px] sm:min-h-[340px]"}`}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1100px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Zoom hint */}
      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <ArrowUpRight size={14} />
      </div>
    </motion.div>
  );
}

// ─── Info Card ────────────────────────────────────────────────────────────────

function InfoCard({
  title,
  items,
  accentColor,
  numbered = false,
  numberedDots = false,
  checkmarks = false,
}: {
  title: string;
  items: string[];
  accentColor: "accent" | "primary";
  numbered?: boolean;
  numberedDots?: boolean;
  checkmarks?: boolean;
}) {
  const dotColor =
    accentColor === "accent" ? "bg-accent/60" : "bg-primary/60";

  return (
    <motion.article
      className="surface p-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>

      <motion.ul
        className="mt-5 space-y-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerList}
      >
        {items.map((item, i) => (
          <motion.li
            key={item}
            variants={listItem}
            className="flex gap-3 text-sm leading-relaxed text-slate-300"
          >
            {numbered ? (
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                  accentColor === "accent"
                    ? "bg-accent/15 text-accentGlow"
                    : "bg-primary/15 text-primaryGlow"
                }`}
              >
                {i + 1}
              </span>
            ) : checkmarks ? (
              <CheckCircle2
                size={15}
                className="mt-0.5 shrink-0 text-accentGlow"
              />
            ) : (
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} />
            )}
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.article>
  );
}