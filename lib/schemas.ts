import { z } from "zod";
import { projectCategories } from "@/types";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Името трябва да съдържа поне 2 символа.")
    .max(80, "Името е твърде дълго."),
  email: z.string().email("Моля, въведи валиден имейл адрес."),
  message: z
    .string()
    .min(10, "Съобщението трябва да съдържа поне 10 символа.")
    .max(2000, "Съобщението е твърде дълго.")
});

export const adminLoginSchema = z.object({
  username: z.string().min(3, "Въведи потребителско име."),
  password: z.string().min(4, "Въведи парола.")
});

export const projectFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Заглавието трябва да е поне 2 символа."),
  shortTitle: z.string().min(2, "Краткото заглавие е задължително."),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug трябва да е с малки букви, цифри и тирета."),
  excerpt: z.string().min(12, "Добави по-кратко описание."),
  summary: z.string().min(20, "Summary трябва да е поне 20 символа."),
  category: z.enum(projectCategories, {
    errorMap: () => ({ message: "Избери валидна категория." })
  }),
  year: z.string().regex(/^\d{4}$/, "Използвай формат YYYY."),
  featured: z.boolean(),
  heroImage: z.string().min(1, "Hero image е задължително."),
  tools: z.string().min(2, "Добави поне един инструмент."),
  gallery: z.string().min(2, "Добави поне един gallery image URL или upload."),
  goals: z.string().min(2, "Добави поне една цел."),
  process: z.string().min(2, "Добави поне една стъпка от процеса."),
  outcome: z.string().min(2, "Добави поне един резултат.")
});

export const aboutFormSchema = z.object({
  heroTitle: z.string().min(10, "Добави по-силно hero заглавие."),
  heroDescription: z.string().min(20, "Hero описанието трябва да е по-подробно."),
  profileTitle: z.string().min(6, "Заглавието на профила е задължително."),
  profileText: z.string().min(20, "Добави поне един абзац за професионалния профил."),
  workTitle: z.string().min(6, "Заглавието за начина на работа е задължително."),
  workText: z.string().min(20, "Добави съдържание за начина на работа."),
  strengths: z.string().min(2, "Добави поне една силна страна."),
  languages: z.string().min(2, "Добави поне един език.")
});

export const experienceFormSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(2, "Компанията е задължителна."),
  role: z.string().min(2, "Ролята е задължителна."),
  location: z.string().min(2, "Локацията е задължителна."),
  period: z.string().min(2, "Периодът е задължителен."),
  summary: z.string().min(20, "Добави по-пълен summary."),
  bullets: z.string().min(2, "Добави поне една точка."),
  sortOrder: z.coerce.number().int().min(0, "Sort order трябва да е положително число.")
});

export const educationFormSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(2, "Институцията е задължителна."),
  degree: z.string().min(2, "Степента/ролята е задължителна."),
  period: z.string().min(2, "Периодът е задължителен."),
  description: z.string().min(10, "Добави описание."),
  sortOrder: z.coerce.number().int().min(0, "Sort order трябва да е положително число.")
});

export const certificationFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Заглавието е задължително."),
  issuer: z.string().min(2, "Източникът/издателят е задължителен."),
  year: z.string().regex(/^\d{4}$/, "Използвай формат YYYY."),
  href: z.union([z.literal(""), z.string().url("Въведи валиден URL адрес.")]).optional(),
  sortOrder: z.coerce.number().int().min(0, "Sort order трябва да е положително число.")
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type AdminLoginValues = z.infer<typeof adminLoginSchema>;
export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type AboutFormValues = z.infer<typeof aboutFormSchema>;
export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;
export type EducationFormValues = z.infer<typeof educationFormSchema>;
export type CertificationFormValues = z.infer<typeof certificationFormSchema>;
