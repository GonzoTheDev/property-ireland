import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";


export default async function MyListingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <div className="py-8">Please sign in.</div>;
  const listings = await prisma.listing.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" } });
  return (
    <div className="py-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My listings</h1>
        <Link href="/account/listings/new" className="rounded-md px-3 py-1.5 bg-white/10 hover:bg-white/20">Create listing</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => (
          <Link key={l.id} href={`/listings/${l.id}`} className="card p-4 glow">
            <div className="font-medium">{l.title}</div>
            <div className="text-sm text-[var(--muted)]">{l.town}, {l.county}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


