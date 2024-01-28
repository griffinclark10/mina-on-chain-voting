import { test, expect } from '@playwright/test';
import { siteConfig } from 'common/config';

test.describe('Footer Tests', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:4321');
    });
  
    test('should display the correct footer text and link', async ({ page }) => {
      const footerText = page.locator('footer >> p');
      await expect(footerText).toContainText('Built with ❤️ by');
      await expect(footerText).toContainText('Granola');
  
      const granolaLink = page.locator('footer >> a');
      await expect(granolaLink).toHaveAttribute('href', siteConfig.links.granola); // Replace with the actual URL
    });
  
    test('should have a working Granola link that opens in a new tab', async ({ page }) => {
      const granolaLink = page.locator('footer >> a');
      await expect(granolaLink).toHaveAttribute('target', '_blank');
      await expect(granolaLink).toHaveAttribute('rel', 'noreferrer');
  
      const href = await granolaLink.getAttribute('href');
      expect(href).not.toBeNull();
      expect(href).toBe(siteConfig.links.granola); // Replace with the actual URL from your siteConfig
    });
  
  });
  