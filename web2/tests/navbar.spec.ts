import { test, expect } from '@playwright/test';

test.describe('Navbar Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should display the navbar at the top of the page', async ({ page }) => {
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
  });

  test('should have a navigable FAQ link in the header', async ({ page }) => {
    const faqLink = page.locator('header a:has-text("FAQ")');
    await expect(faqLink).toBeVisible();
    await faqLink.click();
    // Replace '/faq-url' with the actual URL of the FAQ page
    await expect(page).toHaveURL(
      'https://forums.minaprotocol.com/t/on-chain-voting-frequently-asked-questions-faq/5959'
    );
  });

  test('should navigate to GitHub repository when GitHub logo is clicked', async ({ page }) => {
    const githubLink = page.locator('a >> div >> .sr-only:has-text("GitHub")').first();
    await expect(githubLink).toHaveCount(1); // Ensure there's only one element matching the locator
    await githubLink.click();
    await expect(page).toHaveURL('https://github.com/Granola-Team/mina-on-chain-voting');
  });

  test('should change the theme from light to dark', async ({ page }) => {
    // Click the theme toggle button
    const themeToggleButton = page.locator('button#theme-toggle');
    await themeToggleButton.click();

    await expect(page.locator('html')).toHaveClass(/dark/);
    await themeToggleButton.click();
    await expect(page.locator('html')).toHaveClass(''); //goes back to light theme
  });
});
