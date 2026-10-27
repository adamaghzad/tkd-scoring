import { test, expect } from '@playwright/test';

test('product page presents the actual system and interactive score preview', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Every point. One source of truth.' })).toBeVisible();
  await expect(page.getByLabel('Animated scoreboard preview')).toBeVisible();
  await expect(page.locator('img[alt="Actual TKD Scoring tournament dashboard"]')).toBeVisible();
  await expect(page.locator('img[alt="Actual mobile judge controller"]')).toBeVisible();
  const score = page.locator('.score-blue .score-number');
  await expect(score).toHaveText('05');
  await page.getByRole('button', { name: 'Next exchange' }).click();
  await expect(score).toHaveText('06');
  await expect(page.locator('img').evaluateAll((images) => (images as HTMLImageElement[]).every((image) => image.complete && image.naturalWidth > 0))).toBeTruthy();
});

test('French language persists across product and guide pages', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'FR', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Chaque point. Une seule source de vérité.' })).toBeVisible();
  await page.goto('guide/');
  await expect(page.getByRole('heading', { name: 'Du téléchargement au premier match.' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '8. Résoudre un timeout téléphone' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Du téléchargement au premier match.' })).toBeVisible();
});

test('guide search, firewall instructions and print action are available', async ({ page }) => {
  await page.goto('guide/');
  await page.getByRole('textbox', { name: 'Search the guide' }).fill('firewall');
  await expect(page.getByRole('heading', { name: '8. Fix a phone timeout' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '1. What you need' })).toHaveCount(0);
  await expect(page.locator('code').filter({ hasText: 'New-NetFirewallRule' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Search the guide' }).fill('');
  await expect(page.getByRole('heading', { name: '9. Pre-event checklist' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Print guide' })).toBeVisible();
});

test('subscription validates details and prepares real WhatsApp and email requests', async ({ page }) => {
  await page.goto('subscription/?plan=club');
  await expect(page.locator('.subscription-card.selected h2')).toHaveText('Club');
  await page.getByRole('button', { name: /Annual/ }).click();
  await expect(page.locator('.selected-request-plan strong')).toHaveText('Club · 1990 MAD / year');
  await page.getByRole('button', { name: 'Prepare my request' }).click();
  await expect(page.getByText('Enter the club name (at least 2 characters).')).toBeVisible();
  await page.getByLabel('Club name').fill('Atlas Taekwondo');
  await page.getByLabel('Your name').fill('Adam Coach');
  await page.getByLabel('Email', { exact: true }).fill('coach@example.com');
  await page.getByLabel('Phone / WhatsApp').fill('+212 600112233');
  await page.getByRole('button', { name: 'Prepare my request' }).click();
  await expect(page.getByRole('heading', { name: 'Choose how to send it.' })).toBeVisible();
  const whatsapp = page.getByRole('link', { name: 'Send with WhatsApp' });
  const email = page.getByRole('link', { name: 'Send by email' });
  await expect(whatsapp).toHaveAttribute('href', /^https:\/\/wa\.me\/212614192699\?text=/);
  await expect(whatsapp).toHaveAttribute('href', /Atlas%20Taekwondo/);
  await expect(whatsapp).toHaveAttribute('href', /1990%20MAD/);
  await expect(email).toHaveAttribute('href', /^mailto:adam\.aghzaf@gmail\.com/);
});

test('guide remains available offline after the service worker installs', async ({ page, context }) => {
  await page.goto('/');
  await page.reload({ waitUntil: 'networkidle' });
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBeTruthy();
  await context.setOffline(true);
  await page.goto('guide/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'From download to first match.' })).toBeVisible();
});

test('mobile navigation and layouts do not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Guide' }).click();
  await expect(page).toHaveURL(/\/guide\/$/);
  await expect(page.getByRole('heading', { name: 'From download to first match.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.goto('subscription/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(page.getByRole('button', { name: 'Prepare my request' })).toBeVisible();
});
