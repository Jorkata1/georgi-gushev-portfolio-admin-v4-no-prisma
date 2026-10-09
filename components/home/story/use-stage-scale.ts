"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The scene is drawn at a fixed design size and scaled to its container, so every
 * screen sees the same composition. Returns null until the first measurement so the
 * stage can stay hidden instead of flashing at the wrong size.
 */
export function useStageScale<T extends HTMLElement>(designWidth: number) {
  const containerRef = useRef<T>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateScale = () => {
      const width = node.clientWidth;
      if (width > 0) setScale(width / designWidth);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(node);
    return () => observer.disconnect();
  }, [designWidth]);

  return { containerRef, scale };
}