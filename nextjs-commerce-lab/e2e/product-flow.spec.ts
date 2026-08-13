import { expect, test } from "@playwright/test";

test("signs in and creates a product with quantity tiers", async ({ page }) => {
  const slug = `practice-product-${Date.now()}`;

  await page.goto("/sign-in");
  await page.getByRole("button", { name: /sign in to dashboard/i }).click();
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.getByRole("link", { name: /create product/i }).click();
  await page.getByLabel("Product name").fill("Playwright Practice Product");
  await page.getByLabel("URL slug").fill(slug);
  await page.getByRole("button", { name: /save product/i }).click();

  await expect(page).toHaveURL(/\/dashboard\/products$/);
  await expect(page.getByRole("heading", { name: "Playwright Practice Product" })).toBeVisible();
});
