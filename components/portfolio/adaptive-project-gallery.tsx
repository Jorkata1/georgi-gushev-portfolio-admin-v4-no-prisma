"use client";

import { useState, type SyntheticEvent } from "react";

type AdaptiveProjectGalleryProps = {
  title: string;
  heroImage: string;
  gallery: string[];
};

type ImageKind = "landscape" | "portrait" | "square";

function detectImageKind(width: number, height: number): ImageKind {
  if (width > height * 1.2) return "landscape";
  if (height > width * 1.2) return "portrait";
  return "square";
}

export function AdaptiveProjectGallery({
  title,
  heroImage,
  gallery
}: AdaptiveProjectGalleryProps) {
  const [imageKinds, setImageKinds] = useState<Record<string, ImageKind>>({});

  function handleImageLoad(src: string) {
    return (event: SyntheticEvent<HTMLImageElement>) => {
      const image = event.currentTarget;
      const kind = detectImageKind(image.naturalWidth, image.naturalHeight);

      setImageKinds((current) => {
        if (current[src] === kind) return current;
        return { ...current, [src]: kind };
      });
    };
  }

  function getCardClasses(src: string) {
    const kind = imageKinds[src] ?? "landscape";

    if (kind === "portrait") {
      return "min-h-[420px] sm:min-h-[560px]";
    }

    if (kind === "square") {
      return "min-h-[300px] sm:min-h-[380px]";
    }

    return "md:col-span-2 min-h-[260px] sm:min-h-[340px]";
  }

  return (
    <div className="grid gap-6">
      <div className="surface overflow-hidden p-4 sm:p-5">
        <div className="flex min-h-[340px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/50 sm:min-h-[560px]">
          <img
            src={heroImage}
            alt={title}
            onLoad={handleImageLoad(heroImage)}
            className="max-h-full max-w-full object-contain p-4"
          />
        </div>
      </div>

      {gallery.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {gallery.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className={`surface overflow-hidden p-4 sm:p-5 ${getCardClasses(image)}`}
            >
              <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/50">
                <img
                  src={image}
                  alt={`${title} gallery ${index + 1}`}
                  onLoad={handleImageLoad(image)}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}