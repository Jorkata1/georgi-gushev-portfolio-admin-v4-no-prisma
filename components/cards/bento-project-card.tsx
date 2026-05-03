"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "next";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type BentoSize = "featured" | "wide" | "small";

type BentoProjectCardProps = {
  project: Project;
  size?: BentoSize;
  index?: number;
};

const BLUR_PLACEHOLDER =
  "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    clipPath: "inset(100% 0% 0% 0% round 1.5rem)",
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
    transition: {
      duration: 0.65,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function BentoProjectCard({
  project,
  size = "small",
  index = 0,
}: BentoProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), {
    stiffness: 260,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), {
    stiffness: 260,
    damping: 28,
  });

  const imgX = useSpring(useTransform(mx, [0, 1], ["3%", "-3%"]), {
    stiffness: 200,
    damping: 30,
  });
  const imgY = useSpring(useTransform(my, [0, 1], ["3%", "-3%"]), {
    stiffness: 200,
    damping: 30,
  });

  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);

  // Fixed: useTransform called unconditionally at top level
  const spotBackground = useTransform(
    [spotX, spotY],
    ([x, y]: number[]) =>
      `radial-gradient(280px circle at ${x}% ${y}%, rgba(232,164,74,0.10), transparent 70%)`
  );

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mx.set(nx);
    my.set(ny);
    spotX.set(nx * 100);
    spotY.set(ny * 100);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
    spotX.set(50);
    spotY.set(50);
    setHovered(false);
  }

  const isFeatured = size === "featured";
  const isWide = size === "wide";

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        isFeatured && "sm:col-span-2 sm:row-span-2 lg:col-span-1 lg:row-span-2",
        isWide && "sm:col-span-2",
        "group"
      )}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        <Link
          href={`/portfolio/${project.slug}` as Route}
          aria-label={`Виж проекта: ${project.title}`}
          className="block h-full"
        >
          <motion.article
            className={cn(
              "surface relative overflow-hidden transition-shadow duration-500",
              isFeatured
                ? "min-h-[420px] sm:min-h-[520px]"
                : isWide
                ? "min-h-[260px]"
                : "min-h-[280px]"
            )}
            animate={
              hovered
                ? {
                    boxShadow:
                      "0 0 0 1px rgba(232,164,74,0.3), 0 0 40px rgba(232,164,74,0.12), 0 24px 80px rgba(10,30,70,0.6)",
                    y: -6,
                  }
                : {
                    boxShadow:
                      "0 0 0 1px rgba(79,156,247,0.10), 0 20px 50px rgba(3,8,20,0.4)",
                    y: 0,
                  }
            }
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Cursor spotlight — uses pre-computed motionValue */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ background: spotBackground }}
                />
              )}
            </AnimatePresence>

            {/* Image with parallax */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-[-6%] h-[112%] w-[112%]"
                style={{ x: imgX, y: imgY }}
              >
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes={
                    isFeatured
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                      : isWide
                      ? "(max-width: 640px) 100vw, 800px"
                      : "(max-width: 640px) 100vw, 400px"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-accentGlow backdrop-blur-sm">
                  {project.category}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                  {project.year}
                </span>
              </div>

              <div>
                <motion.div
                  className="mb-3 flex flex-wrap gap-1.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {project.tools.slice(0, isFeatured ? 4 : 3).map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/80 backdrop-blur-sm"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > (isFeatured ? 4 : 3) && (
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/80 backdrop-blur-sm">
                      +{project.tools.length - (isFeatured ? 4 : 3)}
                    </span>
                  )}
                </motion.div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3
                      className={cn(
                        "font-semibold leading-snug text-white",
                        isFeatured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                      )}
                    >
                      {project.title}
                    </h3>

                    <AnimatePresence>
                      {(isFeatured || isWide) && hovered && (
                        <motion.p
                          className="mt-2 max-w-[44ch] text-xs leading-relaxed text-slate-300 sm:text-sm"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          {project.excerpt || project.summary?.slice(0, 120) + "…"}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm"
                    animate={
                      hovered
                        ? {
                            backgroundColor: "rgba(232,164,74,0.9)",
                            borderColor: "rgba(232,164,74,0.5)",
                            color: "#1a0f00",
                            scale: 1.1,
                          }
                        : {
                            backgroundColor: "rgba(255,255,255,0.08)",
                            borderColor: "rgba(255,255,255,0.2)",
                            color: "#ffffff",
                            scale: 1,
                          }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={hovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ArrowUpRight size={18} />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[1.5rem]"
              animate={hovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                boxShadow: "inset 0 0 0 1px rgba(232,164,74,0.35)",
              }}
            />
          </motion.article>
        </Link>
      </motion.div>
    </motion.div>
  );
}