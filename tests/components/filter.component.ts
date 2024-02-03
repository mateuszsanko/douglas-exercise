import {Locator} from "playwright";
import {expect, Page} from "@playwright/test";
import * as fs from "fs";


export class FilterComponent {

    readonly page: Page;
    readonly component: Locator;
    readonly all: Locator;
    readonly titles: Locator;
    readonly openedTitle: Locator;
    readonly search: Locator;
    readonly items: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.all = this.page.locator("div.facet");
        this.component = this.page.locator("div.facet__menu");
        this.openedTitle = this.page.locator("div.facet--open div.facet__title");
        this.titles = this.all.locator("div.facet__title:not(.facet-wrapper--hidden)");
        this.search = this.openedTitle.getByPlaceholder('Produktmerkmal suchen');
        this.items = this.component.locator("a.facet-option.active");
        this.closeButton = this.component.getByRole("button", {name: "Schließen"});
    }

    getByName(name: string): Locator {
        return this.all.getByText(name);
    }

    /**
     * Retrieves the checkbox from the context menu (dropdown).
     *
     * @param {string} name - the name next to the checkbox
     * @return {Locator} the located checkbox element
     */
    getCheckboxFromContextMenu(name: string): Locator {
        return this.items.filter({hasText: name}).locator("div.facet-option__checkbox");
    }

    /**
     * Chooses a category and click the item on the dropdown list.
     *
     * @param {string} categoryName - the name of the category
     * @param {string} itemName - the name of the item to choose
     * @return {Promise<void>} a Promise that resolves when the actions are complete
     */
    async chooseItemFromCategory(categoryName: string, itemName: string): Promise<void> {
        await this.getByName(categoryName).click();
        await expect(this.openedTitle).toHaveText("Produktart");
        await this.getCheckboxFromContextMenu(itemName).click();
        await expect(this.getCheckboxFromContextMenu("Eau de Parfum")).toBeChecked();
        await this.closeButton.click();
        await expect(this.search).not.toBeVisible();
    }

    /**
     * Asynchronously updates the JSON data based on the filter name.
     *
     * @param {string} filterName - the name of the filter
     * @return {Promise<void>} a promise that resolves after updating the JSON data
     */
    async updateJsonData(filterName: string): Promise<void> {
        const items = await this.items.allTextContents();
        const clearItems = items.map((item) => {
            return item.replace(/[0-9()]/g, "").trim();
        })
        console.log(JSON.stringify(clearItems));
        fs.writeFile(`tests/data/${filterName}.json`, JSON.stringify(clearItems), function (err) {
            if (err) {
                console.log('Error writing file:', err);
            } else {
                console.log('Successfully wrote file');
            }
        })
    }

    /**
     * Asynchronously iterates through categories and updates JSON data.
     */
    async iterateCategoriesAndUpdateJson() {
        const titles = await this.titles.allTextContents();

        for (let i = 0; i < titles.length; i++) {
            const title = titles[i];
            if (!await this.all.getByText(title).isHidden()) {
                await this.all.getByText(title).click();
                await this.updateJsonData(title);
            }
        }
    }
}