"use server";

import { mkdir, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  requireAdmin,
  verifyAdminCredentials
} from "@/lib/admin-auth";
import { makeId, readStore, writeStore } from "@/lib/content-store";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { parseLanguageLines } from "@/lib/content-utils";
import { joinLines, splitLines } from "@/lib/project-helpers";
import type { AdminFormState } from "@/app/admin/form-state";
import {
  aboutFormSchema,
  adminLoginSchema,
  certificationFormSchema,
  educationFormSchema,
  experienceFormSchema,
  projectFormSchema
} from "@/lib/schemas";

function extractField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function sanitizeFileName(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

async function saveUploadedFile(file: File, folder: string, slugBase: string) {
  const extension = path.extname(file.name) || ".bin";
  const safeBase = sanitizeFileName(slugBase || file.name || "asset") || "asset";
  const filename = `${safeBase}-${Date.now()}-${randomUUID().slice(0, 8)}${extension}`;
  const uploadDirectory = path.join(process.cwd(), "public", folder);
  await mkdir(uploadDirectory, { recursive: true });

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDirectory, filename), bytes);

  return `/${folder}/${filename}`;
}

function revalidatePortfolioPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/about");
  revalidatePath("/experience");
  revalidatePath("/education");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/about");
  revalidatePath("/admin/experience");
  revalidatePath("/admin/education");
  if (slug) {
    revalidatePath(`/portfolio/${slug}`);
  }
}

export async function loginAdminAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  try {
    const parsed = adminLoginSchema.safeParse({
      username: extractField(formData, "username"),
      password: extractField(formData, "password")
    });

    if (!parsed.success) {
      return {
        status: "error",
        message: "Провери данните за вход.",
        fieldErrors: parsed.error.flatten().fieldErrors
      };
    }

    const valid = await verifyAdminCredentials(parsed.data.username, parsed.data.password);

    if (!valid) {
      return {
        status: "error",
        message: "Невалидно потребителско име или парола."
      };
    }

    await createAdminSession();
    redirect("/admin/projects");
  } catch (error) {
    console.error("Admin login error:", error);
    return {
      status: "error",
      message: "Липсва или е невалидна admin конфигурация в .env.local."
    };
  }
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveProjectAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireAdmin();

  const slugBase = extractField(formData, "slug") || extractField(formData, "shortTitle") || "project";
  const heroUpload = formData.get("heroImageFile");
  const galleryUploads = formData.getAll("galleryImageFiles");

  const uploadedHeroImage =
    heroUpload instanceof File && heroUpload.size > 0
      ? await saveUploadedFile(heroUpload, "uploads/projects", slugBase)
      : "";

  const uploadedGalleryImages = await Promise.all(
    galleryUploads
      .filter((item): item is File => item instanceof File && item.size > 0)
      .map((file, index) => saveUploadedFile(file, "uploads/projects", `${slugBase}-gallery-${index + 1}`))
  );

  const galleryLines = [...splitLines(extractField(formData, "gallery")), ...uploadedGalleryImages];

  const rawValues = {
    id: extractField(formData, "id") || undefined,
    title: extractField(formData, "title"),
    shortTitle: extractField(formData, "shortTitle"),
    slug: extractField(formData, "slug"),
    excerpt: extractField(formData, "excerpt"),
    summary: extractField(formData, "summary"),
    category: extractField(formData, "category"),
    year: extractField(formData, "year"),
    featured: formData.get("featured") === "on",
    heroImage: uploadedHeroImage || extractField(formData, "heroImage"),
    tools: extractField(formData, "tools"),
    gallery: joinLines(galleryLines),
    goals: extractField(formData, "goals"),
    process: extractField(formData, "process"),
    outcome: extractField(formData, "outcome")
  };

  const parsed = projectFormSchema.safeParse(rawValues);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Моля, коригирай отбелязаните полета.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  try {
    const store = await readStore();
    const existingSlug = store.projects.find(
      (project) => project.slug === parsed.data.slug && project.id !== parsed.data.id
    );

    if (existingSlug) {
      return {
        status: "error",
        message: "Този slug вече съществува. Използвай уникален slug.",
        fieldErrors: {
          slug: ["Slug трябва да е уникален."]
        }
      };
    }

    const now = new Date().toISOString();
    const payload = {
      slug: parsed.data.slug,
      title: parsed.data.title,
      shortTitle: parsed.data.shortTitle,
      excerpt: parsed.data.excerpt,
      summary: parsed.data.summary,
      category: parsed.data.category,
      year: parsed.data.year,
      featured: parsed.data.featured,
      heroImage: parsed.data.heroImage,
      tools: splitLines(parsed.data.tools),
      gallery: splitLines(parsed.data.gallery),
      goals: splitLines(parsed.data.goals),
      process: splitLines(parsed.data.process),
      outcome: splitLines(parsed.data.outcome),
      updatedAt: now
    };

    if (parsed.data.id) {
      store.projects = store.projects.map((project) =>
        project.id === parsed.data.id
          ? {
              ...project,
              ...payload
            }
          : project
      );
    } else {
      store.projects.push({
        id: makeId("project"),
        createdAt: now,
        ...payload
      });
    }

    await writeStore(store);
  } catch (error) {
    console.error("Save project error:", error);
    return {
      status: "error",
      message: "Проектът не можа да бъде записан."
    };
  }

  revalidatePortfolioPaths(parsed.data.slug);
  redirect("/admin/projects?status=saved");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();

  const id = extractField(formData, "id");
  const slug = extractField(formData, "slug");

  if (!id) {
    redirect("/admin/projects?status=error");
  }

  try {
    const store = await readStore();
    store.projects = store.projects.filter((project) => project.id !== id);
    await writeStore(store);
  } catch (error) {
    console.error("Delete project error:", error);
    redirect("/admin/projects?status=error");
  }

  revalidatePortfolioPaths(slug);
  redirect("/admin/projects?status=deleted");
}

