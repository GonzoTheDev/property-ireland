"use client";

import { useState } from "react";

export default function DataDeletionPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/legal/data-deletion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message }),
    });
    setSubmitted(true);
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Request data deletion</h1>
      <p>We will process requests in accordance with GDPR and Irish law.</p>
      {submitted ? (
        <div className="p-3 rounded border">Thanks, your request has been submitted.</div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <label className="block text-sm space-y-1">
            <span>Email</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border rounded px-3 py-2 bg-transparent" />
          </label>
          <label className="block text-sm space-y-1">
            <span>Message (optional)</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border rounded px-3 py-2 bg-transparent min-h-[120px]" />
          </label>
          <button className="h-10 px-4 rounded bg-foreground text-background">Submit request</button>
        </form>
      )}
    </div>
  );
}


