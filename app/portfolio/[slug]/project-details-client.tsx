"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";

const BLUR_DATA_URL =
  "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
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
  const heroScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 1.1]),
    { stiffness: 60, damping: 20 }
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const allImages = [project.heroImage, ...project.gallery];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function closeLightbox() { setLightboxIndex(null); }
  function lightboxPrev() {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + allImages.length) % allImages.length
    );
  }
  function lightboxNext() {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % allImages.length
    );
  }

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <>
      {/* ── Cinematic Hero ── */}
      <section ref={heroRef} className="relative h-[75vh] min-h-[600px] sm:h-[85vh] sm:min-h-[560px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: heroScale, y: heroY }}>
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(232,164,74,0.06),transparent_50%)]" />

        <motion.div className="absolute inset-x-0 bottom-0" style={{ opacity: heroOpacity }}>
          <Container className="pb-12 sm:pb-16 lg:pb-20">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp}>
                <Link
                  href="/portfolio"
                  className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-400 transition-colors duration-300 hover:text-accent"
                >
                  <ArrowLeft size={13} />
                  {p.backToPortfolio}
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                <span className="eyebrow">{project.category}</span>
                <span className="h-px w-8 bg-accent/40" />
                <span className="text-xs font-medium text-accent/80 tracking-widest">{project.year}</span>
              </motion.div>

              <motion.h1 className="display-title max-w-4xl text-balance leading-[1.06]" variants={fadeUp}>
                {project.title}
              </motion.h1>

              <motion.div className="mt-6 flex flex-wrap gap-2" variants={fadeUp}>
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm"
                  >
                    {tool}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            className="h-8 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── Meta Bar ── */}
      <div className="border-b border-white/6 bg-background/60 backdrop-blur-sm">
        <Container>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
            <MetaItem label={locale === "bg" ? "Категория" : "Category"} value={project.category} />
            <MetaItem label={locale === "bg" ? "Година" : "Year"} value={project.year} />
            <MetaItem
              label={locale === "bg" ? "Инструменти" : "Tools"}
              value={project.tools.join(" · ")}
            />
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-2 text-xs font-semibold text-accentGlow transition-all duration-300 hover:bg-accent/15 hover:border-accent/40"
              >
                <ExternalLink size={12} />
                {locale === "bg" ? "Виж онлайн" : "View live"}
              </a>
            )}
          </div>
        </Container>
      </div>

      {/* ── 01 За проекта ── */}
      <NarrativeSection num="01" label={locale === "bg" ? "За проекта" : "About the project"}>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-20">
          <motion.p
            className="text-lg leading-relaxed text-slate-200 sm:text-xl sm:leading-loose"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            {project.summary}
          </motion.p>

          {project.excerpt && project.excerpt !== project.summary && (
            <motion.div
              className="lg:w-64 shrink-0"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
                <p className="text-sm leading-relaxed text-slate-300 italic">
                  &ldquo;{project.excerpt}&rdquo;
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </NarrativeSection>

      {/* ── 02 Цели ── */}
      {project.goals.length > 0 && (
        <NarrativeSection num="02" label={locale === "bg" ? "Цели" : "Goals"} alt>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.goals.map((goal, i) => (
              <motion.div
                key={goal}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-500 hover:border-accent/25 hover:bg-accent/[0.04]"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span
                  className="absolute -right-2 -top-3 font-semibold text-white/[0.04] select-none pointer-events-none"
                  style={{ fontSize: "5rem", lineHeight: 1, fontFamily: "Georgia, serif" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="relative text-sm leading-relaxed text-slate-200 sm:text-base">{goal}</p>
              </motion.div>
            ))}
          </div>
        </NarrativeSection>
      )}

      {/* ── 03 Визуали ── */}
      {project.gallery.length > 0 && (
        <NarrativeSection
          num="03"
          label={locale === "bg" ? "Визуали" : "Visuals"}
          fullWidthMedia
        >
          <ProjectGallery
            images={project.gallery}
            title={project.title}
            onOpen={(i) => setLightboxIndex(i + 1)}
          />
        </NarrativeSection>
      )}

      {/* ── 04 Процес ── */}
      {project.process.length > 0 && (
        <NarrativeSection
          num={project.gallery.length > 0 ? "04" : "03"}
          label={locale === "bg" ? "Процес" : "Process"}
        >
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-primary/20 to-transparent hidden sm:block" />
            <div className="flex flex-col gap-0">
              {project.process.map((step, i) => (
                <motion.div
                  key={step}
                  className="relative flex gap-6 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="relative z-10 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-background text-xs font-semibold text-accentGlow">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </NarrativeSection>
      )}

      {/* ── 05 Резултати ── */}
      {project.outcome.length > 0 && (
        <NarrativeSection
          num={project.gallery.length > 0 ? "05" : project.process.length > 0 ? "04" : "03"}
          label={locale === "bg" ? "Резултати" : "Outcomes"}
          alt
        >
          <div className="grid gap-3 sm:gap-4">
            {project.outcome.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/14 hover:bg-white/[0.04]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-semibold text-accentGlow">
                  ✓
                </span>
                <p className="text-sm leading-relaxed text-slate-200 sm:text-base">{item}</p>
              </motion.div>
            ))}
          </div>
        </NarrativeSection>
      )}

      {/* ── 06 Live ── */}
      {project.liveUrl && (
        <NarrativeSection
          num={getLiveNum(project)}
          label="Live"
        >
          <LiveSiteSection url={project.liveUrl} title={project.title} locale={locale} />
        </NarrativeSection>
      )}

      {/* ── CTA ── */}
      <section className="section-padding">
        <Container>
          <motion.div
            className="surface-strong relative overflow-hidden p-8 sm:p-12 lg:p-16"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,164,74,0.1),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(79,156,247,0.07),transparent_40%)]" />
            <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="eyebrow">{p.nextStep}</span>
                <h2 className="section-title mt-3 text-balance">
                  {locale === "bg" ? "Имаш подобен проект?" : "Have a similar project?"}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  {locale === "bg"
                    ? "Нека поговорим за целите ти и как мога да помогна с дизайн, изработка или подобрения."
                    : "Let's talk about your goals and how I can help with design, development or improvements."}
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-semibold text-accentGlow transition-all duration-300 hover:bg-accent/20 hover:shadow-[0_0_28px_rgba(232,164,74,0.2)]"
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

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative flex max-h-[92vh] max-w-6xl w-full items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[lightboxIndex]}
                alt={`${project.title} — ${lightboxIndex + 1} / ${allImages.length}`}
                width={1600}
                height={1000}
                className="h-auto max-h-[88vh] w-full rounded-2xl object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white/70 backdrop-blur-sm tabular-nums">
                {lightboxIndex + 1} / {allImages.length}
              </div>
              <button
                onClick={closeLightbox}
                aria-label="Затвори"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <X size={16} />
              </button>
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                    aria-label="Предишна снимка"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                    aria-label="Следваща снимка"
                    className="absolute right-14 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── NarrativeSection ─────────────────────────────────────────────────────────

