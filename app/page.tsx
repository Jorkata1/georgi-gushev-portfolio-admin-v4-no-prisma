import { HomeFeaturedProjects } from "@/components/home/home-featured-projects";
import { HomeLayers } from "@/components/home/home-layers";
import { getFeaturedProjects } from "@/lib/projects";

export const revalidate = 3600;

/** The homepage: the layers story (how a website is built), then the featured projects. */
export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  return (
    <>
      <HomeLayers featuredProjects={featuredProjects} />
      <HomeFeaturedProjects featuredProjects={featuredProjects} />
    </>
  );
}