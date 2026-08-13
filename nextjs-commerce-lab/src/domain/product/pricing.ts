export type QuantityTier = {
  minQuantity: number;
  discountPercent: number;
};

export function findApplicableTier(quantity: number, tiers: QuantityTier[]) {
  return [...tiers]
    .sort((left, right) => right.minQuantity - left.minQuantity)
    .find((tier) => quantity >= tier.minQuantity);
}

export function calculateLinePrice(
  unitPriceCents: number,
  quantity: number,
  tiers: QuantityTier[],
) {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Quantity must be a positive integer.");
  }

  const tier = findApplicableTier(quantity, tiers);
  const discountPercent = tier?.discountPercent ?? 0;
  const subtotalCents = unitPriceCents * quantity;
  const totalCents = Math.round(subtotalCents * (1 - discountPercent / 100));

  return {
    subtotalCents,
    discountPercent,
    totalCents,
    savingsCents: subtotalCents - totalCents,
  };
}
