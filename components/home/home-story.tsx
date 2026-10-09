"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Container } from "@/components/shared/container";
import { useLanguage } from "@/lib/language-context";
import { STORY_COPY, type StoryCopy, type StoryLocale } from "@/components/home/story/story-copy";
import {
  CHAPTER_REST_PROGRESS,
  SECTION_HEIGHT_VH,
  getChapterIndex
} from "@/components/home/story/story-timeline";
import { StoryStage } from "@/components/home/story/story-stage";
import { StoryChapterPanel } from "@/components/home/story/story-chapter-panel";
import { StoryStatic } from "@/components/home/story/story-static";

/** Keeps the scene inside the viewport on short laptop screens (stage ratio 820 / 620). */
const STAGE_MAX_WIDTH = "calc((100svh - 12rem) * 1.32)";

function StoryPinned({ copy }: { copy: StoryCopy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveIndex(getChapterIndex(value));
  });

  const handleSelectChapter = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: sectionTop + scrollableDistance * CHAPTER_REST_PROGRESS[index], behavior: "smooth" });
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-story-title"
      className="relative"
      style={{ height: `${SECTION_HEIGHT_VH}svh` }}
    >
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

      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/[0.06]">
          <motion.div className="h-full origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
        </div>

        <Container className="flex h-full flex-col justify-center pb-6 pt-16 lg:pt-20">
          <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div className="order-2 lg:order-1">
              <StoryChapterPanel copy={copy} activeIndex={activeIndex} onSelectChapter={handleSelectChapter} />
            </div>
            <div className="order-1 mx-auto w-full lg:order-2" style={{ maxWidth: STAGE_MAX_WIDTH }}>
              <StoryStage progress={scrollYProgress} copy={copy.stage} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/**
 * Scroll-driven story of the work process: one pinned scene that changes with scroll progress.
 * Visitors who prefer reduced motion get the same five chapters as static blocks.
 */
export function HomeStory() {
  const { locale } = useLanguage();
  const copy = STORY_COPY[locale as StoryLocale] ?? STORY_COPY.bg;
  const prefersReducedMotion = useReducedMotion();
  // The server cannot know the visitor's motion preference, so the first client render must
  // match the server (pinned version) and the static version swaps in after mount.
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (hasMounted && prefersReducedMotion) return <StoryStatic copy={copy} />;
  return <StoryPinned copy={copy} />;
}