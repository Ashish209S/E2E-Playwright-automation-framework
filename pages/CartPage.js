import { expect } from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.cartIcon = page.locator('[data-test="nav-cart"]');
        this.cartCount = page.locator('[data-test="nav-cart"] span');

        this.cartRows = page.locator('tbody tr');
        this.removeButtons = page.locator('tbody tr a.btn-danger');

        this.totalPrice = page.locator('[data-test="cart-total"]');
        this.checkoutBtn = page.locator('[data-test="proceed-1"]');

    }

    async openCart() {
        await this.cartIcon.click();
    }

    async getCartCount() {
        return await this.cartCount.textContent();
    }

    async removeFirstItem() {
        await this.removeButtons.first().click();
    }

    async getTotalPrice() {
        return await this.totalPrice.textContent();
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }

}