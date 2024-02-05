import {expect, Page} from "@playwright/test";
import {CookiesComponent} from "../components/cookies.component";
import {HeaderComponent} from "../components/header.component";
import {NavigationComponent} from "../components/navigation.component";

export class HomePage {
    readonly page: Page;
    readonly cookiesModal: CookiesComponent;
    readonly header: HeaderComponent;
    readonly navigation: NavigationComponent;
    static URL: string = 'https://www.douglas.de/de';

    constructor(page: Page) {
        this.page = page;
        this.cookiesModal = new CookiesComponent(page);
        this.navigation = new NavigationComponent(page);
        this.header = new HeaderComponent(page);
    }

    /**
     * Perform a navigation to a specific URL.
     *
     * @return {Promise<void>} A promise that resolves when the navigation is complete.
     */
    async goto(): Promise<void> {
        await this.page.goto(HomePage.URL);
        await this.page.waitForLoadState("domcontentloaded");
    }

    async navigateToSubpage(name: string): Promise<void> {
        await expect(this.cookiesModal.component).toBeVisible();
        await this.cookiesModal.acceptAll.click();
        await expect(this.cookiesModal.component).not.toBeVisible();
        await this.navigation.clickLink("PARFUM");
    }
}