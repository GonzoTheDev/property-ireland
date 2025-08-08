import AccountNav from "@/app/(dashboard)/account/AccountNav";
import { createSupabaseServerComponentClient } from "@/app/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseServerComponentClient();
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/auth/sign-in");
  }
  return (
    <div className="max-w-6xl mx-auto p-6 grid gap-6 lg:grid-cols-[260px_1fr]">
      <AccountNav />
      <main className="min-w-0">{children}</main>
    </div>
  );
}


