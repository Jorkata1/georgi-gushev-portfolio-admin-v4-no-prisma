"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FeaturedProjectRow } from "@/components/home/featured-project-row";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";

const VIEW_PROJECT_LABEL = { bg: "Виж проекта", en: "View project" } as const;

type HomeFeaturedProjectsProps = {
  featuredProjects: Project[];
};

/** Featured work right after the hero, told as an editorial sequence of curtain reveals. */
export function HomeFeaturedProjects({ featuredProjects }: HomeFeaturedProjectsProps) {
  const { locale } = useLanguage();
  const s = translations[locale].sections;
  const viewLabel = VIEW_PROJECT_LABEL[locale === "bg" ? "bg" : "en"];

  if (featuredProjects.length === 0) return null;

  return (
    <section className="section-padding overflow-x-clip">
      <Container>
        <SectionHeading
          eyebrow={s.projects.eyebrow}
          title={s.projects.title}
          description={s.projects.description}
        />

        <div className="mt-10 flex flex-col gap-16 sm:mt-14 sm:gap-24 lg:gap-32">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectRow key={project.id} project={project} index={index} viewLabel={viewLabel} />
          ))}
        </div>

        <div className="mt-12 sm:mt-16">
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
