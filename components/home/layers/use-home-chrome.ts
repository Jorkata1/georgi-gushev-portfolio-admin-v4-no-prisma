"use client";

import { useEffect } from "react";

const STATE_ATTRIBUTE = "data-home-layers";

/**
 * Homepage-only site chrome. Rendered as a <style> in the server HTML, so the menu is hidden from the
 * very first paint (no flash before hydration). Keyed on an attribute of <html>: until the story says
 * otherwise ("site"), the menu and the "back to top" button stay out of the way. On the homepage the
 * header is lifted out of the page flow (fixed), so hiding it leaves no empty band; visibility flips
 * after the slide so the hidden menu also leaves the tab order.
 */
export const HOME_CHROME_RULES = `
  body header {
    position: fixed !important;
    top: 0 !important;
    left: 0;
    right: 0;
    z-index: 50;
    transition: transform 400ms ease-out, visibility 0s linear 0s;
  }
  html:not([${STATE_ATTRIBUTE}="site"]) body header {
    transform: translateY(-110%);
    visibility: hidden;
    transition: transform 400ms ease-in, visibility 0s linear 400ms;
  }
  html:not([${STATE_ATTRIBUTE}="site"]) button.fixed.bottom-5.right-5,
  html:not([${STATE_ATTRIBUTE}="site"]) button[aria-label="Нагоре"],
  html:not([${STATE_ATTRIBUTE}="site"]) button[aria-label="Back to top"] { display: none !important; }
  @media (prefers-reduced-motion: reduce) {
    body header { transition: none; }
  }
`;

/** Shows the menu on the story's last step and below it; hides it while the story runs. Undone when leaving the homepage. */
export function useHomeChrome(isVisible: boolean) {
  useEffect(() => {
    document.documentElement.setAttribute(STATE_ATTRIBUTE, isVisible ? "site" : "story");
  }, [isVisible]);

  useEffect(() => () => document.documentElement.removeAttribute(STATE_ATTRIBUTE), []);
}