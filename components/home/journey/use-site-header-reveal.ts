"use client";

import { useEffect, useRef } from "react";

const SLIDE_MS = 400;
const HIDDEN_TRANSFORM = "translateY(-110%)";

/**
 * While the journey plays, the site's main header slides out of the way; it slides back in
 * once the journey reaches its end. The header is lifted out of the page flow (fixed) for as
 * long as the homepage is open, so hiding it leaves no empty band, and every inline style it
 * had is restored when the visitor leaves the homepage.
 */
export function useSiteHeaderReveal(isVisible: boolean) {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("body header");
    if (!header) return;
    headerRef.current = header;
    const originalStyle = header.style.cssText;
    header.style.position = "fixed";
    header.style.top = "0";
    header.style.left = "0";
    header.style.right = "0";
    header.style.zIndex = "50";
    return () => {
      header.style.cssText = originalStyle;
      headerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 0 : SLIDE_MS;
    if (isVisible) {
      header.style.transition = `transform ${duration}ms ease-out, visibility 0s`;
      header.style.transform = "translateY(0)";
      header.style.visibility = "visible";
    } else {
      // Visibility flips after the slide so the hidden header also leaves the tab order.
      header.style.transition = `transform ${duration}ms ease-in, visibility 0s linear ${duration}ms`;
      header.style.transform = HIDDEN_TRANSFORM;
      header.style.visibility = "hidden";
    }
  }, [isVisible]);
}