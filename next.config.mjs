/** @type {import("next").NextConfig} */

const SUPABASE_HOSTNAME = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "*.supabase.co";

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    }
  },

  images: {
    // Modern formats — AVIF first, WebP fallback. Cuts payload ~50-70% vs PNG/JPEG.
    formats: ["image/avif", "image/webp"],

    // Explicit breakpoints. Next.js generates srcset only for these widths.
    // Keep this list short — each extra width = extra transformations on Vercel.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache optimized variants for 30 days on the CDN edge.
    // This is the single most important setting for reducing Supabase egress:
    // once an image is transformed, it's served from Vercel's edge cache,
    // not re-fetched from Supabase on every request.
    minimumCacheTTL: 60 * 60 * 24 * 30,

    remotePatterns: [
      {
        protocol: "https",
        hostname: SUPABASE_HOSTNAME,
        pathname: "/storage/v1/object/public/**"
      },
      {
        protocol: "https",
        hostname: SUPABASE_HOSTNAME,
        pathname: "/storage/v1/render/image/public/**"
      }
    ]
  },

  // Aggressive caching for static assets in /public
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
