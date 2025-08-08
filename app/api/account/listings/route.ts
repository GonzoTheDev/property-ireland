import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/app/lib/supabaseServer";

export async function POST(req: Request) {
  const supabase = createSupabaseRouteClient();
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user ?? null;
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const payload = await req.json();
  console.log("[API] create listing payload", payload);
  const insert = {
    title: payload.title,
    description: payload.description,
    type: payload.type,
    price: payload.price,
    bedrooms: payload.bedrooms,
    bathrooms: payload.bathrooms,
    area_sqm: payload.areaSqM ?? null,
    furnished: payload.furnished ?? null,
    address_line1: payload.addressLine1,
    address_line2: payload.addressLine2 ?? null,
    town: payload.town,
    county: payload.county,
    eircode: payload.eircode ?? null,
    latitude: payload.latitude ?? null,
    longitude: payload.longitude ?? null,
    amenities: payload.amenities ?? [],
    user_id: user.id,
  };
  const { data, error } = await supabase.from("listings").insert(insert).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  console.log("[API] created listing id", data.id);
  if (Array.isArray(payload.images) && payload.images.length) {
    const rows = payload.images.map((url: string, i: number) => ({ url, order_index: i, listing_id: data.id }));
    const { error: imgErr } = await supabase.from("listings_images").insert(rows);
    if (imgErr) return NextResponse.json({ error: imgErr.message }, { status: 400 });
  }
  return NextResponse.json(data);
}


