"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

type Props = { listingId: string };

export default function ContactOwner({ listingId }: Props) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function send() {
    setStatus("loading");
    setError(null);
    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, message }),
      });
      if (!resp.ok) throw new Error((await resp.json()).error ?? "Failed to send");
      setStatus("success");
      setMessage("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to send";
      setError(message);
      setStatus("error");
    }
  }

  return (
    <div className="card p-4 grid gap-3">
      <div>
        <div className="font-medium">Contact owner</div>
        <div className="text-sm text-[var(--muted)]">Send a message to the property owner.</div>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      {status === "success" ? (
        <div className="text-sm text-green-600">Message sent!</div>
      ) : (
        <>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[100px] rounded-md bg-background/60 border border-foreground/10 p-3 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30"/>
          <div className="flex justify-end">
            <Button onClick={send} disabled={status === "loading" || !message.trim()}>Send</Button>
          </div>
        </>
      )}
    </div>
  );
}



