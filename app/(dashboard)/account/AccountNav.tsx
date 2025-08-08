"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Settings, Home, Plus } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/settings", label: "Settings", icon: Settings },
  { href: "/account/listings", label: "My Listings", icon: Home },
  { href: "/account/listings/new", label: "Create listing", icon: Plus },
];

export default function AccountNav() {
  const pathname = usePathname();
  return (
    <aside className="card p-2 h-max">
      <nav className="grid">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/account/listings" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              data-active={active}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--muted)] hover:bg-foreground/5 data-[active=true]:bg-foreground/10 data-[active=true]:text-foreground"
            >
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}


