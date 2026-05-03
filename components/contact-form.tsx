"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";

export function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const { locale } = useLanguage();
  const c = translations[locale].contactPage;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerMessage(null);
    setServerError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const data = (await response.json()) as { message?: string; error?: string };

    if (!response.ok) {
      setServerError(data.error || c.formError);
      return;
    }

    setServerMessage(data.message || c.formSuccess);
    form.reset();
  });

  return (
    <form onSubmit={onSubmit} className="surface p-6 sm:p-8">
      <div className="grid gap-5">
        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="name"
          >
            {c.formName}
          </label>
          <Input
            id="name"
            placeholder={c.formNamePlaceholder}
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="mt-2 text-sm text-rose-300">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="email"
          >
            {c.formEmail}
          </label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="mt-2 text-sm text-rose-300">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="message"
          >
            {c.formMessage}
          </label>
          <Textarea
            id="message"
            placeholder={c.formMessagePlaceholder}
            {...form.register("message")}
          />
          {form.formState.errors.message && (
            <p className="mt-2 text-sm text-rose-300">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                {c.formSubmitting}
              </>
            ) : (
              <>
                {c.formSubmit}
                <Send size={16} />
              </>
            )}
          </Button>

          <p className="text-sm text-slate-400">{c.formResponseTime}</p>
        </div>

        {serverMessage && (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {serverMessage}
          </div>
        )}

        {serverError && (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {serverError}
          </div>
        )}
      </div>
    </form>
  );
}