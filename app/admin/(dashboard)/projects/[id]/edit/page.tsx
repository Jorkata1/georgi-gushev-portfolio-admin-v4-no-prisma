import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { getProjectById } from "@/lib/projects";

type EditProjectPageProps = {
  params: {
    id: string;
  };
};

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-8">
        <span className="eyebrow">Редакция</span>
        <h2 className="mt-3 text-2xl font-semibold text-white">Редактирай проекта</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Промените се записват директно в базата данни и веднага се отразяват в портфолиото.
        </p>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}
