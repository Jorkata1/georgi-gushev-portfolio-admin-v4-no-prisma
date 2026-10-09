"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ProjectCard } from "@/components/cards/project-card";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/data/translations";
import type { Project } from "@/types";

/** Below this width cards are often taller than the screen, so they simply flow. */
const STACK_MEDIA_QUERY = "(min-width: 768px)";
/** Each card pins this far below the top, plus a step per card so earlier cards peek out. */
const STICKY_TOP_REM = 6;
const STICKY_STEP_REM = 1.5;
/** How much each buried card shrinks and darkens per card stacked on top of it. */
const SCALE_STEP = 0.05;
const DIM_STEP = 0.18;

function useStackingEnabled(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const [matchesWidth, setMatchesWidth] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(STACK_MEDIA_QUERY);
    const update = () => setMatchesWidth(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return matchesWidth && !prefersReducedMotion;
}

type StackedCardProps = {
  index: number;
  total: number;
  progress: MotionValue<number>;
  isStacking: boolean;
  children: ReactNode;
};

function StackedCard({ index, total, progress, isStacking, children }: StackedCardProps) {
  const cardsAbove = total - 1 - index;
  const start = index / total;
  // A card starts receding once the next card begins sliding over it.
  const scale = useTransform(progress, [start, 1], [1, 1 - cardsAbove * SCALE_STEP]);
  const dim = useTransform(progress, [start, 1], [0, Math.min(cardsAbove * DIM_STEP, 0.55)]);
  const top = `${STICKY_TOP_REM + index * STICKY_STEP_REM}rem`;

  return (
    <div
      className="md:sticky md:pb-10"
      style={isStacking ? { top } : undefined}
    >
      <motion.div
        className="relative origin-top will-change-transform"
        style={isStacking ? { scale } : undefined}
      >
        {children}
        {isStacking && cardsAbove > 0 && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[#060E1A]"
            style={{ opacity: dim }}
          />
        )}
      </motion.div>
    </div>
  );
}

type HomeFeaturedProjectsProps = {
  featuredProjects: Project[];
};

/** Featured work right after the hero; on larger screens the cards stack like a deck while scrolling. */
export function HomeFeaturedProjects({ featuredProjects }: HomeFeaturedProjectsProps) {
  const { locale } = useLanguage();
  const s = translations[locale].sections;
  const listRef = useRef<HTMLDivElement>(null);
  const isStacking = useStackingEnabled();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });

  if (featuredProjects.length === 0) return null;

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading
          eyebrow={s.projects.eyebrow}
          title={s.projects.title}
          description={s.projects.description}
        />

        <div ref={listRef} className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 md:block">
          {featuredProjects.map((project, index) => (
            <StackedCard
              key={project.id}
              index={index}
              total={featuredProjects.length}
              progress={scrollYProgress}
              isStacking={isStacking}
            >
              <Reveal delay={isStacking ? 0 : index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            </StackedCard>
          ))}
        </div>

        <div className="mt-6 sm:mt-10">
          <Link href="/portfolio">
            <Button variant="secondary">
              {s.projects.viewAll}
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
