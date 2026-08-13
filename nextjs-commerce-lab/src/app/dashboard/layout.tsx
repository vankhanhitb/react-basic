import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth, signOut } from "@/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-slate-200 bg-slate-950 px-5 py-5 text-white lg:min-h-screen lg:border-b-0 lg:p-6">
        <div className="flex items-center justify-between lg:block">
          <Link className="flex items-center gap-3" href="/dashboard"><span className="grid size-9 place-items-center rounded-xl bg-amber-400 font-black text-slate-950">C</span><span className="font-semibold">Commerce Lab</span></Link>
          <nav className="flex gap-2 lg:mt-12 lg:block lg:space-y-2"><Link className="nav-link" href="/dashboard">Overview</Link><Link className="nav-link" href="/dashboard/products">Products</Link></nav>
        </div>
        <div className="mt-6 hidden border-t border-white/10 pt-6 lg:block">
          <p className="text-sm font-medium">{session.user.name}</p><p className="mt-1 text-xs text-slate-400">{session.user.email}</p>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}><button className="mt-4 text-sm text-slate-400 hover:text-white" type="submit">Sign out →</button></form>
        </div>
      </aside>
      <main className="min-w-0 p-5 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
