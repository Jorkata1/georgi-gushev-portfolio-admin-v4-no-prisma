"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { BentoPortfolioGrid } from "@/components/portfolio/bento-portfolio-grid";
import { getAllProjects, getProjectCategories } from "@/lib/projects";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";

export default function PortfolioPage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<readonly string[]>([]);

  useEffect(() => {
    getAllProjects().then((data) => {
      setProjects(data);
      setCategories(getProjectCategories(data));
    });
  }, []);

  return (
    <>
      <PageHero
        eyebrow={t.nav.portfolio}
        title={t.sections.projects.title}
        description={t.sections.projects.description}
      />

      <section className="section-padding">
        <Container>
          <BentoPortfolioGrid projects={projects} categories={categories} />
        </Container>
      </section>
    </>
  );
}