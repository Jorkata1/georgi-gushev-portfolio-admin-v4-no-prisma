import Link from "next/link";
import { ArrowDown, ArrowRight, Download, Sparkles } from "lucide-react";
import type { StoryIntroCopy } from "@/components/home/story/story-copy";
import { HEADING_FONT_STYLE, PRIMARY_LINK_CLASS, SECONDARY_LINK_CLASS } from "@/components/home/story/story-ui";

export type StoryHeroCopy = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  sendInquiry: string;
  viewServices: string;
  downloadCV: string;
};

type StoryIntroProps = {
  hero: StoryHeroCopy;
  copy: StoryIntroCopy;
  /** The scroll hint only makes sense when the story is pinned and scroll-driven. */
  showScrollHint: boolean;
};

/** Opening screen of the homepage: who I am and what to do, then an invitation to scroll. */
export function StoryIntro({ hero, copy, showScrollHint }: StoryIntroProps) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <span className="eyebrow">
        <Sparkles size={14} aria-hidden="true" />
        {hero.eyebrow}
      </span>

      <h1
        className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:mt-6 sm:text-6xl lg:text-7xl"
        style={HEADING_FONT_STYLE}
      >
        {hero.title}
        <span className="mt-1 block text-gradient">{hero.titleAccent}</span>
      </h1>

      <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">{copy.lead}</p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
        <Link href="/contact" className={PRIMARY_LINK_CLASS}>
          {hero.sendInquiry}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link href="/services" className={SECONDARY_LINK_CLASS}>
          {hero.viewServices}
        </Link>
      </div>

      <a
        href="/Georgi-Gushev-CV-2026.pdf"
        download
        className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 text-sm text-slate-400 transition-colors duration-200 ease-out hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
      >
        <Download size={16} aria-hidden="true" />
        {hero.downloadCV}
      </a>

      {showScrollHint && (
        <p className="mt-8 flex flex-col items-center gap-2 font-mono text-xs text-slate-400 sm:mt-12 sm:text-sm">
          {copy.scrollHint}
          <ArrowDown size={18} className="text-accent motion-safe:animate-bounce" aria-hidden="true" />
        </p>
      )}
    </div>
  );
}