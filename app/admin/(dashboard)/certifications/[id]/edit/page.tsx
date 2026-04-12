import { notFound } from "next/navigation";
import { CertificationForm } from "@/components/admin/certification-form";
import { getCertificationItemById } from "@/lib/content";

export default async function EditCertificationPage({ params }: { params: { id: string } }) {
  const item = await getCertificationItemById(params.id);

  if (!item || !item.id) {
    notFound();
  }

  return (
    <div className="surface p-6 sm:p-8">
      <div className="mb-8">
        <span className="eyebrow">Редакция</span>
        <h2 className="mt-3 text-2xl font-semibold text-white">Редактирай сертификата</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Промени заглавието, издателя, годината или линка към сертификата.
        </p>
      </div>

      <CertificationForm item={item} />
    </div>
  );
}
