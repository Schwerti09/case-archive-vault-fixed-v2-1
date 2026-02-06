import { NextResponse } from "next/server";
import { isOpsAuthed } from "@/lib/opsAuth";
import { ingestAllSources } from "@/lib/ingest/runner";

export const runtime = "nodejs";

export async function POST() {
  const authed = await isOpsAuthed();
  if (!authed) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const result = await ingestAllSources({ actorType: "OPS" });
  return NextResponse.json(result);
}
