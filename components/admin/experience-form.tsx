"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { saveExperienceAction } from "@/app/admin/actions";
import { initialAdminFormState } from "@/app/admin/form-state";
import { AdminField } from "@/components/admin/form-field";
import { SubmitButton } from "@/components/admin/submit-button";
import type { ExperienceItem } from "@/types";

export function ExperienceForm({ item }: { item?: ExperienceItem | null }) {
  const [state, formAction] = useFormState(saveExperienceAction, initialAdminFormState);
  const isEdit = Boolean(item?.id);

  return (
    <form action={formAction} className="space-y-8">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField label="Компания" name="company" defaultValue={item?.company} error={state.fieldErrors?.company?.[0]} />
        <AdminField label="Роля" name="role" defaultValue={item?.role} error={state.fieldErrors?.role?.[0]} />
        <AdminField label="Локация" name="location" defaultValue={item?.location} error={state.fieldErrors?.location?.[0]} />
        <AdminField label="Период" name="period" defaultValue={item?.period} error={state.fieldErrors?.period?.[0]} />
      </div>

      <AdminField
        label="Summary"
        name="summary"
        defaultValue={item?.summary}
        error={state.fieldErrors?.summary?.[0]}
        textarea
        rows={4}
      />

      <div className="grid gap-6 md:grid-cols-[1fr_180px]">
        <AdminField
          label="Основни точки (по една на ред)"
          name="bullets"
          defaultValue={item?.bullets.join("\n")}
          error={state.fieldErrors?.bullets?.[0]}
          textarea
          rows={8}
        />
        <AdminField
          label="Sort order"
          name="sortOrder"
          type="number"
          defaultValue={item?.sortOrder ?? 0}
          error={state.fieldErrors?.sortOrder?.[0]}
          placeholder={item?.id ? undefined : "0"}
        />
      </div>

      {state.message ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4">
        <SubmitButton
          idleText={isEdit ? "Запази промените" : "Добави опит"}
          pendingText="Записване..."
        />
        <Link
          href="/admin/experience"
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
        >
          Отказ
        </Link>
      </div>
    </form>
  );
}
