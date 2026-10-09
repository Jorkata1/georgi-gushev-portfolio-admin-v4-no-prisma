"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { StoryStageCopy } from "@/components/home/story/story-copy";
import { TIMELINE, useFadeWindow } from "@/components/home/story/story-timeline";

const GRID_COLUMN_COUNT = 12;
const GRID_COLUMN_STAGGER = 0.004;
const BLOCK_STAGGER = 0.012;
const BLOCK_DURATION = 0.04;

type SceneWireframeProps = {
  progress: MotionValue<number>;
  copy: StoryStageCopy;
};

type ProgressProps = { progress: MotionValue<number> };

function GridColumn({ progress, index }: ProgressProps & { index: number }) {
  const start = TIMELINE.gridColumns[0] + index * GRID_COLUMN_STAGGER;
  const scaleY = useTransform(progress, [start, start + 0.05], [0, 1]);
  return <motion.span className="origin-top bg-accent/[0.07]" style={{ scaleY }} />;
}

function WireBlock({
  progress,
  order,
  className,
  children
}: ProgressProps & { order: number; className?: string; children?: ReactNode }) {
  const start = TIMELINE.wireframeBlocksStart + order * BLOCK_STAGGER;
  const opacity = useTransform(progress, [start, start + BLOCK_DURATION], [0, 1]);
  const y = useTransform(progress, [start, start + BLOCK_DURATION], [14, 0]);
  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

/** Chapter 02: the page reduced to structure on a 12-column grid, then the accent color arrives. */
export function SceneWireframe({ progress, copy }: SceneWireframeProps) {
  const opacity = useFadeWindow(progress, TIMELINE.wireframe);
  const accentOpacity = useTransform(progress, TIMELINE.accentFill, [0, 1]);
  const outlineTextOpacity = useTransform(accentOpacity, (value) => 1 - value);

  return (
    <motion.div className="absolute inset-0 overflow-hidden bg-[#08121F]" style={{ opacity }}>
      <div className="absolute inset-y-0 left-7 right-7 grid grid-cols-12 gap-x-3">
        {Array.from({ length: GRID_COLUMN_COUNT }, (_, index) => (
          <GridColumn key={index} progress={progress} index={index} />
        ))}
      </div>

      <div className="relative flex flex-col gap-6 px-7 py-6">
        <WireBlock progress={progress} order={0} className="flex items-center gap-3">
          <span className="h-6 w-24 rounded-md border-[1.5px] border-[#3A4F70]" />
          <span className="flex-1" />
          <span className="h-2.5 w-14 rounded bg-[#2A3B58]" />
          <span className="h-2.5 w-14 rounded bg-[#2A3B58]" />
          <span className="h-8 w-24 rounded-lg border-[1.5px] border-[#3A4F70]" />
        </WireBlock>

        <div className="flex gap-6">
          <WireBlock progress={progress} order={1} className="flex flex-1 flex-col gap-3 pt-4">
            <span className="font-mono text-[11px] text-[#7FB6FA]">{copy.messageLabel}</span>
            <span className="h-6 w-[92%] rounded bg-[#2A3B58]" />
            <span className="h-6 w-[70%] rounded bg-[#2A3B58]" />
            <span className="mt-1.5 h-2 w-[84%] rounded bg-[#1C2E4A]" />
            <span className="h-2 w-[64%] rounded bg-[#1C2E4A]" />
            <div className="mt-2.5 flex gap-2.5">
              <span className="relative flex h-9 w-32 items-center justify-center overflow-hidden rounded-lg border-[1.5px] border-[#3A4F70] font-mono text-[11px] text-white">
                <motion.span className="absolute inset-0 bg-accent" style={{ opacity: accentOpacity }} />
                <motion.span className="absolute inset-0 flex items-center justify-center" style={{ opacity: outlineTextOpacity }}>
                  {copy.actionLabel}
                </motion.span>
                <motion.span
                  className="absolute inset-0 flex items-center justify-center font-bold text-[#060E1A]"
                  style={{ opacity: accentOpacity }}
                >
                  {copy.actionLabel}
                </motion.span>
              </span>
              <span className="h-9 w-28 rounded-lg border-[1.5px] border-[#3A4F70]" />
            </div>
          </WireBlock>
          <WireBlock
            progress={progress}
            order={2}
            className="flex h-52 w-60 shrink-0 items-center justify-center rounded-xl border-[1.5px] border-dashed border-[#3A4F70]"
          >
            <ImageIcon size={40} strokeWidth={1.5} className="text-[#3A4F70]" aria-hidden="true" />
          </WireBlock>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((cardIndex) => (
            <WireBlock
              key={cardIndex}
              progress={progress}
              order={3 + cardIndex}
              className="flex flex-col gap-2 rounded-[10px] border-[1.5px] border-[#2A3B58] p-3.5"
            >
              {cardIndex === 0 ? (
                <span className="font-mono text-[11px] text-[#7FB6FA]">{copy.proofLabel}</span>
              ) : (
                <span className="h-2.5 w-1/2 rounded bg-[#2A3B58]" />
              )}
              <span className="h-2 rounded bg-[#1C2E4A]" />
              <span className="h-2 w-[70%] rounded bg-[#1C2E4A]" />
            </WireBlock>
          ))}
        </div>
      </div>
    </motion.div>
  );
}