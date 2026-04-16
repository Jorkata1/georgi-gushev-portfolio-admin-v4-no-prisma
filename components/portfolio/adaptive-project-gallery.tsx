"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

type AdaptiveProjectGalleryProps = {
  title: string;
  heroImage: string;
  gallery: string[];
};

type ImageKind = "landscape" | "portrait" | "square";

const BLUR_DATA_URL =
  "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";

function detectImageKind(width: number, height: number): ImageKind {
  if (width > height * 1.2) return "landscape";
  if (height > width * 1.2) return "portrait";
  return "square";
}

// Layout tokens for each orientation — keeps design intent from the original.
const KIND_CLASSES: Record<ImageKind, string> = {
  portrait: "min-h-[420px] sm:min-h-[560px]",
  square: "min-h-[300px] sm:min-h-[380px]",
  landscape: "md:col-span-2 min-h-[260px] sm:min-h-[340px]"
};

export function AdaptiveProjectGallery({
  title,
  heroImage,
  gallery
}: AdaptiveProjectGalleryProps) {
  const [imageKinds, setImageKinds] = useState<Record<string, ImageKind>>({});

  const handleLoadingComplete = useCallback(
    (src: string) => (img: HTMLImageElement) => {
      const kind = detectImageKind(img.naturalWidth, img.naturalHeight);
      setImageKinds((current) => {
        if (current[src] === kind) return current;
        return { ...current, [src]: kind };
      });
    },
    []
  );

  return (
    <div className="grid gap-6">
      {/* Hero — eager load, high priority (first paint above the fold on detail pages) */}
      <div className="surface overflow-hidden p-4 sm:p-5">
        <div className="relative flex min-h-[340px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/50 sm:min-h-[560px]">
          <Image
            src={heroImage}
            alt={title}
            width={1600}
            height={1000}
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="max-h-[560px] w-auto max-w-full object-contain p-4"
            onLoadingComplete={handleLoadingComplete(heroImage)}
          />
        </div>
      </div>

      {gallery.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {gallery.map((src, index) => {
            const kind = imageKinds[src] ?? "landscape";
            return (
              <div
                key={`${src}-${index}`}
                className={`surface overflow-hidden p-4 sm:p-5 ${KIND_CLASSES[kind]}`}
              >
                <div className="relative flex h-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/50">
                  <Image
                    src={src}
                    alt={`${title} gallery ${index + 1}`}
                    width={1200}
                    height={900}
                    sizes="(max-width: 768px) 100vw, 600px"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="max-h-full w-auto max-w-full object-contain p-4"
                    onLoadingComplete={handleLoadingComplete(src)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}