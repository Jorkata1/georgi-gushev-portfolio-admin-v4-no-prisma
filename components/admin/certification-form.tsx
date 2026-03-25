"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { saveCertificationAction } from "@/app/admin/actions";
import { initialAdminFormState } from "@/app/admin/form-state";
import { AdminField } from "@/components/admin/form-field";
import { SubmitButton } from "@/components/admin/submit-button";
import type { CertificationItem } from "@/types";

export function CertificationForm({ item }: { item?: CertificationItem | null }) {
  const [state, formAction] = useFormState(saveCertificationAction, initialAdminFormState);
  const isEdit = Boolean(item?.id);

  return (
    <form action={formAction} className="space-y-8">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField label="Заглавие" name="title" defaultValue={item?.title} error={state.fieldErrors?.title?.[0]} />
        <AdminField label="Издател" name="issuer" defaultValue={item?.issuer} error={state.fieldErrors?.issuer?.[0]} />
        <AdminField label="Година" name="year" defaultValue={item?.year} error={state.fieldErrors?.year?.[0]} placeholder="2025" />
        <AdminField label="Sort order" name="sortOrder" type="number" error={state.fieldErrors?.sortOrder?.[0]} defaultValue={item?.sortOrder ?? 0} placeholder="0" />
      </div>

      <AdminField
        label="Линк (по желание)"
        name="href"
        defaultValue={item?.href}
        error={state.fieldErrors?.href?.[0]}
        placeholder="https://..."
      />

      {state.message ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4">
        <SubmitButton
          idleText={isEdit ? "Запази промените" : "Добави сертификат"}
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
