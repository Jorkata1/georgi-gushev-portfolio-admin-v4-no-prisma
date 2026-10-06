"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { useRef, useState, type UIEvent } from "react";
import { BLUR_DATA_URL, EASE_OUT } from "./motion-presets";
import { useProjectCopy } from "./use-project-copy";

const MAX_DESKTOP_TILES = 5;
const STAGGER_S = 0.06;

interface ProjectMediaProps {
  images: string[];
  title: string;
  onOpen: (index: number) => void;
}

/** Grid templates where every cell is 16:10, so the 1600×1000 visuals are never cropped. */
function desktopLayout(count: number) {
  if (count >= 5) return { grid: "grid-cols-4 grid-rows-2 aspect-[16/5]", heroSpan: "col-span-2 row-span-2" };
  if (count >= 3) return { grid: "grid-cols-3 grid-rows-2 aspect-[12/5]", heroSpan: "col-span-2 row-span-2" };
  if (count === 2) return { grid: "grid-cols-2 aspect-[16/5]", heroSpan: "" };
  return { grid: "grid-cols-1 aspect-[16/10]", heroSpan: "" };
}

function Tile({
  src,
  alt,
  index,
  className,
  overflowCount,
  priority,
  onOpen,
}: {
  src: string;
  alt: string;
  index: number;
  className: string;
  overflowCount: number;
  priority: boolean;
  onOpen: (index: number) => void;
}) {
  const reduceMotion = useReducedMotion();
  const copy = useProjectCopy();

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`${copy.openImage} ${index + 1}: ${alt}`}
      className={`group relative h-full w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${className}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * STAGGER_S, ease: EASE_OUT }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={priority ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 30vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 size={15} aria-hidden="true" />
      </span>
      {overflowCount > 0 && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-2xl font-semibold text-white backdrop-blur-[2px]">
          +{overflowCount}
        </span>
      )}
    </motion.button>
  );
}

function DesktopGrid({ images, title, onOpen }: ProjectMediaProps) {
  const layout = desktopLayout(images.length);
  const tileCount = images.length >= MAX_DESKTOP_TILES ? MAX_DESKTOP_TILES : images.length >= 3 ? 3 : images.length;
  const tiles = images.slice(0, tileCount);
  const remaining = images.length - tiles.length;

  return (
    <div className={`hidden gap-3 lg:grid ${layout.grid}`}>
      {tiles.map((src, index) => (
        <Tile
          key={src}
          src={src}
          alt={`${title} — ${index + 1}`}
          index={index}
          className={index === 0 ? layout.heroSpan : ""}
          overflowCount={index === tiles.length - 1 ? remaining : 0}
          priority={index === 0}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

function MobileCarousel({ images, title, onOpen }: ProjectMediaProps) {
  const copy = useProjectCopy();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const track = event.currentTarget;
    const slideWidth = track.firstElementChild?.getBoundingClientRect().width ?? track.clientWidth;
    setActiveIndex(Math.round(track.scrollLeft / slideWidth));
  }

  function scrollTo(index: number) {
    const slide = trackRef.current?.children[index];
    if (slide instanceof HTMLElement) slide.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className="lg:hidden">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        aria-label={copy.images}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, index) => (
          <div key={src} className="aspect-[16/10] w-[88%] shrink-0 snap-start sm:w-[80%]">
            <Tile
              src={src}
              alt={`${title} — ${index + 1}`}
              index={index}
              className=""
              overflowCount={0}
              priority={index === 0}
              onOpen={onOpen}
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5" aria-label={copy.swipeHint}>
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`${copy.openImage} ${index + 1}`}
              aria-current={index === activeIndex}
              className="flex h-6 items-center px-0.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ease-out ${
                  index === activeIndex ? "w-5 bg-accent" : "w-1.5 bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectMedia(props: ProjectMediaProps) {
  if (props.images.length === 0) return null;
  return (
    <>
      <DesktopGrid {...props} />
      <MobileCarousel {...props} />
    </>
  );
}
