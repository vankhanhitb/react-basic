import { z } from "zod";

export const quantityTierSchema = z.object({
  minQuantity: z.number().int().min(2, "Minimum quantity starts at 2"),
  discountPercent: z.number().int().min(1).max(80),
});

export const productInputSchema = z
  .object({
    name: z.string().trim().min(3, "Name must contain at least 3 characters").max(100),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(100)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens"),
    description: z.string().trim().max(500),
    basePrice: z.number().positive("Price must be greater than zero").max(1_000_000),
    inventory: z.number().int().min(0).max(1_000_000),
    tiers: z.array(quantityTierSchema).min(1).max(5),
  })
  .superRefine((data, context) => {
    const quantities = data.tiers.map((tier) => tier.minQuantity);

    if (new Set(quantities).size !== quantities.length) {
      context.addIssue({
        code: "custom",
        path: ["tiers"],
        message: "Each tier must use a different minimum quantity",
      });
    }

    for (let index = 1; index < data.tiers.length; index += 1) {
      const previous = data.tiers[index - 1];
      const current = data.tiers[index];

      if (previous && current && current.minQuantity <= previous.minQuantity) {
        context.addIssue({
          code: "custom",
          path: ["tiers", index, "minQuantity"],
          message: "Quantities must increase from one tier to the next",
        });
      }

      if (previous && current && current.discountPercent <= previous.discountPercent) {
        context.addIssue({
          code: "custom",
          path: ["tiers", index, "discountPercent"],
          message: "Discounts must increase from one tier to the next",
        });
      }
    }
  });

export type ProductInput = z.infer<typeof productInputSchema>;
