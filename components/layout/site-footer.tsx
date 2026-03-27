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
      <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr_1fr_1fr]">
        <div>
          <p className="eyebrow">GDX Studio</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">
            Дизайн, сайтове и дигитални решения с фокус върху яснота, визия и
            функционалност.
          </h3>
          <p className="mt-4 max-w-xl text-slate-300">
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