import Link from "next/link";
import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";
import { isOpsAuthed } from "@/lib/opsAuth";
import { OpsPanel } from "@/components/OpsPanel";

export const metadata = { title: "Ops" };

export default async function OpsPage() {
  const authed = await isOpsAuthed();
  if (!authed) {
    return (
      <main>
        <Container className="py-10">
          <h1 className="text-2xl font-semibold">Ops</h1>
          <p className="text-zinc-300 mt-2">Login erforderlich.</p>
          <div className="mt-4"><Link href="/ops/login">→ Ops Login</Link></div>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Ops Center</h1>
        <p className="text-zinc-300 mt-2 max-w-3xl">Ingestion, Self-test, Health. Alles auditierbar über DB-Logs.</p>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Card>
              <CardHeader><div className="text-sm font-semibold">Controls</div></CardHeader>
              <CardBody><OpsPanel /></CardBody>
            </Card>
          </div>
          <div className="lg:col-span-4">
            <Card>
              <CardHeader><div className="text-sm font-semibold">Quick Links</div></CardHeader>
              <CardBody className="text-sm text-zinc-300 space-y-2">
                <a href="/api/healthz" className="text-sm">/api/healthz</a>
                <a href="/api/self-test" className="text-sm">/api/self-test</a>
                <a href="/documents" className="text-sm">/documents</a>
                <a href="/sources" className="text-sm">/sources</a>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}
