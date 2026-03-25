import { EducationForm } from "@/components/admin/education-form";

export default function NewEducationPage() {
  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-8">
        <span className="eyebrow">Ново образование</span>
        <h2 className="mt-3 text-2xl font-semibold text-white">Добави нов запис</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Попълни институцията, степента, периода и кратко описание.
        </p>
      </div>

      <EducationForm />
    </div>
  );
}
