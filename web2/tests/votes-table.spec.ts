import { test, expect } from '@playwright/test';

test.describe('Votes Table Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/proposal/4/results');
  });

  test('should display the votes table', async ({ page }) => {
    const table = page.locator('table');
    await expect(table).toBeVisible();
  });

  test('table headers are displayed in the correct order', async ({ page }) => {
    const headers = page.locator('table#data-table >> thead >> tr >> th');
    await expect(headers.nth(0)).toHaveText('Height');
    await expect(headers.nth(1)).toHaveText('Timestamp');
    await expect(headers.nth(2)).toHaveText('Account');
    await expect(headers.nth(3)).toHaveText('Hash');
    await expect(headers.nth(4)).toHaveText('Vote');
    await expect(headers.nth(5)).toHaveText('Status');
  });

  test('should display hvercard for hover on status table element', async ({ page }) => {
    const completedStatusElement = page.locator('.hover-card-trigger').nth(1);
    await completedStatusElement.hover();

    const hoverCardContent = page.locator('.hover-card-content').nth(1);

    await expect(hoverCardContent).toBeVisible();
  });

  test('should display the first page of the table by default', async ({ page }) => {
    const pageText = page.locator('#page-indicator');
    await expect(pageText).toContainText('Page 1 of');
  });

  test('first two pagination buttons should be disabled on page 1', async ({ page }) => {
    const firstPageButton = page.locator('#first-page');
    const previousPageButton = page.locator('#prev-page');
    await expect(firstPageButton).toBeDisabled();
    await expect(previousPageButton).toBeDisabled();
  });

  test('last two pagination buttons should be disabled on last page', async ({ page }) => {
    const lastPageButton = page.locator('#last-page');
    await lastPageButton.click();
    const nextPageButton = page.locator('#next-page');
    await expect(lastPageButton).toBeDisabled();
    await expect(nextPageButton).toBeDisabled();
  });

  test('table should display no more than 10 rows', async ({ page }) => {
    const pageText = page.locator('#page-indicator');
    await expect(pageText).toContainText('Page 1');
    // Check for the presence of the 10th row
    const tenthRow = page.locator('table#data-table >> tbody >> tr').nth(9);
    await expect(tenthRow).toBeVisible();

    // Check for the absence of the 11th row
    const eleventhRow = page.locator('table#data-table >> tbody >> tr').nth(10);
    await expect(eleventhRow).toHaveCount(0);
  });
});
