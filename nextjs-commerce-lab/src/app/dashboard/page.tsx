import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/format";
import { requireUser } from "@/lib/require-user";

export default async function DashboardPage() {
  const user = await requireUser();
  const [products, productCount, tierCount, inventory] = await Promise.all([
    prisma.product.findMany({ where: { ownerId: user.id }, include: { tiers: true }, orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.product.count({ where: { ownerId: user.id } }),
    prisma.quantityTier.count({ where: { product: { ownerId: user.id } } }),
    prisma.product.aggregate({ where: { ownerId: user.id }, _sum: { inventory: true } }),
  ]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Server-rendered dashboard</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Commerce overview</h1><p className="mt-3 text-slate-600">Data queried directly with Prisma after Auth.js resolves the current user.</p></div><Link className="button-primary" href="/dashboard/products/new">Create product</Link></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[["Products", productCount], ["Offer tiers", tierCount], ["Inventory units", inventory._sum.inventory ?? 0]].map(([label, value]) => <article className="panel" key={label}><p className="text-sm text-slate-500">{label}</p><p className="mt-4 text-4xl font-semibold tracking-tight">{value}</p></article>)}
      </div>
      <section className="panel mt-6">
        <div className="flex items-center justify-between"><div><p className="eyebrow">PostgreSQL query</p><h2 className="mt-1 text-xl font-semibold">Recent products</h2></div><Link className="text-sm font-semibold text-amber-700" href="/dashboard/products">View all →</Link></div>
        <div className="mt-6 divide-y divide-slate-200">
          {products.length === 0 ? <p className="py-10 text-center text-slate-500">No products yet. Create your first data flow.</p> : products.map((product) => <div className="grid gap-3 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-center" key={product.id}><div><p className="font-semibold">{product.name}</p><p className="mt-1 text-sm text-slate-500">/{product.slug}</p></div><span className="text-sm text-slate-500">{product.tiers.length} tiers</span><span className="font-mono text-sm font-semibold">{formatMoney(product.basePriceCents)}</span></div>)}
        </div>
      </section>
    </div>
  );
}
