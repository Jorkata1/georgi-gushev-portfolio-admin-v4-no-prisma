import type { Route } from "next";
import Link from "next/link";
import { deleteCertificationAction, deleteEducationAction } from "@/app/admin/actions";
import { getCertificationItems, getEducationItems } from "@/lib/content";

export default async function AdminEducationPage({
  searchParams
}: {
  searchParams?: { status?: string };
}) {
  const education = await getEducationItems();
  const certifications = await getCertificationItems();

  const feedback =
    searchParams?.status === "saved"
      ? "Съдържанието беше записано успешно."
      : searchParams?.status === "deleted"
        ? "Записът беше изтрит успешно."
        : searchParams?.status === "error"
          ? "Възникна проблем при операцията."
          : null;

  return (
    <div className="space-y-8">
      {feedback ? (
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {feedback}
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="surface p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="eyebrow">Education</span>
              <h2 className="mt-2 text-2xl font-semibold text-white">Образование</h2>
            </div>
            <Link
              href="/admin/education/new"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Добави образование
            </Link>
          </div>

          <div className="space-y-4">
            {education.map((item, index) => (
              <article key={item.id ?? `${item.institution}-${item.degree}-${index}`} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-amber">{item.period}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.degree}</h3>
                <p className="mt-2 text-sm font-medium text-slate-200">{item.institution}</p>
                <p className="mt-3 text-sm text-slate-300">{item.description}</p>
                {item.id ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/admin/education/${item.id}/edit` as Route}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
                    >
                      Редакция
                    </Link>
                    <form action={deleteEducationAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/15"
                      >
                        Изтрий
                      </button>
                    </form>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="surface p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="eyebrow">Certifications</span>
              <h2 className="mt-2 text-2xl font-semibold text-white">Сертификати</h2>
            </div>
            <Link
              href="/admin/certifications/new"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Добави сертификат
            </Link>
          </div>

          <div className="space-y-4">
            {certifications.map((item, index) => (
              <article key={item.id ?? `${item.title}-${item.year}-${index}`} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">
                  {item.issuer} · {item.year}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-sm font-medium text-primaryGlow hover:text-white"
                  >
                    Отвори линка
                  </a>
                ) : null}
                {item.id ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/admin/certifications/${item.id}/edit` as Route}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
                    >
                      Редакция
                    </Link>
                    <form action={deleteCertificationAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/15"
                      >
                        Изтрий
                      </button>
                    </form>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
