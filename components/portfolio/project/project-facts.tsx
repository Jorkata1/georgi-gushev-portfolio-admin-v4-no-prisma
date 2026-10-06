"use client";

import { motion } from "framer-motion";
import { ExternalLink, MonitorPlay } from "lucide-react";
import type { ReactNode } from "react";
import type { Project } from "@/types";
import { FontPreview } from "./font-preview";
import { EASE_OUT } from "./motion-presets";

export interface ProjectFactsLabels {
  category: string;
  year: string;
  tools: string;
  colourPalette: string;
  typography: string;
  viewLive: string;
  livePreview: string;
}

interface ProjectFactsProps {
  project: Project;
  labels: ProjectFactsLabels;
  onOpenPreview: () => void;
}

function FactGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 border-t border-white/6 pt-4 first:border-t-0 first:pt-0">
      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</span>
      {children}
    </div>
  );
}

export function ProjectFacts({ project, labels, onOpenPreview }: ProjectFactsProps) {
  const colors = (project.colors ?? []).map((hex) => hex.trim()).filter(Boolean);
  const fonts = (project.fonts ?? []).map((entry) => {
    const [name, role] = entry.split("—").map((part) => part.trim());
    return { name, role };
  });

  return (
    <motion.aside
      className="surface flex flex-col gap-4 p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      <div className="grid grid-cols-2 gap-4">
        <FactGroup label={labels.category}>
          <span className="text-sm font-medium text-white">{project.category}</span>
        </FactGroup>
        <FactGroup label={labels.year}>
          <span className="text-sm font-medium text-white">{project.year}</span>
        </FactGroup>
      </div>

      {project.tools.length > 0 && (
        <FactGroup label={labels.tools}>
          <ul className="flex flex-wrap gap-1.5">
            {project.tools.map((tool) => (
              <li key={tool} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                {tool}
              </li>
            ))}
          </ul>
        </FactGroup>
      )}

      {colors.length > 0 && (
        <FactGroup label={labels.colourPalette}>
          <ul className="flex flex-wrap gap-2.5">
            {colors.map((hex) => (
              <li key={hex} className="flex flex-col items-center gap-1">
                <span className="h-9 w-9 rounded-full border border-white/15 shadow-md" style={{ backgroundColor: hex }} />
                <span className="font-mono text-[9px] uppercase text-slate-500">{hex}</span>
              </li>
            ))}
          </ul>
        </FactGroup>
      )}

      {fonts.length > 0 && (
        <FactGroup label={labels.typography}>
          <ul className="flex flex-col gap-2">
            {fonts.map(({ name, role }) => (
              <li key={name} className="flex items-baseline justify-between gap-3">
                <FontPreview name={name} />
                {role && <span className="text-right text-xs text-slate-500">{role}</span>}
              </li>
            ))}
          </ul>
        </FactGroup>
      )}

      {project.liveUrl && (
        <div className="flex flex-col gap-2 border-t border-white/6 pt-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-background transition duration-150 hover:-translate-y-px hover:brightness-110 active:translate-y-0"
          >
            <ExternalLink size={14} />
            {labels.viewLive}
          </a>
          <button
            type="button"
            onClick={onOpenPreview}
            className="hidden h-11 items-center justify-center gap-2 rounded-full border border-white/12 text-sm font-semibold text-slate-200 transition hover:border-accent/40 hover:text-white lg:inline-flex"
          >
            <MonitorPlay size={15} />
            {labels.livePreview}
          </button>
        </div>
      )}
    </motion.aside>
  );
}
