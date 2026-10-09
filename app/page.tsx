import { HomeJourney } from "@/components/home/home-journey";
import { getFeaturedProjects } from "@/lib/projects";

export const revalidate = 3600;

/** The homepage is one scroll-driven 3D journey: the steps of building a website, featured projects, then the GDX mark. */
export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  return <HomeJourney featuredProjects={featuredProjects} />;
}