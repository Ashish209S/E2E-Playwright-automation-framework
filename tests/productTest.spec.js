import {test, expect} from '@playwright/test'
import { ProductList } from '../pages/ProductList'

test('Product List renders', async ({page}) => {
    
    await page.goto('/')

    await page.waitForSelector('.card');
    await page.waitForLoadState('networkidle');

    const productlist = new ProductList(page)

    const products = await productlist.verifyProductRender();

    const productCount = await products.productCard.count()
    await expect(productCount).toBeGreaterThan(0);
    for(let i = 0; i < productCount; i++){
        await expect(products.productCard.nth(i)).toBeVisible();
    }

    await page.waitForLoadState('networkidle');

    const productTitle = await products.cardTitle.allTextContents(); 
    const count = await products.cardTitle.count();
    expect(count).toBeGreaterThan(0);
    for(let i = 0; i < count; i++){
        await expect(products.cardTitle.nth(i)).toBeVisible();
    }
    

    const pricecount = await products.productPrice.count();
    for (let i = 0; i < pricecount; i++) {
        await expect(products.productPrice.nth(i)).toBeVisible();
    }
    
    const outStockCount = await products.stockStatus.count();
    console.log(outStockCount, 'product is out of stock');

})

test('Out of stock products', async ({page}) => {
    await page.goto('/')

    const productstock = new ProductList(page)
    const products = await productstock.verifyProductRender();

    await page.waitForSelector('.card');
    await page.waitForLoadState('networkidle');

    const count = await products.productCard.count();
    for (let i = 0; i < count; i++) {
        const card = products.productCard.nth(i);

        const name = (await card.locator('.card-title').textContent())?.trim();

        const outOfStockLocator = card.locator("[data-test='out-of-stock']");

        const isOutOfStock = await outOfStockLocator.count() > 0;

        if (isOutOfStock) {
            console.log(`${name} → Out of stock`);
        }
    }
})

test('Verify filters ui', async ({page}) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const filters = new ProductList(page);
    const filterElements = await filters.verifyFilters();

    await expect(filterElements.categories).toBeVisible();

    await filterElements.categories.click();
    const categoryNames = await filterElements.categoryList.allTextContents();
    await expect(categoryNames).toContain('Hand Tools')

    
})

test.describe('Sorting products based on', () => {
    test('Default option', async ({page}) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await expect(page.locator('select')).toHaveValue('');
    });


    test('Sort by Price (Low → High)', async ({page}) => {
        const prodcuts = new ProductList(page);
        await page.goto('/');
        
        await page.locator('select').selectOption({label: 'Price (Low - High)'});
        await page.waitForLoadState('networkidle');

        const price = await prodcuts.getProductPrices();
        const sortedPrice = [...price].sort((a, b) => a - b);
        expect(price).toEqual(sortedPrice);
    });


    test('Sort by Price (High → Low)', async ({page}) => {
        const prodcuts = new ProductList(page);
        await page.goto('/');
        
        await page.locator('select').selectOption({label: 'Price (High - Low)'});
        await page.waitForLoadState('networkidle');

        const price = await prodcuts.getProductPrices();
        const sortedPrice = [...price].sort((a, b) => b - a);
        expect(price).toEqual(sortedPrice);
    });


    test('Sort by CO₂ Rating (A→E or E→A)', async ({page}) => {

        const product = new ProductList(page);

        await page.goto('/');

        await page.locator('select').selectOption({ label: 'CO₂ Rating (A - E)' });   // or CO2 rating (E - A)
        await page.waitForLoadState('networkidle');

        const ratings = await product.getCO2Ratings();

        const order = ['A', 'B', 'C', 'D', 'E'];

        const sorted = [...ratings].sort((a, b) => 
            order.indexOf(a) - order.indexOf(b)
        );

        expect(ratings).toEqual(sorted);
    });

});