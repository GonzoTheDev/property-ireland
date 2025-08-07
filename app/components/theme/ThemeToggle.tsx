"use client";

import { useTheme } from "@/app/components/theme/ThemeProvider";

export default function ThemeToggle() {
  const { preference, theme, setPreference } = useTheme();
  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        aria-pressed={preference === "auto"}
        onClick={() => setPreference("auto")}
        className={`px-2 py-1 rounded ${preference === "auto" ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}
        title="Automatic (by daylight)"
      >Auto</button>
      <button
        aria-pressed={preference === "light"}
        onClick={() => setPreference("light")}
        className={`px-2 py-1 rounded ${preference === "light" ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}
        title="Light"
      >Light</button>
      <button
        aria-pressed={preference === "dark"}
        onClick={() => setPreference("dark")}
        className={`px-2 py-1 rounded ${preference === "dark" ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}
        title="Dark"
      >Dark</button>
      <span className="ml-2 text-[var(--muted)] hidden sm:inline">Theme: {theme}</span>
    </div>
  );
}


