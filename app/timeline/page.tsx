import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { getTimelineEvents } from "@/lib/repo";

export const metadata = { title: "Timeline", description: "Chronologischer Ereignisindex." };

export default async function TimelinePage() {
  const events = await getTimelineEvents();
  const sorted = (events as any[]).slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Timeline</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">
          Chronologische Indexpunkte. Details gehören in Quellenlinks/Stories – nicht in Spekulation.
        </p>

        <div className="mt-6 grid gap-4">
          {sorted.map((e: any, idx: number) => (
            <Card key={idx}>
              <CardHeader>
                <div className="text-xs text-zinc-500">{new Date(e.date).toISOString().slice(0, 10)}</div>
                <div className="text-sm font-semibold">{e.title}</div>
              </CardHeader>
              <CardBody className="text-sm text-zinc-300">{e.summary}</CardBody>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
