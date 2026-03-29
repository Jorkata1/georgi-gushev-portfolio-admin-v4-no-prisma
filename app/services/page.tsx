"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brush,
  CheckCircle2,
  Globe,
  LayoutGrid,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";

// Icons mapped by index to preserve original order
const serviceIcons: LucideIcon[] = [
  Globe,
  LayoutGrid,
  Brush,
  Sparkles,
  Wrench,
  ShieldCheck,
  MessageSquareMore
];

export default function ServicesPage() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const s = t.servicesPage;

  return (
    <>
      <section className="section-padding pt-16">
        <Container>
          <div className="mx-auto max-w-6xl">
            <article className="surface-strong relative overflow-hidden p-8 sm:p-10 lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,156,247,0.12),transparent_45%),radial-gradient(circle_at_bottom,rgba(232,164,74,0.06),transparent_35%)]" />
              <div className="relative">
                <div className="mx-auto max-w-3xl text-center">
                  <span className="eyebrow justify-center">{s.suitableFor}</span>

                  <h1 className="section-title mt-4 text-balance">{s.heroTitle}</h1>

                  <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                    {s.heroDescription}
                  </p>
                </div>

                <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
                  {s.tags.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm text-accent"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {s.suitableItems.map((item) => (
                    <div
                      key={item}
                      className="group rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-5 py-5 transition hover:border-accent/30 hover:bg-white/[0.06]"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accentGlow">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-sm font-medium text-slate-200">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mx-auto mt-10 max-w-4xl rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 sm:p-7">
                  <p className="text-center text-base leading-7 text-slate-300 sm:text-lg">
                    {s.goalText}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="section-padding border-y border-white/6 bg-white/[0.015]">
        <Container>
          <div className="max-w-3xl">
            <span className="eyebrow">{t.nav.services}</span>
            <h2 className="section-title mt-4">{s.servicesTitle}</h2>
            <p className="mt-5 max-w-2xl text-slate-300">{s.servicesDescription}</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {s.services.map((service, index) => {
              const Icon = serviceIcons[index];

              return (
                <article
                  key={service.title}
                  className="surface card-hover flex h-full flex-col p-6"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accentGlow">
                    <Icon size={20} />
                  </div>

                  <div className="mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {service.label}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-300">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {service.includes.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow justify-center">{s.processEyebrow}</span>
              <h2 className="section-title mt-4 text-balance">{s.processTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                {s.processDescription}
              </p>
            </div>

            <div className="relative mt-12">
              <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

              <div className="grid gap-6 lg:grid-cols-4">
                {s.process.map((item) => (
                  <article
                    key={item.step}
                    className="group surface-strong relative h-full overflow-hidden p-6 transition hover:-translate-y-1 hover:border-accent/20"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,164,74,0.06),transparent_40%)] opacity-0 transition group-hover:opacity-100" />

                    <div className="relative">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-sm font-semibold text-accentGlow shadow-[0_0_0_6px_rgba(232,164,74,0.04)]">
                          {item.step}
                        </div>
                        <div className="hidden h-px flex-1 bg-white/10 lg:block" />
                      </div>

                      <h3 className="text-xl font-semibold leading-snug text-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-300">
                        {item.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="surface-strong overflow-hidden p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="eyebrow">{s.inquiryEyebrow}</span>
                <h2 className="section-title mt-4 text-balance">{s.inquiryTitle}</h2>
                <p className="mt-5 max-w-2xl text-slate-300">
                  {s.inquiryDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link href="/contact">
                  <Button>
                    {t.nav.sendInquiry}
                    <ArrowRight size={16} />
                  </Button>
                </Link>

                <Link href="/portfolio">
                  <Button variant="secondary">{t.nav.portfolio}</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}