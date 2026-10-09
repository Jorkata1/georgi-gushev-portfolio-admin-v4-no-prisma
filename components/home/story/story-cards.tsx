"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { AlertTriangle, Code2, LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";
import type { StoryStageCopy } from "@/components/home/story/story-copy";
import { TIMELINE, useFadeWindow } from "@/components/home/story/story-timeline";

type ProgressProps = { progress: MotionValue<number> };
type CardProps = ProgressProps & { copy: StoryStageCopy };

const CARD_CLASS =
  "absolute rounded-2xl border border-[#1C2E4A] bg-[#0B1627] shadow-[0_20px_40px_rgba(0,0,0,0.45)]";
const PILL_CLASS = `${CARD_CLASS} flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white`;

const GAUGE_START = 41;
const GAUGE_END = 97;
const GAUGE_ARC = 75;
const CODE_LINE_STEP = 0.012;

function FloatingCard({ progress, window, className, offsetX = 0, children }: ProgressProps & {
  window: number[];
  className: string;
  offsetX?: number;
  children: ReactNode;
}) {
  const opacity = useFadeWindow(progress, window);
  const x = useTransform(opacity, [0, 1], [offsetX, 0]);
  const y = useTransform(opacity, [0, 1], [offsetX === 0 ? 12 : 0, 0]);
  return (
    <motion.div className={className} style={{ opacity, x, y }}>
      {children}
    </motion.div>
  );
}

function formatSeconds(value: number): string {
  return `${value.toFixed(1).replace(".", ",")}s`;
}

