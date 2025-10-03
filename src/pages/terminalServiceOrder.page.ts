import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(60 * 1000)

export default class terminalServiceOrderPage {

    protected base: PlaywrightWrapper;  // Change to protected so that subclasses can access it
    public page: Page;  // Same with page property

    // Declare the global variable for noTRStatusDate at the class level
    public noTRStatusDate: string;
    private weekNumber: number;
    public rollingCodeText: string;
    // Constructor accepts the Page object
    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }


    public Elements = {
        laborOrderMenu: "//div[normalize-space(text())='Labor Order']",
        terminalServiceOrder: "//a[normalize-space(text())='Terminal Services Order']",
        workDate: "//input[@aria-describedby='Work Date']",
        shift: "//select[@ng-reflect-name='shift']",
        jobType: "//select[@ng-reflect-name='jobCode']",
        Go: "//button[normalize-space(text())='GO']",
        TRStatus: "//select[@ng-reflect-name='trStatus']",
        homeicon: "//div[@ng-reflect-router-link='/home']//a[1]",
        sweeperTab: "//a[normalize-space()='Sweeper']",
        NewFX: "//*[@id='first']/div/div/tbody/tr/td[3]/input",
        New: "//*[@id='first']/div/div/tbody/tr/td[4]/input",
        textArea: "(//label[normalize-space(text())='Notes']/following::textarea)[1]",
        savemaycan: "//button[normalize-space(text())='SAVE/MAY-CAN']",
        TimehseetMenu: "//div[normalize-space(text())='Timesheet']",
        terminalServiceTimehseet: "//a[normalize-space(text())='Terminal Services Timesheet']",
        workDatetimehseet: "//input[@id='sWorkDt']",
        shifttimehseet: "//select[@ng-reflect-name='shift']",
        jobTypetimehseet: "//select[@ng-reflect-name='jobCode']",
        SThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[8]/input[1]",
        OThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[9]/input[1]",
        plusBtton: "//i[contains(@class,'bi bi-plus-square')]",
        jobList: "(//input[contains(@class,'form-control dynamic-input')])[2]",
        JobListAddButton: "//button[normalize-space()='ADD']",
        FirstNamecell: "//input[@id='longshore0']",
        ST: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet[1]/div[1]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[2]/td[8]/input[1]",
        OT: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet[1]/div[1]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[2]/td[9]/input[1]",
        MGRRemarks: "(//i[@data-bs-target='#remarks'])[3]",
        RemarksTextArea: "//textarea[@id='addComment']",
        AddRemarksButton: "//button[normalize-space()='Add Remarks']",
        RegisterNo: "//input[@id='regNo0']",
        RegisterNo2: "//input[@id='regNo1']",
        FirstHallEntry: "//input[@id='longshore0']",
        SecondHallEntry: "//input[@id='longshore1']",
        thridHallEntry: "//input[@id='longshore2']",
        ST1: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet[1]/div[1]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[8]/input[1]",
        OT1: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet[1]/div[1]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[9]/input[1]",
        FirstRowCheckBox: "//tbody/tr[1]/td[1]/input[1]",
        SecondRowCheckBox: "//tbody/tr[2]/td[1]/input[1]",
        ThirdRowCheckBox: "//tbody/tr[3]/td[1]/input[1]",
        deleteIcon: "//button[normalize-space()='DELETE ROWS']",
        YesButton: "//button[normalize-space()='Yes']",
        CountDropDown: "//select[@id='rowCounter']",

        RollingCodeButton: "//button[normalize-space()='View']",
        RollingCode: "//div[contains(@class,'modal-body')]//div[.//span[text()='Sweeper']]/span[last()]",
        RollingCodeTextBox: "//input[@id='rollingCode']",
        RollingCodeCloseButton: "//div[@id='rollingCode']//button[@class='btn button-action'][normalize-space()='Close']",
        GoButton: "//button[normalize-space()='Go']",
    }
    async clickOnTerminalServiceOrderMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 100000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.terminalServiceOrder);
    }

    async SelectDetailsOnLandingPage(): Promise<string> {
        let currentDate = new Date();
        let formattedDate: string;
        const maxAttempts = 20;

        await this.page.locator(this.Elements.shift).selectOption("2ND");
        await this.page.locator(this.Elements.jobType).selectOption("Sweeper - 490137");
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
                await this.page.locator(this.Elements.terminalServiceOrder).click();
                formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                    .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
                await this.page.locator(this.Elements.workDate).waitFor({ state: 'attached', timeout: 3000 });
                await this.page.locator(this.Elements.workDate).click();
                await this.page.locator(this.Elements.workDate).fill(formattedDate);

                await this.page.locator(this.Elements.shift).selectOption("2ND");
                await this.page.locator(this.Elements.jobType).selectOption("Sweeper - 490137");
                await this.page.locator(this.Elements.Go).click();


            } else {
                fixture.logger.info(`Order created for date: ${formattedDate}`);
                this.noTRStatusDate = formattedDate;
                return formattedDate; // stop loop on success
            }
        }

        throw new Error("Unable to create order — all attempted dates already have TRStatus.");
    }


    async FillManningTable(): Promise<void> {

        await this.page.locator(this.Elements.NewFX).fill("1");
        await this.page.locator(this.Elements.New).fill("2");
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.textArea).fill("text data");

    }
    async clickOnTimehseetMenu(): Promise<void> {
        // await this.base.goto(process.env.BASEURL, { timeout: 60000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.TimehseetMenu);
        await this.base.waitAndClick(this.Elements.terminalServiceTimehseet);
    }
    async SelectDetailsOnLandingPageTimehseet(formatteddate: string): Promise<void> {
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.workDatetimehseet).click();
        await this.page.locator(this.Elements.workDatetimehseet).fill(this.noTRStatusDate);
        await this.page.locator(this.Elements.shift).selectOption("2ND");
        await this.page.locator(this.Elements.jobType).selectOption("Sweeper - 490137");
        await this.base.waitAndClick(this.Elements.Go);
    }
    async clickOnSweeperTab(): Promise<void> {
        await this.base.waitAndClick(this.Elements.sweeperTab);
    }
    async deleteAllEntries(): Promise<void> {
        await this.page.locator(this.Elements.FirstRowCheckBox).click();
        await this.page.locator(this.Elements.SecondRowCheckBox).click();
        await this.page.locator(this.Elements.ThirdRowCheckBox).click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.deleteIcon);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.YesButton);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);

    }

    async addNewRowInTimesheet(): Promise<void> {
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
      await this.base.waitAndClick(this.Elements.plusBtton);
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('200');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').press('Enter');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').click();
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('200 - SWEEPER - SWEEPER');
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.JobListAddButton);

    }
    async FillHrsTab(): Promise<void> {
        await this.page.locator(this.Elements.FirstNamecell).click();
        await this.page.locator(this.Elements.FirstNamecell).fill("61199");
        await this.page.locator(this.Elements.FirstNamecell).press('Enter');
        await this.page.locator(this.Elements.FirstNamecell).fill("Alfiche, John I");
        await this.page.locator(this.Elements.RegisterNo).fill("61199");

        await this.page.locator(this.Elements.ST1).fill("8");
        await this.page.locator(this.Elements.OT1).fill("2");
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
    }

    async AddNewRowterminal(): Promise<void> {
        await this.base.waitAndClick(this.Elements.plusBtton);
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('200');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').press('Enter');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').click();
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('200 - SWEEPER - SWEEPER');
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.JobListAddButton);
        await this.page.locator(this.Elements.SecondHallEntry).click();
        await this.page.locator(this.Elements.SecondHallEntry).fill("3961305");
        await this.page.locator(this.Elements.SecondHallEntry).press('Enter');
        await this.page.locator(this.Elements.SecondHallEntry).fill("Acosta, Johnnie A");
        await this.page.locator(this.Elements.RegisterNo2).fill("3961305");
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
    async storeRollingCodeTerminalServiceOrderTimesheet(): Promise<string> {
        let attempts = 0;
        const maxAttempts = 10; // Increase attempts for reliability

        while (attempts < maxAttempts) {
            // Open the rolling code dialog
            await this.base.waitAndClick(this.Elements.RollingCodeButton);

            // Wait for the rolling code value to be visible (not just any text)
            const rollingCodeElement = this.page.locator(this.Elements.RollingCode);
            // Wait up to 2 seconds for the value to be non-empty
            let SweeperCode = '';
            try {
                await rollingCodeElement.waitFor({ state: 'visible', timeout: 2000 });
                const value = await rollingCodeElement.textContent();
                if (value && value.trim() !== '') {
                    SweeperCode = value.trim();
                }
            } catch (e) {
                // If not visible, treat as not found
                SweeperCode = '';
            }

            // Close the popup
            await this.base.waitAndClick(this.Elements.RollingCodeCloseButton);

            if (SweeperCode !== '') {
                this.rollingCodeText = SweeperCode;
                return this.rollingCodeText;
            }

            fixture.logger.info("Sweeper rolling code not found, reopening the popup.");
            attempts++;
            await this.page.waitForTimeout(1000);
        }
        throw new Error('Sweeper rolling code was not generated after multiple attempts.');
    }
    async pasteRollingCode(RollingCode: string): Promise<void> {
        await this.page.locator(this.Elements.RollingCodeTextBox).fill(this.rollingCodeText);
        await this.base.waitAndClick(this.Elements.GoButton);

    }

}