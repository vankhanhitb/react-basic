import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/format";
import { requireUser } from "@/lib/require-user";

export default async function ProductsPage() {
  const user = await requireUser();
  const products = await prisma.product.findMany({ where: { ownerId: user.id }, include: { tiers: { orderBy: { minQuantity: "asc" } } }, orderBy: { createdAt: "desc" } });
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-end justify-between gap-5"><div><p className="eyebrow">Catalog module</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Products</h1><p className="mt-3 text-slate-600">Relations are loaded on the server; no client fetch or Redux store is required.</p></div><Link className="button-primary" href="/dashboard/products/new">New product</Link></div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {products.map((product) => <article className="panel" key={product.id}><div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-semibold">{product.name}</h2><p className="mt-1 text-sm text-slate-500">/{product.slug}</p></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">{product.isActive ? "Active" : "Draft"}</span></div><div className="mt-6 flex items-end justify-between border-t border-slate-200 pt-5"><div><p className="text-sm text-slate-500">Base price</p><p className="mt-1 text-2xl font-semibold">{formatMoney(product.basePriceCents)}</p></div><p className="text-right text-sm text-slate-500">{product.inventory} in stock<br />{product.tiers.length} quantity tiers</p></div><div className="mt-5 flex flex-wrap gap-2">{product.tiers.map((tier) => <span className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800" key={tier.id}>Buy {tier.minQuantity}+ · {tier.discountPercent}% off</span>)}</div></article>)}
      </div>
    </div>
  );
}
