"use client";

import Link from "next/link";
import { useRef, useState, type ChangeEvent } from "react";
import { useFormState } from "react-dom";
import { saveProjectAction } from "@/app/admin/actions";
import { initialAdminFormState } from "@/app/admin/form-state";
import { AdminField } from "@/components/admin/form-field";
import { SubmitButton } from "@/components/admin/submit-button";
import { projectCategories, type Project } from "@/types";

type ProjectFormProps = {
  project?: Project | null;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const [state, formAction] = useFormState(saveProjectAction, initialAdminFormState);
  const isEdit = Boolean(project);

  const fieldErrors = state?.fieldErrors ?? {};
  const message = state?.message;

  const heroFileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);

  const [heroImageValue, setHeroImageValue] = useState(project?.heroImage ?? "");
  const [heroPreview, setHeroPreview] = useState<string | null>(null);

  const [galleryValue, setGalleryValue] = useState<string[]>(project?.gallery ?? []);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

  function handleHeroImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setHeroPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setHeroPreview(objectUrl);
  }

  function handleGalleryImagesChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      setGalleryPreview([]);
      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreview(previews);
  }

  function handleRemoveHeroImage() {
    setHeroPreview(null);
    setHeroImageValue("");

    if (heroFileInputRef.current) {
      heroFileInputRef.current.value = "";
    }
  }

  function handleRemoveGalleryImage(indexToRemove: number) {
    setGalleryValue((current) => current.filter((_, index) => index !== indexToRemove));
  }

  function handleClearSelectedGalleryFiles() {
    setGalleryPreview([]);

    if (galleryFileInputRef.current) {
      galleryFileInputRef.current.value = "";
    }
  }

  const displayedHeroImage = heroPreview || heroImageValue;

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-8">
      {project?.id ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField
          label="Заглавие"
          name="title"
          defaultValue={project?.title}
          error={fieldErrors.title?.[0]}
        />
        <AdminField
          label="Кратко заглавие"
          name="shortTitle"
          defaultValue={project?.shortTitle}
          error={fieldErrors.shortTitle?.[0]}
        />
        <AdminField
          label="Slug"
          name="slug"
          defaultValue={project?.slug}
          error={fieldErrors.slug?.[0]}
          placeholder="пример: my-awesome-project"
        />
        <AdminField
          label="Година"
          name="year"
          defaultValue={project?.year}
          error={fieldErrors.year?.[0]}
          placeholder="2025"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Категория
          </label>
          <select
            id="category"
            name="category"
            defaultValue={project?.category ?? projectCategories[0]}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-primary/40"
          >
            {projectCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {fieldErrors.category?.[0] ? (
            <p className="mt-2 text-sm text-rose-300">{fieldErrors.category[0]}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="heroImage"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Hero image URL
          </label>
          <input
            id="heroImage"
            name="heroImage"
            type="text"
            value={heroImageValue}
            onChange={(event) => setHeroImageValue(event.target.value)}
            placeholder="https://... или /projects/project-1.svg"
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-primary/40"
          />
          {fieldErrors.heroImage?.[0] ? (
            <p className="mt-2 text-sm text-rose-300">{fieldErrors.heroImage[0]}</p>
          ) : null}
          <p className="mt-2 text-sm text-slate-400">
            Можеш да оставиш URL или да качиш ново hero изображение от полето отдолу.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="heroImageFile"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Качи hero изображение
          </label>
          <input
            ref={heroFileInputRef}
            id="heroImageFile"
            name="heroImageFile"
            type="file"
            accept="image/*"
            onChange={handleHeroImageChange}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
          />
          <p className="mt-2 text-sm text-slate-400">
            Ако качиш файл, той ще замени URL стойността за hero изображението.
          </p>
        </div>

        <div>
          <label
            htmlFor="galleryImageFiles"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Качи gallery изображения
          </label>
          <input
            ref={galleryFileInputRef}
            id="galleryImageFiles"
            name="galleryImageFiles"
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryImagesChange}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
          />
          <p className="mt-2 text-sm text-slate-400">
            Можеш да избереш няколко файла наведнъж. Качените изображения се
            добавят към галерията.
          </p>
        </div>
      </div>

      {displayedHeroImage ? (
        <div className="surface p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-slate-200">Hero preview</p>
            <button
              type="button"
              onClick={handleRemoveHeroImage}
              className="rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-400/15"
            >
              Delete
            </button>
          </div>

          <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5">
            <img
              src={displayedHeroImage}
              alt="Hero preview"
              className="h-64 w-full object-cover"
            />
          </div>
          <p className="mt-3 break-all text-xs text-slate-400">{displayedHeroImage}</p>
        </div>
      ) : null}

      <AdminField
        label="Live сайт URL (незадължително)"
        name="liveUrl"
        defaultValue={project?.liveUrl ?? ""}
        placeholder="https://example.com"
      />

      <AdminField
        label="Кратък excerpt"
        name="excerpt"
        defaultValue={project?.excerpt}
        error={fieldErrors.excerpt?.[0]}
        textarea
        rows={3}
      />

      <AdminField
        label="Summary"
        name="summary"
        defaultValue={project?.summary}
        error={fieldErrors.summary?.[0]}
        textarea
        rows={4}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField
          label="Инструменти (по един на ред)"
          name="tools"
          defaultValue={project?.tools.join("\n")}
          error={fieldErrors.tools?.[0]}
          textarea
          rows={6}
        />

        <div>
          <label
            htmlFor="gallery"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Gallery images (по един URL на ред)
          </label>
          <textarea
            id="gallery"
            name="gallery"
            value={galleryValue.join("\n")}
            onChange={(event) =>
              setGalleryValue(
                event.target.value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter(Boolean)
              )
            }
            rows={6}
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-primary/40"
          />
          {fieldErrors.gallery?.[0] ? (
            <p className="mt-2 text-sm text-rose-300">{fieldErrors.gallery[0]}</p>
          ) : null}
          <p className="mt-2 text-sm text-slate-400">
            Можеш да комбинираш URL адреси и качени файлове.
          </p>
        </div>
      </div>

      {galleryValue.length > 0 ? (
        <div className="surface p-5">
          <p className="mb-4 text-sm font-medium text-slate-200">
            Текущи gallery изображения
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {galleryValue.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5"
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="h-44 w-full object-cover"
                />
                <div className="space-y-3 px-3 py-3">
                  <p className="break-all text-xs text-slate-400">{image}</p>
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryImage(index)}
                    className="rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-400/15"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {galleryPreview.length > 0 ? (
        <div className="surface p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-slate-200">
              Новоизбрани gallery изображения
            </p>
            <button
              type="button"
              onClick={handleClearSelectedGalleryFiles}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              Изчисти избраните
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {galleryPreview.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5"
              >
                <img
                  src={image}
                  alt={`New gallery preview ${index + 1}`}
                  className="h-44 w-full object-cover"
                />
                <p className="px-3 py-3 text-xs text-slate-400">
                  Ще бъде добавено при запис.
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-3">
        <AdminField
          label="Цели (по една на ред)"
          name="goals"
          defaultValue={project?.goals.join("\n")}
          error={fieldErrors.goals?.[0]}
          textarea
          rows={7}
        />
        <AdminField
          label="Процес (по една стъпка на ред)"
          name="process"
          defaultValue={project?.process.join("\n")}
          error={fieldErrors.process?.[0]}
          textarea
          rows={7}
        />
        <AdminField
          label="Резултати (по един на ред)"
          name="outcome"
          defaultValue={project?.outcome.join("\n")}
          error={fieldErrors.outcome?.[0]}
          textarea
          rows={7}
        />
      </div>

      <label className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
          className="h-4 w-4 rounded border-white/20 bg-transparent"
        />
        Показвай проекта в Home като featured
      </label>

      {message ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4">
        <SubmitButton
          idleText={isEdit ? "Запази промените" : "Създай проект"}
          pendingText="Записване..."
        />
        <Link
          href="/admin/projects"
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
        >
          Отказ
        </Link>
      </div>
    </form>
  );
}