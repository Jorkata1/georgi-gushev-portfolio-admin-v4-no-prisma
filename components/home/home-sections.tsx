"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MoveUpRight
} from "lucide-react";
import {
  helpCases,
  reasonsToWork,
  siteConfig,
  whatIDo,
  workProcess
} from "@/data/site";
import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

type HomeSectionsProps = {
  featuredProjects: Project[];
};

export function HomeSections({ featuredProjects }: HomeSectionsProps) {
  return (
    <>
      {/* Услуги */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow="Услуги"
            title="Услуги, които помагат на един проект да изглежда по-добре, да работи по-добре и да се представя по-професионално."
            description="От уеб дизайн и изграждане на сайтове до бранд идентичност, визуално обновяване, поддръжка, QA проверки и консултации за по-силно дигитално присъствие."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whatIDo.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="surface card-hover h-full p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accentGlow">
                      <Icon size={20} />
                    </div>
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
                Виж всички услуги
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Как мога да помогна + Кратко за мен */}
      <section className="section-padding">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow="Как мога да помогна"
                title="Подходящо, когато имаш нужда не просто от визия, а от по-добро цялостно дигитално решение."
                description="Работя по проекти, при които дизайнът, структурата и функционалността трябва да вървят заедно, за да се стигне до по-ясен и професионален резултат."
              />

              <div className="mt-10 grid gap-4">
                {helpCases.map((item, index) => (
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
                eyebrow="Кратко за мен"
                title="Работя в пресечната точка между дизайн, дигитални решения и функционално мислене."
                description={siteConfig.shortAbout}
              />

              <div className="mt-10 surface p-6">
                <p className="text-sm text-slate-300">
                  Комбинирам визуален подход, техническа дисциплина и QA mindset,
                  за да се стига до решения, които са едновременно clean, practical
                  и полезни за реалната употреба.
                </p>

                <div className="mt-6">
                  <Link href="/about">
                    <Button variant="secondary">
                      Научи повече
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

      {/* Проекти */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow="Проекти"
            title="Подбрани проекти, които показват подход към дизайн, структура, бранд логика и дигитално мислене."
            description="Примери за работа в области като бранд идентичност, уеб визия, UI концепции и визуални решения с практическа насоченост."
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
                Разгледай всички проекти
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Процес */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow="Процес"
            title="Ясен процес, за да се движим подредено от идея до работещ резултат."
            description="Независимо дали става дума за нов сайт, редизайн, визуално обновяване или QA преглед, работя с подреден процес и ясен фокус върху резултата."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {workProcess.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="surface h-full p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-accent">
                    Стъпка {index + 1}
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

      {/* Подход */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow="Подход"
            title="Комбинация от визуално мислене, техническа дисциплина и внимание към реалното потребителско изживяване."
            description="Подхождам към проектите не само като към визия, а като към цялостно решение, което трябва да бъде ясно, последователно и функционално."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reasonsToWork.map((item, index) => (
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
                <span className="eyebrow">Контакт</span>
                <h2 className="section-title mt-4 text-balance">
                  Имаш нужда от нов сайт, визуално обновяване или по-силно дигитално присъствие?
                </h2>
                <p className="mt-5 max-w-2xl text-slate-300">
                  Мога да помогна с дизайн, изграждане, обновяване, QA преглед и
                  консултация за следващата правилна стъпка за твоя проект.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link href="/contact">
                  <Button>
                    Изпрати запитване
                    <ArrowRight size={16} />
                  </Button>
                </Link>

                <Link href="/portfolio">
                  <Button variant="secondary">Разгледай проекти</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}