import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { aboutContentSeed } from "@/data/about";
import { certifications as certificationSeeds, education as educationSeeds } from "@/data/education";
import { experience as experienceSeeds } from "@/data/experience";
import { seedProjects } from "@/data/projects";
import type { AboutContent, CertificationItem, EducationItem, ExperienceItem, Project } from "@/types";

export type ContentStore = {
  projects: Project[];
  about: AboutContent;
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
};

const storeDirectory = path.join(process.cwd(), "storage");
const storeFilePath = path.join(storeDirectory, "content-store.json");

function nowIso() {
  return new Date().toISOString();
}

function withProjectMeta(project: Omit<Project, "id">, index: number): Project {
  const timestamp = nowIso();

  return {
    id: `project-${index + 1}`,
    ...project,
    createdAt: timestamp,
    updatedAt: timestamp
  };
}

function withExperienceMeta(item: ExperienceItem, index: number): ExperienceItem {
  return {
    id: `experience-${index + 1}`,
    sortOrder: index,
    ...item
  };
}

function withEducationMeta(item: EducationItem, index: number): EducationItem {
  return {
    id: `education-${index + 1}`,
    sortOrder: index,
    ...item
  };
}

function withCertificationMeta(item: CertificationItem, index: number): CertificationItem {
  return {
    id: `certification-${index + 1}`,
    sortOrder: index,
    ...item
  };
}

export function createSeedStore(): ContentStore {
  return {
    projects: seedProjects.map(withProjectMeta),
    about: aboutContentSeed,
    experience: experienceSeeds.map(withExperienceMeta),
    education: educationSeeds.map(withEducationMeta),
    certifications: certificationSeeds.map(withCertificationMeta)
  };
}

export async function ensureStore() {
  await mkdir(storeDirectory, { recursive: true });

  try {
    await readFile(storeFilePath, "utf8");
  } catch {
    await writeFile(storeFilePath, JSON.stringify(createSeedStore(), null, 2), "utf8");
  }
}

export async function readStore(): Promise<ContentStore> {
  await ensureStore();
  const raw = await readFile(storeFilePath, "utf8");
  return JSON.parse(raw) as ContentStore;
}

export async function writeStore(store: ContentStore) {
  await ensureStore();
  await writeFile(storeFilePath, JSON.stringify(store, null, 2), "utf8");
}

export function makeId(prefix: string) {
  return `${prefix}-${randomUUID()}`;
}
