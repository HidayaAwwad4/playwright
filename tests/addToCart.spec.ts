import { test, expect, BrowserContext, Page } from '@playwright/test';
import { AddToCartPage } from '../pages/addToCart.page';
import { LoginPage } from '../pages/login.page';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Add to Cart Feature', () => {
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        const context: BrowserContext = await browser.newContext();
        page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    });

    test('Add first item to cart and verify cart count', async () => {
        const addToCartPage = new AddToCartPage(page);
        await addToCartPage.addFirstItemToCart();

        const itemCount = await addToCartPage.getCartItemCount();
        expect(itemCount).toBe('1');

        await addToCartPage.goToCart();
        await expect(page).toHaveURL(/.*\/cart\.html/);
    });
});
