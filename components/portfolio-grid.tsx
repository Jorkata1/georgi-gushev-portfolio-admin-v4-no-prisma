"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "relative rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
              activeCategory === category
                ? "border-accent/30 bg-accent/10 text-accentGlow"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-accent/20 hover:text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        className="grid gap-8 lg:grid-cols-2"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ProjectCard project={project} compact />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="surface py-16 text-center">
          <p className="text-slate-400">Няма проекти в тази категория.</p>
        </div>
      )}
    </div>
  );
}