import { notFound } from "next/navigation";
import { ExperienceForm } from "@/components/admin/experience-form";
import { getExperienceItemById } from "@/lib/content";

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
  const item = await getExperienceItemById(params.id);

  if (!item || !item.id) {
    notFound();
  }

  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-8">
        <span className="eyebrow">Редакция</span>
        <h2 className="mt-3 text-2xl font-semibold text-white">Редактирай позицията</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Промените се записват директно в базата данни и се отразяват на публичната страница.
        </p>
      </div>

      <ExperienceForm item={item} />
    </div>
  );
}
