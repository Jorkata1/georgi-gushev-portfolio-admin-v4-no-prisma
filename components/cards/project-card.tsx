"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Route } from "next";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

// Blur placeholder — 1x1 dark slate pixel, avoids layout shift and gives a
// graceful fade-in while Next.js streams the optimized image.
const BLUR_DATA_URL =
  "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  if (compact) {
    return (
      <Link href={`/portfolio/${project.slug}` as Route}>
        <motion.article
          className="group surface relative overflow-hidden"
          whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } }}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.25em] text-accent">
                  {project.category}
                </span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                  {project.year}
                </span>
              </div>

              <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                {project.title}
              </h3>

              <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3">
                {project.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/80 backdrop-blur-sm"
                  >
                    {tool}
                  </span>
                ))}
                {project.tools.length > 3 && (
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/80 backdrop-blur-sm">
                    +{project.tools.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:bg-accent/90 group-hover:text-slate-950">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  return (
    <motion.article
      className="surface overflow-hidden grid gap-0 lg:grid-cols-[1.1fr_0.9fr]"
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } }}
    >
      <div className="group relative min-h-[200px] overflow-hidden sm:min-h-[300px]">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 720px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-col justify-between p-5 sm:p-9">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.25em] text-accent">
              {project.category}
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
              {project.year}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-semibold text-white sm:mt-4 sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:mt-4 sm:text-sm">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-300 sm:px-3 sm:py-1 sm:text-xs"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={`/portfolio/${project.slug}` as Route}
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accentGlow sm:mt-8"
        >
          Виж проекта
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </Link>
      </div>
    </motion.article>
  );
}