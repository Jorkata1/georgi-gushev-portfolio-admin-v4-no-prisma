"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/shared/container";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";
import { STORY_COPY, type StoryCopy, type StoryLocale } from "@/components/home/story/story-copy";
import {
  CHAPTER_REST_PROGRESS,
  SECTION_HEIGHT_VH,
  STORY_RANGE,
  getChapterIndex,
  getPhase,
  toPageProgress,
  type StoryPhase
} from "@/components/home/story/story-timeline";
import { StoryLayer } from "@/components/home/story/story-ui";
import { StoryStage } from "@/components/home/story/story-stage";
import { StoryChapterPanel } from "@/components/home/story/story-chapter-panel";
import { StoryIntro, type StoryHeroCopy } from "@/components/home/story/story-intro";
import { StoryFinale } from "@/components/home/story/story-finale";
import { StoryStatic } from "@/components/home/story/story-static";

/** Keeps the scene inside the viewport on short laptop screens (stage ratio 820 / 620). */
const STAGE_MAX_WIDTH = "calc((100svh - 12rem) * 1.32)";

type StoryContentProps = {
  copy: StoryCopy;
  hero: StoryHeroCopy;
  projects: Project[];
};

function StoryPinned({ copy, hero, projects }: StoryContentProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const storyProgress = useTransform(scrollYProgress, STORY_RANGE, [0, 1]);
  const [phase, setPhase] = useState<StoryPhase>("intro");
  const [activeIndex, setActiveIndex] = useState(0);

  // A reload can restore the scroll position mid-story, before any scroll event fires.
  useEffect(() => {
    setPhase(getPhase(scrollYProgress.get()));
    setActiveIndex(getChapterIndex(storyProgress.get()));
  }, [scrollYProgress, storyProgress]);

  useMotionValueEvent(scrollYProgress, "change", (value) => setPhase(getPhase(value)));
  useMotionValueEvent(storyProgress, "change", (value) => setActiveIndex(getChapterIndex(value)));

  const handleSelectChapter = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    const target = sectionTop + scrollableDistance * toPageProgress(CHAPTER_REST_PROGRESS[index]);
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${SECTION_HEIGHT_VH}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/[0.06]">
          <motion.div className="h-full origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
        </div>

        <StoryLayer isActive={phase === "intro"} className="flex items-center">
          <Container className="pb-6 pt-16 lg:pt-20">
            <StoryIntro hero={hero} copy={copy.intro} showScrollHint />
          </Container>
        </StoryLayer>

        <StoryLayer isActive={phase === "story"} role="region" aria-labelledby="home-story-title">
          <h2 id="home-story-title" className="sr-only">
            {copy.sectionTitle}
          </h2>
          <ol className="sr-only">
            {copy.chapters.map((chapter) => (
              <li key={chapter.label}>
                {chapter.label}. {chapter.title} {chapter.text}
              </li>
            ))}
          </ol>

          <Container className="flex h-full flex-col justify-center pb-6 pt-16 lg:pt-20">
            <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              <div className="order-2 lg:order-1">
                <StoryChapterPanel copy={copy} activeIndex={activeIndex} onSelectChapter={handleSelectChapter} />
              </div>
              <div className="order-1 mx-auto w-full lg:order-2" style={{ maxWidth: STAGE_MAX_WIDTH }}>
                <StoryStage progress={storyProgress} copy={copy.stage} />
              </div>
            </div>
          </Container>
        </StoryLayer>

        <StoryLayer isActive={phase === "finale"} className="flex items-center">
          <Container className="pb-8 pt-16 lg:pt-20">
            <StoryFinale copy={copy.finale} projects={projects} />
          </Container>
        </StoryLayer>
      </div>
    </section>
  );
}

type HomeStoryProps = {
  featuredProjects: Project[];
};

/**
 * The whole homepage as one scroll-driven story: intro, five pinned chapters of the work
 * process, then a finale with projects and actions. Visitors who prefer reduced motion get
 * the same content as ordinary static sections.
 */
export function HomeStory({ featuredProjects }: HomeStoryProps) {
  const { locale } = useLanguage();
  const copy = STORY_COPY[locale as StoryLocale] ?? STORY_COPY.bg;
  const hero: StoryHeroCopy = translations[locale].hero;
  const prefersReducedMotion = useReducedMotion();
  // The server cannot know the visitor's motion preference, so the first client render must
  // match the server (pinned version) and the static version swaps in after mount.
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (hasMounted && prefersReducedMotion) {
    return <StoryStatic copy={copy} hero={hero} projects={featuredProjects} />;
  }
  return <StoryPinned copy={copy} hero={hero} projects={featuredProjects} />;
}