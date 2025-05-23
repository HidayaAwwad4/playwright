import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AddToCartPage } from '../pages/addToCart.page';
import { CheckoutPage } from '../pages/checkout.page';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Checkout Feature', () => {
    let loginPage: LoginPage;
    let addToCartPage: AddToCartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        addToCartPage = new AddToCartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    });

    test('Complete checkout process', async ({ page }) => {

        await addToCartPage.addFirstItemToCart();

        await addToCartPage.goToCart();

        await page.locator('[data-test="checkout"]').click();

        await checkoutPage.fillCheckoutForm('Hidaya', 'Razan', '12345');

        await checkoutPage.clickContinue();

        await checkoutPage.clickFinish();

        const successText = await checkoutPage.getSuccessMessage();
        expect(successText).toContain('Thank you for your order!');
    });
});
