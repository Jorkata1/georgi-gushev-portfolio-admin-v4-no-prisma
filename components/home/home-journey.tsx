"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/types";
import { useLanguage } from "@/lib/language-context";
import { JOURNEY_COPY, type JourneyCopy, type JourneyLocale } from "@/components/home/journey/journey-copy";
import { CHAPTER_COUNT, CHAPTER_SCROLL, TRACK_HEIGHT_VH, formatChapterNumber, getChapterForProgress } from "@/components/home/journey/journey-config";
import { useSiteHeaderReveal } from "@/components/home/journey/use-site-header-reveal";
import { JourneyCanvas, type JourneyCanvasStatus } from "@/components/home/journey/journey-canvas";
import type { JourneyProject } from "@/components/home/journey/scene/projects";
import { JourneyActions, JourneyChapter, JourneyIntro } from "@/components/home/journey/journey-overlay";

const CONTROL_CLASS =
  "min-h-[40px] rounded-full border border-white/15 bg-[#0B1627]/60 px-4 text-[13px] font-semibold text-white backdrop-blur transition-colors duration-200 ease-out hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:opacity-80";

function JourneyFallback({ copy }: { copy: JourneyCopy }) {
  return (
    <ol className="mx-auto grid max-w-3xl gap-8 px-4 py-16">
      {copy.chapters.map((chapter, index) => (
        <li key={chapter.label}>
          <p className="font-mono text-sm font-bold text-accent">
            {formatChapterNumber(index)} · {chapter.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">{chapter.title}</p>
          <p className="mt-2 text-slate-300">{chapter.text}</p>
        </li>
      ))}
    </ol>
  );
}

/**
 * The homepage as one 3D journey: scrolling flies the camera along a glowing line through
 * the steps of building a website, past featured projects, to the GDX mark. The track is tall;
 * the scene is pinned inside it.
 */
const FEATURED_IN_JOURNEY = 3;

type HomeJourneyProps = {
  featuredProjects: Project[];
};

export function HomeJourney({ featuredProjects }: HomeJourneyProps) {
  const { locale } = useLanguage();
  const copy = JOURNEY_COPY[locale as JourneyLocale] ?? JOURNEY_COPY.bg;
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const projects = useMemo<JourneyProject[]>(
    () =>
      featuredProjects
        .filter((project) => Boolean(project.heroImage))
        .slice(0, FEATURED_IN_JOURNEY)
        .map((project) => ({ slug: project.slug, title: project.title, category: project.category, image: project.heroImage })),
    [featuredProjects]
  );
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const [chapterIndex, setChapterIndex] = useState(-1);
  const [status, setStatus] = useState<JourneyCanvasStatus>("loading");
  // The site's main menu stays hidden until the journey reaches its last chapter.
  const isJourneyFinished = chapterIndex === CHAPTER_COUNT - 1;
  useSiteHeaderReveal(isJourneyFinished || status === "unsupported");

  useEffect(() => {
    const readProgress = () => {
      const section = sectionRef.current;
      if (!section) return;
      const scrollable = section.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollable)) : 0;
      progressRef.current = progress;
      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${progress})`;
      setChapterIndex(getChapterForProgress(progress));
    };
    readProgress();
    window.addEventListener("scroll", readProgress, { passive: true });
    window.addEventListener("resize", readProgress);
    return () => {
      window.removeEventListener("scroll", readProgress);
      window.removeEventListener("resize", readProgress);
    };
  }, []);

  const scrollToProgress = useCallback((progress: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollable = section.offsetHeight - window.innerHeight;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: sectionTop + scrollable * progress, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, []);

  if (status === "unsupported") {
    return (
      <section aria-labelledby="journey-title" className="pt-24">
        <h1 id="journey-title" className="px-4 text-center text-4xl font-semibold text-white sm:text-6xl">
          {copy.intro.title} <span className="text-accent">{copy.intro.titleAccent}</span>
        </h1>
        <JourneyFallback copy={copy} />
        <div className="mx-auto max-w-3xl px-4 pb-24">
          <JourneyActions copy={copy.cta} />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-label={copy.intro.eyebrow} className="relative" style={{ height: `${TRACK_HEIGHT_VH}svh` }}>
      {/* Screen readers and search engines get the whole story as text. */}
      <ol className="sr-only">
        {copy.chapters.map((chapter) => (
          <li key={chapter.label}>
            {chapter.label}. {chapter.title} {chapter.text}
          </li>
        ))}
      </ol>

      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#060E1A]">
        <JourneyCanvas copy={copy.scene} progressRef={progressRef} projects={projects} viewProjectLabel={copy.projects.viewProject} onStatusChange={setStatus} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_45%,rgba(6,14,26,0.75)_100%),linear-gradient(to_top,rgba(6,14,26,0.9),transparent_42%)]"
        />

        <JourneyIntro copy={copy.intro} isVisible={chapterIndex < 0} />
        <JourneyChapter copy={copy} chapterIndex={chapterIndex} projects={projects} />

        <div className={`absolute right-4 z-20 flex gap-2 transition-[top] duration-300 ease-out sm:right-10 ${isJourneyFinished ? "top-24" : "top-6"}`}>
          <button type="button" className={`${CONTROL_CLASS} hidden sm:block`} onClick={() => scrollToProgress(0)}>
            {copy.controls.restart}
          </button>
          <button type="button" className={CONTROL_CLASS} onClick={() => scrollToProgress(1)}>
            {copy.controls.skip}
          </button>
        </div>

        <nav aria-label={copy.controls.chapters} className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1.5 sm:flex lg:right-8">
          {copy.chapters.map((chapter, index) => (
            <button
              key={chapter.label}
              type="button"
              onClick={() => scrollToProgress(CHAPTER_SCROLL[index])}
              aria-label={`${formatChapterNumber(index)} ${chapter.label}`}
              aria-current={index === chapterIndex ? "step" : undefined}
              className="group grid h-8 w-11 place-items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span
                className={`h-2 w-2 rounded-full transition duration-300 ease-out ${
                  index === chapterIndex ? "scale-150 bg-accent" : "bg-white/25 group-hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </nav>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 h-[3px] bg-white/[0.06]">
          <span ref={progressBarRef} className="block h-full origin-left scale-x-0 bg-accent" />
        </div>

        {status === "loading" && (
          <p role="status" className="absolute inset-x-0 bottom-10 z-20 text-center font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
            {copy.controls.loading}…
          </p>
        )}
      </div>
    </section>
  );
}