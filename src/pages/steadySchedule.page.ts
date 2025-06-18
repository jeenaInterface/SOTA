import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";

export class SteadySchedulePage {
    protected base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }    private Elements = {
        steadyMenu: "//div[normalize-space()='Steady']",
        steadyScheduleMenu: "//a[normalize-space()='Steady Schedules']",
        goButton: "//button[normalize-space()='GO']",
        remarksInput: "//tbody/tr[1]/td[9]/i[1]",
        saveButton: "//button[normalize-space()='SAVE']",
        successMessage: "//div[contains(@class,'success-message')]",
        coTab: "//a[contains(text(),'CO')]",
        fmTab: "//a[contains(text(),'FM')]",
        vesselTab: "//a[contains(text(),'Vessel')]",
        searchCell: "td:nth-child({0}) > .search",
        searchDropdownItem: ".search-dropdown-item",
        jobCodeInput: "input.search",
        jobCodeOption: ".search-dropdown-item >> text={0}",
        totalValue: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-steady-schedules[1]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[8]/td[8]",
        guaranteeValue: "//input[@class='search text-center bgwhite ng-valid ng-touched ng-dirty']",
        remarksArea: "//textarea[@id='addComment']"
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
        try {
            // Format cell selector with the row index
            const cellSelector = this.Elements.searchCell.replace('{0}', rowIndex.toString());
            
            // Click to open the search dropdown
            await this.page.locator(cellSelector).click();
            await this.page.waitForTimeout(500); // Wait for dropdown to appear
            
            // Type the job code in the search input
            const searchInput = this.page.locator(this.Elements.jobCodeInput).last();
            await searchInput.fill(jobCode);
            await this.page.waitForTimeout(500); // Wait for dropdown options to update
            
            // Click the matching option
            const optionSelector = this.Elements.jobCodeOption.replace('{0}', jobCode);
            await this.page.locator(optionSelector).click();
            
            fixture.logger.info(`Selected job code ${jobCode} for row ${rowIndex}`);
        } catch (error) {
            fixture.logger.error(`Failed to select job code ${jobCode} for row ${rowIndex}: ${error}`);
            throw error;
        }
    }

    async enterRemarks(remarks: string): Promise<void> {
        await this.page.locator(this.Elements.remarksInput).click();
        await this.page.locator(this.Elements.remarksArea).fill(remarks);

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
