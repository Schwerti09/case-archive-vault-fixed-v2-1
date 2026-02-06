import { clsx } from "clsx";
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("rounded-2xl border border-zinc-800 bg-zinc-950/40", className)}>{children}</div>;
}
export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("p-4 border-b border-zinc-800", className)}>{children}</div>;
}
export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx("p-4", className)}>{children}</div>;
}
