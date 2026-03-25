import { PortfolioGrid } from "@/components/portfolio-grid";
import { Container } from "@/components/shared/container";
import { PageHero } from "@/components/page-hero";
import { getAllProjects, getProjectCategories } from "@/lib/projects";
import { createMetadata } from "@/lib/site-metadata";

export const metadata = createMetadata({
  title: "Портфолио",
  description:
    "Проекти в области като UI concepts, branding, graphic design и practice work, представени в premium portfolio формат.",
  path: "/portfolio"
});

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  const categories = getProjectCategories(projects);

  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="Визуално подредени концепции и практични проекти с фокус върху яснота, структура и детайл."
        description="Портфолиото комбинира UI идеи, branding и practice projects, а съдържанието му вече може да се управлява през админ панела."
      />

      <section className="section-padding">
        <Container>
          <PortfolioGrid projects={projects} categories={categories} />
        </Container>
      </section>
    </>
  );
}
