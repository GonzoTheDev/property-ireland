import { getBaseUrl } from "@/app/lib/serverUrl";
import SearchBar from "@/app/components/SearchBar";
import ListingCard from "@/app/components/ListingCard";
import Link from "next/link";

async function fetchListings() {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/listings`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load listings");
  return res.json();
}

export default async function ListingsPage() {
  const listings: import("@/app/components/ListingCard").Listing[] = await fetchListings();
  return (
    <div className="py-8 space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-semibold">Browse properties</h1>
        <Link href="/saved" className="text-sm text-[var(--accent)] hover:underline">View saved</Link>
      </div>
      <SearchBar />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}


