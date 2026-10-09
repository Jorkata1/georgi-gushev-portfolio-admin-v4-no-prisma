import { useTransform, type MotionValue } from "framer-motion";

/** Number of chapters; each one owns an equal slice of the section's scroll progress. */
export const CHAPTER_COUNT = 5;

/** The page is one pinned story: an intro screen, the five chapters, then a finale. */
const SEGMENT_COUNT = CHAPTER_COUNT + 2;
const SEGMENT = 1 / SEGMENT_COUNT;

/** Section height in viewports. One viewport of scroll per segment feels unhurried without dragging. */
export const SECTION_HEIGHT_VH = SEGMENT_COUNT * 100;

/** Slice of the page's scroll progress that drives the five-chapter scene (0 → 1). */
export const STORY_RANGE = [SEGMENT, 1 - SEGMENT];

/** Where the intro hands over to the scene, and the scene to the finale. */
const INTRO_EXIT = SEGMENT * 0.5;
const FINALE_ENTER = 1 - SEGMENT * 0.6;

export type StoryPhase = "intro" | "story" | "finale";

export function getPhase(pageProgress: number): StoryPhase {
  if (pageProgress < INTRO_EXIT) return "intro";
  if (pageProgress >= FINALE_ENTER) return "finale";
  return "story";
}

/** Converts a scene progress (0 → 1) to the matching page progress. */
export function toPageProgress(storyProgress: number): number {
  const [start, end] = STORY_RANGE;
  return start + (end - start) * storyProgress;
}

/** Where each chapter's scene is "at rest". Used for the reduced-motion version and chapter jumps. */
export const CHAPTER_REST_PROGRESS = [0.15, 0.36, 0.57, 0.79, 1] as const;

/**
 * Scroll-progress keyframes for every moving part of the scene.
 * Chapter n occupies [n / 5, (n + 1) / 5]; each part animates inside its chapter so the
 * scene never changes faster than the copy on the left.
 */
export const TIMELINE = {
  oldSiteOut: [0.17, 0.22],
  loadingBar: [0, 0.15],
  loadingTimer: [0, 0.15],
  bannerJump: [0, 0.04, 0.07, 0.1, 0.13],
  cookieBarIn: [0.05, 0.09],
  timerCard: [0, 0, 0.17, 0.21],
  shiftCard: [0.06, 0.09, 0.17, 0.21],
  wireframe: [0.17, 0.22, 0.41, 0.46],
  gridColumns: [0.2, 0.27],
  wireframeBlocksStart: 0.21,
  paletteCard: [0.27, 0.31, 0.38, 0.42],
  gridCard: [0.22, 0.26, 0.38, 0.42],
  accentFill: [0.3, 0.35],
  builtSite: [0.41, 0.46],
  builtPartsStart: 0.44,
  codeCard: [0.4, 0.44, 0.58, 0.62],
  codeLinesStart: 0.42,
  gaugeCard: [0.43, 0.47, 0.58, 0.62],
  gaugeValue: [0.46, 0.57],
  scanLine: [0.62, 0.78],
  scanVisible: [0.6, 0.62, 0.78, 0.8],
  markersIn: [0.6, 0.62],
  checklistCard: [0.6, 0.64, 0.78, 0.82],
  checklistStart: 0.64,
  checklistStep: 0.035,
  browserShrink: [0.8, 0.88],
  tabletIn: [0.83, 0.89],
  phoneIn: [0.86, 0.92],
  chipsIn: [0.9, 0.95]
};

export function getChapterIndex(progress: number): number {
  const index = Math.floor(progress * CHAPTER_COUNT);
  return Math.min(CHAPTER_COUNT - 1, Math.max(0, index));
}

/** Opacity that fades in over [a, b], holds, then fades out over [c, d]. */
export function useFadeWindow(progress: MotionValue<number>, stops: number[]): MotionValue<number> {
  const [a, b, c, d] = stops;
  // Equal neighbouring stops would divide by zero inside interpolate, so a window that is
  // already open at the start (a === b) is expressed with three stops instead of four.
  const isOpenAtStart = a === b;
  const input = isOpenAtStart ? [b, c, d] : [a, b, c, d];
  const output = isOpenAtStart ? [1, 1, 0] : [0, 1, 1, 0];
  return useTransform(progress, input, output);
}

/** Opacity that fades in over [a, b] and then stays. */
export function useFadeIn(progress: MotionValue<number>, range: number[]): MotionValue<number> {
  return useTransform(progress, range, [0, 1]);
}