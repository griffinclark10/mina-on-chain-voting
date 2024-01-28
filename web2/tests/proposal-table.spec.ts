import { test, expect } from '@playwright/test';


test.describe('Proposal Table Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4321');
    });

    test('should display the proposal table', async ({ page }) => {
        const table = page.locator('table');
        await expect(table).toBeVisible();
    });

    test('table headers are displayed in the correct order', async ({ page }) => {
        const headers = page.locator('table#data-table >> thead >> tr >> th');
        await expect(headers.nth(0)).toHaveText('Key');
        await expect(headers.nth(1)).toHaveText('Title');
        await expect(headers.nth(2)).toHaveText('Status');
        await expect(headers.nth(3)).toHaveText('Voting Start');
        await expect(headers.nth(4)).toHaveText('Voting End');
    });

    test('should display the correct number of proposals', async ({ page }) => {
        const proposalRows = page.locator('table >> tbody >> tr');
        await expect(proposalRows).toHaveCount(3); // Assuming there are 3 proposals
    });

    test('should have a Results link for each proposal', async ({ page }) => {
        const resultsLinks = page.locator('table >> tbody >> tr >> a:has-text("results")');
        await expect(resultsLinks).toHaveCount(3);
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
});