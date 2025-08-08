import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import ThemeToggle from "@/app/components/theme/ThemeToggle";

export default async function SiteHeader() {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg gradient-text">Property Ireland</Link>
        <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link href="/listings" className="hover:text-foreground">Browse</Link>
          <Link href="/account/listings/new" className="hover:text-foreground">Create listing</Link>
          {session?.user ? (
            <Link href="/account/profile" className="hover:text-foreground">Account</Link>
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


