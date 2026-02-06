import { prisma } from "../lib/db";
import { seedData } from "../lib/seed";

async function main() {
  if (!prisma) { console.log("DATABASE_URL missing: seed skipped (safe mode)."); return; }

  for (const s of seedData.sources) {
    await prisma.source.upsert({
      where: { url: s.url },
      update: { publisher: s.publisher, type: s.type as any, reliabilityScore: s.reliabilityScore, enabled: true },
      create: { url: s.url, publisher: s.publisher, type: s.type as any, reliabilityScore: s.reliabilityScore, enabled: true },
    });
  }

  for (const e of seedData.entities) {
    await prisma.entity.upsert({
      where: { canonicalSlug: e.canonicalSlug },
      update: { name: e.name, type: e.type as any, summary: e.summary, tags: e.tags },
      create: { name: e.name, type: e.type as any, canonicalSlug: e.canonicalSlug, summary: e.summary, tags: e.tags },
    });
  }

  for (const st of seedData.stories) {
    const entityConnect = await Promise.all(st.entities.map(async (slug) => {
      const ent = await prisma.entity.findUnique({ where: { canonicalSlug: slug } });
      return ent?.id ? { id: ent.id } : null;
    }));

    await prisma.story.upsert({
      where: { slug: st.slug },
      update: {
        title: st.title, teaser: st.teaser, bodyPublic: st.bodyPublic, bodyVault: st.bodyVault, tags: st.tags, publishAt: st.publishAt,
        entities: { set: [], connect: entityConnect.filter(Boolean) as any },
      },
      create: {
        title: st.title, slug: st.slug, teaser: st.teaser, bodyPublic: st.bodyPublic, bodyVault: st.bodyVault, tags: st.tags, publishAt: st.publishAt,
        entities: { connect: entityConnect.filter(Boolean) as any },
      },
    });
  }

  for (const ev of seedData.events) {
    const entityConnect = await Promise.all(ev.entities.map(async (slug) => {
      const ent = await prisma.entity.findUnique({ where: { canonicalSlug: slug } });
      return ent?.id ? { id: ent.id } : null;
    }));
    await prisma.event.create({ data: { date: ev.date, title: ev.title, summary: ev.summary, entities: { connect: entityConnect.filter(Boolean) as any } } }).catch(()=>{});
  }

  console.log("Seed complete.");
}
main().catch((e) => { console.error(e); process.exit(1); });
