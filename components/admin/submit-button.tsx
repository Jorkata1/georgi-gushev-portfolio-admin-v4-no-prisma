"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  idleText,
  pendingText
}: {
  idleText: string;
  pendingText: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingText : idleText}
    </button>
  );
}
