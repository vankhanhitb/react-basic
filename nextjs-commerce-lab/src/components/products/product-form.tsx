"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { createProductAction } from "@/actions/products";
import { productInputSchema, type ProductInput } from "@/domain/product/product.schema";
import { calculateLinePrice } from "@/domain/product/pricing";
import { formatMoney } from "@/lib/format";

export function ProductForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      basePrice: 32,
      inventory: 20,
      tiers: [
        { minQuantity: 2, discountPercent: 10 },
        { minQuantity: 4, discountPercent: 15 },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "tiers" });
  const preview = useWatch({ control });
  const previewTiers = (preview.tiers ?? []).flatMap((tier) =>
    typeof tier.minQuantity === "number" && typeof tier.discountPercent === "number"
      ? [{ minQuantity: tier.minQuantity, discountPercent: tier.discountPercent }]
      : [],
  );
  const previewTier = previewTiers.at(-1);
  const previewQuantity = previewTier?.minQuantity ?? 1;
  const previewPrice = calculateLinePrice(
    Math.round((preview.basePrice ?? 0) * 100),
    Math.max(1, previewQuantity || 1),
    previewTiers,
  );

  async function onSubmit(values: ProductInput) {
    setServerError(null);
    const result = await createProductAction(values);

    if (!result.ok) {
      setServerError(result.message);
      return;
    }

    router.push("/dashboard/products");
    router.refresh();
  }

  return (
    <form className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <section className="panel space-y-5">
          <div>
            <p className="eyebrow">Product data</p>
            <h2 className="mt-1 text-xl font-semibold">Basic information</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field-label sm:col-span-2">
              Product name
              <input className="field-input" {...register("name")} placeholder="Everyday Canvas Tote" />
              {errors.name && <span className="field-error">{errors.name.message}</span>}
            </label>

            <label className="field-label sm:col-span-2">
              URL slug
              <input className="field-input" {...register("slug")} placeholder="everyday-canvas-tote" />
              {errors.slug && <span className="field-error">{errors.slug.message}</span>}
            </label>

            <label className="field-label">
              Price (USD)
              <input className="field-input" type="number" step="0.01" {...register("basePrice", { valueAsNumber: true })} />
              {errors.basePrice && <span className="field-error">{errors.basePrice.message}</span>}
            </label>

            <label className="field-label">
              Inventory
              <input className="field-input" type="number" {...register("inventory", { valueAsNumber: true })} />
              {errors.inventory && <span className="field-error">{errors.inventory.message}</span>}
            </label>

            <label className="field-label sm:col-span-2">
              Description
              <textarea className="field-input min-h-28 resize-y" {...register("description")} />
              {errors.description && <span className="field-error">{errors.description.message}</span>}
            </label>
          </div>
        </section>

        <section className="panel space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Business rule</p>
              <h2 className="mt-1 text-xl font-semibold">Quantity break tiers</h2>
            </div>
            <button
              className="button-secondary"
              type="button"
              onClick={() => append({ minQuantity: fields.length * 2 + 2, discountPercent: fields.length * 5 + 10 })}
              disabled={fields.length >= 5}
            >
              Add tier
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div className="grid grid-cols-[1fr_1fr_auto] items-start gap-3 rounded-2xl border border-slate-200 p-4" key={field.id}>
                <label className="field-label">
                  Min quantity
                  <input className="field-input" type="number" {...register(`tiers.${index}.minQuantity`, { valueAsNumber: true })} />
                  {errors.tiers?.[index]?.minQuantity && <span className="field-error">{errors.tiers[index]?.minQuantity?.message}</span>}
                </label>
                <label className="field-label">
                  Discount %
                  <input className="field-input" type="number" {...register(`tiers.${index}.discountPercent`, { valueAsNumber: true })} />
                  {errors.tiers?.[index]?.discountPercent && <span className="field-error">{errors.tiers[index]?.discountPercent?.message}</span>}
                </label>
                <button className="mt-7 rounded-lg px-2 py-2 text-sm text-slate-500 hover:bg-red-50 hover:text-red-700" type="button" onClick={() => remove(index)} disabled={fields.length === 1}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          {errors.tiers?.root && <p className="field-error">{errors.tiers.root.message}</p>}
        </section>

        {serverError && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{serverError}</p>}

        <button className="button-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving product…" : "Save product"}
        </button>
      </div>

      <aside className="panel h-fit lg:sticky lg:top-6">
        <p className="eyebrow">Live derived state</p>
        <h2 className="mt-1 text-xl font-semibold">Offer preview</h2>
        <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
          <p className="text-sm text-slate-400">Buy {previewQuantity}</p>
          <p className="mt-2 text-3xl font-semibold">{formatMoney(previewPrice.totalCents)}</p>
          <p className="mt-2 text-sm text-emerald-300">
            Save {formatMoney(previewPrice.savingsCents)} ({previewPrice.discountPercent}%)
          </p>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          This preview is client-derived state. The same pure pricing function is tested with Vitest.
        </p>
      </aside>
    </form>
  );
}
