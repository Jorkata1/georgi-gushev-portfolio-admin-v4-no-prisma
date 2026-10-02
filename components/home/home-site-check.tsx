"use client";

import { motion } from "framer-motion";
import { Gauge, Globe, Lock, Search, Smartphone, Timer, Zap } from "lucide-react";
import { Container } from "@/components/shared/container";
import { useLanguage } from "@/lib/language-context";

const CHECK_TOOL_URL = "https://check.gdxstudio.com/";

const COPY = {
  bg: {
    eyebrow: "Безплатна проверка",
    title: "Колко бърз е вашият сайт?",
    description:
      "Проверете скоростта, мобилната версия, SEO и достъпността и получете ясен отчет на български какво да подобрите.",
    label: "Адрес на сайта",
    placeholder: "вашият-сайт.bg",
    submit: "Провери сайта",
    trust: ["Без регистрация", "Около 30 секунди"],
    points: ["Скорост на телефон и компютър", "Видимост в Google", "Конкретни проблеми и план"],
  },
  en: {
    eyebrow: "Free website check",
    title: "How fast is your website?",
    description:
      "Check speed, mobile experience, SEO and accessibility, and get a clear report on what to improve.",
    label: "Website address",
    placeholder: "your-website.com",
    submit: "Check my site",
    trust: ["No sign-up", "About 30 seconds"],
    points: ["Mobile and desktop speed", "Google visibility", "Concrete issues and a plan"],
  },
} as const;

const POINT_ICONS = [Smartphone, Search, Gauge] as const;
const TRUST_ICONS = [Lock, Timer] as const;

export function HomeSiteCheck() {
  const { locale } = useLanguage();
  const copy = COPY[locale === "bg" ? "bg" : "en"];

  return (
    <section aria-labelledby="site-check-title" className="relative overflow-hidden border-b border-white/6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(232,164,74,0.08),transparent_45%)]" />
      <Container className="section-padding-sm relative">
        <motion.div
          className="surface-strong relative grid gap-8 overflow-hidden p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <span className="eyebrow">
              <Zap size={14} aria-hidden="true" />
              {copy.eyebrow}
            </span>
            <h2
              id="site-check-title"
              className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl"
              style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" }}
            >
              {copy.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">{copy.description}</p>
            <ul className="mt-6 grid gap-3">
              {copy.points.map((point, index) => {
                const Icon = POINT_ICONS[index];
                return (
                  <li key={point} className="flex items-center gap-3 text-sm text-slate-200">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-accent">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* A plain GET form: works without JavaScript and hands the address to GDX Check, which starts the check. */}
          <form action={CHECK_TOOL_URL} method="get" className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <label htmlFor="site-check-url" className="text-sm font-semibold text-white">
              {copy.label}
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-14 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/15 bg-[#060E1A]/60 px-4 transition-colors duration-200 focus-within:border-accent hover:border-white/30">
                <Globe size={18} className="shrink-0 text-[#7ab8ff]" aria-hidden="true" />
                <input
                  id="site-check-url"
                  name="url"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  minLength={4}
                  maxLength={2048}
                  placeholder={copy.placeholder}
                  className="h-full min-w-0 flex-1 bg-transparent text-base text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-accent px-6 text-sm font-bold text-[#060E1A] transition duration-150 ease-out hover:-translate-y-px hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7ab8ff] active:translate-y-0 active:brightness-95"
              >
                <Zap size={16} aria-hidden="true" />
                {copy.submit}
              </button>
            </div>
            <ul className="mt-4 flex flex-wrap gap-5 text-xs text-slate-400">
              {copy.trust.map((item, index) => {
                const Icon = TRUST_ICONS[index];
                return (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <Icon size={14} className="text-[#7ab8ff]" aria-hidden="true" />
                    {item}
                  </li>
                );
              })}
            </ul>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
