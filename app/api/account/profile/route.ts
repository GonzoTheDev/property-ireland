import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/app/lib/supabaseServer";

export async function GET() {
  const supabase = createSupabaseRouteClient();
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user ?? null;
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { data, error } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data ?? {});
}

export async function POST(req: Request) {
  const supabase = createSupabaseRouteClient();
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user ?? null;
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const payload = await req.json();
  const upsert = { ...payload, user_id: user.id };
  const { data, error } = await supabase.from("profiles").upsert(upsert, { onConflict: "user_id" }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}


