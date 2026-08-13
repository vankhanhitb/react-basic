import { describe, expect, it } from "vitest";
import { calculateLinePrice, findApplicableTier } from "./pricing";

const tiers = [
  { minQuantity: 2, discountPercent: 10 },
  { minQuantity: 4, discountPercent: 15 },
  { minQuantity: 8, discountPercent: 20 },
];

describe("quantity-break pricing", () => {
  it("uses no discount below the first tier", () => {
    expect(calculateLinePrice(3200, 1, tiers)).toEqual({
      subtotalCents: 3200,
      discountPercent: 0,
      totalCents: 3200,
      savingsCents: 0,
    });
  });

  it("selects the highest eligible tier regardless of input order", () => {
    expect(findApplicableTier(5, [...tiers].reverse())).toEqual({
      minQuantity: 4,
      discountPercent: 15,
    });
  });

  it("calculates total and savings in integer cents", () => {
    expect(calculateLinePrice(3200, 4, tiers)).toEqual({
      subtotalCents: 12800,
      discountPercent: 15,
      totalCents: 10880,
      savingsCents: 1920,
    });
  });

  it("rejects invalid quantities", () => {
    expect(() => calculateLinePrice(3200, 0, tiers)).toThrow("positive integer");
  });
});
