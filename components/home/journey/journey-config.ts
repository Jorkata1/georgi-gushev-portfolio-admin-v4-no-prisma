/** Where each chapter's scene sits along the line (0 = start, 1 = the logo at the end). */
export const CHAPTER_STATIONS = [0.07, 0.26, 0.445, 0.585, 0.735, 0.875, 1] as const;
/** The chapter that shows featured projects. */
export const PROJECTS_CHAPTER = 5;
export const CHAPTER_COUNT = CHAPTER_STATIONS.length;

/** Scroll before this shows the intro screen instead of a chapter. */
export const INTRO_END = 0.03;
/** The camera travels the line until this scroll point; after it, the overview shot takes over. */
export const CAMERA_END = 0.86;
export const CAMERA_MAX_U = 0.985;
export const FINALE_START = 0.84;
/** The camera rests a little before each station, so the scene is in front of it. */
export const CAMERA_LEAD = 0.05;

/** Track length in viewport heights: how much scrolling the whole journey takes. */
export const TRACK_HEIGHT_VH = 1000;

/** Scroll progress at which the camera rests at each chapter. */
export const CHAPTER_SCROLL = CHAPTER_STATIONS.map((station, index) =>
  index === CHAPTER_COUNT - 1 ? 1 : Math.max(0.045, ((station - CAMERA_LEAD) / CAMERA_MAX_U) * CAMERA_END)
);

/** How far from one rest to the next (0 → 1) the chapter copy switches. */
export const CHAPTER_SWITCH = 0.45;

/** Chapter to show for a scroll progress, or -1 for the intro. Switches a little before halfway between rests. */
export function getChapterForProgress(progress: number): number {
  if (progress < INTRO_END) return -1;
  let chapter = 0;
  CHAPTER_SCROLL.forEach((rest, index) => {
    const previous = index === 0 ? 0 : CHAPTER_SCROLL[index - 1];
    if (progress >= previous + (rest - previous) * CHAPTER_SWITCH) chapter = index;
  });
  return chapter;
}

export function formatChapterNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}