import { HomeFeaturedProjects } from "@/components/home/home-featured-projects";
import { HomeHero } from "@/components/home/home-hero";
import { HomeSections } from "@/components/home/home-sections";
import { HomeSiteCheck } from "@/components/home/home-site-check";
import { HomeStory } from "@/components/home/home-story";
import { getFeaturedProjects } from "@/lib/projects";

export const revalidate = 3600;

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="home-snap">
      <HomeHero />
      <HomeStory />
      <HomeFeaturedProjects featuredProjects={featuredProjects} />
      <HomeSiteCheck />
      <HomeSections />
    </div>
  );
}