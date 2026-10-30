import { test, expect } from '@playwright/test';
import { androidChecksum, androidDownloadUrl, checksum, desktopVersion, downloadUrl } from '../lib/site';

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

test('Android validation install is linked without replacing the Windows package', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Install Android (validation)', exact: true })).toHaveAttribute('href', androidDownloadUrl);
  await expect(page.getByRole('link', { name: 'Download for Windows', exact: true }).first()).toHaveAttribute('href', downloadUrl);
  await page.goto('android/');
  await expect(page.getByRole('heading', { name: 'Install TKD Scoring on Android.' })).toBeVisible();
  await expect(page.getByText(/universal ARM \(32-bit \+ 64-bit\)/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download Android APK', exact: true })).toHaveAttribute('href', androidDownloadUrl);
  await expect(page.getByText('Validation only — not a production release.')).toBeVisible();
  await expect(page.getByText(androidChecksum, { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'FR', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Installer TKD Scoring sur Android.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Télécharger l’APK Android', exact: true })).toHaveAttribute('href', androidDownloadUrl);
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

test('v1.2.1 downloads and paid activation guidance stay consistent', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main').getByRole('link', { name: 'Download for Windows', exact: true }).first()).toHaveAttribute('href', downloadUrl);
  await expect(page.getByText(`Desktop v${desktopVersion} · Windows 10/11 x64`)).toBeVisible();

  await page.goto('guide/');
  await expect(page.getByRole('link', { name: `Download v${desktopVersion}`, exact: true })).toHaveAttribute('href', downloadUrl);
  await expect(page.getByText(checksum, { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Request a license' })).toHaveAttribute('href', /\/subscription\/$/);
  await page.getByRole('textbox', { name: 'Search the guide' }).fill('F11');
  await expect(page.getByRole('heading', { name: '6. Run a match' })).toBeVisible();
  await expect(page.getByText(/F11 toggles fullscreen/)).toBeVisible();
  await page.getByRole('textbox', { name: 'Search the guide' }).fill('wrong-device');
  await expect(page.getByRole('heading', { name: '3. First run' })).toBeVisible();
  await expect(page.getByText(/A tampered, expired or wrong-device license is rejected/)).toBeVisible();

  await page.goto('subscription/');
  await expect(page.getByRole('heading', { name: 'Download TKD Scoring for Windows.' })).toBeVisible();
  await expect(page.getByTestId('subscription-download')).toHaveAttribute('href', downloadUrl);
  await expect(page.getByText('FREE INSTALLER · PAID ACTIVATION')).toBeVisible();
  await expect(page.getByText(/Tournament work requires a signed license/)).toBeVisible();
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