export async function saveAboutAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireAdmin();

  const parsed = aboutFormSchema.safeParse({
    heroTitle: extractField(formData, "heroTitle"),
    heroDescription: extractField(formData, "heroDescription"),
    profileTitle: extractField(formData, "profileTitle"),
    profileText: extractField(formData, "profileText"),
    workTitle: extractField(formData, "workTitle"),
    workText: extractField(formData, "workText"),
    strengths: extractField(formData, "strengths"),
    languages: extractField(formData, "languages")
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Моля, коригирай отбелязаните полета.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  try {
    const store = await readStore();
    store.about = {
      heroTitle: parsed.data.heroTitle,
      heroDescription: parsed.data.heroDescription,
      profileTitle: parsed.data.profileTitle,
      profileParagraphs: splitLines(parsed.data.profileText),
      workTitle: parsed.data.workTitle,
      workParagraphs: splitLines(parsed.data.workText),
      strengths: splitLines(parsed.data.strengths),
      languages: parseLanguageLines(parsed.data.languages)
    };
    await writeStore(store);
  } catch (error) {
    console.error("Save about error:", error);
    return {
      status: "error",
      message: "Не успях да запиша секцията About."
    };
  }

  revalidatePortfolioPaths();
  redirect("/admin/about?status=saved");
}

export async function saveExperienceAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireAdmin();

  const parsed = experienceFormSchema.safeParse({
    id: extractField(formData, "id") || undefined,
    company: extractField(formData, "company"),
    role: extractField(formData, "role"),
    location: extractField(formData, "location"),
    period: extractField(formData, "period"),
    summary: extractField(formData, "summary"),
    bullets: extractField(formData, "bullets"),
    sortOrder: extractField(formData, "sortOrder") || 0
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Моля, коригирай отбелязаните полета.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  try {
    const store = await readStore();
    const payload = {
      company: parsed.data.company,
      role: parsed.data.role,
      location: parsed.data.location,
      period: parsed.data.period,
      summary: parsed.data.summary,
      bullets: splitLines(parsed.data.bullets),
      sortOrder: parsed.data.sortOrder
    };

    if (parsed.data.id) {
      store.experience = store.experience.map((item) =>
        item.id === parsed.data.id ? { ...item, ...payload } : item
      );
    } else {
      store.experience.push({
        id: makeId("experience"),
        ...payload
      });
    }

    await writeStore(store);
  } catch (error) {
    console.error("Save experience error:", error);
    return {
      status: "error",
      message: "Не успях да запиша опита."
    };
  }

  revalidatePortfolioPaths();
  redirect("/admin/experience?status=saved");
}

export async function deleteExperienceAction(formData: FormData) {
  await requireAdmin();

  const id = extractField(formData, "id");
  if (!id) {
    redirect("/admin/experience?status=error");
  }

  try {
    const store = await readStore();
    store.experience = store.experience.filter((item) => item.id !== id);
    await writeStore(store);
  } catch (error) {
    console.error("Delete experience error:", error);
    redirect("/admin/experience?status=error");
  }

  revalidatePortfolioPaths();
  redirect("/admin/experience?status=deleted");
}

export async function saveEducationAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireAdmin();

  const parsed = educationFormSchema.safeParse({
    id: extractField(formData, "id") || undefined,
    institution: extractField(formData, "institution"),
    degree: extractField(formData, "degree"),
    period: extractField(formData, "period"),
    description: extractField(formData, "description"),
    sortOrder: extractField(formData, "sortOrder") || 0
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Моля, коригирай отбелязаните полета.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  try {
    const store = await readStore();
    const payload = {
      institution: parsed.data.institution,
      degree: parsed.data.degree,
      period: parsed.data.period,
      description: parsed.data.description,
      sortOrder: parsed.data.sortOrder
    };

    if (parsed.data.id) {
      store.education = store.education.map((item) =>
        item.id === parsed.data.id ? { ...item, ...payload } : item
      );
    } else {
      store.education.push({
        id: makeId("education"),
        ...payload
      });
    }

    await writeStore(store);
  } catch (error) {
    console.error("Save education error:", error);
    return {
      status: "error",
      message: "Не успях да запиша образованието."
    };
  }

  revalidatePortfolioPaths();
  redirect("/admin/education?status=saved");
}

export async function deleteEducationAction(formData: FormData) {
  await requireAdmin();

  const id = extractField(formData, "id");
  if (!id) {
    redirect("/admin/education?status=error");
  }

  try {
    const store = await readStore();
    store.education = store.education.filter((item) => item.id !== id);
    await writeStore(store);
  } catch (error) {
    console.error("Delete education error:", error);
    redirect("/admin/education?status=error");
  }

  revalidatePortfolioPaths();
  redirect("/admin/education?status=deleted");
}

export async function saveCertificationAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireAdmin();

  const parsed = certificationFormSchema.safeParse({
    id: extractField(formData, "id") || undefined,
    title: extractField(formData, "title"),
    issuer: extractField(formData, "issuer"),
    year: extractField(formData, "year"),
    href: extractField(formData, "href"),
    sortOrder: extractField(formData, "sortOrder") || 0
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Моля, коригирай отбелязаните полета.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  try {
    const store = await readStore();
    const payload = {
      title: parsed.data.title,
      issuer: parsed.data.issuer,
      year: parsed.data.year,
      href: parsed.data.href || undefined,
      sortOrder: parsed.data.sortOrder
    };

    if (parsed.data.id) {
      store.certifications = store.certifications.map((item) =>
        item.id === parsed.data.id ? { ...item, ...payload } : item
      );
    } else {
      store.certifications.push({
        id: makeId("certification"),
        ...payload
      });
    }

    await writeStore(store);
  } catch (error) {
    console.error("Save certification error:", error);
    return {
      status: "error",
      message: "Не успях да запиша сертификата."
    };
  }

  revalidatePortfolioPaths();
  redirect("/admin/education?status=saved");
}

export async function deleteCertificationAction(formData: FormData) {
  await requireAdmin();

  const id = extractField(formData, "id");
  if (!id) {
    redirect("/admin/education?status=error");
  }

  try {
    const store = await readStore();
    store.certifications = store.certifications.filter((item) => item.id !== id);
    await writeStore(store);
  } catch (error) {
    console.error("Delete certification error:", error);
    redirect("/admin/education?status=error");
  }

  revalidatePortfolioPaths();
  redirect("/admin/education?status=deleted");
}
