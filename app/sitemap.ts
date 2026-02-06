import type { MetadataRoute } from "next";
import { getTopStories } from "@/lib/repo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");
  const stories = await getTopStories();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/timeline`, lastModified: new Date() },
    { url: `${base}/sources`, lastModified: new Date() },
    { url: `${base}/documents`, lastModified: new Date() },
    { url: `${base}/entities`, lastModified: new Date() },
    { url: `${base}/stories`, lastModified: new Date() },
    { url: `${base}/methodology`, lastModified: new Date() },
    { url: `${base}/legal`, lastModified: new Date() },
    { url: `${base}/impressum`, lastModified: new Date() },
    { url: `${base}/datenschutz`, lastModified: new Date() },
    { url: `${base}/agb`, lastModified: new Date() },
    { url: `${base}/kontakt`, lastModified: new Date() },
    { url: `${base}/pricing`, lastModified: new Date() },
  ];

  const storyUrls = (stories as any[]).map((s: any) => ({
    url: `${base}/stories/${s.slug}`,
    lastModified: new Date(s.updatedAt ?? s.publishAt ?? Date.now()),
  }));

  return [...staticUrls, ...storyUrls];
}
