import { Container } from "@/components/shared/container";
import { getAllProjects, getProjectCategories } from "@/lib/projects";
import { PortfolioPageClient } from "./portfolio-page-client";

// ISR: regenerate the page at most once per hour.
// First visitor after that triggers a rebuild; everyone else gets the cached HTML.
// Supabase DB is queried AT MOST once per hour per deployment, regardless of traffic.
export const revalidate = 3600;

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  const categories = getProjectCategories(projects);

  return (
    <PortfolioPageClient
      projects={projects}
      categories={categories as readonly string[]}
    />
  );
}