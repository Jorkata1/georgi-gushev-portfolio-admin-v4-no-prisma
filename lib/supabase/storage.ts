import { randomUUID } from "crypto";
import path from "path";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function sanitizeFileName(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export async function uploadProjectImage(file: File, slugBase: string) {
  const supabase = createSupabaseAdminClient();

  const extension = path.extname(file.name) || ".bin";
  const safeBase = sanitizeFileName(slugBase || file.name || "asset") || "asset";
  const filePath = `projects/${safeBase}-${Date.now()}-${randomUUID().slice(0, 8)}${extension}`;

  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("project-media")
    .upload(filePath, bytes, {
      contentType: file.type || "application/octet-stream",
      upsert: false
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("project-media").getPublicUrl(filePath);

  return data.publicUrl;
}