function NarrativeSection({
  num,
  label,
  children,
  alt = false,
  fullWidthMedia = false,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
  alt?: boolean;
  fullWidthMedia?: boolean;
}) {
  return (
    <section className={`border-b border-white/6 ${alt ? "bg-white/[0.015]" : ""}`}>
      <Container>
        {/* Section header */}
        <motion.div
          className="flex items-baseline gap-4 pb-8 pt-14 sm:pt-20 lg:pt-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span
            className="shrink-0 font-semibold text-white/10 select-none tabular-nums"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, fontFamily: "Georgia, serif" }}
            aria-hidden
          >
            {num}
          </span>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-accent/50" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              {label}
            </h2>
          </div>
        </motion.div>

        {/* Content */}
        <div className="pb-14 sm:pb-20 lg:pb-24">
          {children}
        </div>
      </Container>
    </section>
  );
}

// ─── MetaItem ─────────────────────────────────────────────────────────────────

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">{label}</span>
      <span className="text-xs font-medium text-slate-200">{value}</span>
    </div>
  );
}

// ─── ProjectGallery ───────────────────────────────────────────────────────────

function ProjectGallery({
  images,
  title,
  onOpen,
}: {
  images: string[];
  title: string;
  onOpen: (index: number) => void;
}) {
  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* First image — full bleed */}
      <GalleryImage
        src={images[0]}
        alt={`${title} — visual 1`}
        tall
        onClick={() => onOpen(0)}
      />
      {images.length > 1 && (
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {images.slice(1).map((src, i) => (
            <GalleryImage
              key={src}
              src={src}
              alt={`${title} — visual ${i + 2}`}
              onClick={() => onOpen(i + 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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
    <motion.button
      type="button"
      aria-label={`Увеличи: ${alt}`}
      className={`group relative w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
        tall
          ? "min-h-[280px] sm:min-h-[500px] lg:min-h-[600px]"
          : "min-h-[200px] sm:min-h-[340px]"
      }`}
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
        <ArrowUpRight size={14} />
      </div>
    </motion.button>
  );
}

// ─── LiveSiteSection ──────────────────────────────────────────────────────────

function LiveSiteSection({
  url,
  title,
  locale,
}: {
  url: string;
  title: string;
  locale: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    function rescale() {
      if (!container || !inner) return;
      const scale = container.clientWidth / 1280;
      inner.style.transform = `scale(${scale})`;
      container.style.height = `${Math.round(800 * scale)}px`;
    }

    rescale();
    const ro = new ResizeObserver(rescale);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          {locale === "bg" ? "Разгледай проекта на живо" : "Browse the live project"}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold text-accentGlow transition-all duration-300 hover:bg-accent/20"
        >
          <ExternalLink size={12} />
          {locale === "bg" ? "Отвори сайта" : "Open site"}
          <ArrowUpRight
            size={12}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      <div className="surface overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/8 bg-white/[0.03] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-md border border-white/8 bg-white/5 px-3 py-1">
            <span className="text-[11px] text-slate-500">{url.replace("https://", "")}</span>
          </div>
        </div>

        <div ref={containerRef} className="relative w-full overflow-hidden bg-slate-950">
          <div
            ref={innerRef}
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: "1280px", height: "800px" }}
          >
            <iframe
              src={url}
              title={`Live preview — ${title}`}
              className="border-0"
              style={{ width: "1280px", height: "800px" }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 hover:opacity-100"
            aria-label={`${locale === "bg" ? "Отвори" : "Open"} ${title}`}
          >
            <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11px] text-white backdrop-blur-sm">
              <ExternalLink size={11} />
              {locale === "bg" ? "Отвори в нов таб" : "Open in new tab"}
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLiveNum(project: Project): string {
  let n = 1; // 01 = summary always
  if (project.goals.length > 0) n++;
  if (project.gallery.length > 0) n++;
  if (project.process.length > 0) n++;
  if (project.outcome.length > 0) n++;
  n++; // live is the next one
  return String(n).padStart(2, "0");
}