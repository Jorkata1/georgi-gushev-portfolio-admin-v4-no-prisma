"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One element of the morphing website: a rectangle whose geometry and colors change
 * continuously with the scene progress, so the old site, the wireframe and the finished
 * site are the same shapes moving into new places.
 */
export type ShapeState = {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  fill: string;
  stroke: string;
  opacity: number;
};

/** [scene progress, state] pairs; progress values must increase. */
export type ShapeKeyframes = Array<readonly [number, ShapeState]>;

type ShapeOptions = Partial<Pick<ShapeState, "rx" | "fill" | "stroke" | "opacity">>;

const NO_COLOR = "rgba(0, 0, 0, 0)";

export function shape(x: number, y: number, width: number, height: number, options: ShapeOptions = {}): ShapeState {
  return {
    x,
    y,
    width,
    height,
    rx: options.rx ?? 0,
    fill: options.fill ?? NO_COLOR,
    stroke: options.stroke ?? NO_COLOR,
    opacity: options.opacity ?? 1
  };
}

export function hidden(state: ShapeState): ShapeState {
  return { ...state, opacity: 0 };
}

function useShapeValue<K extends keyof ShapeState>(
  progress: MotionValue<number>,
  keyframes: ShapeKeyframes,
  key: K
): MotionValue<ShapeState[K]> {
  return useTransform(
    progress,
    keyframes.map(([at]) => at),
    keyframes.map(([, state]) => state[key])
  );
}

type MorphShapeProps = {
  progress: MotionValue<number>;
  keyframes: ShapeKeyframes;
  strokeWidth?: number;
  strokeDasharray?: string;
};

export function MorphShape({ progress, keyframes, strokeWidth = 1.5, strokeDasharray }: MorphShapeProps) {
  const x = useShapeValue(progress, keyframes, "x");
  const y = useShapeValue(progress, keyframes, "y");
  const width = useShapeValue(progress, keyframes, "width");
  const height = useShapeValue(progress, keyframes, "height");
  const rx = useShapeValue(progress, keyframes, "rx");
  const fill = useShapeValue(progress, keyframes, "fill");
  const stroke = useShapeValue(progress, keyframes, "stroke");
  const opacity = useShapeValue(progress, keyframes, "opacity");

  return (
    <motion.rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      opacity={opacity}
    />
  );
}

type FadeTextProps = {
  progress: MotionValue<number>;
  /** [fade in start, fade in end] or [in start, in end, out start, out end]. */
  window: number[];
  x: number;
  y: number;
  fontSize: number;
  fill: string;
  fontWeight?: number;
  fontFamily?: string;
  textAnchor?: "start" | "middle" | "end";
  children: ReactNode;
};

const SANS_STACK = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

/** Text that appears in place, usually exactly over the shape it replaces. */
export function FadeText({ progress, window: stops, x, y, fontSize, fill, fontWeight = 400, fontFamily = SANS_STACK, textAnchor = "start", children }: FadeTextProps) {
  const isWindow = stops.length === 4;
  const opacity = useTransform(progress, stops, isWindow ? [0, 1, 1, 0] : [0, 1]);
  const offsetY = useTransform(progress, stops.slice(0, 2), [6, 0]);

  return (
    <motion.text
      x={x}
      y={y}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      fill={fill}
      textAnchor={textAnchor}
      opacity={opacity}
      style={{ y: offsetY }}
    >
      {children}
    </motion.text>
  );
}