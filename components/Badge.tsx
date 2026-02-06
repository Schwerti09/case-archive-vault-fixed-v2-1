import { clsx } from "clsx";
export function Badge({ children, tone="neutral" }: { children: React.ReactNode; tone?: "ok"|"warn"|"bad"|"neutral" }) {
  const tones: Record<string,string> = {
    ok: "border-emerald-700/50 bg-emerald-950/30 text-emerald-200",
    warn: "border-amber-700/50 bg-amber-950/30 text-amber-200",
    bad: "border-rose-700/50 bg-rose-950/30 text-rose-200",
    neutral: "border-zinc-800 bg-zinc-950/40 text-zinc-200",
  };
  return <span className={clsx("inline-flex items-center rounded-full border px-3 py-1 text-[11px]", tones[tone])}>{children}</span>;
}
