"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="space-y-2">
          <label className="block text-sm">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="w-full border rounded px-3 py-2 bg-transparent"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="w-full border rounded px-3 py-2 bg-transparent"
          />
        </div>
        <button disabled={loading} className="w-full h-10 rounded bg-foreground text-background">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="mt-4 grid gap-2">
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })} className="h-10 rounded bg-foreground/10 hover:bg-foreground/20">Continue with Google</button>
        <button onClick={() => supabase.auth.signInWithOAuth({ provider: "facebook" })} className="h-10 rounded bg-foreground/10 hover:bg-foreground/20">Continue with Facebook</button>
      </div>
    </div>
  );
}


