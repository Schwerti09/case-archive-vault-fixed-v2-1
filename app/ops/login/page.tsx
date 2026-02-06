import { Container } from "@/components/Container";
import { Card, CardBody, CardHeader } from "@/components/Card";

export const metadata = { title: "Ops Login" };

export default function OpsLoginPage() {
  return (
    <main>
      <Container className="py-10">
        <h1 className="text-2xl font-semibold">Ops Login</h1>
        <div className="mt-6 max-w-xl">
          <Card>
            <CardHeader><div className="text-sm font-semibold">Passwort</div></CardHeader>
            <CardBody className="text-sm text-zinc-300">
              <form action="/api/ops/login" method="post" className="space-y-3">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm outline-none"
                  placeholder="OPS_PASSWORD"
                />
                <button className="rounded-2xl bg-white text-zinc-900 px-4 py-2 text-sm font-semibold hover:bg-zinc-100" type="submit">
                  Login
                </button>
              </form>
            </CardBody>
          </Card>
        </div>
      </Container>
    </main>
  );
}
