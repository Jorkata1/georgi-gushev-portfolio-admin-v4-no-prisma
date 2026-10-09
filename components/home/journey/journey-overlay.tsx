"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gauge } from "lucide-react";
import type { JourneyCopy } from "@/components/home/journey/journey-copy";
import { CHAPTER_COUNT, formatChapterNumber } from "@/components/home/journey/journey-config";

const HEADING_FONT = { fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" } as const;
const SITE_CHECK_URL = "https://check.gdxstudio.com";
const LAST_CHAPTER = CHAPTER_COUNT - 1;
const FOCUS_RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#060E1A]";
const LAYER_TRANSITION = "transition-[opacity,transform,visibility] duration-500 ease-out motion-reduce:transition-none";

type JourneyIntroProps = {
  copy: JourneyCopy["intro"];
  isVisible: boolean;
};

/** Opening screen. It holds the page's h1, so it is always in the markup, only faded out. */
export function JourneyIntro({ copy, isVisible }: JourneyIntroProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 grid place-items-center px-4 text-center ${LAYER_TRANSITION} ${
        isVisible ? "visible opacity-100" : "invisible -translate-y-4 opacity-0"
      }`}
    >
      <div className="max-w-3xl bg-[radial-gradient(ellipse_at_center,rgba(6,14,26,0.88)_30%,rgba(6,14,26,0)_72%)] px-6 py-12">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-accent">{copy.eyebrow}</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl" style={HEADING_FONT}>
          {copy.title} <em className="block text-accent">{copy.titleAccent}</em>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">{copy.text}</p>
        <p className="mt-10 flex flex-col items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
          {copy.scrollHint}
          <span className="h-12 w-px origin-top bg-gradient-to-b from-accent to-transparent motion-safe:animate-pulse" />
        </p>
      </div>
    </div>
  );
}

type JourneyChapterProps = {
  copy: JourneyCopy;
  chapterIndex: number;
};

/** Copy for the chapter the camera is at, bottom-left; the last chapter adds the actions. */
export function JourneyChapter({ copy, chapterIndex }: JourneyChapterProps) {
  const isVisible = chapterIndex >= 0;
  const index = Math.max(0, chapterIndex);
  const chapter = copy.chapters[index];
  const isLast = index === LAST_CHAPTER;

  return (
    <div
      aria-hidden={!isVisible}
      className={`absolute inset-x-4 bottom-8 z-10 max-w-xl sm:bottom-12 sm:left-10 lg:left-12 ${LAYER_TRANSITION} ${
        isVisible ? "visible opacity-100" : "invisible translate-y-3 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 font-mono text-[13px] font-bold">
        <span className="text-accent">{formatChapterNumber(index)}</span>
        <span className="text-slate-500">/ {formatChapterNumber(LAST_CHAPTER)}</span>
        <span className="h-px w-16 bg-white/15 sm:w-28" />
        <span className="text-[11px] font-normal uppercase tracking-[0.14em] text-slate-400">{chapter.label}</span>
      </div>

      {/* Keyed so each chapter's copy fades in fresh. */}
      <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
        <p className="mt-4 text-balance text-3xl font-semibold leading-[1.06] text-white sm:text-5xl" style={HEADING_FONT}>
          {chapter.title}
        </p>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-300 sm:text-base">{chapter.text}</p>
      </motion.div>

      {isLast && <JourneyActions copy={copy.cta} />}
    </div>
  );
}

/** The three things a visitor can do at the end of the journey. */
export function JourneyActions({ copy }: { copy: JourneyCopy["cta"] }) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link
        href="/contact"
        className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-accent px-5 font-bold text-[#060E1A] transition duration-200 ease-out hover:brightness-110 active:scale-[0.98] ${FOCUS_RING}`}
      >
        {copy.inquiry}
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
      <Link
        href="/portfolio"
        className={`inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 bg-[#0B1627]/70 px-5 font-semibold text-white backdrop-blur transition duration-200 ease-out hover:border-accent/60 active:scale-[0.98] ${FOCUS_RING}`}
      >
        {copy.projects}
      </Link>
      <a
        href={SITE_CHECK_URL}
        className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-3 font-semibold text-slate-300 transition-colors duration-200 ease-out hover:text-accent ${FOCUS_RING}`}
      >
        <Gauge size={18} className="text-accent" aria-hidden="true" />
        {copy.siteCheck}
      </a>
    </div>
  );
}