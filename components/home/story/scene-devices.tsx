"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { StoryStageCopy } from "@/components/home/story/story-copy";
import { TIMELINE, useFadeIn } from "@/components/home/story/story-timeline";

type SceneDevicesProps = {
  progress: MotionValue<number>;
  copy: StoryStageCopy;
};

type MiniSiteProps = {
  copy: StoryStageCopy;
  size: "tablet" | "phone";
};

const MINI_SITE_STYLES = {
  tablet: { brand: "text-[10px]", title: "text-base", action: "self-start px-2.5 py-1.5 text-[9px]", gap: "gap-2.5 px-3 py-3.5" },
  phone: { brand: "text-[8px]", title: "text-xs", action: "py-1.5 text-center text-[8px]", gap: "gap-2 px-2.5 py-3.5" }
} as const;

function MiniSite({ copy, size }: MiniSiteProps) {
  const styles = MINI_SITE_STYLES[size];
  return (
    <div className={`flex h-full flex-col overflow-hidden bg-[#060E1A] ${styles.gap}`}>
      <span className={`font-serif font-bold text-white ${styles.brand}`}>{copy.brand}</span>
      <span className={`font-serif font-bold leading-[1.12] text-white ${styles.title}`}>{copy.heroTitle}</span>
      <span className={`rounded-md bg-accent font-bold text-[#060E1A] ${styles.action}`}>{copy.primaryAction}</span>
      <span className="flex-1 rounded-lg bg-[#0E1B30]" />
    </div>
  );
}

/** Chapter 05: the same page on tablet and phone slides in beside the shrunken browser. */
export function SceneDevices({ progress, copy }: SceneDevicesProps) {
  const tabletOpacity = useFadeIn(progress, TIMELINE.tabletIn);
  const tabletX = useTransform(progress, TIMELINE.tabletIn, [80, 0]);
  const phoneOpacity = useFadeIn(progress, TIMELINE.phoneIn);
  const phoneX = useTransform(progress, TIMELINE.phoneIn, [80, 0]);
  const chipsOpacity = useFadeIn(progress, TIMELINE.chipsIn);
  const chipsY = useTransform(progress, TIMELINE.chipsIn, [12, 0]);

  return (
    <>
      <motion.div
        className="absolute left-[470px] top-[190px] h-[270px] w-[200px] rounded-[20px] bg-[#1A2433] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
        style={{ opacity: tabletOpacity, x: tabletX }}
      >
        <div className="h-full overflow-hidden rounded-[13px]">
          <MiniSite copy={copy} size="tablet" />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[660px] top-[300px] h-[240px] w-[120px] rounded-[22px] bg-[#1A2433] p-1.5 shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
        style={{ opacity: phoneOpacity, x: phoneX }}
      >
        <div className="h-full overflow-hidden rounded-[17px]">
          <MiniSite copy={copy} size="phone" />
        </div>
      </motion.div>

      <motion.div className="absolute left-[50px] top-[500px] flex gap-2.5" style={{ opacity: chipsOpacity, y: chipsY }}>
        {copy.chips.map((chip) => (
          <span
            key={chip}
            className="flex items-center gap-2 rounded-full border border-[#1C2E4A] bg-[#0B1627] px-3 py-2 text-[13px] font-semibold text-white"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-[#34D399]" />
            {chip}
          </span>
        ))}
      </motion.div>
    </>
  );
}