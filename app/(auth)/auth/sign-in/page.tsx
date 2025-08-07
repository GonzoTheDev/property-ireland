"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    await signIn("credentials", { email, password, callbackUrl: "/", redirect: true });
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
    </div>
  );
}


