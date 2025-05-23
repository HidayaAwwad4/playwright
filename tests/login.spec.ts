import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import * as dotenv from 'dotenv';
dotenv.config();


test.describe('Login Feature', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('Login with valid credentials', async ({ page }) => {
        await loginPage.login(process.env.USER_NAME!, process.env.PASSWORD!);
        await expect(page).toHaveURL(/.*\/inventory\.html/);
    });

});
