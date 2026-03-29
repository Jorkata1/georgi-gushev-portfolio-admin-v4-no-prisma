import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone
} from "lucide-react";
import { navItems, siteConfig } from "@/data/site";

const legalLinks = [
  { href: "/privacy-policy", label: "Политика за поверителност" },
  { href: "/cookie-policy", label: "Политика за бисквитки" },
  { href: "/terms", label: "Общи условия" },
  { href: "/legal", label: "Правна информация" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 py-10">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.15fr_0.9fr_0.9fr_1fr]">
        <div>
          <div className="group relative inline-flex">
            <div className="pointer-events-none absolute -inset-x-5 -inset-y-4 -z-10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100">
              <div className="absolute left-0 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[rgba(87,166,255,0.18)]" />
              <div className="absolute right-0 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[rgba(87,166,255,0.12)]" />
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/20">
              <Image
                src="/branding/logo-full.png"
                alt="GDX Studio"
                width={220}
                height={90}
                className="h-auto w-[170px] object-contain sm:w-[200px]"
              />
            </div>
          </div>

          <p className="mt-5 max-w-xl text-slate-300">
            Дизайн, сайтове и дигитални решения с фокус върху яснота, визия и
            функционалност.
          </p>

          <p className="mt-4 max-w-xl text-sm text-slate-400">
            Помагам на лични брандове, малки бизнеси и нови проекти с уеб дизайн,
            изграждане на сайтове, визуално обновяване, поддръжка и QA-oriented
            подобрения.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Навигация
          </h4>
          <ul className="mt-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-300 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Правна информация
          </h4>
          <ul className="mt-4 space-y-3">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-300 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Контакт и социални мрежи
          </h4>

          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-3 text-slate-300 hover:text-white"
              >
                <Mail size={16} />
                <span>{siteConfig.email}</span>
              </a>
            </li>

            <li>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-3 text-slate-300 hover:text-white"
              >
                <Phone size={16} />
                <span>{siteConfig.phone}</span>
              </a>
            </li>

            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-slate-300 hover:text-white"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
            </li>

            <li>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-slate-300 hover:text-white"
              >
                <Facebook size={16} />
                <span>Facebook</span>
              </a>
            </li>

            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-slate-300 hover:text-white"
              >
                <Instagram size={16} />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-shell mt-10 border-t border-white/6 pt-6">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}. Всички права запазени.
        </p>
      </div>
    </footer>
  );
}