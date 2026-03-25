import { aboutContentSeed } from "@/data/about";
import { certifications as seedCertifications, education as seedEducation } from "@/data/education";
import { experience as seedExperience } from "@/data/experience";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type { AboutContent, CertificationItem, EducationItem, ExperienceItem } from "@/types";

const fallbackAbout: AboutContent = aboutContentSeed;
const fallbackExperience: ExperienceItem[] = seedExperience;
const fallbackEducation: EducationItem[] = seedEducation;
const fallbackCertifications: CertificationItem[] = seedCertifications;

async function withFallback<T>(resolver: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await resolver();
  } catch (error) {
    console.warn("Content fallback activated:", error);
    return fallback;
  }
}

function sortByOrder<T extends { sortOrder?: number }>(items: T[]) {
  return [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getAboutContent(): Promise<AboutContent> {
  return withFallback(async () => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase.from("about_content").select("*").eq("id", 1).single();

    if (error) throw error;

    return {
      heroTitle: data.hero_title,
      heroDescription: data.hero_description,
      profileTitle: data.profile_title,
      profileParagraphs: data.profile_paragraphs ?? [],
      workTitle: data.work_title,
      workParagraphs: data.work_paragraphs ?? [],
      strengths: data.strengths ?? [],
      languages: data.languages ?? []
    };
  }, fallbackAbout);
}

export async function getExperienceItems(): Promise<ExperienceItem[]> {
  return withFallback(async () => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("experience_entries")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return sortByOrder(
      (data ?? []).map((item) => ({
        id: item.id,
        sortOrder: item.sort_order,
        company: item.company,
        role: item.role,
        location: item.location,
        period: item.period,
        summary: item.summary,
        bullets: item.bullets ?? []
      }))
    );
  }, fallbackExperience);
}

export async function getExperienceItemById(id: string): Promise<ExperienceItem | null> {
  const items = await getExperienceItems();
  return items.find((item) => item.id === id) ?? null;
}

export async function getEducationItems(): Promise<EducationItem[]> {
  return withFallback(async () => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("education_entries")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return sortByOrder(
      (data ?? []).map((item) => ({
        id: item.id,
        sortOrder: item.sort_order,
        institution: item.institution,
        degree: item.degree,
        period: item.period,
        description: item.description
      }))
    );
  }, fallbackEducation);
}

export async function getEducationItemById(id: string): Promise<EducationItem | null> {
  const items = await getEducationItems();
  return items.find((item) => item.id === id) ?? null;
}

export async function getCertificationItems(): Promise<CertificationItem[]> {
  return withFallback(async () => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("certification_entries")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return sortByOrder(
      (data ?? []).map((item) => ({
        id: item.id,
        sortOrder: item.sort_order,
        title: item.title,
        issuer: item.issuer,
        year: item.year,
        href: item.href ?? undefined
      }))
    );
  }, fallbackCertifications);
}

export async function getCertificationItemById(id: string): Promise<CertificationItem | null> {
  const items = await getCertificationItems();
  return items.find((item) => item.id === id) ?? null;
}