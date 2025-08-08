"use client";

import { useState } from "react";
import Input from "@/app/components/ui/Input";
import Select from "@/app/components/ui/Select";
import Button from "@/app/components/ui/Button";
import { counties } from "@/app/lib/counties";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

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
  images?: string[];
};

export default function NewListingPage() {
  const [form, setForm] = useState<NewListing>({ type: "SALE", bedrooms: 1, bathrooms: 1, price: 0, images: [] });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  function set<K extends keyof NewListing>(key: K, value: NewListing[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("[CreateListing] Submitting payload", form);
    const res = await fetch("/api/account/listings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("[CreateListing] Server error", data);
      setError(data?.error ?? "Failed to create listing");
    } else {
      const created = await res.json();
      console.log("[CreateListing] Created listing", created);
      router.push(`/listings/${created.id}`);
    }
    setLoading(false);
  }

  async function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      console.log("[Upload] Selected files", Array.from(files).map((f) => ({ name: f.name, size: f.size })));
      const { data: session } = await supabase.auth.getSession();
      const uid = session.session?.user?.id;
      console.log("[Upload] Session user id", uid);
      if (!uid) {
        setError("You must be signed in to upload images");
        return;
      }
      const uploads = await Promise.all(
        Array.from(files).map(async (file, index) => {
          const ext = file.name.split(".").pop() ?? "jpg";
          const path = `${uid}/${Date.now()}_${index}.${ext}`;
          const { error: upErr } = await supabase.storage.from("listing-images").upload(path, file, { upsert: true, cacheControl: "3600" });
          if (upErr) {
            console.error("[Upload] Error uploading", { path, message: upErr.message });
            throw upErr;
          }
          console.log("[Upload] Uploaded", path);
          const { data: pub } = supabase.storage.from("listing-images").getPublicUrl(path);
          console.log("[Upload] Public URL", pub.publicUrl);
          return pub.publicUrl;
        })
      );
      setForm((f) => ({ ...f, images: [...(f.images ?? []), ...uploads] }));
      console.log("[Upload] Updated images", uploads);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload images";
      setError(msg);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Create listing</h1>
      <form onSubmit={submit} className="grid gap-4 max-w-2xl card p-6">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="grid md:grid-cols-[1fr_160px] gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-[var(--muted)]">Title</span>
            <Input placeholder="e.g., 3-bed semi-detached in Galway" value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} required />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-[var(--muted)]">Type</span>
            <Select value={form.type} onChange={(e) => set("type", (e.target as HTMLSelectElement).value as NewListing["type"])}>
            <option value="SALE">For Sale</option>
            <option value="RENT">To Rent</option>
            </Select>
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-[var(--muted)]">Bedrooms</span>
            <Input type="number" placeholder="3" value={form.bedrooms} onChange={(e) => set("bedrooms", Number(e.target.value))} min={0} />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-[var(--muted)]">Bathrooms</span>
            <Input type="number" placeholder="2" value={form.bathrooms} onChange={(e) => set("bathrooms", Number(e.target.value))} min={0} />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-[var(--muted)]">Price (€)</span>
            <Input type="number" placeholder="350000" value={form.price} onChange={(e) => set("price", Number(e.target.value))} min={0} />
          </label>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-[var(--muted)]">Address line 1</span>
            <Input placeholder="123 Main Street" value={form.addressLine1 ?? ""} onChange={(e) => set("addressLine1", e.target.value)} required />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-[var(--muted)]">Address line 2</span>
            <Input placeholder="Apt, suite, etc." value={form.addressLine2 ?? ""} onChange={(e) => set("addressLine2", e.target.value)} />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-[var(--muted)]">Town</span>
            <Input placeholder="Galway" value={form.town ?? ""} onChange={(e) => set("town", e.target.value)} required />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-[var(--muted)]">County</span>
            <Select value={form.county ?? ""} onChange={(e) => set("county", e.target.value)}>
              <option value="">Select county</option>
              {counties.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-[var(--muted)]">Eircode</span>
            <Input placeholder="H91 XXXX" value={form.eircode ?? ""} onChange={(e) => set("eircode", e.target.value)} />
          </label>
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
            <input onChange={onFilesSelected} type="file" multiple accept="image/*" className="file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-foreground/10 file:text-foreground/80 file:hover:bg-foreground/20 bg-background/60 border border-foreground/10 rounded p-2" />
            {uploading && <span className="text-xs text-[var(--muted)]">Uploading...</span>}
            {!!(form.images?.length ?? 0) && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {(form.images ?? []).map((u, idx) => (
                  <div key={u} className="relative group">
                    <img src={u} alt="uploaded" className="aspect-square w-full h-auto object-cover rounded" />
                    <div className="absolute inset-0 hidden group-hover:flex items-center justify-center gap-2 bg-black/40 rounded">
                      <button type="button" aria-label="Move left" disabled={idx===0} onClick={() => setForm((f)=>{ const arr=[...(f.images??[])]; if(idx>0){[arr[idx-1],arr[idx]]=[arr[idx],arr[idx-1]];} return { ...f, images: arr }; })} className="h-7 w-7 rounded bg-white/80 text-black text-xs">←</button>
                      <button type="button" aria-label="Move right" disabled={idx===(form.images!.length-1)} onClick={() => setForm((f)=>{ const arr=[...(f.images??[])]; if(idx<arr.length-1){[arr[idx+1],arr[idx]]=[arr[idx],arr[idx+1]];} return { ...f, images: arr }; })} className="h-7 w-7 rounded bg-white/80 text-black text-xs">→</button>
                      <button type="button" aria-label="Remove" onClick={() => setForm((f)=>({ ...f, images: (f.images??[]).filter((x)=>x!==u) }))} className="h-7 w-7 rounded bg-red-600 text-white text-xs">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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


