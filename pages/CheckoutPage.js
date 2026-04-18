import { expect } from '@playwright/test';

export class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Email step
        this.guestEmailOption = page.locator('a[href="#guest-tab"]');
        this.email = page.locator('#guest-email');
        this.firstname = page.locator('#guest-first-name');
        this.lastname = page.locator('#guest-last-name');
        this.continueAsGuest = page.locator('[data-test="guest-submit"]');
        this.proceed1 = page.locator('[data-test="proceed-2-guest"]');

        // Billing address
        this.street = page.locator('[data-test="street"]');
        this.city = page.locator('#city');
        this.state = page.locator('#state');
        this.country = page.locator('#country');
        this.postcode = page.locator('#postal_code');

        this.continueBtn = page.locator('[data-test="proceed-3"]');

        // payemnt method
        this.paymentOption = page.locator('[data-test="payment-method"]');
        this.paymentContinueBtn = page.locator('button[data-test="finish"]');

        this.successMsg = page.locator('[data-test="payment-success-message"]');
    }

    async continueasguest() {
        await this.guestEmailOption.click();
        await this.email.fill('abc@gmail.com');
        await this.firstname.fill('Test');
        await this.lastname.fill('User');
        await this.continueAsGuest.click();
        await this.proceed1.click();
    }

    async fillAddressAndContinue() {
        await this.street.waitFor({ state: 'visible' });

        await this.street.fill('Bellandur');
        await this.city.fill('Bengaluru');
        await this.state.fill('Karnataka');
        await this.country.fill('India');
        await this.postcode.fill('560037');

        // Continue after address
        await this.continueBtn.click();
    }

    async payment(){
        await this.paymentOption.waitFor({ state: 'visible' });
        await this.paymentOption.selectOption('Cash on Delivery');
        await this.paymentContinueBtn.click();
    }

    async final(){
        await expect(this.successMsg).toBeVisible();
    }
}