"use client";

const STORAGE_KEY = "saved-listing-ids";

export function getSavedIds(): string[] {
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

export function setSavedIds(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids))));
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  } catch {}
}

export function isSaved(id: string): boolean {
  return getSavedIds().includes(id);
}

export function toggleSaved(id: string): boolean {
  const ids = new Set(getSavedIds());
  let saved: boolean;
  if (ids.has(id)) {
    ids.delete(id);
    saved = false;
  } else {
    ids.add(id);
    saved = true;
  }
  setSavedIds(Array.from(ids));
  return saved;
}


