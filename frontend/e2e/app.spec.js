import { test, expect } from '@playwright/test';

test('landing page preserves the dealership inventory experience', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Car Dealership Inventory Management System/);
  await expect(page.getByRole('link', { name: 'Dealership Inventory' }).first()).toBeVisible();
  await expect(page.getByText('Inventory Management', { exact: true })).toBeVisible();
});

test('invalid login shows a user-facing error', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('nobody@example.com');
  await page.getByLabel('Password').fill('WrongPass123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText(/invalid email or password|login failed/i)).toBeVisible({ timeout: 10000 });
});

test('Admin can reach the real dashboard at desktop and mobile widths', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('admin@dealership.com');
  await page.getByLabel('Password').fill('change-me-in-development');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/\/admin/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible({ timeout: 10000 });
});

test('Admin can inspect seeded inventory, INR prices, filters, and out-of-stock state', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('admin@dealership.com');
  await page.getByLabel('Password').fill('change-me-in-development');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/\/admin/);
  await page.goto('/vehicles');

  await expect(page.getByRole('heading', { name: 'Maruti Suzuki' }).first()).toBeVisible();
  await expect(page.getByText('₹7,50,000')).toBeVisible();

  await page.getByPlaceholder('Make (e.g. Toyota)').fill('MG');
  await expect(page.getByText('MG')).toBeVisible();
  await expect(page.getByText('Hector')).toBeVisible();
  const unavailable = page.getByRole('button', { name: 'Unavailable' });
  await expect(unavailable).toHaveCount(1);
  await expect(unavailable).toBeDisabled();
});
