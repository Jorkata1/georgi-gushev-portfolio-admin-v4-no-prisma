"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  LayoutGrid,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Tag,
  Target
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";

// Icons mapped by index to match valuePoints order
const valueIcons = [LayoutGrid, ShieldCheck, Sparkles];

export default function AboutPage() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const a = t.aboutPage;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/6">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 top-[-8rem] h-[28rem] bg-[radial-gradient(circle_at_top,rgba(87,166,255,0.18),transparent_56%)]" />

        <Container className="section-padding relative">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="eyebrow">
                <Sparkles size={14} />
                {a.eyebrow}
              </span>

              <h1 className="display-title mt-5 max-w-4xl text-balance">
                {a.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-slate-300">
                {a.description}
              </p>

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
            </div>

            <div className="surface-strong relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(87,166,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(216,171,98,0.10),transparent_25%)]" />

              <div className="relative grid gap-4">
                {a.valuePoints.map((item, index) => {
                  const Icon = valueIcons[index];
                  return (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
                    >
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
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <article className="surface-strong p-8 sm:p-10 lg:p-12">
            <span className="eyebrow">{a.approachEyebrow}</span>

            <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <h2 className="section-title text-balance">{a.approachTitle}</h2>

                <div className="mt-6 space-y-4 text-slate-300">
                  <p>{a.approachP1}</p>
                  <p>{a.approachP2}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
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

              <div className="grid gap-6">
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

                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <span className="eyebrow">{a.usefulResult}</span>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {a.usefulResultText}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <article className="surface self-start p-7 sm:p-8">
                <span className="eyebrow">{a.strengthsEyebrow}</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {a.strengthsTitle}
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {a.strengths.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-white/10 bg-white/[0.05] px-4 py-4 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>

              <article className="surface p-7 sm:p-8">
                <span className="eyebrow">{a.proEyebrow}</span>

                <div className="mt-4 flex items-center gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                    <BriefcaseBusiness size={18} />
                  </div>

                  <h2 className="text-2xl font-semibold text-white">
                    {a.proTitle}
                  </h2>
                </div>

                <div className="mt-5 space-y-4 text-slate-300">
                  <p>{a.proP1}</p>
                  <p>{a.proP2}</p>
                </div>
              </article>
            </div>

            <article className="surface-strong p-7 sm:p-8">
              <span className="eyebrow">{a.infoEyebrow}</span>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                    <MapPin size={16} />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-400">
                    {a.locationTitle}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white">
                    {a.location}
                  </p>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm text-white">{a.langBg}</p>
                    <p className="mt-1 text-sm text-white">{a.langEn}</p>
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                    <Target size={16} />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-400">
                    {a.suitableFor}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white">
                    {a.suitableForText}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                    <Tag size={16} />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-400">
                    {a.focus}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {a.focusTags.map((item) => (
                      <div
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
                    <Mail size={16} />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-400">
                    {t.footer.contactTitle}
                  </p>
                  <p className="mt-3 break-words text-sm text-white">
                    {siteConfig.email}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-white">
                    <Phone size={14} className="text-primaryGlow" />
                    <span>{siteConfig.phone}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}