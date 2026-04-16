import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { ProjectDetailsClient } from "./project-details-client";

// Regenerate each slug's HTML at most once per hour.
export const revalidate = 3600;

// Pre-generate all known project pages at build time.
// New projects added via admin get rendered on-demand and cached for `revalidate` seconds.
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function ProjectDetailsPage({ params }: PageProps) {
  // Next 14+ supports both sync & Promise params; await handles both.
  const { slug } = await Promise.resolve(params);
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}