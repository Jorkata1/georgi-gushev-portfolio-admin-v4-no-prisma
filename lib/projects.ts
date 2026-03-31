import { seedProjects } from "@/data/projects";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { Project } from "@/types";

const fallbackProjects: Project[] = seedProjects.map((project, index) => ({
  id: `seed-${index + 1}`,
  ...project,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString()
}));

async function withFallback<T>(resolver: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await resolver();
  } catch (error) {
    console.warn("Projects fallback activated:", error);
    return fallback;
  }
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) {
      return a.featured ? -1 : 1;
    }

    if (a.year !== b.year) {
      return b.year.localeCompare(a.year);
    }

    return (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "");
  });
}

function mapProject(item: any): Project {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    shortTitle: item.short_title,
    excerpt: item.excerpt,
    summary: item.summary,
    category: item.category,
    tools: item.tools ?? [],
    year: item.year,
    featured: item.featured,
    heroImage: item.hero_image,
    gallery: item.gallery ?? [],
    goals: item.goals ?? [],
    process: item.process ?? [],
    outcome: item.outcome ?? [],
    createdAt: item.created_at,
    updatedAt: item.updated_at
  };
}

export async function getAllProjects(): Promise<Project[]> {
  return withFallback(async () => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase.from("portfolio_projects").select("*");

    if (error) throw error;

    return sortProjects((data ?? []).map(mapProject));
  }, fallbackProjects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return withFallback(async () => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("featured", true);

    if (error) throw error;

    return sortProjects((data ?? []).map(mapProject)).slice(0, 3);
  }, fallbackProjects.filter((project) => project.featured).slice(0, 3));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return withFallback(async () => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;

    return mapProject(data);
  }, fallbackProjects.find((project) => project.slug === slug) ?? null);
}

export async function getProjectById(id: string): Promise<Project | null> {
  return withFallback(async () => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return mapProject(data);
  }, fallbackProjects.find((project) => project.id === id) ?? null);
}

export function getProjectCategories(projects: Project[]) {
  return ["Всички", ...new Set(projects.map((project) => project.category))] as const;
}