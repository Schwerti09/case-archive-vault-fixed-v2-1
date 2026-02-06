import type { MetadataRoute } from "next";
export const revalidate = 3600;

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/timeline", "/sources", "/documents", "/entities", "/stories", "/methodology", "/legal", "/impressum", "/datenschutz", "/agb", "/kontakt", "/pricing"],
        disallow: ["/vault", "/ops", "/api"],
      },
    ],
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
  };
}
