import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="container h-16 flex items-center justify-between text-sm text-[var(--muted)]">
        <div>© {new Date().getFullYear()} Property Ireland</div>
        <nav className="flex items-center gap-6">
          <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
          <Link href="/data-deletion" className="hover:text-white">Data deletion</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}


