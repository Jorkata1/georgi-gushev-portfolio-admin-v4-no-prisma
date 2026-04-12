import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { getProjectById } from "@/lib/projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminEditProjectPage({
  params
}: {
  params: { id: string };
}) {
  noStore();

  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="eyebrow">Редакция на проект</span>
        <h1 className="mt-3 text-3xl font-semibold text-white">{project.title}</h1>
        <p className="mt-2 text-slate-300">
          Актуализирай съдържанието, изображенията и настройките на проекта.
        </p>
      </div>

      <ProjectForm
        key={`${project.id}-${project.updatedAt ?? ""}-${project.heroImage ?? ""}`}
        project={project}
      />
    </div>
  );
}