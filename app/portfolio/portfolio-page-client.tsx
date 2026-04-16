"use client";

import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";

type PortfolioPageClientProps = {
  projects: Project[];
  categories: readonly string[];
};

export function PortfolioPageClient({
  projects,
  categories
}: PortfolioPageClientProps) {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <>
      <PageHero
        eyebrow={t.nav.portfolio}
        title={t.sections.projects.title}
        description={t.sections.projects.description}
      />

      <section className="section-padding">
        <Container>
          <PortfolioGrid projects={projects} categories={categories} />
        </Container>
      </section>
    </>
  );
}
