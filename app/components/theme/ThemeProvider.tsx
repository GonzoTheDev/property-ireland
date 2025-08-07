"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ThemePreference = "auto" | "light" | "dark";
type EffectiveTheme = "light" | "dark";

type ThemeContextValue = {
  preference: ThemePreference;
  theme: EffectiveTheme;
  setPreference: (pref: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function computeAutoTheme(now: Date = new Date()): EffectiveTheme {
  // Simple heuristic: day 07:00-19:00 local time is light, otherwise dark
  const hour = now.getHours();
  return hour >= 7 && hour < 19 ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("auto");
  const [theme, setTheme] = useState<EffectiveTheme>("dark");

  // Load saved preference
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("theme-preference") as ThemePreference | null) : null;
    setPreference(saved ?? "auto");
  }, []);

  // Apply theme + keep in sync with auto mode
  useEffect(() => {
    function apply(t: EffectiveTheme) {
      document.documentElement.setAttribute("data-theme", t);
      setTheme(t);
    }

    if (preference === "auto") {
      const current = computeAutoTheme();
      apply(current);
      // Recompute roughly every 15 minutes
      const id = setInterval(() => apply(computeAutoTheme()), 15 * 60 * 1000);
      return () => clearInterval(id);
    } else {
      apply(preference);
    }
  }, [preference]);

  const setPref = useCallback((pref: ThemePreference) => {
    setPreference(pref);
    try {
      localStorage.setItem("theme-preference", pref);
    } catch {}
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({ preference, theme, setPreference: setPref }), [preference, theme, setPref]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}


