import { HomeStory } from "@/components/home/home-story";
import { getFeaturedProjects } from "@/lib/projects";

export const revalidate = 3600;

/** The homepage is one scroll-driven story: intro, the five-step process, then projects and actions. */
export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  return <HomeStory featuredProjects={featuredProjects} />;
}