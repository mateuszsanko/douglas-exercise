import {Page} from "@playwright/test";
import {HeaderComponent} from "./header.component";
import {Locator} from "playwright";


export class NavigationComponent {

    readonly page: Page;
    readonly component: Locator;
    readonly links: Locator;

    constructor(page: Page) {
        this.page = page;
        this.component = this.page.getByRole("navigation");
    }

    /**
     * Retrieves a link by its name.
     *
     * @param {string} name - the name of the link to retrieve
     * @return {Element} the link element with the specified name
     */
    getLink(name: string): Locator {
        return this.component.getByRole("link", { name: `${name}` });
    }

    /**
     * Clicks the specified link and waits for the page to finish loading.
     *
     * @param {string} name - the name of the link to click
     * @return {Promise<void>} a Promise that resolves when the function completes
     */
    async clickLink(name: string): Promise<void> {
        const headerComponent = new HeaderComponent(this.page);
        await this.getLink(name).click();
        await this.page.waitForLoadState('networkidle');
        await headerComponent.logo.hover();
    }
}