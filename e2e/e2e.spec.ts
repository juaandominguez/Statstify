import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Statstify/);
});

test("Login page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveURL("http://localhost:3000/sign-in");

  await page.goto("http://localhost:3000/random");

  await expect(page).toHaveTitle(/404/);
});
