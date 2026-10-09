"use client";

import { useEffect } from "react";

const STATE_ATTRIBUTE = "data-journey-menu";
const STYLE_ID = "journey-menu-style";

/**
 * Rules keyed on an attribute of <html>, so they keep working even if the header is
 * re-rendered or mounted after the journey (inline styles on the element would be lost).
 * On the homepage the header is lifted out of the page flow (fixed), so hiding it leaves
 * no empty band; visibility flips after the slide so the hidden menu leaves the tab order.
 */
const HEADER_RULES = `
  html[${STATE_ATTRIBUTE}] body header {
    position: fixed !important;
    top: 0 !important;
    left: 0;
    right: 0;
    z-index: 50;
    transition: transform 400ms ease-out, visibility 0s linear 0s;
  }
  html[${STATE_ATTRIBUTE}="hidden"] body header {
    transform: translateY(-110%);
    visibility: hidden;
    transition: transform 400ms ease-in, visibility 0s linear 400ms;
  }
  @media (prefers-reduced-motion: reduce) {
    html[${STATE_ATTRIBUTE}] body header { transition: none; }
  }
  /* No footer on the homepage: the journey's finale already carries the links. */
  html[${STATE_ATTRIBUTE}] body footer { display: none; }
  /* No "back to top" button on the homepage; the journey has its own "Start over". */
  html[${STATE_ATTRIBUTE}] button.fixed.bottom-5.right-5,
  html[${STATE_ATTRIBUTE}] button[aria-label="Нагоре"],
  html[${STATE_ATTRIBUTE}] button[aria-label="Back to top"] { display: none !important; }
`;

/**
 * Homepage-only adjustments to the site chrome: the main menu stays out of the way until the
 * journey reaches its end, the footer is hidden, and the "back to top"
 * button is hidden. Everything is undone when the visitor leaves the homepage.
 */
export function useSiteHeaderReveal(isVisible: boolean) {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = HEADER_RULES;
    document.head.appendChild(style);
    return () => {
      style.remove();
      document.documentElement.removeAttribute(STATE_ATTRIBUTE);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(STATE_ATTRIBUTE, isVisible ? "shown" : "hidden");
  }, [isVisible]);
}