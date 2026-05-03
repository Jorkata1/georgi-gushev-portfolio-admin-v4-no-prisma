"use client";

import { type ReactNode } from "react";
import { useLanguage } from "@/lib/language-context";

export function LocaleTransition({ children }: { children: ReactNode }) {
  const { isChanging } = useLanguage();

  return (
    <div
      className={isChanging ? "sm:opacity-0" : "opacity-100"}
      style={{ transition: "opacity 120ms ease" }}
    >
      {children}
    </div>
  );
}