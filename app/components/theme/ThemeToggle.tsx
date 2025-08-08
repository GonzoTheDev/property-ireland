"use client";

import { useTheme } from "@/app/components/theme/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  const isDark = preference === "dark";
  return (
    <button
      onClick={() => setPreference(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative w-16 h-8 rounded-full transition-colors cursor-pointer ${
        isDark ? "bg-gray-600" : "bg-[var(--accent)]"
      }`}
    >
      <span
        className={`absolute top-[4px] left-[4px] h-6 w-6 rounded-full bg-white transition-transform grid place-items-center ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
    </button>
  );
}


