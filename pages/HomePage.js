import { expect } from "playwright/test";

export class HomePage{
    constructor(page){
        this.page = page
        
    }

    async homepageLoading(){
        const consoleErrors = [];

        this.page.on('console', msg => {
            if (msg.type() === 'error') {
                const text = msg.text();

                if (text.includes('TypeError') || text.includes('ReferenceError')) {
                    consoleErrors.push(text);
                }
            }
        });

        const response = await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');

        return { response, consoleErrors };
    }

    async verifyLinks(){
        return {
            github: this.page.locator('a:has-text("GitHub repo")'),
            privacy: this.page.locator('a[href*="privacy"]'),
            docs: this.page.locator('a[href*="github.io"]'),
            footerText: this.page.locator("p:has-text('DEMO application')")
        };
    }

}