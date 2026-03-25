import Link from "next/link";
import { navItems, siteConfig, socialLinks } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 py-10">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="eyebrow">Георги Гушев</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">
            Дизайн, дигитални приложения и QA ориентиран подход.
          </h3>
          <p className="mt-4 max-w-xl text-slate-300">
            Личен сайт на Георги Гушев, представящ опит, умения и проекти в
            графичния дизайн, дигиталните приложения и QA ориентирания подход.
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
            Контакт
          </h4>
          <ul className="mt-4 space-y-3">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-slate-300 hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-500">
            © {new Date().getFullYear()} {siteConfig.name}. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  );
}