import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { getDocumentsIndex } from "@/lib/repo";

export const metadata = { title: "Documents", description: "Dokumenten-Index (zuletzt ingestet)." };

export default async function DocumentsPage() {
  const docs = await getDocumentsIndex();

  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">
          Index über zuletzt ingestete Dokumente. Jeder Eintrag erhält einen Hash (Snapshot/Text).
        </p>

        <div className="mt-6 grid gap-4">
          {(docs as any[]).length === 0 ? (
            <Card>
              <CardBody className="text-sm text-zinc-300">
                Noch keine Dokumente im Index. Starte Ingestion via <span className="text-zinc-100">/ops</span>.
              </CardBody>
            </Card>
          ) : (
            (docs as any[]).map((d: any) => (
              <Card key={d.id}>
                <CardHeader className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">{d.title}</div>
                    <div className="text-xs text-zinc-500 break-all">{d.url}</div>
                    <div className="text-xs text-zinc-500 mt-1">
                      Source: <span className="text-zinc-200">{d.source?.publisher}</span>
                    </div>
                  </div>
                  <Badge>{String(d.hash).slice(0, 8)}</Badge>
                </CardHeader>
                <CardBody className="text-sm text-zinc-300">
                  Fetched: {new Date(d.fetchedAt).toISOString().slice(0, 19).replace("T", " ")} •{" "}
                  Published: {d.publishedAt ? new Date(d.publishedAt).toISOString().slice(0, 10) : "—"} •{" "}
                  <a href={d.url} target="_blank" rel="noreferrer">Open source</a>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </Container>
    </main>
  );
}
