"use client";

import { supabase } from "@/app/lib/supabaseClient";

const STORAGE_KEY = "saved-listing-ids";

async function getUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function getSavedIds(): Promise<string[]> {
  const userId = await getUserId();
  if (userId) {
    const { data } = await supabase.from("favorites").select("listing_id");
    return (data ?? []).map((r: { listing_id: string }) => r.listing_id);
  }
  // Fallback to localStorage when not signed in
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function setLocalSaved(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids))));
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  } catch {}
}

export async function isSaved(id: string): Promise<boolean> {
  const ids = await getSavedIds();
  return ids.includes(id);
}

export async function toggleSaved(id: string): Promise<boolean> {
  const userId = await getUserId();
  if (userId) {
    const { data } = await supabase.from("favorites").select("id").eq("listing_id", id).maybeSingle();
    if (data) {
      await supabase.from("favorites").delete().eq("listing_id", id);
      return false;
    }
    await supabase.from("favorites").insert({ listing_id: id });
    return true;
  }
  const current = new Set(await getSavedIds());
  let saved: boolean;
  if (current.has(id)) {
    current.delete(id);
    saved = false;
  } else {
    current.add(id);
    saved = true;
  }
  setLocalSaved(Array.from(current));
  return saved;
}


