import { randomUUID } from "crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

/** Raster images only: SVG can carry scripts and is served publicly from the bucket. */
const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "image/gif": ".gif"
};

function sanitizeFileName(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export async function uploadProjectImage(file: File, slugBase: string) {
  const extension = ALLOWED_IMAGE_TYPES[file.type];
  if (!extension) {
    throw new Error("Позволени са само JPG, PNG, WebP, AVIF и GIF изображения.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Изображението е по-голямо от 8 MB.");
  }

  const supabase = createSupabaseAdminClient();
  const safeBase = sanitizeFileName(slugBase || file.name || "asset") || "asset";
  // The extension comes from the verified MIME type, never from the client-supplied file name.
  const filePath = `projects/${safeBase}-${Date.now()}-${randomUUID().slice(0, 8)}${extension}`;

  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from("project-media").upload(filePath, bytes, {
    contentType: file.type,
    upsert: false
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("project-media").getPublicUrl(filePath);

  return data.publicUrl;
}
