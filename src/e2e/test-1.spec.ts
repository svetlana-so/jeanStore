import { test, expect } from '@playwright/test';
import { createFakeProduct } from './utils/fixtures';


test.describe('Product Detail Page', () => {
  const fakeProduct = createFakeProduct();

  test('should navigate to the home page when clicking the back button', async ({ page }) => {
   
    await page.goto('./'); 
    await page.locator('div').filter({ hasText: /^SEK 455\.00$/ }).first().click();
    await page.getByRole('button', { name: '← BACK' }).click();
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

});
