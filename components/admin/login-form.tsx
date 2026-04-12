"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAdminAction } from "@/app/admin/actions";
import { initialAdminFormState } from "@/app/admin/form-state";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  error?: string;
};

function Field({ label, name, type = "text", error }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-primary/40"
      />
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Влизане..." : "Вход в админ панела"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(loginAdminAction, initialAdminFormState);

  return (
    <form action={formAction} className="space-y-5">
      <Field
        label="Потребителско име"
        name="username"
        error={state.fieldErrors?.username?.[0]}
      />
      <Field
        label="Парола"
        name="password"
        type="password"
        error={state.fieldErrors?.password?.[0]}
      />

      {state.message ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {state.message}
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
