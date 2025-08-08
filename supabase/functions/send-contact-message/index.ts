// deno-lint-ignore-file no-explicit-any
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const { listingId, message } = await req.json();
  if (!listingId || !message) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

  // Example: insert into contact_messages table. In real app, also send an email via provider
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const { createClient } = await import("npm:@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabase.from("contact_messages").insert({ listing_id: listingId, message }).select("*").single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify({ ok: true, id: data.id }), { headers: { "Content-Type": "application/json" } });
}

// @ts-ignore: Edge functions export
serve(handler);



