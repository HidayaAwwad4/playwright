import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AddToCartPage } from '../pages/addToCart.page';
import { RemoveFromCartPage } from '../pages/removeFromCart.page';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Remove from Cart Feature', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const addToCartPage = new AddToCartPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
        await addToCartPage.addFirstItemToCart();
    });

    test('Remove an item from the cart', async ({ page }) => {
        const removeFromCartPage = new RemoveFromCartPage(page);

        await removeFromCartPage.removeFirstItemFromCart();
        const isEmpty = await removeFromCartPage.isCartEmpty();
        expect(isEmpty).toBeTruthy();
    });

});
