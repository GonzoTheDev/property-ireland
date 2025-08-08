"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ThemePreference = "system" | "light" | "dark";
type EffectiveTheme = "light" | "dark";

type ThemeContextValue = {
  preference: ThemePreference;
  theme: EffectiveTheme;
  setPreference: (pref: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function computeSystemTheme(): EffectiveTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [theme, setTheme] = useState<EffectiveTheme>("dark");

  // Load saved preference
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("theme-preference") as ThemePreference | null) : null;
    setPreference(saved ?? "system");
  }, []);

  // Apply theme + keep in sync with auto mode
  useEffect(() => {
    function apply(t: EffectiveTheme) {
      const root = document.documentElement;
      // Smooth theme transition
      root.style.transition = "background-color 200ms ease, color 200ms ease";
      root.setAttribute("data-theme", t);
      setTheme(t);
      // Remove transition after it runs to avoid affecting other animations
      window.setTimeout(() => {
        root.style.transition = "";
      }, 250);
    }

    if (preference === "system") {
      const current = computeSystemTheme();
      apply(current);
      // React to OS preference changes
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => apply(mq.matches ? "dark" : "light");
      mq.addEventListener?.("change", handler);
      return () => mq.removeEventListener?.("change", handler);
    }

    apply(preference);
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


