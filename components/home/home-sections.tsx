"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { whatIDo } from "@/data/site";
import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/shared/tilt-card";
import { AnimatedDivider } from "@/components/shared/animated-divider";
import { ToolsMarquee } from "@/components/shared/tools-marquee";
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
      {/* Services — with TiltCard hover */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow={s.services.eyebrow}
            title={s.services.title}
            description={s.services.description}
          />

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {t.whatIDo.map((item, index) => {
              const originalItem = whatIDo[index];
              const Icon = originalItem?.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <TiltCard className="h-full">
                    <article className="surface h-full p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow sm:p-6">
                      {Icon && (
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accentGlow sm:h-12 sm:w-12 sm:rounded-2xl">
                          <Icon size={16} className="sm:hidden" />
                          <Icon size={20} className="hidden sm:block" />
                        </div>
                      )}
                      <h3 className="mt-3 text-sm font-semibold text-white sm:mt-5 sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:mt-3 sm:text-sm">
                        {item.text}
                      </p>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-10">
            <Link href="/services">
              <Button variant="secondary">
                {s.services.viewAll}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <AnimatedDivider />

      {/* Help cases */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow={s.help.eyebrow}
            title={s.help.title}
          />

          <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {t.helpCases.map((item, index) => (
              <Reveal key={item} delay={index * 0.06} className="h-full">
                <div className="surface flex h-full gap-2 p-3 sm:gap-3 sm:p-5">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-accentGlow"
                    size={14}
                  />
                  <p className="text-xs leading-snug text-slate-300 sm:text-sm">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <AnimatedDivider />

      {/* Projects */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow={s.projects.eyebrow}
            title={s.projects.title}
            description={s.projects.description}
          />

          <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <div className="mt-6 sm:mt-10">
            <Link href="/portfolio">
              <Button variant="secondary">
                {s.projects.viewAll}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <AnimatedDivider />

      {/* Process — horizontal scroll on mobile */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow={s.process.eyebrow}
            title={s.process.title}
            description={s.process.description}
          />

          <div className="mt-8 sm:mt-12">
            <div className="-mx-4 flex gap-4 overflow-x-auto overflow-y-hidden px-4 pb-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:pb-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
              {t.workProcess.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08}>
                  <article className="surface h-full min-w-[240px] shrink-0 snap-start p-5 sm:min-w-0 sm:p-6">
                    <p className="text-xs uppercase tracking-[0.24em] text-accent">
                      {s.process.step} {index + 1}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-white sm:mt-4 sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:mt-3 sm:text-sm">
                      {item.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-2 text-center text-[10px] uppercase tracking-widest text-slate-500 sm:hidden">
              ← Плъзни →
            </p>
          </div>
        </Container>
      </section>

      {/* Tools marquee */}
      <ToolsMarquee />

      {/* CTA */}
      <section className="section-padding-sm pb-20 sm:pb-24">
        <Container>
          <div className="surface-strong overflow-hidden p-6 sm:p-10 lg:p-12">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="eyebrow">{s.cta.eyebrow}</span>
                <h2 className="section-title mt-3 text-balance sm:mt-4">{s.cta.title}</h2>
                <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:mt-5 sm:text-base">
                  {s.cta.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-end">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">
                    {s.cta.sendInquiry}
                    <ArrowRight size={16} />
                  </Button>
                </Link>

                <Link href="/portfolio" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {s.cta.viewProjects}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}