/** Timeline and geometry of the homepage layers story. Scroll progress runs 0 → 1 over the track. */

/** The hero (assembled site) holds until here, then the layers separate until EXPLODE_END. */
export const INTRO_END = 0.06;
export const EXPLODE_END = 0.16;

/** One scroll window per layer step (01–05). */
export const FOCUS_WINDOWS: ReadonlyArray<readonly [number, number]> = [
  [0.16, 0.3],
  [0.3, 0.44],
  [0.44, 0.58],
  [0.58, 0.72],
  [0.72, 0.86],
];

/** The layers close back into the finished site inside this window. */
export const ASSEMBLE_WINDOW: readonly [number, number] = [0.86, 0.95];

/** Bottom → top: 05 speed at the base, 01 words on top (also the reading order, surface first). */
export const STACK_ORDER: ReadonlyArray<number> = [5, 4, 3, 2, 1];

/** Distance between neighbouring layers when fully exploded, and the extra lift of the focused one (px). */
export const MAX_GAP = 128;
export const FOCUS_LIFT = 60;

/** Per-frame (at 60 fps) easing rates. */
export const SCROLL_EASE = 0.16;
export const TILT_EASE = 0.05;
export const LIFT_EASE = 0.09;

/** Speed counters of step 05 run for this long once the step opens. */
export const COUNT_MS = 1500;

/** The last step index: 0 = hero, 1–5 = layers, 6 = finale. */
export const FINALE_STEP = 6;

/** Where each step rests on the track: the hero, the centre of each layer window, the finale. */
export const STEP_POSITIONS: ReadonlyArray<number> = [
  0,
  ...FOCUS_WINDOWS.map(([start, end]) => (start + end) / 2),
  1,
];

/** Which step a scroll progress belongs to. */
export function getStepForProgress(progress: number): number {
  if (progress < INTRO_END + 0.04) return 0;
  const index = FOCUS_WINDOWS.findIndex(([, end]) => progress < end);
  return index === -1 ? FINALE_STEP : index + 1;
}

/** The exploded stack is about 720 × 860 units at scale 1; this keeps all of it inside the scene. */
export const STACK_FIT_WIDTH = 720;
export const STACK_FIT_HEIGHT = 860;
export const STACK_FIT_MAX = 1.1;