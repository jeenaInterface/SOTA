import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import * as data from "../helper/util/test-data/payloads.json";
import { request } from "@playwright/test";
import { APiUtils } from "../helper/util/apiUtils/api.utils";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(60 * 1000)

export default class yardOrderPage {

    private base: PlaywrightWrapper;
    private page: Page;

    // Declare the global variable for noTRStatusDate at the class level
    private noTRStatusDate: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        laborOrderMenu: "//div[normalize-space(text())='Labor Order']",
        yardOrder: "//a[normalize-space(text())='Ops Yard Order']",
        workDate: "//input[@type='date']",
        shift: "//select[@ng-reflect-name='shift']",
        jobType: "//select[@ng-reflect-name='jobCode']",
        Go: "//button[normalize-space(text())='GO']",
        startTime: "//select[@id='startTime']",
        // clerktab:"//a[normalize-space(text())='Clerk']",
        stdDbFX: "//*[@id='first']/div/div/tbody/tr[1]/td[9]/input",
        SteadyDBName: "//datalist//option[contains(text(), 'DiLeva, John J (John D) - 38407')]",
        stdDbFXFlexList: "//select[@ng-reflect-name='YARD BOSScbSteadyFx00']",
        stdFX: "//*[@id='first']/div/div/tbody/tr[1]/td[10]/input",
        SteadyFXName: "//datalist//option[contains(text(), 'Ramirez, Johnny M (Johnny) - 34343')]",
        stdFXFlexList: "//select[@ng-reflect-name='YARD BOSScbSteadyFx10']",
        YardBossddl1: "//input[@ng-reflect-name='YARD BOSStxSteadyNm00']",
        YardBossddl2: "//input[@ng-reflect-name='YARD BOSStxSteadyNm01']",
        FlexTypeList: "//select[contains(.,'FD')]",
        notes: "//div[@class='col-12']//textarea[1]",
        SaveMaycan: "//button[normalize-space(text())='SAVE/MAY-CAN']",
        Firm: "//button[normalize-space(text())='SAVE/FIRM']",
        Push: "//button[normalize-space(text())='SAVE/PUSH']",
        successNotification: "//span[contains(normalize-space(text()), 'Order information has been saved successfully')]",
        pushbuttonNotification: "//span[contains(normalize-space(text()), 'The Order information has been pushed to Summary Sheet')]",
        TRStatus: "//select[@ng-reflect-name='trStatus']",
        homeicon: "//div[@ng-reflect-router-link='/home']//a[1]",
        summarysheet: "//a[normalize-space(text())='Summary Sheet']",
        YardOrderTab: "//a[normalize-space(text())='Yard Ops - 690101']",
        stdDbFXsummarySheet: "//*[@id='vesselLongshore']/div[1]/div/div/tbody/tr[1]/td[9]/input",
        SteadyDBNamesummarySheet: "//input[@ng-reflect-name='YARD BOSStxSteadyNm00']",
        stdDbFXFlexListsummarySheet: "//select[@ng-reflect-name='YARD BOSScbSteadyFx00']",
        stdFXsummarySheet: "//*[@id='vesselLongshore']/div[1]/div/div/tbody/tr[1]/td[10]/input",
        SteadyFXNamesummarySheet: "//input[@ng-reflect-name='YARD BOSStxSteadyNm01']",
        stdFXFlexListsummarySheet: "//select[@ng-reflect-name='YARD BOSScbSteadyFx10']",
        WorkDateInsideLaborOrder:"//input[@id='workDt' and @class='form-control']"
    };

    async clickOnLaborOrderMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 100000 });
        await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.yardOrder);
    }
    async SelectDetailsOnLandingPage(): Promise<string> {
        let noTRStatusDate: string | null = null; // Initialize noTRStatusDate as null
        let currentDate = new Date();
        let formattedDate: string;
        const maxAttempts = 10;
    
        // Format the initial date as YYYY-MM-DD
        formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    
        // Select job type and click Go
        await this.page.locator(this.Elements.jobType).selectOption("Yard Ops - 690101");
        await this.page.locator(this.Elements.Go).click();
        
        fixture.logger.info("Waiting for 5 seconds");
        await fixture.page.waitForTimeout(5000);
    
        // Start looping to check TR status
        for (let attempts = 0; attempts < maxAttempts; attempts++) {
            // Recheck if TR status is visible (check on each loop iteration)
            const trStatusVisible = await this.page.locator(this.Elements.TRStatus).isVisible();
    
            if (trStatusVisible) {
                // If TR status exists, proceed to home page and set the next date
                await this.page.locator(this.Elements.homeicon).click();
                await this.page.locator(this.Elements.laborOrderMenu).click();
                await this.page.locator(this.Elements.yardOrder).click();
    
                // Increment the date by 1 (to the next day)
                currentDate.setDate(currentDate.getDate() + 1);
                
                // Format the next date (YYYY-MM-DD)
                formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    
                // Wait and fill the date for the next order
                await this.page.locator(this.Elements.workDate).waitFor({ state: 'attached', timeout: 3000 });
                await this.page.locator(this.Elements.workDate).click();
                await this.page.locator(this.Elements.workDate).fill(formattedDate);
    
                // Select job type again
                await this.page.locator(this.Elements.jobType).selectOption("Yard Ops - 690101");
    
                // Click Go button
                await this.page.locator(this.Elements.Go).click();
                noTRStatusDate = formattedDate; // Assign the formatted date with no TR status
    
                // We should only return after all attempts are made, so this return needs to be outside the loop
                // break; // Exit the loop after setting the date when TR status is found
            } else {
                // If no TR status, assign the formatted date as noTRStatusDate
                noTRStatusDate = formattedDate;
                fixture.logger.info(`TR status is not present on ${formattedDate}`);
            }
    
            // If we haven't returned yet, go to the next attempt
            fixture.logger.info(`Attempt ${attempts + 1}: TR status not found, trying next date.`);
        }
    
        // After maxAttempts or if TR status is not found, return the last checked date
        return noTRStatusDate; // Return the last date checked if no TR status was found after maxAttempts
    }

    async getLatestWorkOrderDate(): Promise<string> {
        return this.noTRStatusDate;  // Access the global noTRStatusDate
    }

    async SelectStartTime(): Promise<void> {
        fixture.logger.info("Waiting for 8 seconds")
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.startTime).selectOption("8AM");
        // await this.page.locator(this.Elements.clerktab).click();
    }
    async FillManningTable(): Promise<void> {
        await this.page.locator(this.Elements.stdDbFX).fill("1");
        await this.page.locator(this.Elements.stdFX).fill("1");
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 5 seconds")
        await fixture.page.waitForTimeout(5000);

    }
    async SelectSteadyDetails(): Promise<void> {
        await this.page.locator(this.Elements.YardBossddl1).fill("38407");
        await this.page.locator(this.Elements.YardBossddl1).press("Enter");
        // Locate the option element using XPath and get the text
        const YardBossddl1Steady = await this.page.locator(this.Elements.SteadyDBName).textContent();
        await this.page.locator(this.Elements.YardBossddl1).fill(YardBossddl1Steady);
        await this.page.locator(this.Elements.stdDbFXFlexList).selectOption('2');
        await this.page.locator(this.Elements.YardBossddl2).fill("34343");
        await this.page.locator(this.Elements.YardBossddl2).press("Enter");
        const YardBossddl2Steady = await this.page.locator(this.Elements.SteadyFXName).textContent();
        await this.page.locator(this.Elements.YardBossddl2).fill(YardBossddl2Steady);
        await this.page.locator(this.Elements.stdFXFlexList).selectOption('1');

    }

    async ClickSaveMayCan(): Promise<void> {
        await this.base.waitAndClick(this.Elements.SaveMaycan);
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);

    }

    async VerifySuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.successNotification))

    }
    async ClickPushButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.Push);
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);

    }

    async VerifyPushFunctionalitySuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.pushbuttonNotification))

    }
    async clickOnSummarySheetMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.summarysheet);
    }
    async SelectDetailsOnLandingPageSummarysheet(formatteddate: string): Promise<void> {
        const LatestWorkOrderDate = await this.getLatestWorkOrderDate();
        // async SelectDetailsOnLandingPageSummarysheet(): Promise<void> {
            console.log(LatestWorkOrderDate);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.workDate).click();
        await this.page.locator(this.Elements.workDate).fill(this.noTRStatusDate);
        // await this.page.locator(this.Elements.workDate).fill('2024-12-14');
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
        await this.base.waitAndClick(this.Elements.stdDbFXsummarySheet);
        const StdDbFxYardBossCount = await this.page.locator(this.Elements.stdDbFXsummarySheet).getAttribute('ng-reflect-model');
        expect(StdDbFxYardBossCount).toContain('1');
        const StdFxYardBossCount = await this.page.locator(this.Elements.stdFXsummarySheet).getAttribute('ng-reflect-model');
        expect(StdFxYardBossCount).toContain("1");
        const SteadyDBName = await this.page.locator(this.Elements.SteadyDBNamesummarySheet).getAttribute('ng-reflect-model');
        expect(SteadyDBName).toContain("DiLeva, John J (John D) - 3840");
        const stdDbFXFlexList = await this.page.locator(this.Elements.stdDbFXFlexListsummarySheet).getAttribute('ng-reflect-model');
        expect(stdDbFXFlexList).toContain("2");
        const SteadyFXName = await this.page.locator(this.Elements.SteadyFXNamesummarySheet).getAttribute('ng-reflect-model');
        expect(SteadyFXName).toContain("Ramirez, Johnny M (Johnny) - 3");
        const stdFXFlexList = await this.page.locator(this.Elements.stdFXFlexListsummarySheet).getAttribute('ng-reflect-model');
        expect(stdFXFlexList).toContain("1");

    }

}