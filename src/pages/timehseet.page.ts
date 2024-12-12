import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(60 * 1000)

export default class timesheetPage {

    private base: PlaywrightWrapper;
    private page: Page;


    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;

    }

    private Elements = {
        TimehseetMenu: "//div[normalize-space(text())='Timesheet']",
        yardTimehseet: "//a[normalize-space(text())='Ops Yard Timesheet']",
        workDate: "//input[@id='sWorkDt']",
        shift: "//select[@ng-reflect-name='shift']",
        jobType: "//select[@ng-reflect-name='jobCode']",
        Go: "//button[normalize-space(text())='GO']",
        ForemanTab: "//a[normalize-space(text())='Foreman']",
        SThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[8]/input[1]",
        OThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[9]/input[1]",
        DFThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[10]/input[1]",
        SaveWithoutSubmit: "//button[normalize-space(text())='SAVE WITHOUT SUBMITTING']",
        successNotification: "//span[normalize-space(text())='Timesheet Information has been updated successfully']",

    };

    async clickOnTimehseetMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 60000 });
        await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.TimehseetMenu);
        await this.base.waitAndClick(this.Elements.yardTimehseet);
    }
    async SelectDetailsOnLandingPage(): Promise<void> {
        const today = new Date();
        today.setDate(today.getDate() + 2); // Move to tomorrow's date

        const day = today.getDate();
        const month = today.getMonth() + 1; // Months are 0-based, so add 1
        const year = today.getFullYear();

        // Format the date as YYYY-MM-DD
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        // Fill the calendar input with tomorrow's date
        await this.page.locator(this.Elements.workDate).click();
        await this.page.locator(this.Elements.workDate).fill(formattedDate);
        await this.page.locator(this.Elements.jobType).selectOption("Yard Ops - 690101");
        await this.base.waitAndClick(this.Elements.Go);
    }
    async clickOnForemanTab(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ForemanTab);
    }
    async FillHrsTab(): Promise<void> {
        await this.page.locator(this.Elements.SThrFirstRow).fill("8");
        await this.page.locator(this.Elements.OThrFirstRow).fill("2");
        await this.page.locator(this.Elements.DFThrFirstRow).fill("1");
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(5000);
    }
    async clickOnSaveAndSubmit(): Promise<void> {
        await this.base.waitAndClick(this.Elements.SaveWithoutSubmit);

        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(5000);
    }
    async verifySuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.successNotification))
    }

}