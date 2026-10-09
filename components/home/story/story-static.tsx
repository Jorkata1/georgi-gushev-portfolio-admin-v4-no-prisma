"use client";

import Link from "next/link";
import { useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import type { StoryCopy, StoryStageCopy } from "@/components/home/story/story-copy";
import { CHAPTER_REST_PROGRESS } from "@/components/home/story/story-timeline";
import { StoryStage } from "@/components/home/story/story-stage";

const HEADING_FONT = { fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" } as const;

function FrozenStage({ progressValue, copy }: { progressValue: number; copy: StoryStageCopy }) {
  const progress = useMotionValue(progressValue);
  return <StoryStage progress={progress} copy={copy} />;
}

/**
 * Shown when the visitor asks the system to reduce motion: the five scenes as ordinary,
 * non-pinned blocks, each frozen at its resting frame.
 */
export function StoryStatic({ copy }: { copy: StoryCopy }) {
  return (
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
                  <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-slate-500"> / 05 · {chapter.label}</span>
                </p>
                <h3 className="mt-4 text-balance text-2xl font-semibold leading-[1.12] text-white sm:text-4xl" style={HEADING_FONT}>
                  {chapter.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base">{chapter.text}</p>
              </div>
              <FrozenStage progressValue={CHAPTER_REST_PROGRESS[index]} copy={copy.stage} />
            </li>
          ))}
        </ol>

        <Link
          href="/portfolio"
          className="mt-12 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-[#060E1A] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060E1A] sm:text-base"
        >
          {copy.viewProjects}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}