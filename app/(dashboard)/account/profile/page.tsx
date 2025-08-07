"use client";

import { useEffect, useState } from "react";

type Profile = {
  phone?: string;
  company?: string;
  county?: string;
  town?: string;
  addressLine1?: string;
  addressLine2?: string;
  eircode?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/account/profile").then((r) => r.json()).then(setProfile);
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/account/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
  }

  if (!profile) return <div className="p-6">Loading...</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Your profile</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          ["phone", "Phone"],
          ["company", "Company"],
          ["county", "County"],
          ["town", "Town"],
          ["addressLine1", "Address line 1"],
          ["addressLine2", "Address line 2"],
          ["eircode", "Eircode"],
        ].map(([key, label]) => (
          <label key={key} className="text-sm space-y-1">
            <span>{label}</span>
            <input
              value={(profile as Record<string, string>)[key] ?? ""}
              onChange={(e) => setProfile({ ...profile, [key]: e.target.value } as Profile)}
              className="w-full border rounded px-3 py-2 bg-transparent"
            />
          </label>
        ))}
      </div>
      <button onClick={save} disabled={saving} className="h-10 px-4 rounded bg-foreground text-background">
        {saving ? "Saving..." : "Save profile"}
      </button>
    </div>
  );
}


