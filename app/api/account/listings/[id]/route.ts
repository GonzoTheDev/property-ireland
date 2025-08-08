import { NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@/app/lib/supabaseServer";

export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = createSupabaseRouteClient();

  // Get images for this listing to remove from storage after DB delete
  const { data: session } = await supabase.auth.getSession();
  const user = session.session?.user ?? null;
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { data: images } = await supabase.from("listings_images").select("url").eq("listing_id", id);

  // Delete listing (RLS ensures only owner can delete)
  const { error: delErr } = await supabase.from("listings").delete().eq("id", id);
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 400 });

  // Best-effort storage cleanup
  const paths: string[] = (images ?? []).map((img) => {
    try {
      const u = new URL(img.url as string);
      const idx = u.pathname.indexOf("/listing-images/");
      if (idx === -1) return "";
      return u.pathname.substring(idx + "/listing-images/".length).replace(/^public\//, "");
    } catch {
      return "";
    }
  }).filter(Boolean);
  if (paths.length) {
    await supabase.storage.from("listing-images").remove(paths);
  }

  return NextResponse.json({ ok: true });
}


