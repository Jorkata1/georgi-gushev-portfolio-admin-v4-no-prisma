type FieldErrors = Record<string, string[] | undefined>;

const FIELD_LABELS: Record<string, string> = {
  title: "Заглавие",
  shortTitle: "Кратко заглавие",
  slug: "Slug",
  year: "Година",
  category: "Категория",
  heroImage: "Hero image URL",
  heroImageFile: "Качване на hero изображение",
  excerpt: "Кратък excerpt",
  summary: "Summary",
  tools: "Инструменти",
  gallery: "Gallery images",
  galleryImageFiles: "Качване на gallery изображения",
  goals: "Цели",
  process: "Процес",
  outcome: "Резултати",
  liveUrl: "Live сайт URL"
};

export function FormErrorSummary({
  message,
  fieldErrors
}: {
  message?: string;
  fieldErrors?: FieldErrors;
}) {
  const entries = Object.entries(fieldErrors ?? {}).filter(
    (entry): entry is [string, string[]] => Boolean(entry[1] && entry[1].length > 0)
  );

  if (!message && entries.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-5 py-4 text-sm text-rose-100">
      <p className="flex items-center gap-2 font-semibold text-rose-200">
        <span aria-hidden="true">⚠</span>
        {message ?? "Провери следните полета, преди да запишеш проекта:"}
      </p>
      {entries.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1.5 pl-5">
          {entries.map(([field, errors]) => (
            <li key={field}>
              <span className="font-medium text-rose-200">
                {FIELD_LABELS[field] ?? field}
              </span>
              {" — "}
              {errors[0]}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
