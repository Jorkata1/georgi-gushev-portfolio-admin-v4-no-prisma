"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { saveEducationAction } from "@/app/admin/actions";
import { initialAdminFormState } from "@/app/admin/form-state";
import { AdminField } from "@/components/admin/form-field";
import { SubmitButton } from "@/components/admin/submit-button";
import type { EducationItem } from "@/types";

export function EducationForm({ item }: { item?: EducationItem | null }) {
  const [state, formAction] = useFormState(saveEducationAction, initialAdminFormState);
  const isEdit = Boolean(item?.id);

  return (
    <form action={formAction} className="space-y-8">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField label="Институция" name="institution" defaultValue={item?.institution} error={state.fieldErrors?.institution?.[0]} />
        <AdminField label="Степен / роля" name="degree" defaultValue={item?.degree} error={state.fieldErrors?.degree?.[0]} />
        <AdminField label="Период" name="period" defaultValue={item?.period} error={state.fieldErrors?.period?.[0]} />
        <AdminField label="Sort order" name="sortOrder" type="number" error={state.fieldErrors?.sortOrder?.[0]} defaultValue={item?.sortOrder ?? 0} placeholder="0" />
      </div>

      <AdminField
        label="Описание"
        name="description"
        defaultValue={item?.description}
        error={state.fieldErrors?.description?.[0]}
        textarea
        rows={5}
      />

      {state.message ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4">
        <SubmitButton
          idleText={isEdit ? "Запази промените" : "Добави образование"}
          pendingText="Записване..."
        />
        <Link
          href="/admin/education"
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
        >
          Отказ
        </Link>
      </div>
    </form>
  );
}
