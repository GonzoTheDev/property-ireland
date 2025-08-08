import AccountNav from "@/app/(dashboard)/account/AccountNav";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto p-6 grid gap-6 lg:grid-cols-[260px_1fr]">
      <AccountNav />
      <main className="min-w-0">{children}</main>
    </div>
  );
}


