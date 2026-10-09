"use client";

import { useMotionValue } from "framer-motion";
import { Container } from "@/components/shared/container";
import type { Project } from "@/types";
import type { StoryCopy, StoryStageCopy } from "@/components/home/story/story-copy";
import { CHAPTER_COUNT, CHAPTER_REST_PROGRESS } from "@/components/home/story/story-timeline";
import { HEADING_FONT_STYLE } from "@/components/home/story/story-ui";
import { StoryStage } from "@/components/home/story/story-stage";
import { StoryIntro, type StoryHeroCopy } from "@/components/home/story/story-intro";
import { StoryFinale } from "@/components/home/story/story-finale";

type StoryStaticProps = {
  copy: StoryCopy;
  hero: StoryHeroCopy;
  projects: Project[];
};

function FrozenStage({ progressValue, copy }: { progressValue: number; copy: StoryStageCopy }) {
  const progress = useMotionValue(progressValue);
  return <StoryStage progress={progress} copy={copy} />;
}

function formatChapterNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/**
 * Shown when the visitor asks the system to reduce motion: the same homepage as ordinary,
 * non-pinned sections, with each scene frozen at its resting frame.
 */
export function StoryStatic({ copy, hero, projects }: StoryStaticProps) {
  return (
    <>
      <section className="section-padding">
        <Container>
          <StoryIntro hero={hero} copy={copy.intro} showScrollHint={false} />
        </Container>
      </section>

      <section aria-labelledby="home-story-title" className="section-padding">
        <Container>
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2 id="home-story-title" className="section-title mt-3 text-balance sm:mt-4">
            {copy.sectionTitle}
          </h2>

          <ol className="mt-10 flex flex-col gap-16 sm:mt-14 sm:gap-24">
            {copy.chapters.map((chapter, index) => (
              <li key={chapter.label} className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                <div>
                  <p className="font-mono text-sm font-bold">
                    <span className="text-accent">{formatChapterNumber(index)}</span>
                    <span className="text-slate-500">
                      {" "}
                      / {formatChapterNumber(CHAPTER_COUNT - 1)} · {chapter.label}
                    </span>
                  </p>
                  <h3
                    className="mt-4 text-balance text-2xl font-semibold leading-[1.12] text-white sm:text-4xl"
                    style={HEADING_FONT_STYLE}
                  >
                    {chapter.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base">
                    {chapter.text}
                  </p>
                </div>
                <FrozenStage progressValue={CHAPTER_REST_PROGRESS[index]} copy={copy.stage} />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <StoryFinale copy={copy.finale} projects={projects} />
        </Container>
      </section>
    </>
  );
}