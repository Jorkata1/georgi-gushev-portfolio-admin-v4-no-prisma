"use client";

import Link from "next/link";
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

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-8">
      {project?.id ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField
          label="Заглавие"
          name="title"
          defaultValue={project?.title}
          error={state.fieldErrors?.title?.[0]}
        />
        <AdminField
          label="Кратко заглавие"
          name="shortTitle"
          defaultValue={project?.shortTitle}
          error={state.fieldErrors?.shortTitle?.[0]}
        />
        <AdminField
          label="Slug"
          name="slug"
          defaultValue={project?.slug}
          error={state.fieldErrors?.slug?.[0]}
          placeholder="пример: my-awesome-project"
        />
        <AdminField
          label="Година"
          name="year"
          defaultValue={project?.year}
          error={state.fieldErrors?.year?.[0]}
          placeholder="2025"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-200">
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
          {state.fieldErrors?.category?.[0] ? (
            <p className="mt-2 text-sm text-rose-300">{state.fieldErrors.category[0]}</p>
          ) : null}
        </div>

        <AdminField
          label="Hero image URL"
          name="heroImage"
          defaultValue={project?.heroImage}
          error={state.fieldErrors?.heroImage?.[0]}
          placeholder="/projects/project-1.svg"
          hint="Можеш да оставиш URL или да качиш ново hero изображение от полето отдолу."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField
          label="Качи hero изображение"
          name="heroImageFile"
          type="file"
          accept="image/*"
          hint="Ако качиш файл, той ще замени URL стойността за hero изображението."
        />
        <AdminField
          label="Качи gallery изображения"
          name="galleryImageFiles"
          type="file"
          accept="image/*"
          multiple
          hint="Можеш да избереш няколко файла наведнъж. Качените изображения се добавят към списъка отдолу."
        />
      </div>

      <AdminField
        label="Кратък excerpt"
        name="excerpt"
        defaultValue={project?.excerpt}
        error={state.fieldErrors?.excerpt?.[0]}
        textarea
        rows={3}
      />

      <AdminField
        label="Summary"
        name="summary"
        defaultValue={project?.summary}
        error={state.fieldErrors?.summary?.[0]}
        textarea
        rows={4}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <AdminField
          label="Инструменти (по един на ред)"
          name="tools"
          defaultValue={project?.tools.join("\n")}
          error={state.fieldErrors?.tools?.[0]}
          textarea
          rows={6}
        />
        <AdminField
          label="Gallery images (по един URL на ред)"
          name="gallery"
          defaultValue={project?.gallery.join("\n")}
          error={state.fieldErrors?.gallery?.[0]}
          textarea
          rows={6}
          hint="Можеш да комбинираш URL адреси и качени файлове."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <AdminField
          label="Цели (по една на ред)"
          name="goals"
          defaultValue={project?.goals.join("\n")}
          error={state.fieldErrors?.goals?.[0]}
          textarea
          rows={7}
        />
        <AdminField
          label="Процес (по една стъпка на ред)"
          name="process"
          defaultValue={project?.process.join("\n")}
          error={state.fieldErrors?.process?.[0]}
          textarea
          rows={7}
        />
        <AdminField
          label="Резултати (по един на ред)"
          name="outcome"
          defaultValue={project?.outcome.join("\n")}
          error={state.fieldErrors?.outcome?.[0]}
          textarea
          rows={7}
        />
      </div>

      {project?.heroImage ? (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          Текущо hero изображение: <span className="font-medium text-white">{project.heroImage}</span>
        </div>
      ) : null}

      <label className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
          className="h-4 w-4 rounded border-white/20 bg-transparent"
        />
        Показвай проекта в Home като featured
      </label>

      {state.message ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {state.message}
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
