"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import type { StoryStageCopy } from "@/components/home/story/story-copy";
import { TIMELINE, useFadeIn, useFadeWindow } from "@/components/home/story/story-timeline";

/** Height of the browser viewport in design pixels; scan line and markers are placed against it. */
const VIEWPORT_HEIGHT = 476;
const PART_STAGGER = 0.02;
const PART_DURATION = 0.03;

/** Issues the QA pass finds; each turns green the moment the scan line crosses it. */
const QA_MARKERS = [
  { left: 190, top: 28 },
  { left: 400, top: 120 },
  { left: 262, top: 262 },
  { left: 616, top: 392 }
] as const;

type ProgressProps = { progress: MotionValue<number> };

type SceneBuiltSiteProps = ProgressProps & {
  copy: StoryStageCopy;
};

function BuiltPart({ progress, order, className, children }: ProgressProps & {
  order: number;
  className?: string;
  children?: ReactNode;
}) {
  const start = TIMELINE.builtPartsStart + order * PART_STAGGER;
  const opacity = useTransform(progress, [start, start + PART_DURATION], [0, 1]);
  const y = useTransform(progress, [start, start + PART_DURATION], [16, 0]);
  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

function QaMarker({ progress, left, top }: ProgressProps & { left: number; top: number }) {
  const [scanStart, scanEnd] = TIMELINE.scanLine;
  const crossedAt = scanStart + (scanEnd - scanStart) * (top / VIEWPORT_HEIGHT);
  const appear = useFadeIn(progress, TIMELINE.markersIn);
  const fixed = useTransform(progress, [crossedAt - 0.004, crossedAt + 0.004], [0, 1]);
  const issueOpacity = useTransform([appear, fixed], ([shown, done]: number[]) => shown * (1 - done));
  const fixedOpacity = useTransform([appear, fixed], ([shown, done]: number[]) => shown * done);
  const fixedScale = useTransform(fixed, [0, 1], [0.4, 1]);

  return (
    <span className="absolute h-6 w-6" style={{ left, top }}>
      <motion.span
        className="absolute inset-0 flex items-center justify-center rounded-full bg-[#DC2626] text-sm font-extrabold text-white"
        style={{ opacity: issueOpacity }}
      >
        !
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center rounded-full bg-[#34D399] text-[#060E1A]"
        style={{ opacity: fixedOpacity, scale: fixedScale }}
      >
        <Check size={14} strokeWidth={3} aria-hidden="true" />
      </motion.span>
    </span>
  );
}

function ScanLine({ progress }: ProgressProps) {
  const opacity = useFadeWindow(progress, TIMELINE.scanVisible);
  const y = useTransform(progress, TIMELINE.scanLine, [0, VIEWPORT_HEIGHT]);

  return (
    <motion.div className="pointer-events-none absolute inset-x-0 top-0" style={{ opacity, y }}>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#34D399]/[0.07] to-transparent" />
      <div className="h-0.5 bg-accent shadow-[0_0_18px_3px_rgba(232,164,74,0.55)]" />
    </motion.div>
  );
}

/** Chapters 03–05: the finished page assembles, then a QA scan passes over it. */
export function SceneBuiltSite({ progress, copy }: SceneBuiltSiteProps) {
  const opacity = useFadeIn(progress, TIMELINE.builtSite);

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#060E1A] px-7 py-6" style={{ opacity }}>
      <div className="flex flex-col gap-5">
        <BuiltPart progress={progress} order={0} className="flex items-center gap-4 text-xs text-[#A9B6C9]">
          <span className="font-serif text-base font-bold text-white">{copy.brand}</span>
          <span className="flex-1" />
          {copy.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </BuiltPart>

        <div className="flex gap-6">
          <div className="flex flex-1 flex-col gap-2.5">
            <BuiltPart progress={progress} order={1}>
              <p className="font-serif text-3xl font-bold leading-[1.1] text-white">{copy.heroTitle}</p>
            </BuiltPart>
            <BuiltPart progress={progress} order={2}>
              <p className="text-sm leading-normal text-[#A9B6C9]">{copy.heroText}</p>
            </BuiltPart>
            <BuiltPart progress={progress} order={3} className="mt-1 flex gap-2">
              <span className="rounded-lg bg-accent px-3.5 py-2.5 text-xs font-bold text-[#060E1A]">
                {copy.primaryAction}
              </span>
              <span className="rounded-lg border border-[#2A3B58] px-3.5 py-2.5 text-xs font-semibold text-white">
                {copy.secondaryAction}
              </span>
            </BuiltPart>
          </div>
          <BuiltPart
            progress={progress}
            order={4}
            className="h-40 w-56 shrink-0 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(127,182,250,0.35),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(232,164,74,0.3),transparent_55%)] bg-[#0E1B30]"
          />
        </div>

        <BuiltPart
          progress={progress}
          order={5}
          className="flex flex-col gap-2.5 rounded-xl border border-[#1C2E4A] bg-[#0B1627] p-4"
        >
          <span className="text-sm font-bold text-white">{copy.formTitle}</span>
          <div className="flex gap-2.5">
            <span className="h-8 flex-1 rounded-lg border border-[#2A3B58] bg-[#060E1A]" />
            <span className="h-8 flex-1 rounded-lg border border-[#2A3B58] bg-[#060E1A]" />
            <span className="h-8 w-24 rounded-lg bg-[#2A3B58]" />
          </div>
        </BuiltPart>

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((cardIndex) => (
            <BuiltPart
              key={cardIndex}
              progress={progress}
              order={6 + cardIndex * 0.5}
              className="h-16 rounded-[10px] border border-[#1C2E4A] bg-[#0B1627]"
            />
          ))}
        </div>
      </div>

      <ScanLine progress={progress} />
      {QA_MARKERS.map((marker) => (
        <QaMarker key={`${marker.left}-${marker.top}`} progress={progress} left={marker.left} top={marker.top} />
      ))}
    </motion.div>
  );
}