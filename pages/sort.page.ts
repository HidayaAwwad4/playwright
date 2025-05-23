import { Page, Locator } from '@playwright/test';

export class SortPage {
    private sortDropdown: Locator;
    private productNames: Locator;
    private productPrices: Locator;

    constructor(private page: Page) {
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
    }

    async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
        const optionValue = {
            az: 'az',
            za: 'za',
            lohi: 'lohi',
            hilo: 'hilo'
        }[option];
        await this.sortDropdown.selectOption(optionValue);
    }

    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.productPrices.allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));
    }
}
