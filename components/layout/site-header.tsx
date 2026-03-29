"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = useMemo(() => navItems, []);

  return (
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
            className="ml-3 inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primaryGlow transition hover:bg-primary/15"
          >
            Изпрати запитване
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          aria-label={isOpen ? "Затвори меню" : "Отвори меню"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="container-shell pb-6 lg:hidden">
          <div className="surface space-y-2 p-3">
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
                    "block rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white",
                    isActive && "bg-white/[0.07] text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primaryGlow"
            >
              Изпрати запитване
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}