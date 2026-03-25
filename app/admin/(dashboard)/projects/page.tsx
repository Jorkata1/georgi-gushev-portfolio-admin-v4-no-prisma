import Link from "next/link";
import { ProjectsAdminList } from "@/components/admin/projects-admin-list";
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
        : searchParams?.status === "toggled"
          ? "Featured статусът беше обновен успешно."
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
          <span className="eyebrow">Projects Manager</span>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Управление на проектите
          </h2>
          <p className="mt-2 max-w-3xl text-slate-300">
            Търси, филтрирай, преглеждай и управлявай проектите от едно място.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
        >
          Нов проект
        </Link>
      </div>

      <ProjectsAdminList projects={projects} />
    </div>
  );
}