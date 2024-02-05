import {test, expect} from "@playwright/test";
import {HomePage} from "./pageobjects/home.page";
import {ParfumPage} from "./pageobjects/parfum.page";
import {Criteria, FacetWithValues, Fields, MANDATORY_HEADERS, Neu} from "./utils/structures";
import {getFacetsAndValuesFromJson, getHighlights, getVisibleFacetsNames} from "./data/fields.api";

let homePage: HomePage;
let parfumPage: ParfumPage;
let visibleFacetsNames: string[];
let highlights: string[];
let allFacetsWithValues: Map<string, string[]>

test.beforeAll('Get fields data from response', async ({request}) => {
    const response = await request.get("https://www.douglas.de/jsapi/v2/products/search/category/01?fields=FULL",
        {
            headers: MANDATORY_HEADERS
        });
    const json: Fields = await response.json();

    visibleFacetsNames = getVisibleFacetsNames(json);
    allFacetsWithValues = getFacetsAndValuesFromJson(json);
});

test.beforeEach(async ({page}) => {
    homePage = new HomePage(page);
    parfumPage = new ParfumPage(page);
});

const positiveTestFacetsMap = new Map<string, string>([
    ["Produktart", "Eau de Parfum"]
]);

test('@positive choose items from category', async ({page}) => {
    await homePage.goto()

    await homePage.navigateToSubpage("PARFUM");

    for (const facet of positiveTestFacetsMap) {
        const facetName = facet[0];
        const facetValue = facet[1];
        expect(allFacetsWithValues.get(facetName)).toContain(facetValue);

        await parfumPage.filter.chooseItemFromCategory(facetName, facetValue);
    }
});

const negativeTestFacetsMap = new Map<string, string>([
    ["Produktart", "Fake item"]
])

const testCriteria: Criteria = {produktart: "test", furWen: "test"} as Neu

test.skip("check typeof facets", async ({page}) => {
    console.log(typeof testCriteria);

});

test('@negative item should not be in category dropdown', async ({page}) => {
    await homePage.goto();

    await homePage.navigateToSubpage("PARFUM");

    for (const facet of negativeTestFacetsMap) {
        const facetName = facet[0];
        const facetValue = facet[1];
        expect(allFacetsWithValues.get(facetName)).not.toContain(facetValue);
        expect(await parfumPage.filter.isItemInCategoryDropdown(facetName, facetValue)).toBeFalsy();
    }
})
