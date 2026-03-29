"use client";

import { type ReactNode } from "react";
import { useLanguage } from "@/lib/language-context";

export function LocaleTransition({ children }: { children: ReactNode }) {
  const { isChanging } = useLanguage();

  return (
    <div
      style={{
        opacity: isChanging ? 0 : 1,
        transition: "opacity 150ms ease",
      }}
    >
      {children}
    </div>
  );
}