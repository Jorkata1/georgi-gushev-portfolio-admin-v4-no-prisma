import { HomeHero } from "@/components/home/home-hero";
import { HomeSections } from "@/components/home/home-sections";
import { getFeaturedProjects } from "@/lib/projects";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <HomeHero />
      <HomeSections featuredProjects={featuredProjects} />
    </>
  );
}