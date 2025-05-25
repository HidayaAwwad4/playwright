import { test, expect, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AddToCartPage } from '../pages/addToCart.page';
import { CheckoutPage } from '../pages/checkout.page';
import * as dotenv from 'dotenv';
dotenv.config();


test.describe('Checkout Feature', () => {
    let page: Page;
    let addToCartPage: AddToCartPage;
    let checkoutPage: CheckoutPage;
    test.beforeAll(async ({ browser }) => {
        const context: BrowserContext = await browser.newContext();
        page = await context.newPage();

        const loginPage = new LoginPage(page);
        addToCartPage = new AddToCartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    });

    test('Complete checkout process', async () => {
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
