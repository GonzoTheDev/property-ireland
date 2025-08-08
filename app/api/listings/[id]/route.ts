import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/app/lib/supabaseServer";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = createSupabaseRouteClient();
  const { data, error } = await supabase.from("listings").select("*").eq("id", id).single();
  if (error?.code === "PGRST116") return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}


