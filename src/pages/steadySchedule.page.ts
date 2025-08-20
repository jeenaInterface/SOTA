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
        remarksInputInSteadiesTable: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[9]/i[1]",
        saveButton: "//button[normalize-space()='SAVE']",
        successMessage: "//span[normalize-space(text())='Steady Schedule Information saved successfully']",
        coTab: "//a[contains(text(),'CO')]",
        fmTab: "(//a[normalize-space()='FM'])[1]",
        vesselTab: "//a[normalize-space(text())='VESSEL']",
        searchCell: "td:nth-child({0}) > .search",
        searchDropdownItem: ".search-dropdown-item",
        jobCodeInput1: "xpath=/html/body/app-root/app-home/div/div/section/div/app-steady-schedules/div/div[3]/div[2]/div/div[1]/div/table/tbody/tr[1]/td[1]/input",
        jobCodeInput2: "xpath=/html/body/app-root/app-home/div/div/section/div/app-steady-schedules/div/div[3]/div[2]/div/div[1]/div/table/tbody/tr[1]/td[2]/input",
        jobCodeInput3: "xpath=/html/body/app-root/app-home/div/div/section/div/app-steady-schedules/div/div[3]/div[2]/div/div[1]/div/table/tbody/tr[1]/td[3]/input",
        jobCodeOption: ".search-dropdown-item >> text={0}",
        totalValue: "xpath=//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-steady-schedules[1]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[8]/td[8]",
        guaranteeValue: "(//input[contains(@class,'search text-center')])[1]",
        remarksArea: "(//textarea[@id='addComment'])[1]",
        addRemarksButton: "(//button[normalize-space()='Add Remarks'])[1]",
        addRemarksButton2: "//day-remark-modal[@id='dayRemarks']//button[@type='button'][normalize-space()='Add Remarks']",
        remarksButtonInCalendar:"(//i[@data-bs-target='#dayRemarks'])[1]",
        textareaInCalendar1: "//tbody/tr/td[1]/textarea[1]",
        textareaInCalendar2: "//tbody/tr/td[2]/textarea[1]",
        textareaInCalendar3: "//tbody/tr/td[3]/textarea[1]",
        textareaInCalendar4: "//tbody/tr/td[4]/textarea[1]",
        textareaInCalendar5: "//tbody/tr/td[5]/textarea[1]",
        textareaInCalendar6: "//tbody/tr/td[6]/textarea[1]",
        textareaInCalendar7: "//tbody/tr/td[7]/textarea[1]",
        remarksButtonAboveCalendar: "(//th[contains(@class,'bg-white p-0')]//i)[1]",
        yardTab:"//a[normalize-space(text())='YARD']",
        railTab:"//a[normalize-space(text())='RAIL']",
        TSRVTab:"//a[normalize-space(text())='TSRV']",

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
        const jobCodeInput1 = this.page.locator(this.Elements.jobCodeInput1);
        await jobCodeInput1.clear();
        await jobCodeInput1.fill('WORK'); // Example job code
        const jobCodeInput2 = this.page.locator(this.Elements.jobCodeInput2);
        await jobCodeInput2.clear();
        await jobCodeInput2.fill('WORK -R');
        const jobCodeInput3 = this.page.locator(this.Elements.jobCodeInput3);
        await jobCodeInput3.clear();
        await jobCodeInput3.fill('WORK -TURN');
    }

    async selectVesselTab(): Promise<void> {
        await this.base.waitAndClick(this.Elements.vesselTab);
        fixture.logger.info('Selected Vessel tab');
        const jobCodeInput1 = this.page.locator(this.Elements.jobCodeInput1);
        await jobCodeInput1.clear();
        await jobCodeInput1.fill('SC26'); // Example job code
        const jobCodeInput2 = this.page.locator(this.Elements.jobCodeInput2);
        await jobCodeInput2.clear();
        await jobCodeInput2.fill('SC26 -R');
        const jobCodeInput3 = this.page.locator(this.Elements.jobCodeInput3);
        await jobCodeInput3.clear();
        await jobCodeInput3.fill('SC26 -TURN');
    }
        async selectYardTab(): Promise<void> {
        await this.base.waitAndClick(this.Elements.yardTab);
        const jobCodeInput1 = this.page.locator(this.Elements.jobCodeInput1);
        await jobCodeInput1.clear();
        await jobCodeInput1.fill('SC26'); // Example job code
        const jobCodeInput2 = this.page.locator(this.Elements.jobCodeInput2);
        await jobCodeInput2.clear();
        await jobCodeInput2.fill('SC26 -R');
        const jobCodeInput3 = this.page.locator(this.Elements.jobCodeInput3);
        await jobCodeInput3.clear();
        await jobCodeInput3.fill('SC26 -TURN');
    }
        async selectRailTab(): Promise<void> {
        await this.base.waitAndClick(this.Elements.railTab);
        const jobCodeInput1 = this.page.locator(this.Elements.jobCodeInput1);
        await jobCodeInput1.clear();
        await jobCodeInput1.fill('SC26'); // Example job code
        const jobCodeInput2 = this.page.locator(this.Elements.jobCodeInput2);
        await jobCodeInput2.clear();
        await jobCodeInput2.fill('SC26 -R');
        const jobCodeInput3 = this.page.locator(this.Elements.jobCodeInput3);
        await jobCodeInput3.clear();
        await jobCodeInput3.fill('SC26 -TURN');
    }
        async selectTSRVTab(): Promise<void> {
        await this.base.waitAndClick(this.Elements.TSRVTab);
        const jobCodeInput1 = this.page.locator(this.Elements.jobCodeInput1);
        await jobCodeInput1.clear();
        await jobCodeInput1.fill('SW -TURN'); // Example job code
        const jobCodeInput2 = this.page.locator(this.Elements.jobCodeInput2);
        await jobCodeInput2.clear();
        await jobCodeInput2.fill('SW -TURN');
        const jobCodeInput3 = this.page.locator(this.Elements.jobCodeInput3);
        await jobCodeInput3.clear();
        await jobCodeInput3.fill('SW -TURN');
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
        await this.page.locator(this.Elements.remarksButtonInCalendar).click();
        await this.page.locator(this.Elements.textareaInCalendar1).fill('text1');
        await this.page.locator(this.Elements.textareaInCalendar2).fill('text2');
        await this.page.locator(this.Elements.textareaInCalendar3).fill('text3');
        await this.page.locator(this.Elements.textareaInCalendar4).fill('text4');
        await this.page.locator(this.Elements.textareaInCalendar5).fill('text5');
        await this.page.locator(this.Elements.textareaInCalendar6).fill('text6');
        await this.page.locator(this.Elements.textareaInCalendar7).fill('text7');

        await this.base.waitAndClick(this.Elements.addRemarksButton2);
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.remarksButtonAboveCalendar).click();
        await this.page.locator(this.Elements.remarksArea).fill(remarks);
        await this.base.waitAndClick(this.Elements.addRemarksButton);
        await fixture.page.waitForTimeout(2000);


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
        expect(message).toContain('Steady Schedule Information saved successfully');
        fixture.logger.info('Success message verified');
    }
}
