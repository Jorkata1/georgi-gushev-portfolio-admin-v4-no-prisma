import fs from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

const storePath = path.join(process.cwd(), "storage", "content-store.json");
const raw = await fs.readFile(storePath, "utf8");
const store = JSON.parse(raw);

const projects = store.projects.map((item) => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  short_title: item.shortTitle,
  excerpt: item.excerpt,
  summary: item.summary,
  category: item.category,
  year: item.year,
  featured: Boolean(item.featured),
  hero_image: item.heroImage,
  tools: item.tools ?? [],
  gallery: item.gallery ?? [],
  goals: item.goals ?? [],
  process: item.process ?? [],
  outcome: item.outcome ?? [],
  created_at: item.createdAt ?? new Date().toISOString(),
  updated_at: item.updatedAt ?? new Date().toISOString()
}));

const about = {
  id: 1,
  hero_title: store.about.heroTitle,
  hero_description: store.about.heroDescription,
  profile_title: store.about.profileTitle,
  profile_paragraphs: store.about.profileParagraphs ?? [],
  work_title: store.about.workTitle,
  work_paragraphs: store.about.workParagraphs ?? [],
  strengths: store.about.strengths ?? [],
  languages: store.about.languages ?? [],
  updated_at: new Date().toISOString()
};

const experience = store.experience.map((item, index) => ({
  id: item.id ?? `experience-${index + 1}`,
  sort_order: item.sortOrder ?? index,
  company: item.company,
  role: item.role,
  location: item.location,
  period: item.period,
  summary: item.summary,
  bullets: item.bullets ?? [],
  updated_at: new Date().toISOString()
}));

const education = store.education.map((item, index) => ({
  id: item.id ?? `education-${index + 1}`,
  sort_order: item.sortOrder ?? index,
  institution: item.institution,
  degree: item.degree,
  period: item.period,
  description: item.description,
  updated_at: new Date().toISOString()
}));

const certifications = store.certifications.map((item, index) => ({
  id: item.id ?? `certification-${index + 1}`,
  sort_order: item.sortOrder ?? index,
  title: item.title,
  issuer: item.issuer,
  year: item.year,
  href: item.href ?? null,
  updated_at: new Date().toISOString()
}));

async function run() {
  const { error: aboutError } = await supabase
    .from("about_content")
    .upsert(about, { onConflict: "id" });

  if (aboutError) throw aboutError;

  const { error: projectsError } = await supabase
    .from("portfolio_projects")
    .upsert(projects, { onConflict: "id" });

  if (projectsError) throw projectsError;

  const { error: experienceError } = await supabase
    .from("experience_entries")
    .upsert(experience, { onConflict: "id" });

  if (experienceError) throw experienceError;

  const { error: educationError } = await supabase
    .from("education_entries")
    .upsert(education, { onConflict: "id" });

  if (educationError) throw educationError;

  const { error: certificationsError } = await supabase
    .from("certification_entries")
    .upsert(certifications, { onConflict: "id" });

  if (certificationsError) throw certificationsError;

  console.log("Migration completed successfully.");
}

run().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});