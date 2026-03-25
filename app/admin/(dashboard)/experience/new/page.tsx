import { ExperienceForm } from "@/components/admin/experience-form";

export default function NewExperiencePage() {
  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-8">
        <span className="eyebrow">Нов опит</span>
        <h2 className="mt-3 text-2xl font-semibold text-white">Добави нова позиция</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Създай нов запис за професионален опит. Точките работят по един елемент на ред.
        </p>
      </div>

      <ExperienceForm />
    </div>
  );
}
