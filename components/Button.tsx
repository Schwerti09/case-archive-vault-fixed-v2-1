"use client";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function Button({
  children, onClick, variant="primary", disabled, type="button",
}: {
  children: React.ReactNode;
  onClick?: () => Promise<void> | void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const [loading, setLoading] = useState(false);
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition border";
  const styles: Record<string,string> = {
    primary: "bg-white text-zinc-900 border-white hover:bg-zinc-100",
    secondary: "bg-zinc-900 text-zinc-100 border-zinc-800 hover:bg-zinc-800",
    ghost: "bg-transparent text-zinc-100 border-zinc-800 hover:bg-zinc-900",
  };
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(base, styles[variant], (disabled || loading) && "opacity-60 cursor-not-allowed")}
      onClick={async () => {
        if (!onClick) return;
        try { setLoading(true); await onClick(); } finally { setLoading(false); }
      }}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
