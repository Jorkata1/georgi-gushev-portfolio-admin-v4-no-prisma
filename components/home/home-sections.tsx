import Link from "next/link";
import { ArrowRight, CheckCircle2, MoveUpRight } from "lucide-react";
import { whatIDo } from "@/data/site";
import { skillGroups } from "@/data/skills";
import {
  getAboutContent,
  getCertificationItems,
  getEducationItems,
  getExperienceItems
} from "@/lib/content";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/cards/project-card";
import { SkillCard } from "@/components/cards/skill-card";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

export async function HomeSections() {
  const [featuredProjects, aboutContent, experience, education, certifications] =
    await Promise.all([
      getFeaturedProjects(),
      getAboutContent(),
      getExperienceItems(),
      getEducationItems(),
      getCertificationItems()
    ]);

  return (
    <>
      <section className="section-padding">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Профил"
              title={aboutContent.profileTitle}
              description={aboutContent.profileParagraphs[0]}
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {whatIDo.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.08}>
                  <article className="surface card-hover h-full p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primaryGlow">
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
        </Container>
      </section>

      <section className="section-padding border-y border-white/6 bg-white/[0.015]">
        <Container>
          <SectionHeading
            eyebrow="Избрани проекти"
            title="Подбрани проекти, които показват подход към визуална структура, дигитално мислене и внимание към детайла."
            description="Селекция от проекти в области като графичен дизайн, branding, UI концепции и практическа работа."
          />

          <div className="mt-10 grid gap-6">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.1}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/portfolio">
              <Button variant="secondary">
                Виж всички проекти
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <SectionHeading
            eyebrow="Умения"
            title="Подредени в ясни категории, които показват хибридния профил на Георги."
            description="Дизайнерски инструменти, QA/technical tools и soft skills, които подкрепят качествена и последователна работа."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.08}>
                <SkillCard group={group} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding border-y border-white/6 bg-white/[0.015]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Опит"
                title="Реален професионален опит в среди, където точността и надеждността са ключови."
                description="Работа с клиенти, дигитални приложения, системна проверка, докладване и поддръжка."
              />

              <div className="mt-8 space-y-5">
                {experience.map((item, index) => (
                  <Reveal
                    key={item.id ?? `${item.company}-${item.role}-${index}`}
                    delay={index * 0.08}
                  >
                    <article className="surface p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.25em] text-amber">
                            {item.company}
                          </p>
                          <h3 className="mt-3 text-xl font-semibold text-white">
                            {item.role}
                          </h3>
                          <p className="mt-1 text-sm text-slate-400">
                            {item.location}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-300">
                          {item.period}
                        </span>
                      </div>

                      <p className="mt-4 text-sm text-slate-300">{item.summary}</p>
                      <ul className="mt-5 space-y-3">
                        {item.bullets.slice(0, 3).map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-sm text-slate-300">
                            <CheckCircle2
                              className="mt-0.5 shrink-0 text-primaryGlow"
                              size={16}
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Образование и сертификати"
                title="Силен фундамент между визуална култура, техническа дисциплина и QA развитие."
                description="Образование, курсове и сертификати, които изграждат професионален профил с баланс между дизайн, техническо мислене и практическа подготовка."
              />

              <div className="mt-8 space-y-5">
                {education.map((item, index) => (
                  <Reveal
                    key={item.id ?? `${item.institution}-${item.degree}-${index}`}
                    delay={index * 0.08}
                  >
                    <article className="surface p-6">
                      <p className="text-sm uppercase tracking-[0.25em] text-amber">
                        {item.period}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-white">
                        {item.degree}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-slate-200">
                        {item.institution}
                      </p>
                      <p className="mt-3 text-sm text-slate-300">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                ))}

                <Reveal delay={0.16}>
                  <article className="surface p-6">
                    <p className="text-sm uppercase tracking-[0.25em] text-amber">
                      Сертификати
                    </p>
                    <div className="mt-4 space-y-4">
                      {certifications.map((item, index) => {
                        const body = (
                          <>
                            <div>
                              <p className="font-medium text-white">{item.title}</p>
                              <p className="text-sm text-slate-400">
                                {item.issuer} · {item.year}
                              </p>
                            </div>
                            <MoveUpRight size={18} className="text-primaryGlow" />
                          </>
                        );

                        return item.href ? (
                          <a
                            key={item.id ?? `${item.title}-${item.year}-${index}`}
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 hover:border-primary/30 hover:bg-white/[0.08]"
                          >
                            {body}
                          </a>
                        ) : (
                          <div
                            key={item.id ?? `${item.title}-${item.year}-${index}`}
                            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                          >
                            {body}
                          </div>
                        );
                      })}
                    </div>
                  </article>
                </Reveal>
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
                <span className="eyebrow">Контакт</span>
                <h2 className="section-title mt-4 text-balance">
                  Отворен за работа, стаж, freelance възможности и качествени
                  професионални разговори.
                </h2>
                <p className="mt-5 max-w-2xl text-slate-300">
                  Ако търсиш човек с комбинация от визуално мислене, QA логика и
                  дисциплиниран подход към дигитални среди, това е подходящо място за
                  първи контакт.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Link href="/contact">
                  <Button>
                    Свържи се с мен
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="secondary">Научи повече</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}