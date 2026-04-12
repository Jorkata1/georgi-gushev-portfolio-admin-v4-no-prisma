"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  requireAdmin,
  verifyAdminCredentials
} from "@/lib/admin-auth";
import { makeId } from "@/lib/content-store";
import { parseLanguageLines } from "@/lib/content-utils";
import { joinLines, splitLines } from "@/lib/project-helpers";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { uploadProjectImage } from "@/lib/supabase/storage";
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

function revalidatePortfolioPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/about");
  revalidatePath("/experience");
  revalidatePath("/education");
  revalidatePath("/contact");
  revalidatePath("/admin");
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

  const slugBase =
    extractField(formData, "slug") || extractField(formData, "shortTitle") || "project";

  const heroUpload = formData.get("heroImageFile");
  const galleryUploads = formData.getAll("galleryImageFiles");

  const uploadedHeroImage =
    heroUpload instanceof File && heroUpload.size > 0
      ? await uploadProjectImage(heroUpload, slugBase)
      : "";

  const uploadedGalleryImages = await Promise.all(
    galleryUploads
      .filter((item): item is File => item instanceof File && item.size > 0)
      .map((file, index) => uploadProjectImage(file, `${slugBase}-gallery-${index + 1}`))
  );

  const galleryLines = [
    ...splitLines(extractField(formData, "gallery")),
    ...uploadedGalleryImages
  ];

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
    const supabase = createSupabaseAdminClient();

    const { data: duplicateSlugRows, error: duplicateSlugError } = await supabase
      .from("portfolio_projects")
      .select("id, slug")
      .eq("slug", parsed.data.slug);

    if (duplicateSlugError) {
      throw duplicateSlugError;
    }

    const existingSlug = (duplicateSlugRows ?? []).find(
      (project) => project.id !== parsed.data.id
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
    const id = parsed.data.id ?? makeId("project");

    const payload = {
      id,
      slug: parsed.data.slug,
      title: parsed.data.title,
      short_title: parsed.data.shortTitle,
      excerpt: parsed.data.excerpt,
      summary: parsed.data.summary,
      category: parsed.data.category,
      year: parsed.data.year,
      featured: parsed.data.featured,
      hero_image: parsed.data.heroImage,
      tools: splitLines(parsed.data.tools),
      gallery: splitLines(parsed.data.gallery),
      goals: splitLines(parsed.data.goals),
      process: splitLines(parsed.data.process),
      outcome: splitLines(parsed.data.outcome),
      updated_at: now
    };

    if (parsed.data.id) {
      const { error } = await supabase
        .from("portfolio_projects")
        .update(payload)
        .eq("id", parsed.data.id);

      if (error) throw error;
    } else {
      const { error } = await supabase.from("portfolio_projects").insert({
        ...payload,
        created_at: now
      });

      if (error) throw error;
    }
  } catch (error) {
    console.error("Save project error:", error);
    return {
      status: "error",
      message: "Проектът не можа да бъде записан."
    };
  }

revalidatePortfolioPaths(parsed.data.slug);

if (parsed.data.id) {
  revalidatePath(`/admin/projects/${parsed.data.id}/edit`);
}

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
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("portfolio_projects").delete().eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Delete project error:", error);
    redirect("/admin/projects?status=error");
  }

  revalidatePortfolioPaths(slug);
  redirect("/admin/projects?status=deleted");
}

export async function toggleFeaturedProjectAction(formData: FormData) {
  await requireAdmin();

  const id = extractField(formData, "id");
  const slug = extractField(formData, "slug");
  const currentFeatured = extractField(formData, "featured") === "true";

  if (!id) {
    redirect("/admin/projects?status=error");
  }

  try {
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase
      .from("portfolio_projects")
      .update({
        featured: !currentFeatured,
        updated_at: new Date().toISOString()
      })
      .eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Toggle featured project error:", error);
    redirect("/admin/projects?status=error");
  }

  revalidatePortfolioPaths(slug);
  redirect("/admin/projects?status=toggled");
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
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase.from("about_content").upsert(
      {
        id: 1,
        hero_title: parsed.data.heroTitle,
        hero_description: parsed.data.heroDescription,
        profile_title: parsed.data.profileTitle,
        profile_paragraphs: splitLines(parsed.data.profileText),
        work_title: parsed.data.workTitle,
        work_paragraphs: splitLines(parsed.data.workText),
        strengths: splitLines(parsed.data.strengths),
        languages: parseLanguageLines(parsed.data.languages),
        updated_at: new Date().toISOString()
      },
      { onConflict: "id" }
    );

    if (error) throw error;
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
    const supabase = createSupabaseAdminClient();
    const id = parsed.data.id ?? makeId("experience");

    const { error } = await supabase.from("experience_entries").upsert(
      {
        id,
        company: parsed.data.company,
        role: parsed.data.role,
        location: parsed.data.location,
        period: parsed.data.period,
        summary: parsed.data.summary,
        bullets: splitLines(parsed.data.bullets),
        sort_order: Number(parsed.data.sortOrder) || 0,
        updated_at: new Date().toISOString()
      },
      { onConflict: "id" }
    );

    if (error) throw error;
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
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("experience_entries").delete().eq("id", id);

    if (error) throw error;
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
    const supabase = createSupabaseAdminClient();
    const id = parsed.data.id ?? makeId("education");

    const { error } = await supabase.from("education_entries").upsert(
      {
        id,
        institution: parsed.data.institution,
        degree: parsed.data.degree,
        period: parsed.data.period,
        description: parsed.data.description,
        sort_order: Number(parsed.data.sortOrder) || 0,
        updated_at: new Date().toISOString()
      },
      { onConflict: "id" }
    );

    if (error) throw error;
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
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("education_entries").delete().eq("id", id);

    if (error) throw error;
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
    const supabase = createSupabaseAdminClient();
    const id = parsed.data.id ?? makeId("certification");

    const { error } = await supabase.from("certification_entries").upsert(
      {
        id,
        title: parsed.data.title,
        issuer: parsed.data.issuer,
        year: parsed.data.year,
        href: parsed.data.href || null,
        sort_order: Number(parsed.data.sortOrder) || 0,
        updated_at: new Date().toISOString()
      },
      { onConflict: "id" }
    );

    if (error) throw error;
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
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from("certification_entries")
      .delete()
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Delete certification error:", error);
    redirect("/admin/education?status=error");
  }

  revalidatePortfolioPaths();
  redirect("/admin/education?status=deleted");
}