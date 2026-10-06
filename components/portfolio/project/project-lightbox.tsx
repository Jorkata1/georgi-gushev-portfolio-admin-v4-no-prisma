"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { BLUR_DATA_URL, SPRING } from "./motion-presets";
import { useProjectCopy } from "./use-project-copy";

const SWIPE_THRESHOLD_PX = 80;

interface ProjectLightboxProps {
  images: string[];
  title: string;
  index: number | null;
  onChange: (index: number | null) => void;
}

export function ProjectLightbox({ images, title, index, onChange }: ProjectLightboxProps) {
  const copy = useProjectCopy();
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const isOpen = index !== null;
  const count = images.length;

  const close = useCallback(() => onChange(null), [onChange]);
  const step = useCallback(
    (delta: number) => onChange(index === null ? null : (index + delta + count) % count),
    [index, count, onChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close, step]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x <= -SWIPE_THRESHOLD_PX) step(1);
    else if (info.offset.x >= SWIPE_THRESHOLD_PX) step(-1);
  }

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — ${index + 1} / ${count}`}
          className="fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <span className="text-sm tabular-nums text-white/70">
              {index + 1} / {count}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={copy.close}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-2 sm:px-16" onClick={(event) => event.stopPropagation()}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={images[index]}
                className="relative aspect-[16/10] w-full max-w-6xl cursor-grab touch-pan-y active:cursor-grabbing"
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={handleDragEnd}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={SPRING}
              >
                <Image
                  src={images[index]}
                  alt={`${title} — ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="pointer-events-none select-none rounded-2xl object-contain"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={copy.previous}
                  className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={copy.next}
                  className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div
              className="flex justify-center gap-2 overflow-x-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label={copy.thumbnails}
              onClick={(event) => event.stopPropagation()}
            >
              {images.map((src, thumbIndex) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => onChange(thumbIndex)}
                  aria-label={`${copy.openImage} ${thumbIndex + 1}`}
                  aria-current={thumbIndex === index}
                  className={`relative aspect-[16/10] w-16 shrink-0 overflow-hidden rounded-lg border-2 transition sm:w-20 ${
                    thumbIndex === index ? "border-accent opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
