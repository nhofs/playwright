import { test, expect } from "@playwright/test";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
test("tests rental application inputs, errors, and submission", async ({
  page,
}) => {
  const rentalAppUrl =
    "/tenant-portal/rental-applications/listing?companyId=66c39698e06089d73242eb7d&source=CompanyLink";
  await page.goto(rentalAppUrl);
  await page.waitForLoadState();
  await page.getByTestId("Listing-ListingImage").first().click();

  const page1Promise = page.waitForEvent("popup");
  await page
    .getByTestId("Listing-ListingDetailsView-ApplyOnlineButton")
    .click();
  const page1 = await page1Promise;
  await page1.getByRole("textbox", { name: "Enter your Email" }).click();
  await page1
    .getByRole("textbox", { name: "Enter your Email" })
    .fill("nhofstee+" + Date.now() + "@doorloop.com");
  await page1
    .getByRole("checkbox", { name: "By clicking here, I confirm" })
    .click();
  await page1.getByRole("button", { name: "Go to the Application" }).click();
  await expect(
    page1.getByText("Enter the code we sent over email to")
  ).toBeVisible();

  // await page1.pause();
  const rl = readline.createInterface({
    input,
    output,
  });
  const otp = await rl.question("please enter the otp code:");
  rl.close();
  expect(page1.getByText("Let's Get Started.")).toBeVisible();
  await page1.getByRole("textbox", { name: "Enter the code" }).fill(otp);

  // page
  //   .getByRole("input", { name: "email" })
  //   .fill("nhofstee+whatever@doorloop.com");

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Doorloop/);
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });
