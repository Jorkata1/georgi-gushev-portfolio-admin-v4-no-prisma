import { useTransform, type MotionValue } from "framer-motion";

/** Number of chapters; each one owns an equal slice of the section's scroll progress. */
export const CHAPTER_COUNT = 5;

/** The page is one pinned story told in slides: an intro, the five chapters, then a finale. */
export const SLIDE_COUNT = CHAPTER_COUNT + 2;
export const LAST_SLIDE = SLIDE_COUNT - 1;

/** Section height in viewports: one viewport of scroll per slide. */
export const SECTION_HEIGHT_VH = SLIDE_COUNT * 100;

/** How a slide's animation plays once the visitor moves to it. */
export const SLIDE_TRANSITION = { duration: 3, ease: [0.45, 0, 0.25, 1] } as const;

export type StoryPhase = "intro" | "story" | "finale";

export function clampSlide(slide: number): number {
  return Math.min(LAST_SLIDE, Math.max(0, slide));
}

/** Nearest slide for a scroll progress through the section (0 → 1). */
export function getSlideFromScroll(scrollProgress: number): number {
  return clampSlide(Math.round(scrollProgress * LAST_SLIDE));
}

export function getPhaseForSlide(slide: number): StoryPhase {
  if (slide === 0) return "intro";
  if (slide === LAST_SLIDE) return "finale";
  return "story";
}

/** Chapter shown on a slide; the intro and finale fall back to the nearest chapter. */
export function getChapterIndexForSlide(slide: number): number {
  return Math.min(CHAPTER_COUNT - 1, Math.max(0, slide - 1));
}

/** Where each chapter's scene is "at rest": a slide's animation plays up to this point. */
export const CHAPTER_REST_PROGRESS = [0.15, 0.36, 0.57, 0.79, 1] as const;

/** Scene progress a slide animates to. The intro shows the scene's first frame. */
export function getStoryProgressForSlide(slide: number): number {
  if (slide === 0) return 0;
  return CHAPTER_REST_PROGRESS[getChapterIndexForSlide(slide)];
}

/**
 * Scene-progress keyframes for every moving part of the scene (0 → 1 across the five chapters).
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