import { NextResponse } from "next/server";

// Proxies to Supabase Edge Function send-contact-message
export async function POST(req: Request) {
  const { listingId, message } = await req.json();
  if (!listingId || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-contact-message`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ listingId, message }),
  });
  if (!resp.ok) {
    let err: string | undefined;
    try {
      const data = await resp.json();
      err = data?.error;
    } catch {}
    return NextResponse.json({ error: err ?? "Failed" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}


