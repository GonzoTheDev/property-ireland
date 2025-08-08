import Link from "next/link";
import Button from "@/app/components/ui/Button";
import ListingCard from "@/app/components/ListingCard";
import { createSupabaseServerComponentClient } from "@/app/lib/supabaseServer";

export default async function Home() {
  const supabase = createSupabaseServerComponentClient();
  const { data: latest } = await supabase
    .from("listings")
    .select("id,title,type,price,town,county,bedrooms,bathrooms")
    .order("created_at", { ascending: false })
    .limit(12);
  return (
    <div className="min-h-[70vh] py-14">
      <section className="text-center space-y-5">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          <span className="gradient-text">Next‑generation</span> Irish property search
        </h1>
        <p className="text-[var(--muted)] max-w-2xl mx-auto">
          Sleek, fast, and modern platform to discover properties for sale and to rent across Ireland.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/listings?type=SALE"><Button>For Sale</Button></Link>
          <Link href="/listings?type=RENT"><Button variant="ghost">To Rent</Button></Link>
        </div>
      </section>
      {latest?.length ? (
        <section className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Latest listings</h2>
            <Link href="/listings" className="text-sm text-[var(--accent)] hover:underline">View all</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest!.map((l) => (
              <ListingCard key={l.id} listing={l as any} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
