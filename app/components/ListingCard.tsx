import Link from "next/link";

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
  return (
    <Link href={href} className="card overflow-hidden glow block">
      <div className="aspect-[4/3] bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-2)]/20" />
      <div className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white/90">{listing.title}</h3>
          <span className="text-white text-sm bg-white/10 rounded px-2 py-0.5">{listing.type}</span>
        </div>
        <div className="text-sm text-[var(--muted)]">{listing.town}, {listing.county}</div>
        <div className="text-[15px]">{price}</div>
        <div className="text-xs text-[var(--muted)]">{listing.bedrooms} bed • {listing.bathrooms} bath</div>
      </div>
    </Link>
  );
}


