"use server";

import { revalidatePath } from "next/cache";
import { productInputSchema, type ProductInput } from "@/domain/product/product.schema";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/require-user";

export type CreateProductResult =
  | { ok: true; productId: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export async function createProductAction(input: ProductInput): Promise<CreateProductResult> {
  const user = await requireUser();
  const parsed = productInputSchema.safeParse(input);

  if (!parsed.success) {
    const flattened = parsed.error.flatten();
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: flattened.fieldErrors,
    };
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description || null,
        basePriceCents: Math.round(parsed.data.basePrice * 100),
        inventory: parsed.data.inventory,
        ownerId: user.id,
        tiers: {
          create: parsed.data.tiers,
        },
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/products");
    return { ok: true, productId: product.id };
  } catch (error: unknown) {
    const isDuplicate = error instanceof Error && error.message.includes("Unique constraint");
    return {
      ok: false,
      message: isDuplicate
        ? "That slug already belongs to another product."
        : "The product could not be saved. Please try again.",
    };
  }
}
