import { test, expect, Browser, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Login Feature', () => {
    let page: Page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
    });

    test('Login with valid credentials', async () => {
        await expect(page).toHaveURL(/.*\/inventory\.html/);
    });
});
