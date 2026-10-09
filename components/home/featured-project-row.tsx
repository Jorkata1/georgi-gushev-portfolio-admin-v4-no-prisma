"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/types";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const MAX_TOOLS = 4;
const BLUR_DATA_URL = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";

/** The frame opens like a curtain from a thin vertical slit in the middle. */
const CURTAIN_CLOSED = "inset(8% 46% 8% 46% round 24px)";
const CURTAIN_OPEN = "inset(0% 0% 0% 0% round 24px)";

type FeaturedProjectRowProps = {
  project: Project;
  index: number;
  viewLabel: string;
};

function MaskedWords({ text, delay, reduceMotion }: { text: string; delay: number; reduceMotion: boolean }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduceMotion ? { opacity: 0 } : { y: "110%" }}
            whileInView={reduceMotion ? { opacity: 1 } : { y: "0%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: delay + wordIndex * 0.06, ease: EASE_OUT }}
          >
            {word}
          </motion.span>
          {wordIndex < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

export function FeaturedProjectRow({ project, index, viewLabel }: FeaturedProjectRowProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  // The picture drifts slower than the page inside an oversized layer, which reads as depth.
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-7%", "7%"]);

  const isReversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const href = `/portfolio/${project.slug}`;

  return (
    <article className="group relative grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
      <motion.div
        ref={frameRef}
        className={`relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03] lg:col-span-7 ${
          isReversed ? "lg:order-2" : ""
        }`}
        initial={reduceMotion ? { opacity: 0 } : { clipPath: CURTAIN_CLOSED }}
        whileInView={reduceMotion ? { opacity: 1 } : { clipPath: CURTAIN_OPEN }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
      >
        <motion.div className="absolute inset-[-8%]" style={{ y: parallaxY }}>
          <motion.div
            className="relative h-full w-full"
            initial={reduceMotion ? false : { scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
          >
            <Image
              src={project.heroImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </motion.div>
        </motion.div>
        <span className="absolute inset-0 bg-gradient-to-t from-[#060E1A]/40 via-transparent to-transparent" />
      </motion.div>

      <div className={`relative lg:col-span-5 ${isReversed ? "lg:order-1" : ""}`}>
        <motion.span
          aria-hidden="true"
          className="block font-semibold leading-none text-white/10 tabular-nums"
          style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 7vw, 6rem)" }}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: isReversed ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          {number}
        </motion.span>

        <motion.p
          className="mt-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {project.category}
          <span className="h-px w-6 bg-accent/40" />
          <span className="tracking-widest text-accent/80">{project.year}</span>
        </motion.p>

        <h3
          className="mt-3 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl"
          style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" }}
        >
          {/* Stretched link: the whole row is clickable, with a single link for screen readers. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            <MaskedWords text={project.title} delay={0.2} reduceMotion={reduceMotion} />
          </Link>
        </h3>

        {project.excerpt && (
          <motion.p
            className="mt-4 max-w-md text-base leading-relaxed text-slate-300"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT }}
          >
            {project.excerpt}
          </motion.p>
        )}

        {project.tools.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tools.slice(0, MAX_TOOLS).map((tool, toolIndex) => (
              <motion.li
                key={tool}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: 0.45 + toolIndex * 0.05, ease: EASE_OUT }}
              >
                {tool}
              </motion.li>
            ))}
          </ul>
        )}

        <span
          aria-hidden="true"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accentGlow transition-colors duration-300 group-hover:text-white"
        >
          {viewLabel}
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent/60">
            <ArrowUpRight size={14} />
          </span>
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-accent/0 transition [.group:has(a:focus-visible)_&]:ring-accent/60"
        />
      </div>
    </article>
  );
}
