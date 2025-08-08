import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/app/lib/supabaseServer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as "RENT" | "SALE" | null;
  const county = searchParams.get("county");
  const q = searchParams.get("q");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const beds = searchParams.get("beds");
  const idsParam = searchParams.get("ids");

  const supabase = createSupabaseRouteClient();
  let query = supabase
    .from("listings")
    .select("*, images:listings_images(*)")
    .order("created_at", { ascending: false })
    .limit(50);

  if (idsParam) {
    const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
    if (ids.length) query = query.in("id", ids);
  }
  if (type) query = query.eq("type", type);
  if (county) query = query.eq("county", county);
  if (q) query = query.or(`title.ilike.%${q}%,town.ilike.%${q}%`);
  if (minPrice) query = query.gte("price", Number(minPrice));
  if (maxPrice) query = query.lte("price", Number(maxPrice));
  if (beds) query = query.gte("bedrooms", Number(beds));

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data ?? []);
}

// Listing creation is handled at /api/account/listings with auth


