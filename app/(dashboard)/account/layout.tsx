export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto p-6 grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="border rounded p-4 space-y-2 h-max">
        <a href="/account/profile" className="block">Profile</a>
        <a href="/account/settings" className="block">Settings</a>
        <a href="/account/listings" className="block">My Listings</a>
      </aside>
      <main>{children}</main>
    </div>
  );
}


