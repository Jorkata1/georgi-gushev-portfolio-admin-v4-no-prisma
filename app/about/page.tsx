"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LayoutGrid,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Tag
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";

const valueIcons = [LayoutGrid, ShieldCheck, Sparkles];

export default function AboutPage() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const a = t.aboutPage;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/6">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 top-[-8rem] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(87,166,255,0.18),transparent_56%)]" />

        <Container className="section-padding relative">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Reveal>
                <span className="eyebrow">
                  <Sparkles size={14} />
                  {a.eyebrow}
                </span>

                <h1 className="display-title mt-5 max-w-4xl text-balance">
                  {a.title}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg text-slate-300">
                  {a.description}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button>
                      {a.sendInquiry}
                      <ArrowRight size={16} />
                    </Button>
                  </Link>

                  <Link href="/portfolio">
                    <Button variant="secondary">{a.viewProjects}</Button>
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="surface-strong relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(87,166,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(216,171,98,0.10),transparent_25%)]" />

              <div className="relative grid gap-4">
                {a.valuePoints.map((item, index) => {
                  const Icon = valueIcons[index];
                  return (
                    <Reveal key={item.title} delay={index * 0.08}>
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                          <Icon size={18} />
                        </div>
                        <h2 className="mt-4 text-xl font-semibold text-white">
                          {item.title}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Approach + What I can help with — merged into one section */}
      <section className="section-padding">
        <Container>
          <Reveal>
            <article className="surface-strong p-8 sm:p-10 lg:p-12">
              <span className="eyebrow">{a.approachEyebrow}</span>

              <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div>
                  <h2 className="section-title text-balance">{a.approachTitle}</h2>

                  <p className="mt-5 text-slate-300">
                    {a.approachP1}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {a.resultPoints.map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <span className="eyebrow">{a.usefulEyebrow}</span>
                  <div className="mt-5 space-y-4">
                    {a.focusAreas.map((item) => (
                      <div key={item} className="flex gap-3 text-sm text-slate-300">
                        <CheckCircle2
                          className="mt-0.5 shrink-0 text-primaryGlow"
                          size={18}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </Container>
      </section>

      {/* Strengths + Info — combined */}
      <section className="section-padding">
        <Container>
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <article className="surface p-7 sm:p-8">
                <span className="eyebrow">{a.strengthsEyebrow}</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {a.strengthsTitle}
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {a.strengths.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-white/10 bg-white/[0.05] px-4 py-3 text-center text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            {/* Compact info row */}
            <Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="surface p-5">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-primaryGlow" />
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {a.locationTitle}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-white">{a.location}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {a.langBg} · {a.langEn}
                  </p>
                </div>

                <div className="surface p-5">
                  <div className="flex items-center gap-3">
                    <Tag size={16} className="text-primaryGlow" />
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {a.focus}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {a.focusTags.map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surface p-5">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-primaryGlow" />
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {t.footer.contactTitle}
                    </p>
                  </div>
                  <p className="mt-3 break-words text-sm text-white">
                    {siteConfig.email}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                    <Phone size={12} />
                    <span>{siteConfig.phone}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}