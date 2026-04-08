export class ProductList{
    constructor(page){
        this.page = page
    }

    async verifyProductRender(){
        return {
            productCard: this.page.locator('.card'),
            cardTitle: this.page.locator('.card-title'),
            productPrice: this.page.locator("[data-test='product-price']"),
            stockStatus: this.page.locator("[data-test='out-of-stock']"),
        }
        
    }

    async verifyFilters(){
        return{
            categories: this.page.locator('[data-test="nav-categories"]'),
            categoryList: this.page.locator('ul[aria-label="nav-categories"] a.dropdown-item'),
            
        }
    }

    async getProductPrices() {
        const priceTexts = await this.page.locator('.card .price').allTextContents();

        // Convert "₹12.34" → 12.34
        const prices = priceTexts.map(p => 
            parseFloat(p.replace(/[^\d.]/g, ''))
        );

        return prices;
    }

    async getCO2Ratings() {
        const ratings = await this.page.locator('.card .co2-rating-scale').allTextContents();
        return ratings.map(r => r.trim());
    }

}