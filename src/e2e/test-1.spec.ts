import { test, expect } from '@playwright/test';
import { createFakeProduct } from './utils/fixtures';


test.describe('Product Detail Page', () => {
  const fakeProduct = createFakeProduct();

  test('should navigate to the home page when clicking the back button', async ({ page }) => {
    // Navigate to the home page
    await page.goto('./'); 
    await page.locator('div').filter({ hasText: /^SEK 455\.00$/ }).first().click();
    await page.getByRole('button', { name: '← BACK' }).click();

    // Ensure the page navigates back to the home page
    await expect(page).toHaveURL('./');
  });

  test('should display product details correctly', async ({ page }) => {
    await page.goto(`./products/${fakeProduct.id}`);

    await expect(page.getByTestId('brandName')).toHaveText(fakeProduct.brand);
    await expect(page.getByTestId('price')).toHaveText(`${fakeProduct.price}.00 SEK`); 
    await expect(page.getByTestId('size')).toHaveText(fakeProduct.size_label);
    await expect(page.getByTestId('color')).toHaveText(fakeProduct.color);
    const description = page.locator('[data-testid="productDescription"]');
  
    await expect(description).toBeHidden();
    await page.locator('[data-testid="descriptionBtn"]').click();
    await expect(description).toBeVisible();
  });


 /*  
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
