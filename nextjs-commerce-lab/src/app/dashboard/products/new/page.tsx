import Link from "next/link";
import { ProductForm } from "@/components/products/product-form";

export default function NewProductPage() {
  return <div className="mx-auto max-w-6xl"><Link className="text-sm font-medium text-slate-500 hover:text-slate-950" href="/dashboard/products">← Products</Link><div className="mt-6"><p className="eyebrow">Mutation workflow</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Create a quantity offer</h1><p className="mt-3 max-w-3xl text-slate-600">Client form state is convenient; the server still validates, authorizes and owns the database write.</p></div><div className="mt-8"><ProductForm /></div></div>;
}
