import { expect } from '@playwright/test';

export class ProductDetailPage {
    constructor(page) {
        this.page = page;
        this.productcard = page.locator('.card[data-test^="product-"]').first();
        this.productLink = page.locator('a[data-test^="product-"]').first();
        this.productName = page.locator('h1[data-test="product-name"]')
        this.prodPrice = page.locator('span[data-test="unit-price"]')
        this.prodCO2Label = page.locator('.co2-letter.active.rating-d')
        this.prodDescription = page.locator('[data-test="product-description"]')

        this.addCartButton = page.locator('[data-test="add-to-cart"]')
    }

    async openProduct(){
        await this.productcard.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getProductHref() {
        return await this.productLink.getAttribute('href');
    }
    async getCurrentURL(){
        return await this.page.url();
    }

    async productDetail(){
        return {
            prodName: (await this.productName.textContent())?.trim(),
            prodPrice: (await this.prodPrice.textContent())?.trim(),
            prodCO2Label: (await this.prodCO2Label.textContent())?.trim(),
            prodDescription: (await this.prodDescription.textContent())?.trim(),
        };
    }

    async addProductToCart(){
        return this.addCartButton;
    }
}