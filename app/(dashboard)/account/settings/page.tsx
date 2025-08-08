"use client";

import { useTheme } from "@/app/components/theme/ThemeProvider";
import Select from "@/app/components/ui/Select";

export default function SettingsPage() {
  const { preference, theme, setPreference } = useTheme();
  return (
    <div className="py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="card p-6 grid gap-4 max-w-xl">
        <div className="grid md:grid-cols-2 gap-3 items-center">
          <div>
            <div className="font-medium">Theme</div>
            <div className="text-sm text-[var(--muted)]">Choose light, dark, or follow your system preference.</div>
          </div>
          <Select
            value={preference}
            onChange={(e) => setPreference(e.target.value as "system" | "light" | "dark")}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </div>
        <div className="text-xs text-[var(--muted)]">Current theme: {theme}</div>
      </div>
    </div>
  );
}


