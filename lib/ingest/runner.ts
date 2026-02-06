import { prisma } from "../db";
import { fetchRssItems, fetchHtml, extractMainText, hashText, bestEffortRobotsOk } from "./parse";

type ActorType = "SYSTEM" | "OPS" | "WEBHOOK";

async function audit(actorType: ActorType, action: string, detail: any) {
  if (!prisma) return;
  await prisma.auditLog.create({ data: { actorType: actorType as any, action, detail } });
}

export async function ingestAllSources({ actorType }: { actorType: ActorType }) {
  if (!prisma) {
    return { ok: false, reason: "DB_NOT_CONFIGURED", hint: "Set DATABASE_URL then run npm run db:push && npm run db:seed" };
  }

  const sources = await prisma.source.findMany({ where: { enabled: true } });
  let docsCreated = 0;
  let docsSkipped = 0;
  const errors: any[] = [];

  for (const s of sources) {
    try {
      if (!bestEffortRobotsOk(s.url)) { docsSkipped++; continue; }

      let items: any[] = [];
      try { items = await fetchRssItems(s.url); }
      catch { items = [{ link: s.url, title: s.publisher }]; }

      for (const it of items.slice(0, 10)) {
        const url = it.link;
        if (!url) continue;

        const exists = await prisma.document.findUnique({ where: { url } });
        if (exists) { docsSkipped++; continue; }

        const { html, status } = await fetchHtml(url);
        if (status >= 400) { docsSkipped++; continue; }

        const text = extractMainText(html);
        const h = hashText(text || html);

        const doc = await prisma.document.create({
          data: {
            sourceId: s.id,
            title: (it.title ?? "Untitled").slice(0, 250),
            url,
            publishedAt: it.isoDate ? new Date(it.isoDate) : it.pubDate ? new Date(it.pubDate) : null,
            htmlSnapshot: html.slice(0, 200000),
            text,
            hash: h,
          },
        });
        docsCreated++;

        await prisma.claim.create({
          data: {
            documentId: doc.id,
            claimText: "Suggested claim: Bitte manuell prüfen und status-taggen (VERIFIED/ALLEGED/DISPUTED).",
            status: "ALLEGED",
            citations: [url],
          } as any,
        });

        await audit(actorType, "INGEST_DOC_CREATED", { source: s.url, docUrl: url, hash: h });
      }

      await prisma.source.update({ where: { id: s.id }, data: { lastFetchedAt: new Date() } });
      await audit(actorType, "INGEST_SOURCE_DONE", { sourceId: s.id, url: s.url, docsCreated });
    } catch (e: any) {
      errors.push({ source: s.url, error: String(e?.message ?? e) });
      await audit(actorType, "INGEST_SOURCE_ERROR", { sourceId: s.id, url: s.url, error: String(e?.message ?? e) });
    }
  }

  return { ok: true, docsCreated, docsSkipped, errors };
}
