"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";

type HomeFeaturedProjectsProps = {
  featuredProjects: Project[];
};

/** Featured work right after the hero: the strongest proof comes first. */
export function HomeFeaturedProjects({ featuredProjects }: HomeFeaturedProjectsProps) {
  const { locale } = useLanguage();
  const s = translations[locale].sections;

  if (featuredProjects.length === 0) return null;

  return (
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
  );
}
