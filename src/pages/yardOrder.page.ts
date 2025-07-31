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
        startTime: "//select[@id='startTime']",
        stdFX: "//*[@id='first']/div/div/tbody/tr[1]/td[7]/input",
        SteadyFXName: "//datalist//option[contains(text(), 'Babich, Vince (Vince) - 36464')]",
        stdFXFlexList: "//select[@ng-reflect-name='YARD BOSScbSteadyFx00']",
        YardBossddl1: "//input[@ng-reflect-name='YARD BOSStxSteadyNm00']",
        textArea: "(//label[normalize-space(text())='Notes']/following::textarea)[1]",
        savemaycan: "//button[normalize-space(text())='SAVE/MAY-CAN']",
        validationMessageForMandatoryFields: "(//span[@class='text-bold color-white'])[1]",
        yardBossSteady: "//*[@id='first']/div/div/tbody/tr[1]/td[7]/input",
        stdyValidationMessage: "//span[normalize-space(text())='The total Flex Steady Count and the total Flex Steady names are not matching for Longshore']",
        TimehseetMenu: "//div[normalize-space(text())='Timesheet']",
        yardTimehseet: "//a[normalize-space(text())='Ops Yard Timesheet']",
        workDatetimehseet: "//input[@id='sWorkDt']",
        shifttimehseet: "//select[@ng-reflect-name='shift']",
        jobTypetimehseet: "//select[@ng-reflect-name='jobCode']",
        SThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[8]/input[1]",
        OThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[9]/input[1]",
        ForemanTab: "//a[normalize-space(text())='Foreman']",
        plusBtton: "//i[contains(@class,'bi bi-plus-square')]",
        jobList: "(//input[contains(@class,'form-control dynamic-input')])[2]",
        JobListAddButton: "//button[normalize-space(text())='ADD']",
        FirstNamecell: "(//input[contains(@class,'form-control dynamic-input')])[2]",
        ST: "//table[contains(@class,'table table-form')]/tbody[1]/tr[2]/td[8]/input[1]",
        OT: "//table[contains(@class,'table table-form')]/tbody[1]/tr[2]/td[9]/input[1]",
        MGRRemarks: "(//i[@data-bs-target='#remarks'])[3]",
        RemarksTextArea: "//textarea[@id='addComment']",
        AddRemarksButton: "//button[normalize-space()='Add Remarks']",
        RegisterNo: "//input[@id='regNo1']",
    }
    async clickOnYardOrderMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 100000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.yardOrder);
    }

    async SelectDetailsOnLandingPage(): Promise<string> {
        let currentDate = new Date();
        let formattedDate: string;
        const maxAttempts = 10;

        await this.page.locator(this.Elements.shift).selectOption("2ND");
        await this.page.locator(this.Elements.jobType).selectOption("Yard Ops - 690101");
        await this.page.locator(this.Elements.Go).click();

        fixture.logger.info("Waiting for 1 seconds");
        await fixture.page.waitForTimeout(1000);

        for (let attempts = 0; attempts < maxAttempts; attempts++) {
            formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

            fixture.logger.info(`Checking TRStatus for date: ${formattedDate}`);
            const trStatusLocator = this.page.locator(this.Elements.TRStatus);

            const isAttached = await trStatusLocator.waitFor({ state: 'attached', timeout: 5000 })
                .then(() => true)
                .catch(() => false);

            let trStatusVisible = false;

            if (isAttached) {
                trStatusVisible = await trStatusLocator.isVisible();
                fixture.logger.info(`TRStatus element is attached. isVisible: ${trStatusVisible}`);
            } else {
                fixture.logger.info("TRStatus element is not attached to DOM.");
            }

            if (trStatusVisible) {
                fixture.logger.info(`TRStatus is visible for ${formattedDate}, moving to next date.`);

                // Increment date for next attempt
                currentDate.setDate(currentDate.getDate() + 1);

                // Navigate back to form
                await this.page.locator(this.Elements.homeicon).click();
                await this.page.locator(this.Elements.laborOrderMenu).click();
                await this.page.locator(this.Elements.yardOrder).click();
                formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                    .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
                await this.page.locator(this.Elements.workDate).waitFor({ state: 'attached', timeout: 3000 });
                await this.page.locator(this.Elements.workDate).click();
                await this.page.locator(this.Elements.workDate).fill(formattedDate);

                await this.page.locator(this.Elements.shift).selectOption("2ND");
                await this.page.locator(this.Elements.jobType).selectOption("Yard Ops - 690101");
                await this.page.locator(this.Elements.Go).click();


            } else {
                fixture.logger.info(`Order created for date: ${formattedDate}`);
                this.noTRStatusDate = formattedDate;
                return formattedDate; // stop loop on success
            }
        }

        throw new Error("Unable to create order — all attempted dates already have TRStatus.");
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

    async validationMessageForMandatoryFields(): Promise<void> {
        const validationMessageForMandatoryFields = await this.page.locator(this.Elements.validationMessageForMandatoryFields).textContent();
        expect(validationMessageForMandatoryFields).toContain("Please select a Shift Start Time");
    }
    async validationMessageForSteadtcount(): Promise<void> {
        this.EnterHeaderDetails()
        await this.page.locator(this.Elements.yardBossSteady).fill("1");
        await this.page.locator('body').click();
        await this.base.waitAndClick(this.Elements.savemaycan);
        const validationMessageForSteady = await this.page.locator(this.Elements.stdyValidationMessage).textContent();
        expect(validationMessageForSteady).toContain("The total Flex Steady Count and the total Flex Steady names are not matching for Longshore");



    }
    async clickOnTimehseetMenu(): Promise<void> {
        // await this.base.goto(process.env.BASEURL, { timeout: 60000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.TimehseetMenu);
        await this.base.waitAndClick(this.Elements.yardTimehseet);
    }
    async SelectDetailsOnLandingPageTimehseet(formatteddate: string): Promise<void> {
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.workDatetimehseet).click();
        await this.page.locator(this.Elements.workDatetimehseet).fill(this.noTRStatusDate);
        await this.page.locator(this.Elements.shift).selectOption("2ND");
        await this.page.locator(this.Elements.jobType).selectOption("Yard Ops - 690101");
        await this.base.waitAndClick(this.Elements.Go);
    }
    async clickOnForemanTab(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ForemanTab);
    }
    async FillHrsTab(): Promise<void> {
        await this.page.locator(this.Elements.SThrFirstRow).fill("8");
        await this.page.locator(this.Elements.OThrFirstRow).fill("2");
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
    }
    async AddNewRowYard(): Promise<void> {
        await this.base.waitAndClick(this.Elements.plusBtton);
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('141');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').press('Enter');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').click();
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('141 - DB - YARD BOSS');
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.JobListAddButton);
        await this.page.locator(this.Elements.FirstNamecell).click();
        await this.page.locator(this.Elements.FirstNamecell).fill("3961305");
        await this.page.locator(this.Elements.FirstNamecell).press('Enter');
        await this.page.locator(this.Elements.FirstNamecell).fill("Acosta, Johnnie A");
        await this.page.locator(this.Elements.RegisterNo).fill("3961305");
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.ST).fill("7");
        await this.page.locator(this.Elements.OT).fill("3");
        await this.base.waitAndClick(this.Elements.MGRRemarks);
        await this.page.locator(this.Elements.RemarksTextArea).fill("MGR REMARKS!");
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.AddRemarksButton);

    }

}