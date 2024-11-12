import { test, expect } from '@playwright/test';
function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 10); // 8 random characters
  return `testuser_${randomString}@example.com`;
}
test('should allow user to sing in', async ({ page }) => {
  await page.goto('http://localhost:5050/');

  // Expect a title "to contain" a substring.
  
  await page.getByRole("link",{name:"Sign In"}).click();
  await expect(page.getByRole("heading",{name:"Login to your Account"})).toBeVisible();
  await page.locator("[name=email]").fill("ishaanagarwal@gmail.com");
  await page.locator("[name=password]").fill("ishaan1203");
  await page.getByRole("button",{name:"Login"}).click();
  await expect(page.getByText("Logged In")).toBeVisible();
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
});
test('should allow user to register', async ({ page }) => {
  await page.goto('http://localhost:5050/');

  // Navigate to the Sign-In page
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Login to your Account" })).toBeVisible();

  // Click on Register button to navigate to Register page
  await page.getByRole("link", { name: "Register here" }).click();
  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible();

  // Fill out registration form
  await page.locator("[name=firstName]").fill("Ishaan");
  await page.locator("[name=lastName]").fill("Agarwal");
  await page.locator("[name=email]").fill(generateRandomEmail());
  await page.locator("[name=password]").fill("ishaan1203");
  await page.locator("[name=confirmPassword]").fill("ishaan1203");

  // Submit registration form
  await page.getByRole("button", { name: "Register" }).click();

  // Verify registration success message or redirection
  await expect(page.getByText("Registration Successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});



