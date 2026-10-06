"use client";

import { useEffect } from "react";

const GOOGLE_FONTS_CSS = "https://fonts.googleapis.com/css2";
/** Only plain Latin family names are sent to Google; anything else renders with the site font. */
const SAFE_FAMILY_NAME = /^[A-Za-z0-9 ]{2,50}$/;

const SYSTEM_FONT_STACKS: Record<string, string> = {
  "системен шрифт": "system-ui, -apple-system, 'Segoe UI', sans-serif",
  "system font": "system-ui, -apple-system, 'Segoe UI', sans-serif",
  "system-ui": "system-ui, -apple-system, 'Segoe UI', sans-serif",
  georgia: "Georgia, serif",
  arial: "Arial, sans-serif",
  helvetica: "Helvetica, Arial, sans-serif",
  verdana: "Verdana, sans-serif",
  tahoma: "Tahoma, sans-serif",
  "times new roman": "'Times New Roman', serif",
  "courier new": "'Courier New', monospace",
  "segoe ui": "'Segoe UI', sans-serif",
};

function linkIdFor(family: string): string {
  return `font-preview-${family.toLowerCase().replace(/\s+/g, "-")}`;
}

/** Loads only the glyphs of the font's own name, so a preview costs a few kilobytes. */
function ensureGoogleFont(family: string) {
  const id = linkIdFor(family);
  if (document.getElementById(id)) return;

  const params = new URLSearchParams({ family, text: family, display: "swap" });
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `${GOOGLE_FONTS_CSS}?${params.toString()}`;
  document.head.appendChild(link);
}

export function fontStackFor(name: string): string {
  const systemStack = SYSTEM_FONT_STACKS[name.trim().toLowerCase()];
  if (systemStack) return systemStack;
  return `'${name.replace(/'/g, "")}', system-ui, sans-serif`;
}

export function FontPreview({ name }: { name: string }) {
  const trimmed = name.trim();
  const isSystemFont = trimmed.toLowerCase() in SYSTEM_FONT_STACKS;

  useEffect(() => {
    if (isSystemFont || !SAFE_FAMILY_NAME.test(trimmed)) return;
    ensureGoogleFont(trimmed);
  }, [trimmed, isSystemFont]);

  return (
    <span className="text-lg font-semibold leading-tight text-white" style={{ fontFamily: fontStackFor(trimmed) }}>
      {trimmed}
    </span>
  );
}
