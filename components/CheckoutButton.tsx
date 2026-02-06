"use client";
import { Button } from "@/components/Button";

export function CheckoutButton() {
  return (
    <Button
      onClick={async () => {
        const res = await fetch("/api/stripe/create-checkout", { method: "POST" });
        if (!res.ok) throw new Error("Checkout failed");
        const data = await res.json();
        if (data.url) window.location.href = data.url;
      }}
    >
      Vault freischalten (€4,99/Monat)
    </Button>
  );
}
