import type { Route } from "next";
import Link from "next/link";
import { deleteExperienceAction } from "@/app/admin/actions";
import { getExperienceItems } from "@/lib/content";

export default async function AdminExperiencePage({
  searchParams
}: {
  searchParams?: { status?: string };
}) {
  const items = await getExperienceItems();

  const feedback =
    searchParams?.status === "saved"
      ? "Позицията беше записана успешно."
      : searchParams?.status === "deleted"
        ? "Позицията беше изтрита успешно."
        : searchParams?.status === "error"
          ? "Възникна проблем при операцията."
          : null;

  return (
    <div className="space-y-6">
      {feedback ? (
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {feedback}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">Experience</span>
          <h2 className="mt-2 text-2xl font-semibold text-white">Професионален опит</h2>
        </div>
        <Link
          href="/admin/experience/new"
          className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90"
        >
          Добави позиция
        </Link>
      </div>

      <div className="grid gap-5">
        {items.map((item, index) => (
          <article
            key={item.id ?? `${item.company}-${item.role}-${item.period}-${index}`}
            className="surface flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                  {item.period}
                </span>
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-amber">{item.company}</p>
              <p className="mt-2 text-sm text-slate-400">{item.location}</p>
              <p className="mt-4 max-w-3xl text-sm text-slate-300">{item.summary}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {item.id ? (
                <Link
                  href={`/admin/experience/${item.id}/edit` as Route}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Редакция
                </Link>
              ) : null}
              {item.id ? (
                <form action={deleteExperienceAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/15"
                  >
                    Изтрий
                  </button>
                </form>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
