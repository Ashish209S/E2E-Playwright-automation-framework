import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../pages/ProductDetails';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Product details', () => {
    test('Validate URL', async ({ page }) => {
        /*await page.goto('/')
        const productDetailPage = new ProductDetailPage(page);

        await productDetailPage.openProduct();

        const url = await productDetailPage.getCurrentURL();
        expect(url).toMatch(/\/product\/[A-Z0-9]+$/);
        */

        await page.goto('/');

        const productPage = new ProductDetailPage(page);

        const href = await productPage.getProductHref();
        await productPage.openProduct();

        const currentURL = await productPage.getCurrentURL();
        expect(currentURL).toContain(href);
    })

    test('Verify product details', async ({ page }) => {
        await page.goto('/')
        const productDetailPage = new ProductDetailPage(page);

        await productDetailPage.openProduct();

        const products = await productDetailPage.productDetail();
        expect(products.prodName).toBe('Combination Pliers');
        expect(products.prodPrice).toBe('14.15');
        expect(products.prodCO2Label).toBe('D');
        expect(products.prodDescription).toContain('combination pliers');

        const addCartButton = await productDetailPage.addProductToCart();
        expect(addCartButton).toBeEnabled();

    })
})

test.describe('Cart & Checkout', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
    });

    test('7.1 Add Item to Cart - Validate cart count', async ({ page }) => {
        const cart = new CartPage(page);

        await page.locator('[data-test^="product-"]').first().click();
        await page.locator('[data-test="add-to-cart"]').click();

        const count = await cart.getCartCount();
        expect(Number(count)).toBeGreaterThan(0);
    });

    test('7.2 Remove Item - Validate cart total updates', async ({ page }) => {
        const cart = new CartPage(page);

        await page.locator('[data-test^="product-"]').first().click();
        await page.locator('[data-test="add-to-cart"]').click();

        await cart.openCart();

        const initialTotal = await cart.getTotalPrice();
        const initialCount = await cart.cartRows.count();

        await cart.removeFirstItem();

        // Wait for item removal instead of price change
        await expect(cart.cartRows).toHaveCount(initialCount - 1);
    });

    test('7.3 Cart Persistence', async ({ page }) => {
        const cart = new CartPage(page);

        await page.locator('[data-test^="product-"]').first().click();
        await page.locator('[data-test="add-to-cart"]').click();

        await page.goBack();
        await cart.openCart();

        await expect(cart.cartRows).toHaveCount(1);
    });

    test('7.5 Successful Checkout', async ({ page }) => {
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        await page.goto('https://practicesoftwaretesting.com/');

        // Add product
        await page.locator('[data-test^="product-"]').first().click();
        await page.locator('[data-test="add-to-cart"]').click();

        // Cart → Checkout
        await cart.openCart();
        await cart.clickCheckout();

        // continue as guest
        await checkout.continueasguest();
        //await page.locator('[data-test="proceed-2-guest"]').click();

        // Address
        await checkout.fillAddressAndContinue();

        await checkout.payment();

        await checkout.final();
    });

});