export function LoadingTimerCard({ progress, copy }: CardProps) {
  const ring = useTransform(progress, TIMELINE.loadingTimer, [0, 96]);
  const dashArray = useTransform(ring, (value) => `${value} 100`);
  const seconds = useTransform(progress, TIMELINE.loadingTimer, [0, 4.8]);
  const label = useTransform(seconds, formatSeconds);

  return (
    <FloatingCard
      progress={progress}
      window={TIMELINE.timerCard}
      className={`${CARD_CLASS} left-[540px] top-2 flex items-center gap-3.5 border-[#F87171]/45 px-4 py-3.5`}
    >
      <div className="relative h-14 w-14">
        <svg width="56" height="56" viewBox="0 0 58 58" aria-hidden="true">
          <circle cx="29" cy="29" r="24" fill="none" stroke="#102038" strokeWidth="6" />
          <motion.circle
            cx="29"
            cy="29"
            r="24"
            fill="none"
            stroke="#F87171"
            strokeWidth="6"
            strokeLinecap="round"
            pathLength={100}
            transform="rotate(-90 29 29)"
            style={{ strokeDasharray: dashArray }}
          />
        </svg>
        <motion.span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-white">
          {label}
        </motion.span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-bold text-[#F87171]">{copy.loading}</span>
        <span className="text-[15px] font-semibold text-white">{copy.visitorLeft}</span>
      </div>
    </FloatingCard>
  );
}

export function LayoutShiftCard({ progress, copy }: CardProps) {
  return (
    <FloatingCard progress={progress} window={TIMELINE.shiftCard} offsetX={-24} className={`${PILL_CLASS} left-3 top-[470px]`}>
      <AlertTriangle size={18} className="text-[#FBBF24]" aria-hidden="true" />
      {copy.layoutShift}
    </FloatingCard>
  );
}

export function GridCard({ progress, copy }: CardProps) {
  return (
    <FloatingCard progress={progress} window={TIMELINE.gridCard} offsetX={-24} className={`${PILL_CLASS} left-3 top-[470px]`}>
      <LayoutGrid size={18} className="text-[#7FB6FA]" aria-hidden="true" />
      {copy.gridLabel}
    </FloatingCard>
  );
}

export function PaletteCard({ progress, copy }: CardProps) {
  return (
    <FloatingCard
      progress={progress}
      window={TIMELINE.paletteCard}
      offsetX={32}
      className={`${CARD_CLASS} left-[690px] top-[110px] flex flex-col gap-3 p-4`}
    >
      <span className="font-mono text-[11px] text-[#A9B6C9]">{copy.colorsLabel}</span>
      <div className="flex gap-2">
        <span className="h-8 w-8 rounded-lg bg-accent" />
        <span className="h-8 w-8 rounded-lg bg-[#7FB6FA]" />
        <span className="h-8 w-8 rounded-lg border border-[#2A3B58] bg-[#060E1A]" />
      </div>
      <span className="font-mono text-[11px] text-[#A9B6C9]">{copy.fontLabel}</span>
      <span className="font-serif text-4xl font-bold leading-none text-white">Aa</span>
    </FloatingCard>
  );
}

const CODE_LINES: ReadonlyArray<{ indent: number; content: ReactNode }> = [
  { indent: 0, content: <span className="text-[#6F82A0]">{"// hero.tsx"}</span> },
  { indent: 0, content: <><span className="text-[#C792EA]">export function</span> <span className="text-[#7FB6FA]">Hero</span>{"() {"}</> },
  { indent: 1, content: <><span className="text-[#C792EA]">return</span>{" ("}</> },
  { indent: 2, content: <span className="text-[#A9B6C9]">&lt;<span className="text-[#F07178]">section</span>&gt;</span> },
  { indent: 3, content: <span className="text-[#A9B6C9]">&lt;<span className="text-[#F07178]">h1</span>&gt;{"{title}"}&lt;/<span className="text-[#F07178]">h1</span>&gt;</span> },
  { indent: 3, content: <span className="text-[#A9B6C9]">&lt;<span className="text-[#F07178]">Image</span></span> },
  { indent: 4, content: <span className="text-[#FFCB6B]">priority</span> },
  { indent: 4, content: <><span className="text-[#FFCB6B]">format</span>=<span className="text-[#C3E88D]">&quot;avif&quot;</span></> },
  { indent: 3, content: <span className="text-[#A9B6C9]">/&gt;</span> },
  { indent: 3, content: <span className="text-[#A9B6C9]">&lt;<span className="text-[#F07178]">CTA</span> /&gt;</span> }
];

function CodeLine({ progress, index, indent, children }: ProgressProps & {
  index: number;
  indent: number;
  children: ReactNode;
}) {
  const start = TIMELINE.codeLinesStart + index * CODE_LINE_STEP;
  const clipPath = useTransform(progress, [start, start + CODE_LINE_STEP], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return (
    <motion.span className="block whitespace-pre" style={{ clipPath, paddingLeft: indent * 14 }}>
      {children}
    </motion.span>
  );
}

export function CodeCard({ progress }: ProgressProps) {
  return (
    <FloatingCard
      progress={progress}
      window={TIMELINE.codeCard}
      offsetX={-32}
      className={`${CARD_CLASS} left-0 top-[290px] w-[290px] overflow-hidden border-[#2A3B58] bg-[#050B15]`}
    >
      <div className="flex items-center gap-2 border-b border-[#1C2E4A] px-4 py-2.5 text-xs text-[#A9B6C9]">
        <Code2 size={14} className="text-accent" aria-hidden="true" />
        hero.tsx
      </div>
      <div className="flex flex-col gap-0.5 px-4 py-3 font-mono text-xs leading-normal text-white">
        {CODE_LINES.map((line, index) => (
          <CodeLine key={index} progress={progress} index={index} indent={line.indent}>
            {line.content}
          </CodeLine>
        ))}
      </div>
    </FloatingCard>
  );
}

export function SpeedGaugeCard({ progress, copy }: CardProps) {
  const score = useTransform(progress, TIMELINE.gaugeValue, [GAUGE_START, GAUGE_END]);
  const dashArray = useTransform(score, (value) => `${(value / 100) * GAUGE_ARC} 100`);
  const color = useTransform(score, [GAUGE_START, 70, 90], ["#F87171", "#FBBF24", "#34D399"]);
  const label = useTransform(score, (value) => String(Math.round(value)));

  return (
    <FloatingCard
      progress={progress}
      window={TIMELINE.gaugeCard}
      className={`${CARD_CLASS} left-[560px] top-1 flex items-center gap-4 px-5 py-4`}
    >
      <div className="relative h-[92px] w-[92px]">
        <svg width="92" height="92" viewBox="0 0 92 92" aria-hidden="true">
          <circle cx="46" cy="46" r="38" fill="none" stroke="#102038" strokeWidth="8" strokeLinecap="round" pathLength={100} strokeDasharray={`${GAUGE_ARC} 100`} transform="rotate(135 46 46)" />
          <motion.circle
            cx="46"
            cy="46"
            r="38"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            pathLength={100}
            transform="rotate(135 46 46)"
            style={{ strokeDasharray: dashArray, stroke: color }}
          />
        </svg>
        <motion.span className="absolute inset-0 flex items-center justify-center font-mono text-[28px] font-bold text-white">
          {label}
        </motion.span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[13px] text-[#A9B6C9]">{copy.speedLabel}</span>
        <span className="font-mono text-[15px]">
          <span className="text-[#F87171] line-through">{GAUGE_START}</span>
          <span className="text-[#6F82A0]"> → </span>
          <span className="font-bold text-[#34D399]">{GAUGE_END}</span>
        </span>
      </div>
    </FloatingCard>
  );
}

function ChecklistRow({ progress, index, label, copy }: CardProps & { index: number; label: string }) {
  const doneAt = TIMELINE.checklistStart + index * TIMELINE.checklistStep;
  const done = useTransform(progress, [doneAt - 0.004, doneAt + 0.004], [0, 1]);
  const pending = useTransform(done, (value) => 1 - value);

  return (
    <div className="flex items-center gap-2.5 text-sm text-white">
      <span className="relative h-[18px] w-[18px] shrink-0">
        <motion.span className="absolute inset-0 rounded-full bg-[#FBBF24]" style={{ opacity: pending }} />
        <motion.span className="absolute inset-0 rounded-full bg-[#34D399]" style={{ opacity: done }} />
      </span>
      <span className="flex-1">{label}</span>
      <span className="relative text-xs">
        <motion.span className="text-[#FBBF24]" style={{ opacity: pending }}>{copy.checkPending}</motion.span>
        <motion.span className="absolute right-0 top-0 text-[#34D399]" style={{ opacity: done }}>{copy.checkDone}</motion.span>
      </span>
    </div>
  );
}

export function ChecklistCard({ progress, copy }: CardProps) {
  return (
    <FloatingCard
      progress={progress}
      window={TIMELINE.checklistCard}
      offsetX={32}
      className={`${CARD_CLASS} left-[540px] top-1 flex w-[270px] flex-col gap-2.5 px-[18px] py-4`}
    >
      <span className="font-mono text-[11px] text-[#A9B6C9]">{copy.checklistTitle}</span>
      {copy.checks.map((label, index) => (
        <ChecklistRow key={label} progress={progress} index={index} label={label} copy={copy} />
      ))}
    </FloatingCard>
  );
}