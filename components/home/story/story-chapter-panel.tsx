"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { StoryCopy } from "@/components/home/story/story-copy";
import { CHAPTER_COUNT } from "@/components/home/story/story-timeline";

const COPY_TRANSITION = { duration: 0.3, ease: "easeOut" } as const;
const LAST_CHAPTER_INDEX = CHAPTER_COUNT - 1;

type StoryChapterPanelProps = {
  copy: StoryCopy;
  activeIndex: number;
  onSelectChapter: (index: number) => void;
};

function formatChapterNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function StoryChapterPanel({ copy, activeIndex, onSelectChapter }: StoryChapterPanelProps) {
  const chapter = copy.chapters[activeIndex];
  const isLastChapter = activeIndex === LAST_CHAPTER_INDEX;

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-center gap-3 font-mono text-sm font-bold sm:text-base">
        <span className="text-accent">{formatChapterNumber(activeIndex)}</span>
        <span className="text-slate-500">/ {formatChapterNumber(LAST_CHAPTER_INDEX)}</span>
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-normal text-slate-400">{chapter.label}</span>
      </div>

      {/* Visual copy only; screen readers get the full chapter list from the section's sr-only outline. */}
      <div aria-hidden="true" className="min-h-[9.5rem] sm:min-h-[15rem] lg:min-h-[18rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={COPY_TRANSITION}
          >
            <p
              className="text-balance text-2xl font-semibold leading-[1.12] text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" }}
            >
              {chapter.title}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:mt-5 sm:text-base lg:text-lg">
              {chapter.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <nav aria-label={copy.chapterNavLabel} className="hidden sm:block">
        <ol className="flex flex-col gap-1">
          {copy.chapters.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => onSelectChapter(index)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`${copy.goToChapter} ${formatChapterNumber(index)}: ${item.label}`}
                  className={`group flex min-h-[44px] items-center gap-3 rounded-lg pr-3 text-left text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 active:opacity-80 ${
                    isActive ? "font-bold text-accent" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span
                    className={`h-0.5 origin-left rounded-full bg-current transition-transform duration-300 ease-out ${
                      isActive ? "w-8 scale-x-100" : "w-8 scale-x-[0.45] group-hover:scale-x-75"
                    }`}
                  />
                  <span className="font-mono text-xs">{formatChapterNumber(index)}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="h-12">
        <AnimatePresence>
          {isLastChapter && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={COPY_TRANSITION}
            >
              <Link
                href="/portfolio"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-[#060E1A] transition duration-200 ease-out hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060E1A] active:scale-[0.98] sm:text-base"
              >
                {copy.viewProjects}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}