import { aboutContentSeed } from "@/data/about";
import {
  certifications as seedCertifications,
  education as seedEducation
} from "@/data/education";
import { experience as seedExperience } from "@/data/experience";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import type {
  AboutContent,
  CertificationItem,
  EducationItem,
  ExperienceItem
} from "@/types";

type ExperienceItemNormalized = ExperienceItem & {
  id: string;
  sortOrder: number;
};

type EducationItemNormalized = EducationItem & {
  id: string;
  sortOrder: number;
};

type CertificationItemNormalized = CertificationItem & {
  id: string;
  sortOrder: number;
};

const fallbackAbout: AboutContent = aboutContentSeed;

const fallbackExperience: ExperienceItemNormalized[] = seedExperience.map(
  (item, index) => ({
    ...item,
    id: item.id ?? `experience-seed-${index + 1}`,
    sortOrder: item.sortOrder ?? index
  })
);

const fallbackEducation: EducationItemNormalized[] = seedEducation.map(
  (item, index) => ({
    ...item,
    id: item.id ?? `education-seed-${index + 1}`,
    sortOrder: item.sortOrder ?? index
  })
);

const fallbackCertifications: CertificationItemNormalized[] =
  seedCertifications.map((item, index) => ({
    ...item,
    id: item.id ?? `certification-seed-${index + 1}`,
    sortOrder: item.sortOrder ?? index
  }));

async function withFallback<T>(resolver: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await resolver();
  } catch (error) {
    console.warn("Content fallback activated:", error);
    return fallback;
  }
}

function sortExperience(items: ExperienceItemNormalized[]): ExperienceItemNormalized[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

function sortEducation(items: EducationItemNormalized[]): EducationItemNormalized[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

function sortCertifications(
  items: CertificationItemNormalized[]
): CertificationItemNormalized[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getAboutContent(): Promise<AboutContent> {
  return withFallback(async () => {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("about_content")
      .select("*")
      .eq("id", 1)
      .single();

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

    const items: ExperienceItemNormalized[] = (data ?? []).map((item, index) => ({
      id: item.id ?? `experience-${index + 1}`,
      sortOrder: item.sort_order ?? index,
      company: item.company,
      role: item.role,
      location: item.location,
      period: item.period,
      summary: item.summary,
      bullets: item.bullets ?? []
    }));

    return sortExperience(items);
  }, fallbackExperience);
}

export async function getExperienceItemById(
  id: string
): Promise<ExperienceItem | null> {
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

    const items: EducationItemNormalized[] = (data ?? []).map((item, index) => ({
      id: item.id ?? `education-${index + 1}`,
      sortOrder: item.sort_order ?? index,
      institution: item.institution,
      degree: item.degree,
      period: item.period,
      description: item.description
    }));

    return sortEducation(items);
  }, fallbackEducation);
}

export async function getEducationItemById(
  id: string
): Promise<EducationItem | null> {
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

    const items: CertificationItemNormalized[] = (data ?? []).map((item, index) => ({
      id: item.id ?? `certification-${index + 1}`,
      sortOrder: item.sort_order ?? index,
      title: item.title,
      issuer: item.issuer,
      year: item.year,
      href: item.href ?? undefined
    }));

    return sortCertifications(items);
  }, fallbackCertifications);
}

export async function getCertificationItemById(
  id: string
): Promise<CertificationItem | null> {
  const items = await getCertificationItems();
  return items.find((item) => item.id === id) ?? null;
}