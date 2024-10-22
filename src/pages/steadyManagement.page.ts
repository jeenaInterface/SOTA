import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import * as data from "../helper/util/test-data/payloads.json";
import { request } from "@playwright/test";
import { APiUtils } from "../helper/util/apiUtils/api.utils";
import {setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(60 * 1000)
let Response: any; // Define Response variable
let ClientPage: steadyManagementPage; // Define ClientPage variable
let orderId: any

export default class steadyManagementPage {

    private base: PlaywrightWrapper;
    private page: Page;


    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;


    }

    private Elements = {
        steady: "//div[normalize-space(text())='Steady']",
        steadyManagement: "//div[@data-bs-popper='static']//a[1]",
        OperationType: "//select[@ng-reflect-name='opsType']",
        column: "th",
        orderDetails: "//small[text()='Order Id']/following-sibling::div",
        button:"(//button[text()='View'])[1]",
        search:"//button[normalize-space(text())='SEARCH']",
        FirstRowInTheTable:"//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[2]/label[1]",
        Remarks:"(//textarea[@id='remarks'])[1]",
        save:"//button[normalize-space(text())='SAVE']",
        Notification:"//span[normalize-space(text())='Steady Information updated successfully']",
        steadtSearchTextBox:"//input[@formcontrolname='name']",
        errorNotification:"//span[normalize-space(text())='No data found for the selected criteria']"

    };

    async clicksteadyMenuButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.steady);
        await this.base.waitAndClick(this.Elements.steadyManagement);
    }

    async SelectoperationalType(): Promise<void> {

        await this.page.locator(this.Elements.OperationType).selectOption("Vessel");
    }
    async ClickOnSearch(): Promise<void> {
        await this.base.waitAndClick(this.Elements.search);
    }
    async updateFirstSteady(): Promise<void> {
        await this.base.waitAndClick(this.Elements.FirstRowInTheTable);
        await this.page.locator(this.Elements.Remarks).clear()
        await this.page.locator(this.Elements.Remarks).fill("TestRemarks")
        await this.base.waitAndClick(this.Elements.save);
        fixture.logger.info("Waiting for 5 seconds")
        await fixture.page.waitForTimeout(5000);
        expect.soft(await this.page.locator(this.Elements.Notification))

    }

    async enterWrongSteadyName(): Promise<void> {
        await this.page.locator(this.Elements.steadtSearchTextBox).clear()
        await this.page.locator(this.Elements.steadtSearchTextBox).fill("TestData")
    }

    async verifyErrorMessage(): Promise<void> {
        expect.soft(await this.page.locator(this.Elements.errorNotification))
    }

}

