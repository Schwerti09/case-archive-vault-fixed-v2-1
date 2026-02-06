import { ingestAllSources } from "../lib/ingest/runner";
async function main() {
  const result = await ingestAllSources({ actorType: "SYSTEM" });
  console.log(JSON.stringify(result, null, 2));
}
main().catch((e) => { console.error(e); process.exit(1); });
