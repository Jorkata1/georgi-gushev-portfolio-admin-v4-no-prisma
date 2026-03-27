import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { navItems, siteConfig } from "@/data/site";

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
                href="https://www.linkedin.com/in/georgi-gushev-82953417a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
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
                href="https://www.facebook.com/share/1B1Q5fxTZM/?mibextid=wwXIfr"
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
                href="https://www.instagram.com/goshkataaaa?igsh=dG9pbzQ2NGc2dGZz&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-slate-300 hover:text-white"
              >
                <Instagram size={16} />
                <span>Instagram</span>
              </a>
            </li>
          </ul>

          <p className="mt-6 text-sm text-slate-500">
            © {new Date().getFullYear()} {siteConfig.name}. Всички права запазени.
          </p>
        </div>
      </div>
    </footer>
  );
}