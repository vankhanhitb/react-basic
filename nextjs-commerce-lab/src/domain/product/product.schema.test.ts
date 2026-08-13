import { describe, expect, it } from "vitest";
import { productInputSchema } from "./product.schema";

const validProduct = {
  name: "Everyday Canvas Tote",
  slug: "everyday-canvas-tote",
  description: "A useful product",
  basePrice: 32,
  inventory: 20,
  tiers: [
    { minQuantity: 2, discountPercent: 10 },
    { minQuantity: 4, discountPercent: 15 },
  ],
};

describe("product input contract", () => {
  it("accepts a well-formed product and offer", () => {
    expect(productInputSchema.safeParse(validProduct).success).toBe(true);
  });

  it("rejects slugs that are not URL-safe", () => {
    const result = productInputSchema.safeParse({ ...validProduct, slug: "Invalid Slug" });
    expect(result.success).toBe(false);
  });

  it("rejects quantity tiers that move backwards", () => {
    const result = productInputSchema.safeParse({
      ...validProduct,
      tiers: [
        { minQuantity: 4, discountPercent: 15 },
        { minQuantity: 2, discountPercent: 10 },
      ],
    });
    expect(result.success).toBe(false);
  });
});
