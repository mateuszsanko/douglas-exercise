import {test, expect} from '@playwright/test';
import {HomePage} from "./pageobjects/home.page";
import {ParfumPage} from "./pageobjects/parfum.page";
import {Fields, mandatoryHeaders} from "./utils/structures";
import {getVisibleFacetsNames} from "./data/fields.api";

let homePage: HomePage;
let parfumPage: ParfumPage;
let visibleFacetsNames: string[];

test.beforeAll('Get fields data from response', async ({request}) => {
    const response = await request.get("https://www.douglas.de/jsapi/v2/products/search/category/01?fields=FULL",
        {
            headers: mandatoryHeaders
        });
    const json: Fields = await response.json();
    visibleFacetsNames = getVisibleFacetsNames(json);
});

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
