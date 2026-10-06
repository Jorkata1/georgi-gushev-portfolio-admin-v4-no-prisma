"use client";

import { useLanguage } from "@/lib/language-context";

const COPY = {
  bg: {
    images: "Снимки",
    openImage: "Отвори снимка",
    close: "Затвори",
    previous: "Предишна снимка",
    next: "Следваща снимка",
    thumbnails: "Всички снимки",
    livePreview: "Преглед на живо",
    swipeHint: "Плъзнете за още снимки",
  },
  en: {
    images: "Images",
    openImage: "Open image",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
    thumbnails: "All images",
    livePreview: "Live preview",
    swipeHint: "Swipe for more images",
  },
} as const;

export type ProjectCopy = (typeof COPY)[keyof typeof COPY];

export function useProjectCopy(): ProjectCopy {
  const { locale } = useLanguage();
  return COPY[locale === "bg" ? "bg" : "en"];
}
