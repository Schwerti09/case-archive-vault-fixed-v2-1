"use client";
import { useState } from "react";
import { Button } from "@/components/Button";

export function OpsPanel() {
  const [out, setOut] = useState<string>("");

  return (
    <div className="space-y-3">
      <Button
        variant="primary"
        onClick={async () => {
          setOut("Running ingestion...");
          const res = await fetch("/api/ops/ingest", { method: "POST" });
          const txt = await res.text();
          setOut(txt);
        }}
      >
        Run ingestion now
      </Button>

      <Button
        variant="secondary"
        onClick={async () => {
          const res = await fetch("/api/self-test");
          const txt = await res.text();
          setOut(txt);
        }}
      >
        Self-test
      </Button>

      <pre className="whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 text-xs text-zinc-200">
        {out || "Output will appear here."}
      </pre>
    </div>
  );
}
