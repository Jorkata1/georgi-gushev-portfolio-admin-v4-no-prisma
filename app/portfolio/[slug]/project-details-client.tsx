"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Container } from "@/components/shared/container";
import { LivePreviewDialog } from "@/components/portfolio/project/live-preview-dialog";
import { EASE_OUT } from "@/components/portfolio/project/motion-presets";
import { ProjectApproachTabs, type ApproachTab } from "@/components/portfolio/project/project-approach-tabs";
import { ProjectFacts } from "@/components/portfolio/project/project-facts";
import { ProjectLightbox } from "@/components/portfolio/project/project-lightbox";
import { ProjectMedia } from "@/components/portfolio/project/project-media";
import { useProjectCopy } from "@/components/portfolio/project/use-project-copy";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";

const SERIF = { fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" };

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-semibold tabular-nums text-white/15" style={{ ...SERIF, fontSize: "1.75rem", lineHeight: 1 }} aria-hidden>
        {num}
      </span>
      <span className="h-px w-8 bg-accent/50" />
      <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{label}</h2>
    </div>
  );
}

export function ProjectDetailsClient({ project }: { project: Project }) {
  const { locale } = useLanguage();
  const p = translations[locale].portfolio;
  const copy = useProjectCopy();

  const images = useMemo(
    () => Array.from(new Set([project.heroImage, ...project.gallery].filter(Boolean))),
    [project.heroImage, project.gallery],
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const closePreview = useCallback(() => setIsPreviewOpen(false), []);

  const approachTabs: ApproachTab[] = [
    { key: "goals" as const, label: p.goalsCol, items: project.goals },
    { key: "process" as const, label: p.processCol, items: project.process },
    { key: "outcome" as const, label: p.outcomesCol, items: project.outcome },
  ].filter((tab) => tab.items.length > 0);

  return (
    <>
      {/* ── Header ── */}
      <Container className="pb-6 pt-6 sm:pb-8 sm:pt-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE_OUT }}>
          <Link
            href="/portfolio"
            className="inline-flex h-11 items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-400 transition-colors duration-300 hover:text-accent"
          >
            <ArrowLeft size={13} />
            {p.backToPortfolio}
          </Link>

          <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="eyebrow">{project.category}</span>
                <span className="h-px w-6 bg-accent/40" />
                <span className="text-xs font-medium tracking-widest text-accent/80">{project.year}</span>
              </div>
              <h1 className="text-balance text-3xl font-semibold leading-[1.08] text-white sm:text-4xl lg:text-5xl" style={SERIF}>
                {project.title}
              </h1>
              {project.excerpt && (
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{project.excerpt}</p>
              )}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-11 shrink-0 items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 text-sm font-semibold text-accentGlow transition duration-300 hover:bg-accent/20 lg:inline-flex"
              >
                <ExternalLink size={14} />
                {p.viewLive}
              </a>
            )}
          </div>
        </motion.div>
      </Container>

      {/* ── Images first ── */}
      <Container>
        <ProjectMedia images={images} title={project.title} onOpen={setLightboxIndex} />
      </Container>

      {/* ── Information ── */}
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <SectionLabel num="01" label={p.aboutSection} />
              <p className="max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg sm:leading-relaxed">{project.summary}</p>
            </motion.section>

            {approachTabs.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                <SectionLabel num="02" label={p.approachSection} />
                <ProjectApproachTabs tabs={approachTabs} />
              </motion.section>
            )}
          </div>

          <div className="order-first lg:order-none">
            <div className="lg:sticky lg:top-24">
              <ProjectFacts
                project={project}
                labels={{
                  category: p.category,
                  year: p.year,
                  tools: p.tools,
                  colourPalette: p.colourPalette,
                  typography: p.typography,
                  viewLive: p.viewLive,
                  livePreview: copy.livePreview,
                }}
                onOpenPreview={() => setIsPreviewOpen(true)}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* ── CTA ── */}
      <Container className="pb-16 sm:pb-24">
        <motion.div
          className="surface-strong relative flex flex-col gap-5 overflow-hidden p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,164,74,0.1),transparent_45%)]" />
          <div className="relative">
            <span className="eyebrow">{p.nextStep}</span>
            <h2 className="mt-2 text-balance text-xl font-semibold text-white sm:text-2xl" style={SERIF}>
              {p.ctaTitle}
            </h2>
          </div>
          <Link
            href="/contact"
            className="group relative inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-background transition duration-150 hover:-translate-y-px hover:brightness-110 active:translate-y-0"
          >
            {p.letsTalk}
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </Container>

      <ProjectLightbox images={images} title={project.title} index={lightboxIndex} onChange={setLightboxIndex} />
      {project.liveUrl && (
        <LivePreviewDialog
          url={project.liveUrl}
          title={project.title}
          isOpen={isPreviewOpen}
          openTabLabel={p.liveOpenTab}
          onClose={closePreview}
        />
      )}
    </>
  );
}
