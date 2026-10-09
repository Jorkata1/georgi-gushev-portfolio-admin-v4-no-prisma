"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { TIMELINE, useFadeIn, useFadeWindow } from "@/components/home/story/story-timeline";

/** Height of the browser viewport in design pixels; scan line and markers are placed against it. */
const VIEWPORT_HEIGHT = 476;

/** Issues the QA pass finds on the finished site; each turns green when the scan line crosses it. */
const QA_MARKERS = [
  { left: 164, top: 24 },
  { left: 404, top: 112 },
  { left: 300, top: 318 },
  { left: 640, top: 414 }
] as const;

type ProgressProps = { progress: MotionValue<number> };

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

/** Chapter 04 overlay: a scan line passes over the finished site and turns issues into checks. */
export function SceneQaOverlay({ progress }: ProgressProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <ScanLine progress={progress} />
      {QA_MARKERS.map((marker) => (
        <QaMarker key={`${marker.left}-${marker.top}`} progress={progress} left={marker.left} top={marker.top} />
      ))}
    </div>
  );
}