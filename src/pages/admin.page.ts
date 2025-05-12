import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

export class SupportingDataPage {
    protected base: PlaywrightWrapper;  // Change to protected so that subclasses can access it
    public page: Page;  // Same with page property

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }
    private Elements = {
        typeDropdown: '#type-dropdown',
        editButton: '[data-testid="edit-button"]',
        updateButton: '[data-testid="update-button"]',
        successNotification: "//span[contains(normalize-space(text()), 'Summary Sheet information has been saved successfully')]",
    adminMenu:"//div[normalize-space()='Admin']",
    supportingDataMenu:"//a[normalize-space()='Supporting Data']"
    }
    // Selectors


    async clickOnAdminMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 100000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.adminMenu);
        await this.base.waitAndClick(this.Elements.supportingDataMenu);
    }

    async selectType(): Promise<void> {
        await this.page.locator(this.Elements.typeDropdown).selectOption("LO_Reference");
    }

    async clickEditButton(): Promise<void> {
        await this.page.locator(this.Elements.editButton).click();
    }

    async clickUpdateButton(): Promise<void> {
        await this.page.locator(this.Elements.updateButton).click();
    }

    async getSuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.successNotification))
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
    }
}