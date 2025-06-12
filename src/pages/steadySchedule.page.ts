import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";

export class SteadySchedulePage {
    protected base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        steadyMenu: "//div[normalize-space()='Steady Menu']",
        steadyScheduleMenu: "//a[normalize-space()='Steady Schedule']",
        goButton: "//button[normalize-space()='GO']",
        remarksInput: "//textarea[@id='remarks']",
        saveButton: "//button[normalize-space()='Save']",
        successMessage: "//div[contains(@class,'success-message')]",
        coTab: "//a[contains(text(),'CO')]",
        fmTab: "//a[contains(text(),'FM')]",
        vesselTab: "//a[contains(text(),'Vessel')]",
        jobCodeDropdown: "//select[contains(@id,'jobCode')]",
        cell1CO:"//td[contains(@class,'cell1-co')]",
        totalValue: "//td[contains(@class,'total-value')]",
        guaranteeValue: "//td[contains(@class,'guarantee-value')]"
    };

    async navigateToSteadySchedule(): Promise<void> {
        await this.base.waitAndClick(this.Elements.steadyMenu);
        await this.base.waitAndClick(this.Elements.steadyScheduleMenu);
        fixture.logger.info('Navigated to Steady Schedule page');
    }

    async clickGoButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.goButton);
        fixture.logger.info('Clicked GO button');
    }

    async selectCOTab(): Promise<void> {
        await this.base.waitAndClick(this.Elements.coTab);
        fixture.logger.info('Selected CO tab');
    }

    async selectFMTab(): Promise<void> {
        await this.base.waitAndClick(this.Elements.fmTab);
        fixture.logger.info('Selected FM tab');
    }

    async selectVesselTab(): Promise<void> {
        await this.base.waitAndClick(this.Elements.vesselTab);
        fixture.logger.info('Selected Vessel tab');
    }

    async selectJobCode(rowIndex: number, jobCode: string): Promise<void> {
        const jobCodeSelector = `(${this.Elements.jobCodeDropdown})[${rowIndex}]`;
        await this.page.locator(jobCodeSelector).selectOption(jobCode);
        fixture.logger.info(`Selected job code ${jobCode} for row ${rowIndex}`);
    }

    async enterRemarks(remarks: string): Promise<void> {
        await this.page.locator(this.Elements.remarksInput).fill(remarks);
        fixture.logger.info(`Entered remarks: ${remarks}`);
    }

    async verifyTotalAndGuaranteeValue(): Promise<void> {
        const totalValueElement = this.page.locator(this.Elements.totalValue);
        const guaranteeValueElement = this.page.locator(this.Elements.guaranteeValue);

        await totalValueElement.waitFor({ state: 'visible' });
        await guaranteeValueElement.waitFor({ state: 'visible' });

        const totalValue = await totalValueElement.textContent();
        const guaranteeValue = await guaranteeValueElement.textContent();

        expect(totalValue).not.toBeNull();
        expect(guaranteeValue).not.toBeNull();
        fixture.logger.info(`Verified total value: ${totalValue} and guarantee value: ${guaranteeValue}`);
    }

    async clickSaveButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveButton);
        fixture.logger.info('Clicked Save button');
    }

    async verifySuccessMessage(): Promise<void> {
        await this.page.locator(this.Elements.successMessage).waitFor({ state: 'visible' });
        const message = await this.page.locator(this.Elements.successMessage).textContent();
        expect(message).toContain('successfully');
        fixture.logger.info('Success message verified');
    }
}
