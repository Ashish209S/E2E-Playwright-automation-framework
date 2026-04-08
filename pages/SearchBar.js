export class SearchPage {
    constructor(page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Search');
        this.searchButton = page.getByRole('button', { type: 'submit' }).nth(1);
        this.productTitles = page.locator('.card-title');
        this.products = this.productTitles;
        this.noResult = page.locator("div[data-test='no-results']");
    }

    async search(product) {
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.fill(product);
        await this.searchInput.press('Enter');
        await this.page.waitForLoadState('networkidle');
    }
}