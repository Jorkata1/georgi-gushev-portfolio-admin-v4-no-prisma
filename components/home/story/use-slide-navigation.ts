"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import type { MotionValue } from "framer-motion";
import { LAST_SLIDE, clampSlide } from "@/components/home/story/story-timeline";

/** After a slide change, further input is ignored for this long so one gesture = one slide. */
const SLIDE_LOCK_MS = 900;
/** Wheel events closer together than this belong to the same gesture (trackpad momentum). */
const WHEEL_GESTURE_GAP_MS = 200;
const MIN_WHEEL_DELTA = 4;
const MIN_SWIPE_DISTANCE = 40;
/** How far from a whole slide the scroll position may be and still count as "on" that slide. */
const SLIDE_TOLERANCE = 0.05;
/** Pixels of slack when checking whether the section is pinned. */
const PIN_TOLERANCE_PX = 2;

const NEXT_KEYS = new Set(["ArrowDown", "PageDown"]);
const PREVIOUS_KEYS = new Set(["ArrowUp", "PageUp"]);
const EDITABLE_SELECTOR = "input, textarea, select, [contenteditable='true']";

type Direction = 1 | -1;

type UseSlideNavigationOptions = {
  sectionRef: RefObject<HTMLElement>;
  scrollProgress: MotionValue<number>;
};

/**
 * Turns wheel, swipe and keyboard input over the pinned story into whole-slide steps.
 * Input is only captured while the section is pinned; past the last slide (or above the
 * first) the page scrolls normally, so the footer stays reachable.
 */
export function useSlideNavigation({ sectionRef, scrollProgress }: UseSlideNavigationOptions) {
  const lockedUntilRef = useRef(0);

  const goToSlide = useCallback(
    (slide: number) => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const top = sectionTop + scrollableDistance * (clampSlide(slide) / LAST_SLIDE);
      // The scene is pinned, so jumping instantly is invisible; the slide's own animation does the work.
      window.scrollTo({ top, behavior: "instant" });
      lockedUntilRef.current = performance.now() + SLIDE_LOCK_MS;
    },
    [sectionRef]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isPinned = () => {
      const rect = section.getBoundingClientRect();
      return rect.top <= PIN_TOLERANCE_PX && rect.bottom >= window.innerHeight - PIN_TOLERANCE_PX;
    };

    /** Slide to move to for a step in this direction, or null when the page should scroll normally. */
    const getTargetSlide = (direction: Direction): number | null => {
      const position = scrollProgress.get() * LAST_SLIDE;
      const nearest = Math.round(position);
      const isBetweenSlides = Math.abs(position - nearest) > SLIDE_TOLERANCE;
      // Arriving mid-way (scrollbar drag, scrolling back up from the footer): settle on the nearest slide first.
      const target = isBetweenSlides ? nearest : nearest + direction;
      if (target < 0 || target > LAST_SLIDE) return null;
      return target;
    };

    const isLocked = () => performance.now() < lockedUntilRef.current;

    let lastWheelAt = 0;
    let isWheelGestureUsed = false;

    const handleWheel = (event: WheelEvent) => {
      if (!isPinned() || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      const now = performance.now();
      if (now - lastWheelAt > WHEEL_GESTURE_GAP_MS) isWheelGestureUsed = false;
      lastWheelAt = now;

      const direction: Direction = event.deltaY > 0 ? 1 : -1;
      const target = getTargetSlide(direction);

      // Momentum from a gesture that already changed the slide must not leak into the next one.
      if (isWheelGestureUsed || isLocked()) {
        event.preventDefault();
        return;
      }
      if (target === null) return;

      event.preventDefault();
      if (Math.abs(event.deltaY) < MIN_WHEEL_DELTA) return;
      isWheelGestureUsed = true;
      goToSlide(target);
    };

    let touchStartY = 0;
    let isTouchCaptured = false;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
      isTouchCaptured = isPinned();
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isTouchCaptured) return;
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const direction: Direction = touchStartY - currentY > 0 ? 1 : -1;
      if (isLocked() || getTargetSlide(direction) !== null) event.preventDefault();
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (!isTouchCaptured || isLocked()) return;
      const endY = event.changedTouches[0]?.clientY ?? touchStartY;
      const distance = touchStartY - endY;
      if (Math.abs(distance) < MIN_SWIPE_DISTANCE) return;
      const target = getTargetSlide(distance > 0 ? 1 : -1);
      if (target !== null) goToSlide(target);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || !isPinned()) return;
      if (event.target instanceof Element && event.target.closest(EDITABLE_SELECTOR)) return;

      const isSpace = event.key === " " && !(event.target instanceof Element && event.target.closest("button, a"));
      const isNext = NEXT_KEYS.has(event.key) || (isSpace && !event.shiftKey);
      const isPrevious = PREVIOUS_KEYS.has(event.key) || (isSpace && event.shiftKey);
      if (!isNext && !isPrevious) return;

      const target = getTargetSlide(isNext ? 1 : -1);
      if (target === null) return;
      event.preventDefault();
      if (!isLocked()) goToSlide(target);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToSlide, scrollProgress, sectionRef]);

  return { goToSlide };
}