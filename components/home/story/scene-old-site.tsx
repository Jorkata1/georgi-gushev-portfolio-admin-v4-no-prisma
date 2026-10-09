"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { TIMELINE } from "@/components/home/story/story-timeline";

type SceneOldSiteProps = {
  progress: MotionValue<number>;
};

/** Chapter 01: an outdated, slow page whose banner jumps while it loads. */
export function SceneOldSite({ progress }: SceneOldSiteProps) {
  const opacity = useTransform(progress, TIMELINE.oldSiteOut, [1, 0]);
  const bannerY = useTransform(progress, TIMELINE.bannerJump, [0, 40, -8, 26, 6]);
  const bannerRotate = useTransform(progress, TIMELINE.bannerJump, [0, -2, 1, -1.5, -1]);
  const cookieY = useTransform(progress, TIMELINE.cookieBarIn, ["100%", "0%"]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#D9D4C7] px-7 py-6" style={{ opacity }}>
      <div className="flex items-center gap-3">
        <span className="h-7 w-24 bg-[#9A8F78]" />
        <span className="flex-1" />
        <span className="h-2.5 w-14 bg-[#B5AC98]" />
        <span className="h-2.5 w-14 bg-[#B5AC98]" />
        <span className="h-2.5 w-14 bg-[#B5AC98]" />
      </div>

      <motion.div
        className="relative ml-8 mt-14 h-36 w-[560px] bg-[#A69C86]"
        style={{ y: bannerY, rotate: bannerRotate }}
      >
        <span className="absolute -inset-0.5 border-2 border-dashed border-[#F87171]" />
      </motion.div>

      <div className="mt-8 flex w-96 flex-col gap-2">
        <span className="h-2 bg-[#C3BAA6]" />
        <span className="h-2 w-[88%] bg-[#C3BAA6]" />
        <span className="h-2 w-[70%] bg-[#C3BAA6]" />
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-[#3B3B3B] px-6 py-4"
        style={{ y: cookieY }}
      >
        <span className="h-2 flex-1 bg-[#6B6B6B]" />
        <span className="h-7 w-24 bg-[#8A8A8A]" />
      </motion.div>
    </motion.div>
  );
}