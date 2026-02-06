import { seedData } from "@/lib/seed";

export function buildGraph(focusSlug: string) {
  const nodes = new Map<string, { slug: string; label: string }>();
  const focus = seedData.entities.find((e) => e.canonicalSlug === focusSlug) ?? seedData.entities[0];
  nodes.set(focus.canonicalSlug, { slug: focus.canonicalSlug, label: focus.name });

  const links: { source: string; target: string; label: string }[] = [];
  for (const st of seedData.stories) {
    if (!st.entities.includes(focusSlug)) continue;
    for (const other of st.entities) {
      if (other === focusSlug) continue;
      const e = seedData.entities.find((x) => x.canonicalSlug === other);
      if (!e) continue;
      nodes.set(e.canonicalSlug, { slug: e.canonicalSlug, label: e.name });
      links.push({ source: focusSlug, target: e.canonicalSlug, label: "Co-mentioned in story" });
    }
  }

  return { nodes: Array.from(nodes.values()), links };
}
