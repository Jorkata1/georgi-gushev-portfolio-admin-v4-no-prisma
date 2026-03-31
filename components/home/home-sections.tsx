"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MoveUpRight } from "lucide-react";
import { whatIDo, workProcess } from "@/data/site";
import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";

type HomeSectionsProps = {
  featuredProjects: Project[];
};

export function HomeSections({ featuredProjects }: HomeSectionsProps) {
  const { locale } = useLanguage();
  const t = translations[locale];
  const s = t.sections;

  return (
    <>
      {/* Services */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow={s.services.eyebrow}
            title={s.services.title}
            description={s.services.description}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {t.whatIDo.map((item, index) => {
              // Keep the icon from the original data by matching index
              const originalItem = whatIDo[index];
              const Icon = originalItem?.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="surface card-hover h-full p-6">
                    {Icon && (
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accentGlow">
                        <Icon size={20} />
                      </div>
                    )}
                    <h3 className="mt-5 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-300">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10">
            <Link href="/services">
              <Button variant="secondary">
                {s.services.viewAll}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* How I can help + Short about */}
      <section className="section-padding">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow={s.help.eyebrow}
                title={s.help.title}
                description={s.help.description}
              />

              <div className="mt-10 grid gap-4">
                {t.helpCases.map((item, index) => (
                  <Reveal key={item} delay={index * 0.06}>
                    <div className="surface flex gap-3 p-5">
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-accentGlow"
                        size={18}
                      />
                      <p className="text-sm text-slate-300">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow={s.aboutShort.eyebrow}
                title={s.aboutShort.title}
                description={s.aboutShort.body}
              />

              <div className="mt-10 surface p-6">
                <p className="text-sm text-slate-300">{s.aboutShort.body}</p>

                <div className="mt-6">
                  <Link href="/about">
                    <Button variant="secondary">
                      {s.aboutShort.learnMore}
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Projects */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow={s.projects.eyebrow}
            title={s.projects.title}
            description={s.projects.description}
          />

          <div className="mt-12 grid gap-8">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/portfolio">
              <Button variant="secondary">
                {s.projects.viewAll}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Process */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow={s.process.eyebrow}
            title={s.process.title}
            description={s.process.description}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {t.workProcess.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="surface h-full p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-accent">
                    {s.process.step} {index + 1}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Approach */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow={s.approach.eyebrow}
            title={s.approach.title}
            description={s.approach.description}
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {t.reasonsToWork.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="surface flex gap-3 p-5">
                  <MoveUpRight
                    className="mt-0.5 shrink-0 text-accentGlow"
                    size={18}
                  />
                  <p className="text-sm text-slate-300">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding-sm pb-24">
        <Container>
          <div className="surface-strong overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="eyebrow">{s.cta.eyebrow}</span>
                <h2 className="section-title mt-4 text-balance">{s.cta.title}</h2>
                <p className="mt-5 max-w-2xl text-slate-300">
                  {s.cta.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link href="/contact">
                  <Button>
                    {s.cta.sendInquiry}
                    <ArrowRight size={16} />
                  </Button>
                </Link>

                <Link href="/portfolio">
                  <Button variant="secondary">{s.cta.viewProjects}</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}