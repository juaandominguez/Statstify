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

  // await page.getByTestId("login-username").click();
  // await page.getByTestId("login-username").fill(process.env.TEST_USERNAME!);
  // await page.getByTestId("login-password").click();
  // await page.getByTestId("login-password").fill(process.env.TEST_PASSWORD!);

  // await page.getByTestId("login-button").click();

  // await page.getByLabel("Months").check();
  // await page.getByLabel("Lifetime").check();
  // await page.getByLabel("Weeks").check();

  // await page.locator(".flex > div > a").first().click();
  // await page.getByRole("link", { name: "album cover" }).click();
  // await page.getByPlaceholder("Search").click();
  // await page.getByPlaceholder("Search").fill("drake");
  // await page.getByPlaceholder("Search").press("Enter");
  // await page
  //   .locator("div")
  //   .filter({ hasText: /^Drake$/ })
  //   .getByRole("link")
  //   .first()
  //   .click();

  // // Expects page to have a heading with the name of Installation.
  // await expect(
  //   page.getByRole("heading", { name: "Installation" }),
  // ).toBeVisible();
});
