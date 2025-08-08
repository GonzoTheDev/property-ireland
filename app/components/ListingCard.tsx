"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, BedDouble, Bath } from "lucide-react";
import { toggleSaved, isSaved as initialIsSaved } from "@/app/lib/saved";

export type Listing = {
  id: string;
  title: string;
  type: "SALE" | "RENT";
  price: number;
  town: string;
  county: string;
  bedrooms: number;
  bathrooms: number;
};

export type ListingCardProps = { listing: Listing };

export default function ListingCard({ listing }: ListingCardProps) {
  const price = `€${Number(listing.price).toLocaleString()}${listing.type === "RENT" ? " / month" : ""}`;
  const href = `/listings/${listing.id}`;
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    initialIsSaved(listing.id).then(setIsSaved);
  }, [listing.id]);

  async function onToggleSave(e: React.MouseEvent) {
    e.preventDefault();
    const saved = await toggleSaved(listing.id);
    setIsSaved(saved);
  }
  return (
    <Link href={href} className="card overflow-hidden glow block group">
      <div className="relative">
        <Image
          src={`https://placehold.co/800x600/png?text=${encodeURIComponent(listing.title)}`}
          alt="Property thumbnail"
          width={800}
          height={600}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur">
            {listing.type === "RENT" ? "To Rent" : "For Sale"}
          </span>
          {/* Example promotional badge */}
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--accent)] text-white hidden md:inline">New</span>
        </div>
        <button
          aria-label={isSaved ? "Unsave" : "Save"}
          onClick={onToggleSave}
          className="absolute top-2 right-2 h-9 w-9 rounded-full bg-black/60 text-white backdrop-blur grid place-items-center hover:bg-black/70"
        >
          {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 text-white text-sm font-medium backdrop-blur">
          {price}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-foreground/90 group-hover:text-foreground transition-colors line-clamp-1">{listing.title}</h3>
        <div className="text-sm text-[var(--muted)] line-clamp-1">{listing.town}, {listing.county}</div>
        <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
          <span className="inline-flex items-center gap-1"><BedDouble size={14} /> {listing.bedrooms} bed</span>
          <span className="inline-flex items-center gap-1"><Bath size={14} /> {listing.bathrooms} bath</span>
        </div>
      </div>
    </Link>
  );
}


