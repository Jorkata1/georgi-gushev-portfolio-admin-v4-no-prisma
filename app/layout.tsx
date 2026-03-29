import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { LanguageProvider } from "@/lib/language-context";
import { LocaleTransition } from "@/components/shared/locale-transition";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "Георги Гушев",
    "графичен дизайн",
    "QA",
    "дигитални приложения",
    "portfolio website",
    "personal brand"
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "bg_BG",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="bg">
      <body>
        <LanguageProvider>
          <div className="relative min-h-screen">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(87,166,255,0.12),transparent_24%),radial-gradient(circle_at_80%_15%,rgba(216,171,98,0.09),transparent_18%)]" />
            <SiteHeader />
            <LocaleTransition>
              <main>{children}</main>
            </LocaleTransition>
            <SiteFooter />
            <ScrollToTop />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}