import Link from "next/link";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getTopStories } from "@/lib/repo";

export const metadata = { title: "Stories", description: "Kuratiertes Story-Verzeichnis mit Teaser + Vault Deep Dives." };

export default async function StoriesPage() {
  const stories = await getTopStories();

  return (
    <main>
      <Container className="py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Stories</h1>
            <p className="text-zinc-300 mt-2 max-w-3xl">
              Öffentlich sind Teaser und Methodik. Deep Dives, Graph, Advanced Search und Downloads gibt’s im Vault.
            </p>
          </div>
          <Link href="/pricing" className="no-underline rounded-2xl bg-white text-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-100">
            Vault €4,99 →
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {(stories as any[]).map((s: any) => (
            <Card key={s.slug}>
              <CardHeader className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">
                    <Link href={`/stories/${s.slug}`} className="no-underline">{s.title}</Link>
                  </div>
                  <div className="text-sm text-zinc-300 mt-1">{s.teaser}</div>
                  <div className="mt-2 flex flex-wrap gap-2">{(s.tags ?? []).slice(0, 6).map((t: string) => <Badge key={t}>{t}</Badge>)}</div>
                </div>
                <Link href={`/vault/stories/${s.slug}`} className="no-underline text-xs rounded-full bg-white text-zinc-900 px-3 py-1 font-semibold">
                  Unlock
                </Link>
              </CardHeader>
              <CardBody className="text-sm text-zinc-300">Preview: Kurzfassung • Deep Dive: Vault</CardBody>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
