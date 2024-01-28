import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4321');
    });

    test('search updates URL with query parameter', async ({ page }) => {
        await page.fill('input#searchInput', 'example proposal');
        await page.dispatchEvent('input#searchInput', 'blur');
        const url = page.url();
        expect(url).toContain('?search=example+proposal');
    }); 

    test('Search value filters table based on searched value', async ({ page }) => {
        await page.fill('input#searchInput', 'Kimchi');
        await page.dispatchEvent('input#searchInput', 'blur');
        const url = page.url();
        expect(url).toContain('?search=Kimchi');
        const applyButton = page.locator('.apply-filters');
        await applyButton.click();
        const table = await page.$('table');
        const rows = await table?.$$('tr');
        expect(rows?.length).toBe(2);
    }); 

    test('reset button resets search value', async ({ page }) => {
        await page.fill('input#searchInput', 'Kimchi');
        await page.dispatchEvent('input#searchInput', 'blur');
        const applyButton = page.locator('.apply-filters');
        await applyButton.click();
        const resetDiv = page.locator('#reset-div');
        expect(await resetDiv.isHidden()).toBe(false);
        const resetButton = page.locator('#reset-button');
        await resetButton.click();
        const url = page.url();
        expect(url).toBe('http://localhost:4321/');
    });

    test('applying filters refreshes the page with URL parameters & updates card elements depending on number of filters selected', async ({ page }) => {
        await page.click('#toggle-popover-Status');
        await page.click('text=Pending');
        const badge = page.locator('.badge-container').nth(0);
        expect(await badge.innerText()).toContain('Pending');
        await page.click('text=Apply');
        await page.waitForLoadState('networkidle');
        const url = page.url();
        expect(url).toContain('Status=Pending');

        await page.click('#toggle-popover-Status');
        await page.click('text=Completed');
        await page.click('text=In Review');
        const countBadge = page.locator('.selected-count-badge').nth(0);
        expect(await countBadge.innerText()).toContain('3');
        await page.click('text=Apply');
    });

    test('No results message is displayed when no results are found', async ({ page }) => {
        await page.fill('input#searchInput', 'abcdefghijklmnopqrstuvwxyz');
        await page.dispatchEvent('input#searchInput', 'blur');
        const applyButton = page.locator('.apply-filters');
        await applyButton.click();
        const noResults = page.locator('tr >> td');
        expect(await noResults.innerText()).toBe('No Results.');
    });
});