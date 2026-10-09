import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gauge } from "lucide-react";
import type { Project } from "@/types";
import type { StoryFinaleCopy } from "@/components/home/story/story-copy";
import { HEADING_FONT_STYLE, PRIMARY_LINK_CLASS, SECONDARY_LINK_CLASS } from "@/components/home/story/story-ui";

const MAX_FINALE_PROJECTS = 3;
const SITE_CHECK_URL = "https://check.gdxstudio.com";
const BLUR_DATA_URL = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";

type StoryFinaleProps = {
  copy: StoryFinaleCopy;
  projects: Project[];
};

function FinaleProjectCard({ project, viewLabel }: { project: Project; viewLabel: string }) {
  return (
    <li className="w-[78%] shrink-0 snap-start sm:w-auto">
      <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 [&:has(a:focus-visible)]:ring-2 [&:has(a:focus-visible)]:ring-accent/70">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.heroImage}
            alt=""
            fill
            sizes="(max-width: 640px) 78vw, (max-width: 1280px) 33vw, 400px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>
        <div className="flex items-start justify-between gap-3 p-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{project.category}</p>
            <h3 className="mt-1.5 truncate text-lg font-semibold text-white" style={HEADING_FONT_STYLE}>
              <Link
                href={`/portfolio/${project.slug}`}
                aria-label={`${viewLabel}: ${project.title}`}
                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
              >
                {project.title}
              </Link>
            </h3>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/30 text-accentGlow transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight size={14} />
          </span>
        </div>
      </article>
    </li>
  );
}

/** Closing screen: real projects as proof, then the actions a visitor can take. */
export function StoryFinale({ copy, projects }: StoryFinaleProps) {
  const visibleProjects = projects.slice(0, MAX_FINALE_PROJECTS);

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="max-w-2xl">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] text-white sm:text-5xl" style={HEADING_FONT_STYLE}>
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-lg">{copy.text}</p>
      </div>

      {visibleProjects.length > 0 && (
        <ul
          aria-label={copy.projectsLabel}
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {visibleProjects.map((project) => (
            <FinaleProjectCard key={project.id} project={project} viewLabel={copy.viewProject} />
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Link href="/contact" className={PRIMARY_LINK_CLASS}>
          {copy.inquiry}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link href="/portfolio" className={SECONDARY_LINK_CLASS}>
          {copy.allProjects}
        </Link>
        <a href={SITE_CHECK_URL} className={SECONDARY_LINK_CLASS}>
          <Gauge size={18} className="text-accent" aria-hidden="true" />
          {copy.siteCheck}
        </a>
      </div>
    </div>
  );
}