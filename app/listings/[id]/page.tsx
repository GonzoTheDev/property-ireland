import { notFound } from "next/navigation";
import Image from "next/image";
import { BedDouble, Bath, MapPin, Image as ImageIcon } from "lucide-react";
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
          <div className="card overflow-hidden">
            <div className="grid grid-cols-5 gap-1 p-1">
              <Image src={`https://placehold.co/1200x900/png?text=${encodeURIComponent(listing.title)}`} alt="Primary image" width={1200} height={900} className="col-span-5 lg:col-span-3 aspect-[4/3] w-full object-cover rounded" />
              <Image src={`https://placehold.co/800x600/png?text=Interior`} alt="Interior" width={800} height={600} className="hidden lg:block col-span-2 aspect-video w-full object-cover rounded" />
              <Image src={`https://placehold.co/800x600/png?text=Kitchen`} alt="Kitchen" width={800} height={600} className="hidden lg:block col-span-2 aspect-video w-full object-cover rounded" />
              <Image src={`https://placehold.co/800x600/png?text=Bedroom`} alt="Bedroom" width={800} height={600} className="hidden lg:block col-span-2 aspect-video w-full object-cover rounded" />
            </div>
          </div>
          <div className="card p-4 space-y-2">
            <h1 className="text-2xl font-semibold">{listing.title}</h1>
            <div className="text-sm text-[var(--muted)] inline-flex items-center gap-1"><MapPin size={14} />{listing.addressLine1}, {listing.town}, {listing.county}</div>
            <div className="text-xl font-medium">€{(listing.price as number).toLocaleString()} {listing.type === "RENT" ? "/ month" : ""}</div>
          </div>
          <div className="card p-4">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line text-[var(--muted)]">{listing.description}</p>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="card p-4">
            <h3 className="font-medium mb-2">At a glance</h3>
            <div className="text-sm text-[var(--muted)] flex items-center gap-4">
              <span className="inline-flex items-center gap-1"><BedDouble size={16} /> {listing.bedrooms} bed</span>
              <span className="inline-flex items-center gap-1"><Bath size={16} /> {listing.bathrooms} bath</span>
            </div>
          </div>
          <div className="card p-4">
            <h3 className="font-medium mb-2">Location</h3>
            <div className="aspect-video rounded overflow-hidden bg-foreground/10 grid place-items-center text-[var(--muted)]">
              <ImageIcon className="opacity-60" />
              <span className="sr-only">Map preview placeholder</span>
            </div>
          </div>
          <div className="card p-4">
            <button className="w-full h-11 rounded-md bg-[var(--accent)] text-white font-medium">Contact agent</button>
          </div>
        </aside>
      </div>
    </div>
  );
}


