"use client";

import { useTheme } from "@/app/components/theme/ThemeProvider";
import { Moon, Sun, MoonStar } from "lucide-react";

export default function ThemeToggle() {
  const { preference, theme, setPreference } = useTheme();
  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        aria-pressed={preference === "system"}
        onClick={() => setPreference("system")}
        className={`px-2 h-8 inline-flex items-center gap-1 rounded ${preference === "system" ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}
        title="System theme"
      >
        <MoonStar size={16} />
        <span className="hidden md:inline">System</span>
      </button>
      <button
        aria-pressed={preference === "light"}
        onClick={() => setPreference("light")}
        className={`px-2 h-8 inline-flex items-center gap-1 rounded ${preference === "light" ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}
        title="Light"
      >
        <Sun size={16} />
        <span className="hidden md:inline">Light</span>
      </button>
      <button
        aria-pressed={preference === "dark"}
        onClick={() => setPreference("dark")}
        className={`px-2 h-8 inline-flex items-center gap-1 rounded ${preference === "dark" ? "bg-white/20" : "bg-white/10 hover:bg-white/20"}`}
        title="Dark"
      >
        <Moon size={16} />
        <span className="hidden md:inline">Dark</span>
      </button>
      <span className="ml-2 text-[var(--muted)] hidden sm:inline">{theme}</span>
    </div>
  );
}


