/**
 * Shared styles for the story's links and its cross-fading layers. Kept in a .tsx file so
 * Tailwind's content scan always picks the class names up.
 */

import type { HTMLAttributes, ReactNode } from "react";

export const HEADING_FONT_STYLE = { fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" } as const;

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060E1A]";

export const PRIMARY_LINK_CLASS = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-[#060E1A] transition duration-200 ease-out hover:brightness-110 active:scale-[0.98] sm:text-base ${FOCUS_RING}`;

export const SECONDARY_LINK_CLASS = `inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white transition duration-200 ease-out hover:border-accent/50 hover:bg-white/[0.08] active:scale-[0.98] sm:text-base ${FOCUS_RING}`;

const LAYER_TRANSITION = "transition-[opacity,visibility,transform] duration-500 ease-out";

/**
 * The intro, the scene and the finale share one pinned screen. Only the active one is visible;
 * `invisible` also takes the hidden layers out of the tab order and the accessibility tree.
 */
function getLayerClassName(isActive: boolean): string {
  return isActive
    ? `${LAYER_TRANSITION} visible translate-y-0 opacity-100`
    : `${LAYER_TRANSITION} pointer-events-none invisible -translate-y-3 opacity-0`;
}

type StoryLayerProps = HTMLAttributes<HTMLDivElement> & {
  isActive: boolean;
  children: ReactNode;
};

export function StoryLayer({ isActive, className = "", children, ...rest }: StoryLayerProps) {
  return (
    <div {...rest} className={`absolute inset-0 ${getLayerClassName(isActive)} ${className}`}>
      {children}
    </div>
  );
}