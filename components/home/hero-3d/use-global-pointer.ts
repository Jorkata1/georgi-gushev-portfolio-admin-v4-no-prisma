"use client";

import { useEffect, useRef } from "react";

export interface PointerTarget {
  /** Horizontal position across the viewport, from -1 (left) to 1 (right). */
  x: number;
  /** Vertical position across the viewport, from -1 (bottom) to 1 (top). */
  y: number;
}

/**
 * Tracks the cursor over the whole page (not only the canvas) in a ref,
 * so the scene can follow it without triggering React re-renders.
 */
export function useGlobalPointer() {
  const pointer = useRef<PointerTarget>({ x: 0, y: 0 });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    }

    function handlePointerLeave() {
      pointer.current.x = 0;
      pointer.current.y = 0;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return pointer;
}
