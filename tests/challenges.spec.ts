import { test, expect } from '@playwright/test';

test('locked user cannot login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', {
    name: /login/i,
  }).click();

  await expect(
    page.locator('[data-test="error"]')
  ).toContainText('locked out');
});


// Product Sorting

test('sort products low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', {
    name: /login/i,
  }).click();

  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption('lohi');

  const firstPrice = await page
    .locator('.inventory_item_price')
    .first()
    .textContent();

  expect(firstPrice).toBe('$7.99');
});


// Logout 

test('logout successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', {
    name: /login/i,
  }).click();

  await page.locator('#react-burger-menu-btn').click();

  await page.getByText('Logout').click();

  await expect(page).toHaveURL(
    'https://www.saucedemo.com/'
  );
});