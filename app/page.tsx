import { HomeHero } from "@/components/home/home-hero";
import { HomeSections } from "@/components/home/home-sections";
import { getFeaturedProjects } from "@/lib/projects";

export const revalidate = 3600;

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="home-snap">
      <HomeHero />
      <HomeSections featuredProjects={featuredProjects} />
    </div>
  );
}