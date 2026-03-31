"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/language-context";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { IntroAnimation } from "@/components/shared/intro-animation";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <IntroAnimation />
      <div className="relative min-h-screen">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(87,166,255,0.12),transparent_24%),radial-gradient(circle_at_80%_15%,rgba(216,171,98,0.09),transparent_18%)]" />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <ScrollToTop />
      </div>
    </LanguageProvider>
  );
}