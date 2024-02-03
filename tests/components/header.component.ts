import {Page} from "@playwright/test";
import {Locator} from "playwright";
import {NavigationComponent} from "./navigation.component";


export class HeaderComponent {

    readonly page: Page;
    readonly component: Locator;
    readonly logo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.component = this.page.locator("div.header-component");
        this.logo = this.component.locator("a.douglas-logo__link");
    }
}