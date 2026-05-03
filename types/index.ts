import type { Route } from "next";

export type NavItem = {
  href: Route;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const projectCategories = [
  "Graphic Design",
  "Branding",
  "UI Concepts",
  "Practice Projects"
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  summary: string;
  category: ProjectCategory;
  tools: string[];
  year: string;
  featured?: boolean;
  heroImage: string;
  gallery: string[];
  goals: string[];
  process: string[];
  outcome: string[];
  liveUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type LanguageItem = {
  name: string;
  level: string;
};

export type AboutContent = {
  heroTitle: string;
  heroDescription: string;
  profileTitle: string;
  profileParagraphs: string[];
  workTitle: string;
  workParagraphs: string[];
  strengths: string[];
  languages: LanguageItem[];
};

export type ExperienceItem = {
  id?: string;
  sortOrder?: number;
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
};

export type EducationItem = {
  id?: string;
  sortOrder?: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
};

export type CertificationItem = {
  id?: string;
  sortOrder?: number;
  title: string;
  issuer: string;
  year: string;
  href?: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};