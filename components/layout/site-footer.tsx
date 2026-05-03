"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone
} from "lucide-react";
import { navItems, siteConfig } from "@/data/site";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";

const socialLinks = [
  { href: siteConfig.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: siteConfig.facebook, label: "Facebook", icon: Facebook },
  { href: siteConfig.instagram, label: "Instagram", icon: Instagram }
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function SiteFooter() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const f = t.footer;

  const legalLinks = [
    { href: "/privacy-policy", label: f.privacyPolicy },
    { href: "/cookie-policy", label: f.cookiePolicy },
    { href: "/terms", label: f.terms },
    { href: "/legal", label: f.legalInfo }
  ];

  const translatedNavItems = navItems.map((item) => ({
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
  }));

  return (
    <footer className="relative border-t border-white/6">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* ✅ MOBILE FIX #7: Tighter footer padding + 2-col mobile grid */}
      <div className="container-shell py-10 sm:py-16 lg:py-20">
        {/* Logo + description — full width on all screens */}
        <div className="mb-8 sm:mb-12">
          <div className="group relative inline-flex">
            <div className="pointer-events-none absolute -inset-x-5 -inset-y-4 -z-10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100">
              <div className="absolute left-0 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[rgba(232,164,74,0.15)]" />
              <div className="absolute right-0 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[rgba(79,156,247,0.12)]" />
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/25 sm:p-4">
              <Image
                src="/branding/logo-full.png"
                alt="GDX Studio"
                width={220}
                height={90}
                className="h-auto w-[140px] object-contain sm:w-[200px]"
              />
            </div>
          </div>

          <p className="mt-4 max-w-xl text-sm text-slate-300 sm:mt-6 sm:text-base">
            {f.description}
          </p>

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-400 sm:mt-4 sm:text-sm">
            {f.subDescription}
          </p>
        </div>

        {/* ✅ MOBILE FIX #7: 2-col grid on mobile, 3-col on desktop */}
        <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-3">
          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/70 sm:text-xs">
              {f.navigation}
            </h4>
            <ul className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-3.5">
              {translatedNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group/link inline-flex items-center text-xs text-slate-400 transition hover:text-white sm:text-sm"
                  >
                    <span className="mr-0 w-0 overflow-hidden text-accent transition-all duration-300 group-hover/link:mr-2 group-hover/link:w-3">
                      —
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/70 sm:text-xs">
              {f.legal}
            </h4>
            <ul className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-3.5">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group/link inline-flex items-center text-xs text-slate-400 transition hover:text-white sm:text-sm"
                  >
                    <span className="mr-0 w-0 overflow-hidden text-accent transition-all duration-300 group-hover/link:mr-2 group-hover/link:w-3">
                      —
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — full width on mobile (spans both cols) */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/70 sm:text-xs">
              {f.contactTitle}
            </h4>

            <ul className="mt-3 flex flex-wrap gap-4 sm:mt-5 sm:flex-col sm:gap-0 sm:space-y-3.5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-xs text-slate-400 transition hover:text-accent sm:gap-3 sm:text-sm"
                >
                  <Mail size={14} />
                  <span>{siteConfig.email}</span>
                </a>
              </li>

              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 text-xs text-slate-400 transition hover:text-accent sm:gap-3 sm:text-sm"
                >
                  <Phone size={14} />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
            </ul>

            <div className="mt-4 flex gap-3 sm:mt-6">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="group/icon flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 hover:border-accent/30 hover:bg-accent/10 hover:text-accentGlow hover:shadow-[0_0_15px_rgba(232,164,74,0.12)] sm:h-10 sm:w-10"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6">
        <div className="container-shell flex items-center justify-between py-4 sm:py-6">
          <p className="text-[10px] text-slate-500 sm:text-xs">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {f.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}