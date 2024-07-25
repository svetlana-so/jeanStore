import { test, expect } from '@playwright/test'

test.describe('signup and login sequence', () => {
  
    test('visitor can not access dashboard before login', async ({ page }) => {
        
        await page.goto('./dashboard');
        await page.waitForURL('./login');
      
        await expect(page).toHaveURL('./login');
        await expect(page.locator('text=Please log in to continue.')).toBeVisible(); // Adjust the text to something specific on your login page
      });

})


