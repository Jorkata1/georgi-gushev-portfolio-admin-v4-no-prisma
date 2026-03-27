import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { getAllProjects, getProjectCategories } from "@/lib/projects";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Проекти",
  description:
    "Подбрани проекти в области като бранд идентичност, уеб визия, UI концепции и визуални решения с практическа насоченост.",
  path: "/portfolio"
});

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  const categories = getProjectCategories(projects);

  return (
    <>
      <PageHero
        eyebrow="Проекти"
        title="Подбрани проекти, които показват подход към дизайн, структура, бранд логика и дигитално мислене."
        description="Примери за работа в области като бранд идентичност, уеб визия, UI концепции и визуални решения с практическа насоченост."
      />

      <section className="section-padding">
        <Container>
          <PortfolioGrid projects={projects} categories={categories} />
        </Container>
      </section>
    </>
  );
}