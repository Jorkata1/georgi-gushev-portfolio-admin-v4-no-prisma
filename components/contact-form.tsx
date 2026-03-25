"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerMessage(null);
    setServerError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const data = (await response.json()) as { message?: string; error?: string };

    if (!response.ok) {
      setServerError(data.error || "Възникна проблем при изпращането.");
      return;
    }

    setServerMessage(data.message || "Съобщението беше изпратено успешно.");
    form.reset();
  });

  return (
    <form onSubmit={onSubmit} className="surface p-6 sm:p-8">
      <div className="grid gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="name">
            Име
          </label>
          <Input id="name" placeholder="Твоето име" {...form.register("name")} />
          {form.formState.errors.name ? (
            <p className="mt-2 text-sm text-rose-300">
              {form.formState.errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="email">
            Имейл
          </label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            {...form.register("email")}
          />
          {form.formState.errors.email ? (
            <p className="mt-2 text-sm text-rose-300">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="message">
            Съобщение
          </label>
          <Textarea
            id="message"
            placeholder="Разкажи ми накратко за твоята идея, позиция или проект."
            {...form.register("message")}
          />
          {form.formState.errors.message ? (
            <p className="mt-2 text-sm text-rose-300">
              {form.formState.errors.message.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Изпращане...
              </>
            ) : (
              <>
                Изпрати съобщение
                <Send size={16} />
              </>
            )}
          </Button>

          <p className="text-sm text-slate-400">Отговор обикновено до 1–2 работни дни.</p>
        </div>

        {serverMessage ? (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {serverMessage}
          </div>
        ) : null}

        {serverError ? (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {serverError}
          </div>
        ) : null}
      </div>
    </form>
  );
}
