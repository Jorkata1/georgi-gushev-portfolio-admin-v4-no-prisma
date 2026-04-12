"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { locale, toggleLocale } = useLanguage();
  const t = translations[locale];

  const links = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        label:
          item.href === "/"
            ? t.nav.home
            : item.href === "/services"
            ? t.nav.services
            : item.href === "/portfolio"
            ? t.nav.portfolio
            : item.href === "/about"
            ? t.nav.about
            : item.href === "/contact"
            ? t.nav.contact
            : item.label
      })),
    [t]
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/6 bg-background/70 backdrop-blur-xl">
        <div className="container-shell flex h-20 items-center justify-between gap-6">
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5">
              <Image
                src="/branding/logo-mark.png"
                alt="GDX Studio"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-semibold text-white">Георги Гушев</p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                GDX Studio
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white",
                    isActive && "bg-white/[0.07] text-white shadow-soft"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="ml-3 inline-flex items-center justify-center rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-semibold text-accentGlow transition hover:bg-accent/20 hover:border-accent/40"
            >
              {t.nav.sendInquiry}
            </Link>

            <button
              type="button"
              onClick={toggleLocale}
              className="ml-2 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Switch language"
            >
              {locale === "bg" ? "EN" : "BG"}
            </button>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleLocale}
              className="inline-flex h-9 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-widest text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Switch language"
            >
              {locale === "bg" ? "EN" : "BG"}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              aria-label="Отвори меню"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 z-[70] h-full w-72 bg-background/60 backdrop-blur-md border-l border-white/10 shadow-[−20px_0_60px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/70">
            {t.nav.home === "Начало" ? "Меню" : "Menu"}
          </p>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            aria-label="Затвори меню"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="px-4 space-y-1">
          {links.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-3.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white",
                  isActive && "bg-white/[0.07] text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 px-4">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block rounded-xl border border-accent/25 bg-accent/10 px-4 py-3.5 text-center text-sm font-semibold text-accentGlow"
          >
            {t.nav.sendInquiry}
          </Link>
        </div>
      </div>
    </>
  );
}