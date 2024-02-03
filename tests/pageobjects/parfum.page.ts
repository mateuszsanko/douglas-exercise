import {Page} from "@playwright/test";
import {HeaderComponent} from "../components/header.component";
import {NavigationComponent} from "../components/navigation.component";
import {FilterComponent} from "../components/filter.component";


export class ParfumPage {

    readonly page: Page;
    readonly header: HeaderComponent;
    readonly navigation: NavigationComponent;
    readonly filter: FilterComponent;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.navigation = new NavigationComponent(page);
        this.filter = new FilterComponent(page);
    }

}