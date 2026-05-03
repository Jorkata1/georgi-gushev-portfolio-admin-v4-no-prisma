import { getAllProjects, getProjectCategories } from "@/lib/projects";
import { Container } from "@/components/shared/container";
import { BentoPortfolioGrid } from "@/components/portfolio/bento-portfolio-grid";
import { PortfolioPageClient } from "./portfolio-page-client";
import type { Project } from "@/types";

// Revalidate на всеки час — спестява Supabase заявки
export const revalidate = 3600;

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  const categories = getProjectCategories(projects);

  return (
    <PortfolioPageClient projects={projects} categories={categories} />
  );
}