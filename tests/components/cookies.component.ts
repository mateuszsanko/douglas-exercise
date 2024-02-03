import {Page} from "@playwright/test";
import {Locator} from "playwright";


export class CookiesComponent {

    readonly component: Locator;
    readonly denyAll: Locator;
    readonly moreInformation: Locator;
    readonly acceptAll: Locator;


    constructor(page: Page) {
        this.component = page.locator("div.uc-banner-modal");
        this.denyAll = this.component.locator("button.uc-list-button__deny-all");
        this.moreInformation = this.component.locator("button.uc-list-button__more-information");
        this.acceptAll = this.component.locator("button.uc-list-button__accept-all");
    }
}