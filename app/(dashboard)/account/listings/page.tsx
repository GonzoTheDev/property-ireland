"use client";

import React from "react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";


export default function MyListingsPage() {
  const [listings, setListings] = React.useState<Array<{ id: string; title: string; town: string; county: string }>>([]);
  React.useEffect(() => {
    (async () => {
      const { createClientComponentClient } = await import("@supabase/auth-helpers-nextjs");
      const supabase = createClientComponentClient();
      const { data: session } = await supabase.auth.getSession();
      const uid = session.session?.user?.id;
      if (!uid) return;
      const { data } = await supabase
        .from("listings")
        .select("id,title,town,county")
        .eq("user_id", uid)
        .order("created_at", { ascending: false });
      setListings((data ?? []) as any);
    })();
  }, []);
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
          <div key={l.id} className="card p-4 glow space-y-2">
            <div className="font-medium line-clamp-1">{l.title}</div>
            <div className="text-sm text-[var(--muted)]">{l.town}, {l.county}</div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="h-9">
                <Link href={`/listings/${l.id}`}>View</Link>
              </Button>
              <Button
                variant="ghost"
                className="h-9 hover:bg-red-500/10 hover:text-red-500 cursor-pointer"
                onClick={async () => {
                  const ok = window.confirm("Delete this listing? This cannot be undone.");
                  if (!ok) return;
                  await fetch(`/api/account/listings/${l.id}`, { method: "DELETE" });
                  setListings((prev) => prev.filter((x) => x.id !== l.id));
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


