import { FINALE_STEP, STEP_POSITIONS } from "@/components/home/layers/layers-config";
import { clamp, easeInOutSine } from "@/components/home/layers/layers-motion";

/** Base duration of one step; longer jumps (rail clicks) take a little longer. */
const STEP_MS = 1000;
/** A wheel gesture is a run of events with no pause longer than this (eats trackpad inertia). */
const WHEEL_QUIET_MS = 160;
const WHEEL_MIN_DELTA = 6;
const SWIPE_MIN_PX = 40;
/** After a scrollbar drag or a jump ends between steps, settle on the nearest one after this pause. */
const SNAP_DELAY_MS = 180;
const RESIZE_DELAY_MS = 120;

const KEY_DIRECTIONS: Readonly<Record<string, 1 | -1>> = {
  ArrowDown: 1,
  PageDown: 1,
  " ": 1,
  ArrowUp: -1,
  PageUp: -1,
};

type StepLockOptions = {
  track: HTMLElement;
  railButtons: HTMLButtonElement[];
  reduceMotion: boolean;
  /** Current scroll progress of the track, 0 → 1 */
  getProgress: () => number;
  onResize: () => void;
};

export type StepLock = {
  getCurrentStep: () => number;
  destroy: () => void;
};

/**
 * Scroll-locked stepping through the story: one wheel gesture, swipe or key press moves exactly one
 * step with an eased scroll. Outside the track (and past its first and last step) the page scrolls natively.
 */
export function createStepLock({ track, railButtons, reduceMotion, getProgress, onResize }: StepLockOptions): StepLock {
  let currentStep = nearestStep();
  let isAnimating = false;
  let lockedUntil = 0;
  let lastWheelAt = 0;
  let lastWheelAbs = 0;
  let gestureUsed = false;
  let touchStartY: number | null = null;
  let snapTimer = 0;
  let resizeTimer = 0;
  let animationFrame = 0;

  function trackTop(): number {
    return track.getBoundingClientRect().top + window.scrollY;
  }

  function scrollTopFor(step: number): number {
    return trackTop() + STEP_POSITIONS[step] * (track.offsetHeight - window.innerHeight);
  }

  function isEngaged(): boolean {
    const rect = track.getBoundingClientRect();
    return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
  }

  function nearestStep(): number {
    const progress = getProgress();
    let best = 0;
    STEP_POSITIONS.forEach((position, index) => {
      if (Math.abs(position - progress) < Math.abs(STEP_POSITIONS[best] - progress)) best = index;
    });
    return best;
  }

  /* "instant" keeps a site-wide `scroll-behavior: smooth` from fighting the eased animation. */
  function jumpTo(top: number) {
    window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
  }

  function isLocked(now: number): boolean {
    return isAnimating || now < lockedUntil;
  }

  function isAtEdge(direction: number): boolean {
    return (direction > 0 && currentStep === FINALE_STEP) || (direction < 0 && currentStep === 0);
  }

  function goTo(requestedStep: number) {
    const step = clamp(requestedStep, 0, FINALE_STEP);
    currentStep = step;
    const from = window.scrollY;
    const to = scrollTopFor(step);
    cancelAnimationFrame(animationFrame);
    if (reduceMotion || Math.abs(to - from) < 2) {
      jumpTo(to);
      isAnimating = false;
      lockedUntil = performance.now() + 200;
      return;
    }
    isAnimating = true;
    const start = performance.now();
    const distanceRatio = Math.abs(to - from) / window.innerHeight;
    const duration = clamp(STEP_MS * Math.sqrt(distanceRatio), STEP_MS * 0.8, STEP_MS * 1.4);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      jumpTo(from + (to - from) * easeInOutSine(t));
      if (t < 1) {
        animationFrame = requestAnimationFrame(tick);
        return;
      }
      isAnimating = false;
      lockedUntil = performance.now() + 120;
    };
    animationFrame = requestAnimationFrame(tick);
  }

  const handleWheel = (event: WheelEvent) => {
    if (!isEngaged()) return;
    const now = performance.now();
    const abs = Math.abs(event.deltaY);
    const direction = Math.sign(event.deltaY);
    /* A clearly stronger flick during the inertia tail is a new, deliberate gesture. */
    const isNewGesture = now - lastWheelAt >= WHEEL_QUIET_MS || (abs > 30 && abs > lastWheelAbs * 2.2);
    lastWheelAt = now;
    lastWheelAbs = abs;
    if (isNewGesture) gestureUsed = false;
    const atEdge = isAtEdge(direction);
    if (atEdge && !isLocked(now) && !gestureUsed) return; /* let the page scroll on past the story */
    event.preventDefault();
    if (gestureUsed || isLocked(now) || direction === 0 || abs < WHEEL_MIN_DELTA || atEdge) return;
    gestureUsed = true;
    goTo(currentStep + direction);
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (touchStartY === null || !touch || !isEngaged()) return;
    if (!isAtEdge(Math.sign(touchStartY - touch.clientY))) event.preventDefault();
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const touch = event.changedTouches[0];
    if (touchStartY === null || !touch) return;
    const deltaY = touchStartY - touch.clientY;
    touchStartY = null;
    if (!isEngaged() || isLocked(performance.now()) || Math.abs(deltaY) < SWIPE_MIN_PX) return;
    const direction = deltaY > 0 ? 1 : -1;
    if (!isAtEdge(direction)) goTo(currentStep + direction);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isEngaged() || event.altKey || event.ctrlKey || event.metaKey) return;
    const direction = KEY_DIRECTIONS[event.key];
    if (!direction) return;
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest("input, textarea, select, [contenteditable]")) return;
    /* Space on a focused button or link activates it rather than stepping. */
    if (event.key === " " && target?.closest("button, a")) return;
    if (isAtEdge(direction)) return;
    event.preventDefault();
    if (!isLocked(performance.now())) goTo(currentStep + direction);
  };

  const handleScroll = () => {
    if (isAnimating) return;
    window.clearTimeout(snapTimer);
    snapTimer = window.setTimeout(() => {
      if (!isEngaged() || isAnimating) return;
      const step = nearestStep();
      currentStep = step;
      if (Math.abs(window.scrollY - scrollTopFor(step)) > 2) goTo(step);
    }, SNAP_DELAY_MS);
  };

  const handleResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      onResize();
      /* Phones resize when the address bar hides: keep the current step exactly in place. */
      if (isEngaged() && !isAnimating) jumpTo(scrollTopFor(currentStep));
    }, RESIZE_DELAY_MS);
  };

  const railHandlers = railButtons.map((button, index) => {
    const handleClick = () => goTo(index + 1);
    button.addEventListener("click", handleClick);
    return () => button.removeEventListener("click", handleClick);
  });

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: false });
  window.addEventListener("touchend", handleTouchEnd, { passive: true });
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize);

  return {
    getCurrentStep: () => currentStep,
    destroy: () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(snapTimer);
      window.clearTimeout(resizeTimer);
      railHandlers.forEach((remove) => remove());
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    },
  };
}