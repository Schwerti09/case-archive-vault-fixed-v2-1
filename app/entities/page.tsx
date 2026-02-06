import Link from "next/link";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getEntitiesIndex } from "@/lib/repo";

export const metadata = { title: "Entities", description: "Neutraler Entities-Index." };

export default async function EntitiesPage() {
  const entities = await getEntitiesIndex();
  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Entities</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">
          Neutraler Index. Keine Anschuldigung wird als Fakt dargestellt. Deep Dives & Graph sind im Vault.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {(entities as any[]).map((e: any) => (
            <Card key={e.canonicalSlug}>
              <CardHeader className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">
                    <Link href={`/entities/${e.canonicalSlug}`} className="no-underline">{e.name}</Link>
                  </div>
                  <div className="text-xs text-zinc-500">{String(e.type)}</div>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  {(e.tags ?? []).slice(0, 3).map((t: string) => <Badge key={t}>{t}</Badge>)}
                </div>
              </CardHeader>
              <CardBody className="text-sm text-zinc-300">{e.summary}</CardBody>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
