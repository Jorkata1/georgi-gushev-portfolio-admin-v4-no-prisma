import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-8">
        <span className="eyebrow">Нов проект</span>
        <h2 className="mt-3 text-2xl font-semibold text-white">Създай нов portfolio проект</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Попълни всички основни полета. Списъчните секции работят по един елемент на ред.
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}
