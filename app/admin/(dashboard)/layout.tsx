import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/admin/logout-button";
import { Container } from "@/components/shared/container";
import { requireAdmin } from "@/lib/admin-auth";

const adminNav = [
  { href: "/admin/projects", label: "Проекти" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/experience", label: "Опит" },
  { href: "/admin/education", label: "Образование" }
] as const;

export default async function AdminDashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return (
    <section className="section-padding">
      <Container>
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <span className="eyebrow">Admin Panel</span>
              <h1 className="mt-3 text-3xl font-semibold text-white">
                Управление на съдържанието на портфолиото
              </h1>
              <p className="mt-2 max-w-3xl text-slate-300">
                Оттук можеш да редактираш проектите, секцията About, професионалния опит,
                образованието и сертификатите без да променяш кода.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
              >
                Нов проект
              </Link>
              <LogoutButton />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {children}
      </Container>
    </section>
  );
}
