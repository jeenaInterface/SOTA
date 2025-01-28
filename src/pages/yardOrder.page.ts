import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(60 * 1000)

export default class YardOrderPage {

    protected base: PlaywrightWrapper;  // Change to protected so that subclasses can access it
    public page: Page;  // Same with page property

    // Declare the global variable for noTRStatusDate at the class level
    public noTRStatusDate: string;
    private weekNumber: number;

    // Constructor accepts the Page object
    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }


    public Elements = {
        laborOrderMenu: "//div[normalize-space(text())='Labor Order']",
        yardOrder: "//a[normalize-space(text())='Ops Yard Order']",
        workDate: "//input[@aria-describedby='Work Date']",
        shift: "//select[@ng-reflect-name='shift']",
        jobType: "//select[@ng-reflect-name='jobCode']",
        Go: "//button[normalize-space(text())='GO']",
        TRStatus: "//select[@ng-reflect-name='trStatus']",
        homeicon: "//div[@ng-reflect-router-link='/home']//a[1]",
        dataList: "//datalist[@id='nameListData']",
        startTime:"//select[@id='startTime']",
        stdFX: "//*[@id='first']/div/div/tbody/tr[1]/td[7]/input",
        SteadyFXName: "//datalist//option[contains(text(), 'Babich, Vince (Vince) - 36464')]",
        stdFXFlexList: "//select[@ng-reflect-name='YARD BOSScbSteadyFx00']",
        YardBossddl1: "//input[@ng-reflect-name='YARD BOSStxSteadyNm00']",
        textArea:"(//label[normalize-space(text())='Notes']/following::textarea)[1]",
        savemaycan:"//button[normalize-space(text())='SAVE/MAY-CAN']",
        
    }
    async clickOnVesselOrderMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 100000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.yardOrder);
    }
    
    async SelectDetailsOnLandingPage(): Promise<void> {
        let currentDate = new Date();
        let formattedDate: string;
        const maxAttempts = 10;

        await this.page.locator(this.Elements.shift).selectOption("2ND");
        await this.page.locator(this.Elements.jobType).selectOption("Yard Support - 690102");
        await this.page.locator(this.Elements.Go).click();

        fixture.logger.info("Waiting for 1 seconds");
        await fixture.page.waitForTimeout(1000);

        for (let attempts = 0; attempts < maxAttempts; attempts++) {

            const trStatusVisible = await this.page.locator(this.Elements.TRStatus).isVisible();
            fixture.logger.info("Waiting for 2 seconds");
            await fixture.page.waitForTimeout(2000);

            if (trStatusVisible) {
                await this.page.locator(this.Elements.homeicon).click();
                await this.page.locator(this.Elements.laborOrderMenu).click();
                await this.page.locator(this.Elements.yardOrder).click();
                currentDate.setDate(currentDate.getDate() + 1);

                formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

                // Wait and fill the date for the next order
                await this.page.locator(this.Elements.workDate).waitFor({ state: 'attached', timeout: 3000 });
                await this.page.locator(this.Elements.workDate).click();
                await this.page.locator(this.Elements.workDate).fill(formattedDate);
                await this.page.locator(this.Elements.shift).selectOption("2ND");
                await this.page.locator(this.Elements.jobType).selectOption("Yard Support - 690102");
                await this.page.locator(this.Elements.Go).click();


            } else {
                // If no TR status, assign the formatted date as noTRStatusDate
                this.noTRStatusDate = formattedDate;
                fixture.logger.info(`TR status is not present on ${formattedDate}`);
            }
        }
        // await this.page.locator(this.Elements.workDate).fill('2025-01-26');
        // await this.page.locator(this.Elements.shift).selectOption("2ND");
        // this.selectJobNumber();


        // // Store the date to noTRStatusDate
        // this.noTRStatusDate = '2025-01-26';
    }

    async EnterHeaderDetails(): Promise<void> {
        await this.page.locator(this.Elements.startTime).selectOption("5PMfx");
    }

    async FillManningTable(): Promise<void> {
        await this.page.locator(this.Elements.stdFX).fill("1");
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 5 seconds")
        await fixture.page.waitForTimeout(5000);

    }
    async SelectSteadyDetails(): Promise<void> {
        await this.page.locator(this.Elements.YardBossddl1).fill("36464");
        await this.page.locator(this.Elements.YardBossddl1).press("Enter");
        const YardBossddl1Steady = await this.page.locator(this.Elements.SteadyFXName).textContent();
        await this.page.locator(this.Elements.YardBossddl1).fill(YardBossddl1Steady);
        await this.page.locator(this.Elements.stdFXFlexList).selectOption('1');

    }

}