import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(60 * 1000)

export default class summarySheetPage {

    private base: PlaywrightWrapper;
    private page: Page;


    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;


    }

    private Elements = {
        laborOrderMenu: "//div[normalize-space(text())='Labor Order']",
        summarysheet: "//a[normalize-space(text())='Summary Sheet']",
        workDate: "//label[normalize-space(text())='Work Date:']/following::input",
        shift: "//select[@ng-reflect-name='shift']",
        jobType: "//select[@ng-reflect-name='jobCode']",
        Go: "//button[normalize-space(text())='GO']",
        YardOrderTab: "//a[normalize-space(text())='Yard Ops - 690101']",
        startTime: "//select[@id='startTime']",
        stdDbFX: "//*[@id='vesselLongshore']/div[1]/div/div/tbody/tr[1]/td[9]/input",
        SteadyDBName: "//input[@ng-reflect-name='YARD BOSStxSteadyNm00']",
        stdDbFXFlexList: "//select[@ng-reflect-name='YARD BOSScbSteadyFx00']",
        stdFX: "//*[@id='vesselLongshore']/div[1]/div/div/tbody/tr[1]/td[10]/input",
        SteadyFXName: "//input[@ng-reflect-name='YARD BOSStxSteadyNm01']",
        stdFXFlexList: "//select[@ng-reflect-name='YARD BOSScbSteadyFx10']",
    };

    async clickOnSummarySheetMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL);
        await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.summarysheet);
    }
    async SelectDetailsOnLandingPage(): Promise<void> {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Move to tomorrow's date

        const day = today.getDate();
        const month = today.getMonth() + 1; // Months are 0-based, so add 1
        const year = today.getFullYear();

        // Format the date as YYYY-MM-DD
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        // Fill the calendar input with tomorrow's date
        await this.page.locator(this.Elements.workDate).click();
        await this.page.locator(this.Elements.workDate).fill(formattedDate);
        await this.base.waitAndClick(this.Elements.Go);
    }
    async VerifySummarySheetCreated(): Promise<void> {
        const TabPresent = await this.page.locator(this.Elements.YardOrderTab).textContent();
        expect(TabPresent).toContain("Yard Ops - 690101");
        for (let i = 0; i < 10; i++) {
            await this.page.keyboard.press('PageDown');
            await this.page.waitForTimeout(500);
        }
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(5000);
    }

    async VerifySteadyDetailsAndManningCount(): Promise<void> {
        await this.base.waitAndClick(this.Elements.YardOrderTab);
        await this.base.waitAndClick(this.Elements.stdDbFX);
        const StdDbFxYardBossCount = await this.page.locator(this.Elements.stdDbFX).getAttribute('ng-reflect-model');
        expect(StdDbFxYardBossCount).toContain('1');
        const StdFxYardBossCount = await this.page.locator(this.Elements.stdFX).getAttribute('ng-reflect-model');
        expect(StdFxYardBossCount).toContain("1");
        const SteadyDBName = await this.page.locator(this.Elements.SteadyDBName).getAttribute('ng-reflect-model');
        expect(SteadyDBName).toContain("DiLeva, John J (John D) - 3840");
        const stdDbFXFlexList = await this.page.locator(this.Elements.stdDbFXFlexList).getAttribute('ng-reflect-model');
        expect(stdDbFXFlexList).toContain("2");
        const SteadyFXName = await this.page.locator(this.Elements.SteadyFXName).getAttribute('ng-reflect-model');
        expect(SteadyFXName).toContain("Ramirez, Johnny M (Johnny) - 3");
        const stdFXFlexList = await this.page.locator(this.Elements.stdFXFlexList).getAttribute('ng-reflect-model');
        expect(stdFXFlexList).toContain("1");

    }
}