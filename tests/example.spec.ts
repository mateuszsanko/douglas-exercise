import {test, expect} from '@playwright/test';
import {HomePage} from "./pageobjects/home.page";
import {ParfumPage} from "./pageobjects/parfum.page";
import {Fields, MANDATORY_HEADERS} from "./utils/structures";
import {getHighlights, getVisibleFacetsNames} from "./data/fields.api";

let homePage: HomePage;
let parfumPage: ParfumPage;
let visibleFacetsNames: string[];
let highlights: string[];

test.beforeAll('Get fields data from response', async ({request}) => {
    const response = await request.get("https://www.douglas.de/jsapi/v2/products/search/category/01?fields=FULL",
        {
            headers: MANDATORY_HEADERS
        });
    const json: Fields = await response.json();

    visibleFacetsNames = getVisibleFacetsNames(json);
    highlights = getHighlights(json);
    // console.log(visibleFacetsNames);
    // console.log(highlights);
});

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    parfumPage = new ParfumPage(page);
});

test('get started link', async ({page}) => {
    await homePage.goto()
    await expect(homePage.cookiesModal.component).toBeVisible();
    await homePage.cookiesModal.acceptAll.click();
    await expect(homePage.cookiesModal.component).not.toBeVisible();
    await homePage.navigation.clickLink("PARFUM");
    await parfumPage.filter.chooseItemFromCategory("Produktart", "Eau de Parfum");
});
