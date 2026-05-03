"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/types";
import { BentoProjectCard } from "@/components/cards/bento-project-card";
import { cn } from "@/lib/utils";

type BentoPortfolioGridProps = {
  projects: Project[];
  categories: readonly string[];
};

// categories[0] е винаги "Всички" / "All" — идва от getProjectCategories
function getBentoSize(index: number): "featured" | "wide" | "small" {
  const pos = index % 5;
  if (pos === 0) return "featured";
  if (pos === 3) return "wide";
  return "small";
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

export function BentoPortfolioGrid({ projects, categories }: BentoPortfolioGridProps) {
  // Ползваме първия елемент от categories като "all" sentinel
  const allLabel = categories[0] ?? "Всички";
  const [activeCategory, setActiveCategory] = useState<string>(allLabel);

  const filteredProjects = useMemo(() => {
    if (activeCategory === allLabel) return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects, allLabel]);

  const showFilters = projects.length > 4;

  return (
    <div className="space-y-10">
      {showFilters && (
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </motion.div>
      )}

      <motion.div
        key={activeCategory}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filteredProjects.map((project, index) => (
          <BentoProjectCard
            key={project.id}
            project={project}
            size={getBentoSize(index)}
            index={index}
          />
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div
          className="surface py-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-slate-400">Няма проекти в тази категория.</p>
        </motion.div>
      )}
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm",
        active
          ? "border-accent/40 bg-accent/10 text-accentGlow shadow-[0_0_18px_rgba(232,164,74,0.15)]"
          : "border-white/10 bg-white/5 text-slate-400 hover:border-accent/20 hover:text-white"
      )}
      whileTap={{ scale: 0.97 }}
    >
      {active && (
        <motion.span
          layoutId="filter-pill"
          className="absolute inset-0 rounded-full bg-accent/8"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative">{label}</span>
    </motion.button>
  );
}