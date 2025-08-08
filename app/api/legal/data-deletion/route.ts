import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/app/lib/supabaseServer";

export async function POST(req: Request) {
  const { email, message } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
  const supabase = createSupabaseRouteClient();
  const { error } = await supabase.from("contact_messages").insert({ listing_id: "00000000-0000-0000-0000-000000000000", message: `[DATA DELETION] ${email}: ${message ?? ""}` });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}


