"use client";

import { useState } from "react";
import Input from "@/app/components/ui/Input";
import Select from "@/app/components/ui/Select";
import Button from "@/app/components/ui/Button";
import { counties } from "@/app/lib/counties";
import { useRouter } from "next/navigation";

type NewListing = {
  title?: string;
  description?: string;
  type: "SALE" | "RENT";
  price: number;
  bedrooms: number;
  bathrooms: number;
  addressLine1?: string;
  addressLine2?: string;
  town?: string;
  county?: string;
  eircode?: string;
};

export default function NewListingPage() {
  const [form, setForm] = useState<NewListing>({ type: "SALE", bedrooms: 1, bathrooms: 1, price: 0 });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function set<K extends keyof NewListing>(key: K, value: NewListing[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/account/listings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "Failed to create listing");
    } else {
      const created = await res.json();
      router.push(`/listings/${created.id}`);
    }
    setLoading(false);
  }

  return (
    <div className="py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Create listing</h1>
      <form onSubmit={submit} className="grid gap-4 max-w-2xl card p-6">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="grid md:grid-cols-[1fr_160px] gap-3">
          <Input placeholder="Title" value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} required />
          <Select value={form.type} onChange={(e) => set("type", (e.target as HTMLSelectElement).value as NewListing["type"])}>
            <option value="SALE">For Sale</option>
            <option value="RENT">To Rent</option>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Input type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={(e) => set("bedrooms", Number(e.target.value))} min={0} />
          <Input type="number" placeholder="Bathrooms" value={form.bathrooms} onChange={(e) => set("bathrooms", Number(e.target.value))} min={0} />
          <Input type="number" placeholder="Price (€)" value={form.price} onChange={(e) => set("price", Number(e.target.value))} min={0} />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <Input placeholder="Address line 1" value={form.addressLine1 ?? ""} onChange={(e) => set("addressLine1", e.target.value)} required />
          <Input placeholder="Address line 2" value={form.addressLine2 ?? ""} onChange={(e) => set("addressLine2", e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Input placeholder="Town" value={form.town ?? ""} onChange={(e) => set("town", e.target.value)} required />
          <Select value={form.county ?? ""} onChange={(e) => set("county", e.target.value)}>
            <option value="">County</option>
            {counties.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Input placeholder="Eircode" value={form.eircode ?? ""} onChange={(e) => set("eircode", e.target.value)} />
        </div>
        <label className="grid gap-2 text-sm">
          <span className="text-[var(--muted)]">Description</span>
          <textarea
            placeholder="Describe the property, amenities, nearby transport, etc."
            value={form.description ?? ""}
            onChange={(e) => set("description", e.target.value)}
            className="min-h-[140px] rounded-md bg-background/60 border border-foreground/10 p-3 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)] transition-shadow"
            required
          />
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          <label className="grid gap-2 text-sm">
            <span className="text-[var(--muted)]">Images</span>
            <input type="file" multiple accept="image/*" className="file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-foreground/10 file:text-foreground/80 file:hover:bg-foreground/20 bg-background/60 border border-foreground/10 rounded p-2" />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-[var(--muted)]">Map location (optional)</span>
            <div className="h-11 rounded bg-foreground/5 border border-foreground/10 grid place-items-center text-[var(--muted)]">Map picker coming soon</div>
          </label>
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => history.back()}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create listing"}</Button>
        </div>
      </form>
    </div>
  );
}


