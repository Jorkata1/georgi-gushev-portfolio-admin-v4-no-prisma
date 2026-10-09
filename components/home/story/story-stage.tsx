"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { StoryStageCopy } from "@/components/home/story/story-copy";
import { TIMELINE } from "@/components/home/story/story-timeline";
import { useStageScale } from "@/components/home/story/use-stage-scale";
import { SceneSite } from "@/components/home/story/scene-site";
import { SceneQaOverlay } from "@/components/home/story/scene-qa-overlay";
import { SceneDevices } from "@/components/home/story/scene-devices";
import {
  ChecklistCard,
  CodeCard,
  GridCard,
  LayoutShiftCard,
  LoadingTimerCard,
  PaletteCard,
  SpeedGaugeCard
} from "@/components/home/story/story-cards";

/** Design size of the whole scene, floating cards included. */
const STAGE_WIDTH = 820;
const STAGE_HEIGHT = 620;
const BROWSER_SHRUNK_SCALE = 0.74;

type StoryStageProps = {
  progress: MotionValue<number>;
  copy: StoryStageCopy;
  className?: string;
};

function BrowserChrome({ progress, url }: { progress: MotionValue<number>; url: string }) {
  const loadingScale = useTransform(progress, TIMELINE.loadingBar, [0.05, 0.82]);
  const loadingOpacity = useTransform(progress, TIMELINE.oldSiteOut, [1, 0]);

  return (
    <>
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-[#1C2E4A] bg-[#0E1B30] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#2A3B58]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2A3B58]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2A3B58]" />
        <span className="ml-3.5 flex h-[26px] flex-1 items-center rounded-lg bg-[#060E1A] px-3 font-mono text-xs text-[#6F82A0]">
          {url}
        </span>
      </div>
      <motion.div className="absolute inset-x-0 top-11 z-10 h-[3px] bg-[#102038]" style={{ opacity: loadingOpacity }}>
        <motion.div className="h-full origin-left bg-[#F87171]" style={{ scaleX: loadingScale }} />
      </motion.div>
    </>
  );
}

/**
 * The pinned illustration. Drawn at a fixed design size and scaled to the column, so the
 * composition is identical on every screen. Purely decorative: the chapter copy carries the meaning.
 */
export function StoryStage({ progress, copy, className = "" }: StoryStageProps) {
  const { containerRef, scale } = useStageScale<HTMLDivElement>(STAGE_WIDTH);
  const browserScale = useTransform(progress, TIMELINE.browserShrink, [1, BROWSER_SHRUNK_SCALE]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full select-none ${className}`}
      style={{ aspectRatio: `${STAGE_WIDTH} / ${STAGE_HEIGHT}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `scale(${scale ?? 1})`,
          visibility: scale === null ? "hidden" : "visible"
        }}
      >
        <motion.div
          className="absolute left-[50px] top-[50px] flex h-[520px] w-[720px] origin-top-left flex-col overflow-hidden rounded-2xl border border-[#1C2E4A] bg-[#0B1627] shadow-[0_40px_90px_rgba(0,0,0,0.5)]"
          style={{ scale: browserScale }}
        >
          <BrowserChrome progress={progress} url={copy.url} />
          <div className="relative flex-1">
            <SceneSite progress={progress} copy={copy} />
            <SceneQaOverlay progress={progress} />
          </div>
        </motion.div>

        <LoadingTimerCard progress={progress} copy={copy} />
        <LayoutShiftCard progress={progress} copy={copy} />
        <GridCard progress={progress} copy={copy} />
        <PaletteCard progress={progress} copy={copy} />
        <CodeCard progress={progress} />
        <SpeedGaugeCard progress={progress} copy={copy} />
        <ChecklistCard progress={progress} copy={copy} />
        <SceneDevices progress={progress} copy={copy} />
      </div>
    </div>
  );
}