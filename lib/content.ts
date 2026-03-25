import { aboutContentSeed } from "@/data/about";
import {
  certifications as seedCertifications,
  education as seedEducation
} from "@/data/education";
import { experience as seedExperience } from "@/data/experience";
import { readStore } from "@/lib/content-store";
import type {
  AboutContent,
  CertificationItem,
  EducationItem,
  ExperienceItem
} from "@/types";

const fallbackAbout: AboutContent = aboutContentSeed;

const fallbackExperience: ExperienceItem[] = seedExperience.map((item, index) => ({
  ...item,
  id: item.id ?? `experience-seed-${index + 1}`,
  sortOrder: item.sortOrder ?? index
}));

const fallbackEducation: EducationItem[] = seedEducation.map((item, index) => ({
  ...item,
  id: item.id ?? `education-seed-${index + 1}`,
  sortOrder: item.sortOrder ?? index
}));

const fallbackCertifications: CertificationItem[] = seedCertifications.map(
  (item, index) => ({
    ...item,
    id: item.id ?? `certification-seed-${index + 1}`,
    sortOrder: item.sortOrder ?? index
  })
);

function sortByOrder<T extends { sortOrder?: number }>(items: T[]) {
  return [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

function normalizeExperienceItems(items: ExperienceItem[]): ExperienceItem[] {
  return sortByOrder(
    items.map((item, index) => ({
      ...item,
      id: item.id ?? `experience-${index + 1}`,
      sortOrder: item.sortOrder ?? index
    }))
  );
}

function normalizeEducationItems(items: EducationItem[]): EducationItem[] {
  return sortByOrder(
    items.map((item, index) => ({
      ...item,
      id: item.id ?? `education-${index + 1}`,
      sortOrder: item.sortOrder ?? index
    }))
  );
}

function normalizeCertificationItems(
  items: CertificationItem[]
): CertificationItem[] {
  return sortByOrder(
    items.map((item, index) => ({
      ...item,
      id: item.id ?? `certification-${index + 1}`,
      sortOrder: item.sortOrder ?? index
    }))
  );
}

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const store = await readStore();
    return store.about ?? fallbackAbout;
  } catch (error) {
    console.warn("About content fallback activated:", error);
    return fallbackAbout;
  }
}

export async function getExperienceItems(): Promise<ExperienceItem[]> {
  try {
    const store = await readStore();
    const items =
      store.experience && store.experience.length > 0
        ? store.experience
        : fallbackExperience;

    return normalizeExperienceItems(items);
  } catch (error) {
    console.warn("Experience fallback activated:", error);
    return normalizeExperienceItems(fallbackExperience);
  }
}

export async function getExperienceItemById(
  id: string
): Promise<ExperienceItem | null> {
  const items = await getExperienceItems();
  return items.find((item) => item.id === id) ?? null;
}

export async function getEducationItems(): Promise<EducationItem[]> {
  try {
    const store = await readStore();
    const items =
      store.education && store.education.length > 0
        ? store.education
        : fallbackEducation;

    return normalizeEducationItems(items);
  } catch (error) {
    console.warn("Education fallback activated:", error);
    return normalizeEducationItems(fallbackEducation);
  }
}

export async function getEducationItemById(
  id: string
): Promise<EducationItem | null> {
  const items = await getEducationItems();
  return items.find((item) => item.id === id) ?? null;
}

export async function getCertificationItems(): Promise<CertificationItem[]> {
  try {
    const store = await readStore();
    const items =
      store.certifications && store.certifications.length > 0
        ? store.certifications
        : fallbackCertifications;

    return normalizeCertificationItems(items);
  } catch (error) {
    console.warn("Certifications fallback activated:", error);
    return normalizeCertificationItems(fallbackCertifications);
  }
}

export async function getCertificationItemById(
  id: string
): Promise<CertificationItem | null> {
  const items = await getCertificationItems();
  return items.find((item) => item.id === id) ?? null;
}