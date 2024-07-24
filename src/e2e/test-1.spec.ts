import { test, expect } from '@playwright/test';


test.describe('Product Detail Page', () => {
  test('should navigate to the home page when clicking the back button', async ({ page }) => {
    // Navigate to the home page
    await page.goto('http://localhost:3000/'); 
    await page.locator('div').filter({ hasText: /^SEK 455\.00$/ }).first().click();
    await page.getByRole('button', { name: '← BACK' }).click();

    // Ensure the page navigates back to the home page
    await expect(page).toHaveURL('http://localhost:3000/');
  });
 /*  test.skip('should display product details correctly', async ({ page }) => {
    // Navigate to the product detail page
    await page.goto('/product/1'); // Adjust the URL as necessary

    // Check the product brand
    await expect(page.locator('h1')).toHaveText('Lindex');

    // Check the product price
    await expect(page.locator('span.text-xl')).toHaveText('124.97');

    // Check the product size
    await expect(page.locator('span:has-text("6")')).toBeVisible();

    // Check the main image
    await expect(page.locator('img[alt="Selected image of Lindex"]')).toBeVisible();
  });

  test.skip('should update the main image when clicking on a thumbnail', async ({ page }) => {
    // Navigate to the product detail page
    await page.goto('/product/1'); // Adjust the URL as necessary

    // Click on the second thumbnail image
    const thumbnail = page.locator('img[alt="https://example.com/image2.jpg"]');
    await thumbnail.click();

    // Verify that the main image is updated
    await expect(page.locator('img[alt="Selected image of Lindex"]')).toHaveAttribute('src', 'https://example.com/image2.jpg');
  });

  test.skip('should toggle the description dropdown', async ({ page }) => {
    // Navigate to the product detail page
    await page.goto('/product/1'); // Adjust the URL as necessary

    // Click the Description button
    const descriptionButton = page.locator('button:has-text("Description")');
    await descriptionButton.click();

    // Verify that the description is displayed
    await expect(page.locator('text=Size Waist: 25')).toBeVisible();

    // Click the Description button again
    await descriptionButton.click();

    // Verify that the description is hidden
    await expect(page.locator('text=Size Waist: 25')).not.toBeVisible();
  }); */
});
