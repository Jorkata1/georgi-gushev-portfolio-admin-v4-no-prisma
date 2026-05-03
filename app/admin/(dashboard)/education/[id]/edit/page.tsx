import { notFound } from "next/navigation";
import { EducationForm } from "@/components/admin/education-form";
import { getEducationItemById } from "@/lib/content";

export default async function EditEducationPage({ params }: { params: { id: string } }) {
  const item = await getEducationItemById(params.id);

  if (!item || !item.id) {
    notFound();
  }

  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-8">
        <span className="eyebrow">Редакция</span>
        <h2 className="mt-3 text-2xl font-semibold text-white">Редактирай образованието</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Промените се записват директно в базата данни и се отразяват на страницата.
        </p>
      </div>

      <EducationForm item={item} />
    </div>
  );
}
