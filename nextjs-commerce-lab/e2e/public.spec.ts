import { expect, test } from "@playwright/test";

test("explains the full-stack learning flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /understand the stack/i })).toBeVisible();
  await expect(page.getByText("Zod validates untrusted input")).toBeVisible();
});

test("protects dashboard routes", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/sign-in/);
});
