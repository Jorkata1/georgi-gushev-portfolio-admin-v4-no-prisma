import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getAllProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/about", "/portfolio", "/experience", "/education", "/contact"];

  const pageEntries = staticPages.map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: new Date()
  }));

  const projects = await getAllProjects();

  const projectEntries = projects.map((project) => ({
    url: `${siteConfig.siteUrl}/portfolio/${project.slug}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date()
  }));

  return [...pageEntries, ...projectEntries];
}
