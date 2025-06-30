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
        jobCodeInput1: "/html/body/app-root/app-home/div/div/section/div/app-steady-schedules/div/div[3]/div[2]/div/div[1]/div/table/tbody/tr[1]/td[1]/input",
        jobCodeInput2: "/html/body/app-root/app-home/div/div/section/div/app-steady-schedules/div/div[3]/div[2]/div/div[1]/div/table/tbody/tr[1]/td[2]/input",
        jobCodeInput3: "/html/body/app-root/app-home/div/div/section/div/app-steady-schedules/div/div[3]/div[2]/div/div[1]/div/table/tbody/tr[1]/td[3]/input",
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

    async selectJobCode(): Promise<void> {
        const jobCodeInput1 = this.page.locator(this.Elements.jobCodeInput1);
        await jobCodeInput1.clear();
        await jobCodeInput1.fill('VSL1'); // Example job code
        const jobCodeInput2 = this.page.locator(this.Elements.jobCodeInput2);
        await jobCodeInput2.clear();
        await jobCodeInput2.fill('VSL1 -R');
        const jobCodeInput3 = this.page.locator(this.Elements.jobCodeInput3);
        await jobCodeInput3.clear();
        await jobCodeInput3.fill('VSL1 -TURN');
    
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
