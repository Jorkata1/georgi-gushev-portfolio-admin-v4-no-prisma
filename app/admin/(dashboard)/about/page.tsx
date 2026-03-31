import { AboutForm } from "@/components/admin/about-form";
import { getAboutContent } from "@/lib/content";

export default async function AdminAboutPage({
  searchParams
}: {
  searchParams?: { status?: string };
}) {
  const content = await getAboutContent();
  const feedback = searchParams?.status === "saved" ? "Секцията About беше записана успешно." : null;

  return (
    <div className="space-y-6">
      {feedback ? (
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {feedback}
        </div>
      ) : null}

      <div className="surface p-6 sm:p-8">
        <div className="mb-8">
          <span className="eyebrow">About</span>
          <h2 className="mt-3 text-2xl font-semibold text-white">Редакция на страницата „За мен“</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Управлявай hero текста, професионалния профил, начина на работа, силните страни
            и езиците от едно място.
          </p>
        </div>

        <AboutForm content={content} />
      </div>
    </div>
  );
}
