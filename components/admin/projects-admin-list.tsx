"use client";

import type { Route } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import { deleteProjectAction, toggleFeaturedProjectAction } from "@/app/admin/actions";
import type { Project } from "@/types";

type ProjectsAdminListProps = {
  projects: Project[];
};

export function ProjectsAdminList({ projects }: ProjectsAdminListProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(projects.map((project) => project.category))),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        query.trim().length === 0 ||
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.shortTitle.toLowerCase().includes(query.toLowerCase()) ||
        project.slug.toLowerCase().includes(query.toLowerCase());

      const matchesCategory = category === "all" || project.category === category;

      const matchesFeatured =
        featuredFilter === "all" ||
        (featuredFilter === "featured" && project.featured) ||
        (featuredFilter === "standard" && !project.featured);

      return matchesQuery && matchesCategory && matchesFeatured;
    });
  }, [projects, query, category, featuredFilter]);

  const featuredCount = projects.filter((project) => project.featured).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="surface p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Общо проекти
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{projects.length}</p>
        </div>

        <div className="surface p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Featured
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{featuredCount}</p>
        </div>

        <div className="surface p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Категории
          </p>
          <p className="mt-3 text-3xl font-semibold text-white">{categories.length}</p>
        </div>
      </div>

      <div className="surface p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <label
              htmlFor="project-search"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Търсене
            </label>
            <input
              id="project-search"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Търси по заглавие, slug или кратко заглавие"
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-primary/40"
            />
          </div>

          <div>
            <label
              htmlFor="project-category-filter"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Категория
            </label>
            <select
              id="project-category-filter"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-primary/40"
            >
              <option value="all">Всички</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="project-featured-filter"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Featured статус
            </label>
            <select
              id="project-featured-filter"
              value={featuredFilter}
              onChange={(event) => setFeaturedFilter(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-primary/40"
            >
              <option value="all">Всички</option>
              <option value="featured">Само featured</option>
              <option value="standard">Само стандартни</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        {filteredProjects.length === 0 ? (
          <div className="surface p-8 text-sm text-slate-300">
            Няма проекти, които отговарят на текущите филтри.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <article
              key={project.id}
              className="surface flex flex-col gap-5 p-6 xl:flex-row xl:items-start xl:justify-between"
            >
              <div className="flex min-w-0 flex-1 gap-5">
                <div className="hidden h-28 w-40 shrink-0 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5 md:block">
                  {project.heroImage ? (
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.18em] text-slate-500">
                      No image
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold text-white">{project.title}</h2>

                    {project.featured ? (
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primaryGlow">
                        Featured
                      </span>
                    ) : (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                        Standard
                      </span>
                    )}
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm text-slate-300">
                    {project.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                    <span>/{project.slug}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 xl:justify-end">
                <Link
                  href={`/portfolio/${project.slug}` as Route}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Преглед
                </Link>

                <Link
  href={`/admin/projects/${project.id}/edit`}
  prefetch={false}
  className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
>
  Редакция
</Link>

                <form action={toggleFeaturedProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="slug" value={project.slug} />
                  <input
                    type="hidden"
                    name="featured"
                    value={project.featured ? "true" : "false"}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primaryGlow transition hover:bg-primary/15"
                  >
                    {project.featured ? "Махни featured" : "Направи featured"}
                  </button>
                </form>

                <form action={deleteProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <input type="hidden" name="slug" value={project.slug} />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-400/15"
                  >
                    Изтрий
                  </button>
                </form>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}