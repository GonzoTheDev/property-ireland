import { notFound } from "next/navigation";
import { getBaseUrl } from "@/app/lib/serverUrl";

async function fetchListing(id: string) {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/listings/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load listing");
  return res.json();
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await fetchListing(id);
  if (!listing) notFound();
  return (
    <div className="py-8 space-y-4">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-4">
          <div className="aspect-[4/3] card" />
          <div className="card p-4 space-y-2">
            <h1 className="text-2xl font-semibold">{listing.title}</h1>
            <div className="text-sm text-[var(--muted)]">{listing.addressLine1}, {listing.town}, {listing.county}</div>
            <div className="text-xl">€{(listing.price as number).toLocaleString()} {listing.type === "RENT" ? "/ month" : ""}</div>
          </div>
          <div className="card p-4">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line text-[var(--muted)]">{listing.description}</p>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="card p-4">
            <h3 className="font-medium mb-2">At a glance</h3>
            <div className="text-sm text-[var(--muted)]">{listing.bedrooms} bed • {listing.bathrooms} bath</div>
          </div>
        </aside>
      </div>
    </div>
  );
}


