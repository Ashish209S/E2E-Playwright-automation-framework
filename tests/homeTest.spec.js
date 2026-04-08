import {test, expect} from '@playwright/test'
import {HomePage} from '../pages/HomePage'
import { lutimes } from 'node:fs';

test('Verify home page load states', async ({page}) => {
    const homePage1 = new HomePage(page)
    const { response, consoleErrors } = await homePage1.homepageLoading();

    expect([200, 401]).toContain(response.status());
    await expect(page).toHaveURL(/\/$/);
    expect(consoleErrors).toHaveLength(0);
    
})

test('Verify home page links', async ({page}) => {
    const homePage2 = new HomePage(page)

    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const links = await homePage2.verifyLinks();

    await expect(links.github).toBeVisible();
    const [githubPage] = await Promise.all([
        page.waitForEvent('popup'),
        links.github.click()
    ]);
    await expect(githubPage).toHaveURL(/github/);

    await expect(links.privacy).toBeVisible();
    await links.privacy.click();
    await expect(page).toHaveURL(/privacy/);

    await page.goBack();

    // as old dom elements are detached, we need to re-query the links
    const links2 = await homePage2.verifyLinks();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(links2.docs).toBeVisible();
    const [docsPage] = await Promise.all([
        page.waitForEvent('popup'),
        links2.docs.click()
    ]);
    await expect(docsPage).toHaveURL(/testsmith/);

    await expect(links2.footerText).toBeVisible();

});

