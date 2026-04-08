import {test, expect} from '@playwright/test'
import {SearchPage} from '../pages/SearchBar'

test('Full Search', async ({page})  => {
    await page.goto('/');

    const searchpage = new SearchPage(page);
    await searchpage.search('Pliers');

    await expect(searchpage.products.first()).toBeVisible();

    const count = await searchpage.products.count();
    expect(count).toBeGreaterThan(0);
})


test('Partial Search', async ({page})  => {
    await page.goto('/');

    const searchpage = new SearchPage(page);
    await searchpage.search('Ham');

    await expect(searchpage.productTitles.first()).toBeVisible();

    const texts = await searchpage.productTitles.allTextContents();

    expect(texts.some(text => 
        text.toLowerCase().includes('ham')
    )).toBeTruthy();
})


test('No Result', async ({ page }) => {
    await page.goto('/');

    const searchpage = new SearchPage(page);
    await searchpage.search('abcxyz');

    await expect(searchpage.productTitles).toHaveCount(0);

    await expect(searchpage.noResult).toContainText('no products found');
});

