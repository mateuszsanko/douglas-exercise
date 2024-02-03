import {test, expect} from '@playwright/test';
import {HomePage} from "./pageobjects/home.page";
import {ParfumPage} from "./pageobjects/parfum.page";

let homePage: HomePage;
let parfumPage: ParfumPage;

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    parfumPage = new ParfumPage(page);
});

test('Update JSON data @preconditions', async ({page}) => {
    await homePage.goto()
    await expect(homePage.cookiesModal.component).toBeVisible();
    await homePage.cookiesModal.acceptAll.click();
    await expect(homePage.cookiesModal.component).not.toBeVisible();
    await homePage.navigation.clickLink("PARFUM");
    await parfumPage.filter.iterateCategoriesAndUpdateJson();
});

test('get started link', async ({page}) => {
    await homePage.goto()
    await expect(homePage.cookiesModal.component).toBeVisible();
    await homePage.cookiesModal.acceptAll.click();
    await expect(homePage.cookiesModal.component).not.toBeVisible();
    await homePage.navigation.clickLink("PARFUM");
    await parfumPage.filter.chooseItemFromCategory("Produktart", "Eau de Parfum");
});
