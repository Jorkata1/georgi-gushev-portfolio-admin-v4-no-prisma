"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { AdaptiveProjectGallery } from "@/components/portfolio/adaptive-project-gallery";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";

type ProjectDetailsClientProps = {
  project: Project;
};

export function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  const { locale } = useLanguage();
  const t = translations[locale];
  const p = t.portfolio;

  return (
    <>
      <section className="section-padding border-b border-white/6">
        <Container>
          <Link
            href="/portfolio"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-accent"
          >
            <ArrowLeft size={16} />
            {p.backToPortfolio}
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <span className="eyebrow">{project.category}</span>
              <h1 className="display-title mt-5 text-balance">{project.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="surface p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm uppercase tracking-[0.25em] text-slate-400">
                  {p.year}
                </span>
                <span className="text-sm font-medium text-accent">{project.year}</span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{p.goals}</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {project.goals.length}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{p.steps}</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {project.process.length}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{p.results}</p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {project.outcome.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <AdaptiveProjectGallery
            title={project.title}
            heroImage={project.heroImage}
            gallery={project.gallery}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <article className="surface p-6">
              <h2 className="text-xl font-semibold text-white">{p.goals}</h2>
              <ul className="mt-5 space-y-3">
                {project.goals.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="surface p-6">
              <h2 className="text-xl font-semibold text-white">{p.process}</h2>
              <ul className="mt-5 space-y-3">
                {project.process.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="surface p-6">
              <h2 className="text-xl font-semibold text-white">{p.result}</h2>
              <ul className="mt-5 space-y-3">
                {project.outcome.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-12 surface-strong p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="eyebrow">{p.nextStep}</span>
                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {p.nextStepTitle}
                </h2>
                <p className="mt-3 max-w-2xl text-slate-300">
                  {p.nextStepDescription}
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accentGlow"
              >
                {p.letsTalk}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
