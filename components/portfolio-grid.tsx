"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/cards/project-card";
import { cn } from "@/lib/utils";

type PortfolioGridProps = {
  projects: Project[];
  categories: readonly string[];
};

export function PortfolioGrid({ projects, categories }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Всички");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Всички") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              activeCategory === category
                ? "border-primary/30 bg-primary/10 text-primaryGlow"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-primary/30 hover:text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} compact />
        ))}
      </div>
    </div>
  );
}
