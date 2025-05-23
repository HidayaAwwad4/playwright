import { test, expect } from '@playwright/test';
import { AddToCartPage } from '../pages/addToCart.page';
import { LoginPage } from '../pages/login.page';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Add to Cart Feature', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    });

    test('Add first item to cart and verify cart count', async ({ page }) => {
        const addToCartPage = new AddToCartPage(page);
        await addToCartPage.addFirstItemToCart();

        const itemCount = await addToCartPage.getCartItemCount();
        expect(itemCount).toBe('1');

        await addToCartPage.goToCart();
        await expect(page).toHaveURL(/.*\/cart\.html/);
    });
});
