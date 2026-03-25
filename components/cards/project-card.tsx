import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "surface card-hover overflow-hidden",
        compact ? "h-full" : "grid gap-0 lg:grid-cols-[1.1fr_0.9fr]"
      )}
    >
      <div className={cn("relative min-h-[260px] overflow-hidden", compact && "min-h-[220px]")}>
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          sizes={compact ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 60vw"}
          unoptimized
        />
      </div>

      <div className="flex flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.25em] text-amber">
              {project.category}
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
              {project.year}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
          <p className="mt-4 text-sm text-slate-300">{project.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={`/portfolio/${project.slug}` as Route}
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primaryGlow"
        >
          Виж проекта <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
