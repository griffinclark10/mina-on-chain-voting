import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should display the correct page header for desktop', async ({ page }) => {
    // This assumes the 'hidden' class is effectively hiding the element on mobile
    const headerDesktop = page.locator('.md\\:block >> h1');
    await expect(headerDesktop).toContainText('Mina On-Chain Voting');

    const descriptionDesktop = page.locator('.md\\:block >> h2');
    await expect(descriptionDesktop).toContainText('View and track the progress of Mina Improvement Proposals (MIPs).');
  });

  test('should display the correct page header for mobile', async ({ page }) => {
    // Use the 'md:hidden' class to target the mobile header
    const headerMobile = page.locator('.md\\:hidden >> h1');
    await expect(headerMobile).toContainText('Mina On-Chain Voting');

    const descriptionMobile = page.locator('.md\\:hidden >> h2');
    await expect(descriptionMobile).toContainText('View and track the progress of Mina Improvement Proposals (MIPs).');
  });
});
