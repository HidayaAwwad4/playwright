import { Locator, Page } from '@playwright/test';

export class RemoveFromCartPage {
    private removeButtons: Locator;
    private shoppingCartBadge: Locator;

    constructor(private page: Page) {
        this.removeButtons = page.locator('[data-test^="remove-"]');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    async removeFirstItemFromCart() {
        await this.removeButtons.first().click();
    }

    async isCartEmpty(): Promise<boolean> {
        return await this.shoppingCartBadge.count() === 0;
    }
}
