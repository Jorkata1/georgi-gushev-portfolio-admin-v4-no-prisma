import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type MetadataProps = {
  title: string;
  description: string;
  path?: string;
};

export function createMetadata({
  title,
  description,
  path = ""
}: MetadataProps): Metadata {
  const canonical = `${siteConfig.siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "bg_BG",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
