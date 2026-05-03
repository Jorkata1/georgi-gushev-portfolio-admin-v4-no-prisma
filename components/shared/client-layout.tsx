"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/language-context";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { IntroAnimation } from "@/components/shared/intro-animation";
import { AnimatedBackground } from "@/components/shared/animated-background";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <IntroAnimation />
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <ScrollToTop />
      </div>
    </LanguageProvider>
  );
}