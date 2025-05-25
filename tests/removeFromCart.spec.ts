import { test, expect, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AddToCartPage } from '../pages/addToCart.page';
import { RemoveFromCartPage } from '../pages/removeFromCart.page';
import * as dotenv from 'dotenv';
dotenv.config();


test.describe('Remove from Cart Feature', () => {
    let page: Page;
    let removeFromCartPage: RemoveFromCartPage;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        const loginPage = new LoginPage(page);
        const addToCartPage = new AddToCartPage(page);
        removeFromCartPage = new RemoveFromCartPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
        await addToCartPage.addFirstItemToCart();
    });

    test('Remove an item from the cart', async () => {
        await removeFromCartPage.removeFirstItemFromCart();
        const isEmpty = await removeFromCartPage.isCartEmpty();
        expect(isEmpty).toBeTruthy();
    });

});
