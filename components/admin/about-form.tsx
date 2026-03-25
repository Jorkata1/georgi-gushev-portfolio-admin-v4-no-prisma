"use client";

import { useFormState } from "react-dom";
import { saveAboutAction } from "@/app/admin/actions";
import { initialAdminFormState } from "@/app/admin/form-state";
import { AdminField } from "@/components/admin/form-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { serializeLanguageLines, serializeParagraphs } from "@/lib/content-utils";
import type { AboutContent } from "@/types";

export function AboutForm({ content }: { content: AboutContent }) {
  const [state, formAction] = useFormState(saveAboutAction, initialAdminFormState);

  const fieldErrors = state?.fieldErrors ?? {};
  const message = state?.message;

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <AdminField
          label="Hero заглавие"
          name="heroTitle"
          defaultValue={content.heroTitle}
          error={fieldErrors.heroTitle?.[0]}
          textarea
          rows={3}
        />
        <AdminField
          label="Hero описание"
          name="heroDescription"
          defaultValue={content.heroDescription}
          error={fieldErrors.heroDescription?.[0]}
          textarea
          rows={3}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField
          label="Заглавие на профила"
          name="profileTitle"
          defaultValue={content.profileTitle}
          error={fieldErrors.profileTitle?.[0]}
        />
        <AdminField
          label="Заглавие на секцията „Начин на работа“"
          name="workTitle"
          defaultValue={content.workTitle}
          error={fieldErrors.workTitle?.[0]}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField
          label="Професионален профил (по един абзац на ред)"
          name="profileText"
          defaultValue={serializeParagraphs(content.profileParagraphs)}
          error={fieldErrors.profileText?.[0]}
          textarea
          rows={7}
        />
        <AdminField
          label="Начин на работа (по един абзац на ред)"
          name="workText"
          defaultValue={serializeParagraphs(content.workParagraphs)}
          error={fieldErrors.workText?.[0]}
          textarea
          rows={7}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField
          label="Силни страни (по една на ред)"
          name="strengths"
          defaultValue={content.strengths.join("\n")}
          error={fieldErrors.strengths?.[0]}
          textarea
          rows={8}
        />
        <AdminField
          label="Езици (формат: Име | Ниво)"
          name="languages"
          defaultValue={serializeLanguageLines(content.languages)}
          error={fieldErrors.languages?.[0]}
          textarea
          rows={8}
          hint="Пример: Български | Майчин език"
        />
      </div>

      {message ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {message}
        </div>
      ) : null}

      <SubmitButton idleText="Запази секцията About" pendingText="Записване..." />
    </form>
  );
}