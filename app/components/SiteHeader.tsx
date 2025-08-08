"use client";

import Link from "next/link";
import ThemeToggle from "@/app/components/theme/ThemeToggle";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function SiteHeader() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then((result: { data: { session: import("@supabase/supabase-js").Session | null } }) => setSignedIn(!!result.data.session?.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_event: import("@supabase/supabase-js").AuthChangeEvent, session: import("@supabase/supabase-js").Session | null) => setSignedIn(!!session?.user));
    return () => sub.subscription.unsubscribe();
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg gradient-text">Property Ireland</Link>
        <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link href="/listings" className="hover:text-foreground">Browse</Link>
          <Link href="/account/listings/new" className="hover:text-foreground">Create listing</Link>
          {signedIn ? (
            <div className="flex items-center gap-3">
              <Link href="/account/profile" className="hover:text-foreground">Account</Link>
              <button
                onClick={() => supabase.auth.signOut()}
                className="rounded-md px-3 py-1.5 bg-foreground/10 hover:bg-foreground/20 text-foreground"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth/sign-in" className="hover:text-foreground">Sign in</Link>
              <Link href="/auth/sign-up" className="rounded-md px-3 py-1.5 bg-foreground/10 hover:bg-foreground/20 text-foreground">Sign up</Link>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}


