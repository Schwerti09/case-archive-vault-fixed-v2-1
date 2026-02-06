import { prisma } from "@/lib/db";
import { seedData } from "@/lib/seed";
import { unstable_cache } from "next/cache";

export const getTopStories = unstable_cache(async () => {
  if (!prisma) return seedData.stories.slice(0, 10);
  return prisma.story.findMany({ orderBy: { publishAt: "desc" }, take: 10, include: { entities: true } });
}, ["top-stories"], { revalidate: 600 });

export const getStoryBySlug = unstable_cache(async (slug: string) => {
  if (!prisma) return seedData.stories.find((x) => x.slug === slug) ?? null;
  return prisma.story.findUnique({ where: { slug }, include: { entities: true } });
}, ["story-by-slug"], { revalidate: 600 });

export const getEntitiesIndex = unstable_cache(async () => {
  if (!prisma) return seedData.entities;
  return prisma.entity.findMany({ orderBy: { name: "asc" } });
}, ["entities-index"], { revalidate: 3600 });

export const getEntityBySlug = unstable_cache(async (slug: string) => {
  if (!prisma) return seedData.entities.find((e) => e.canonicalSlug === slug) ?? null;
  return prisma.entity.findUnique({ where: { canonicalSlug: slug } });
}, ["entity-by-slug"], { revalidate: 3600 });

export const getSourcesIndex = unstable_cache(async () => {
  if (!prisma) return seedData.sources;
  return prisma.source.findMany({ orderBy: { reliabilityScore: "desc" } });
}, ["sources-index"], { revalidate: 3600 });

export const getTimelineEvents = unstable_cache(async () => {
  if (!prisma) return seedData.events;
  return prisma.event.findMany({ orderBy: { date: "asc" }, include: { entities: true } });
}, ["timeline-events"], { revalidate: 600 });

export const getDocumentsIndex = unstable_cache(async () => {
  if (!prisma) return [];
  return prisma.document.findMany({ orderBy: { fetchedAt: "desc" }, take: 50, include: { source: true } });
}, ["documents-index"], { revalidate: 600 });
