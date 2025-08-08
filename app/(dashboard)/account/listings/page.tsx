import Link from "next/link";
import Button from "@/app/components/ui/Button";
import { createSupabaseServerComponentClient } from "@/app/lib/supabaseServer";


export default async function MyListingsPage() {
  const supabase = createSupabaseServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return <div className="py-8">Please sign in.</div>;
  const { data: listings } = await supabase
    .from("listings")
    .select("id,title,town,county")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  return (
    <div className="py-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My listings</h1>
        <Button asChild>
          <Link href="/account/listings/new">Create listing</Link>
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(listings ?? []).map((l: { id: string; title: string; town: string; county: string }) => (
          <Link key={l.id} href={`/listings/${l.id}`} className="card p-4 glow">
            <div className="font-medium">{l.title}</div>
            <div className="text-sm text-[var(--muted)]">{l.town}, {l.county}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


