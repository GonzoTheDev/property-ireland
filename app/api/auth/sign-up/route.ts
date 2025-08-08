import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/app/lib/supabaseServer";

export async function POST(req: Request) {
  const { name, email, password } = (await req.json()) ?? {};
  if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const supabase = createSupabaseRouteClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, user: data.user });
}


