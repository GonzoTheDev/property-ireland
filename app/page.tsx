import Link from "next/link";
import Button from "@/app/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-[70vh] py-14">
      <section className="text-center space-y-5">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          <span className="gradient-text">Next‑generation</span> Irish property search
        </h1>
        <p className="text-[var(--muted)] max-w-2xl mx-auto">
          Sleek, fast, and modern platform to discover properties for sale and to rent across Ireland.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/listings?type=SALE"><Button>For Sale</Button></Link>
          <Link href="/listings?type=RENT"><Button variant="ghost">To Rent</Button></Link>
        </div>
      </section>
    </div>
  );
}
