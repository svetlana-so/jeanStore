import { test, expect } from '@playwright/test'

test.describe.serial('signup and login sequence', () => {
  
    test('visitor can not access dashboard before login', async ({ page }) => {
        // Navigate to the dashboard page
        await page.goto('./dashboard');
      
        // Wait for the login page URL
        await page.waitForURL('./login');
      
        await expect(page).toHaveURL('./login');
        await expect(page.locator('text=Please log in to continue.')).toBeVisible(); // Adjust the text to something specific on your login page
      });
/*   test('visitor can login', async ({ page }) => {
    await page.goto('/login')
    const welcomeMsg = page.getByTestId('welcome')
    await expect(welcomeMsg).toBeHidden()

    const form = page.getByRole('form', { name: 'Login' })
    await form.locator('input[type="email"]').fill(email)
    await form.locator('input[type="password"]').fill(password)
    await form.locator('button[type="submit"]').click()

    
  }) */
})


