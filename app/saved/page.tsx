"use client";

import { useEffect, useState } from "react";
import ListingCard, { Listing } from "@/app/components/ListingCard";
import { getSavedIds } from "@/app/lib/saved";

export default function SavedListingsPage() {
  const [ids, setIds] = useState<string[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    function refresh() {
      setIds(getSavedIds());
    }
    refresh();
    const handler = () => refresh();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  useEffect(() => {
    async function load() {
      if (!ids.length) {
        setListings([]);
        return;
      }
      const resp = await fetch(`/api/listings?ids=${encodeURIComponent(ids.join(","))}`);
      if (!resp.ok) return;
      const data = await resp.json();
      setListings(data);
    }
    load();
  }, [ids]);

  return (
    <div className="py-8 space-y-6">
      <h1 className="text-3xl font-semibold">Saved properties</h1>
      {!ids.length ? (
        <p className="text-[var(--muted)]">You have no saved properties yet. Tap the bookmark icon on any property to save it.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}


