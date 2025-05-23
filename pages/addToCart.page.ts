import { Page, Locator } from '@playwright/test';

export class AddToCartPage {
    private addToCartButtons: Locator;
    private shoppingCartBadge: Locator;  //Shows number of items in cart
    private cartLink: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.addToCartButtons = page.locator('button[data-test^="add-to-cart"]');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async addFirstItemToCart() {
        await this.addToCartButtons.first().click();
    }

    async getCartItemCount() {
        return await this.shoppingCartBadge.textContent();
    }

    async goToCart() {
        await this.cartLink.click();
    }
}
