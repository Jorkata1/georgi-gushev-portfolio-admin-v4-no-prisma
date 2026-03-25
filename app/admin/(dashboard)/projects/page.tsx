import type { Route } from "next";
import Link from "next/link";
import { deleteProjectAction } from "@/app/admin/actions";
import { getAllProjects } from "@/lib/projects";

export default async function AdminProjectsPage({
  searchParams
}: {
  searchParams?: { status?: string };
}) {
  const projects = await getAllProjects();

  const feedback =
    searchParams?.status === "saved"
      ? "Проектът беше записан успешно."
      : searchParams?.status === "deleted"
        ? "Проектът беше изтрит успешно."
        : searchParams?.status === "error"
          ? "Възникна проблем при изтриването."
          : null;

  return (
    <div className="space-y-6">
      {feedback ? (
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {feedback}
        </div>
      ) : null}

      <div className="grid gap-5">
        {projects.map((project) => (
          <article
            key={project.id}
            className="surface flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                {project.featured ? (
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primaryGlow">
                    Featured
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-slate-300">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                <span>{project.category}</span>
                <span>{project.year}</span>
                <span>/{project.slug}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/portfolio/${project.slug}` as Route}
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Преглед
              </Link>
              <Link
                href={`/admin/projects/${project.id}/edit` as Route}
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Редакция
              </Link>
              <form action={deleteProjectAction}>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="slug" value={project.slug} />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/15"
                >
                  Изтрий
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
