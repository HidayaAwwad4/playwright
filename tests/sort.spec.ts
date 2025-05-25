// tests/sort.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SortPage } from '../pages/sort.page';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Sort Feature', () => {
    let page;
    let loginPage: LoginPage;
    let sortPage: SortPage;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        loginPage = new LoginPage(page);
        sortPage = new SortPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
        await page.waitForSelector('[data-test="product-sort-container"]');
    });

    test('Sort products from A to Z', async () => {
        await sortPage.sortBy('az');
        const names = await sortPage.getProductNames();
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);
    });

    test('Sort products by price from High to Low', async () => {
        await sortPage.sortBy('hilo');
        const prices = await sortPage.getProductPrices();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    });
});
