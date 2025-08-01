import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import * as data from "../helper/util/test-data/payloads.json";
import { request } from "@playwright/test";
import { APiUtils } from "../helper/util/apiUtils/api.utils";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(60 * 1000)

export default class yardOrderPagePOC {

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
        payrollManagemnetDashboardMenu: "//a[normalize-space()='Payroll Management Dashboard']",
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
        WorkDateInsideLaborOrder: "//input[@id='workDt' and @class='form-control']",
        TimehseetMenu: "//div[normalize-space(text())='Timesheet']",
        yardTimehseet: "//a[normalize-space(text())='Ops Yard Timesheet']",
        workDatetimehseet: "//input[@id='sWorkDt']",
        shifttimehseet: "//select[@ng-reflect-name='shift']",
        jobTypetimehseet: "//select[@ng-reflect-name='jobCode']",
        // Go: "//button[normalize-space(text())='GO']",
        ForemanTab: "//a[normalize-space(text())='Foreman']",
        SThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[8]/input[1]",
        OThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[9]/input[1]",
        DFThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[10]/input[1]",
        OThrSecondRow: "//tbody/tr[2]/td[9]/input[1]",
        SaveANDSubmit: "//button[normalize-space()='SAVE AND SUBMIT']",
        successNotificationtimesheet: "//span[normalize-space(text())='Timesheet Information has been updated successfully']",
        conductSaftyTalk: "(//input[contains(@class,'form-check-input input-checkbox')])[2]",
        TimehseetApprovalName: "//input[@aria-describedby='signature']",
        LBCTManagemnetName: "//input[@aria-describedby='mgmtName']",
        ApproveButton: "//button[normalize-space(text())='APPROVE']",
        payrollLink: "(//a[@id='navbarDropdown'])[3]",
        payrollOCUDashboard: "//a[normalize-space()='Payroll OCU Dashboard']",
        batchReadyButton: "//button[normalize-space(text())='BATCH READY ?']",
        BatchConfirmationPopUp: "//button[normalize-space(text())='Yes']",
        successNotificationBatchReady: "//span[normalize-space(text())='Timesheet status have been updated to Batch Ready successfully']",
        batchDownloadButton: "//span[text()='Ready for Download - ']/following-sibling::i",
        RefreshButton: "//button[normalize-space(text())='REFRESH']",
        pmaBatchNumber: "//input[@placeholder='Enter PMA Batch No']",
        uploadFilePath: "//input[@type='file']",
        uploadButton: "//button[normalize-space()='Upload']",
        SOTAConfirm: "//button[normalize-space(text())='SOTA CONFIRM?']",
        successMessageAfterSOTA: "//span[normalize-space(text())='Batch SOTA Confirmed successfully']",
        PMAApprovedButton: "//button[normalize-space(text())='PMA APPROVED?']",
        successMessageAfterPMAApproved: "//span[normalize-space(text())='Batch PMA Approved successfully']",
        shiftBatchLevelScreen: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-payroll-mgmt-summary[1]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[3]/span[1]",
        completeCheckList: "//input[@id='complete']",
        reviewNotesButton: "//i[@class='bi bi-card-list icon-lg m-2']",
        reviewTextArea: "//textarea[@id='addComment']",
        addRemarksButton: "//button[normalize-space()='Add Remarks']",
        checklist1: "//div[@class='col-6']//div[1]//input[1]'",
        checklist2: "//div[@class='row justify-content-md-center']//div[2]//input[1]",
        checkList3: "//div[@class='row justify-content-md-center']//div[5]//input[1]",
        saveInfo: "//button[normalize-space()='SAVE INFO']",
        viewTimesheet: "//button[normalize-space()='VIEW TIMESHEETS']",
        pageTitle: "//span[@class='page-title p-1']",
        backButton: "//button[normalize-space()='BACK']",
        timeSheetReport: "//button[normalize-space()='TIMESHEET REPORT']",
        steadyListReport: "//button[normalize-space()='STEADY LIST REPORT']",
        timeSheetReviewRecap: "//button[normalize-space()='TIMESHEET REVIEW RECAP']",
        OCULogHistory: "//button[normalize-space()='VIEW OCU LOG HISTORY']",
        downloadBatchReport: "//button[normalize-space()='DOWNLOAD BATCH REPORT']",
        gangLink: "//span[@class='link-color']",
        batchUnready: "//button[normalize-space()='BATCH UN-READY?']",
        successNotificationBatchUnReady: "//span[normalize-space(text())='Timesheet status have been updated to Batch Un-Ready successfully']",
        differenceDownLoadReport: "//button[normalize-space()='DOWNLOAD']",
        pmaUnApproved: "//button[normalize-space()='PMA UN-APPROVED?']",
        successNotificationPMAUnapproved: "//span[normalize-space(text())='Batch PMA Un-Approved successfully']",
        successNotificationSOTAUnapproved: "//span[normalize-space(text())='Batch SOTA Un-Confirmed successfully']",
        SOTAUnnConfirm: "//button[normalize-space()='SOTA UN-CONFIRM?']",
        payrollMenu: "//div[normalize-space()='Payroll']",



    }

    async clickOnLaborOrderMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 100000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.yardOrder);
    }

    async SelectDetailsOnLandingPage(): Promise<string> {
        let currentDate = new Date();
        let formattedDate: string;
        const maxAttempts = 10;

        // await this.page.locator(this.Elements.shift).selectOption("2ND");
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

                // await this.page.locator(this.Elements.shift).selectOption("2ND");
                await this.page.locator(this.Elements.jobType).selectOption("Yard Ops - 690101");
                await this.page.locator(this.Elements.Go).click();


            } else {
                fixture.logger.info(`Order created for date: ${formattedDate}`);
                this.noTRStatusDate = formattedDate;
                return formattedDate; // stop loop on success
            }
        }

        throw new Error("Unable to create order — all attempted dates already have TRStatus.");

        // await this.page.locator(this.Elements.workDate).fill('2025-07-22');
        // await this.page.locator(this.Elements.jobType).selectOption("Yard Ops - 690101");
        // await this.page.locator(this.Elements.Go).click();

        // // // Store the date to noTRStatusDate
        // this.noTRStatusDate = '2025-07-22';
        // // this.noTRStatusDate = formattedDate;
        // return this.noTRStatusDate;
    }


    async getLatestWorkOrderDate(): Promise<string> {
        return this.noTRStatusDate;  // Access the global noTRStatusDate
    }

    async SelectStartTime(): Promise<void> {
        fixture.logger.info("Waiting for 8 seconds")
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.startTime).selectOption("8AM");
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
        console.log(LatestWorkOrderDate);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.workDate).click();
        await this.page.locator(this.Elements.workDate).fill(this.noTRStatusDate);
        // await this.passDate();
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

    async clickOnTimehseetMenu(): Promise<void> {
        // await this.base.goto(process.env.BASEURL, { timeout: 60000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.TimehseetMenu);
        await this.base.waitAndClick(this.Elements.yardTimehseet);
    }
    async SelectDetailsOnLandingPageTimehseet(formatteddate: string): Promise<void> {
        const LatestWorkOrderDate = await this.getLatestWorkOrderDate();
        console.log(LatestWorkOrderDate);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.workDatetimehseet).click();
        await this.page.locator(this.Elements.workDatetimehseet).fill(this.noTRStatusDate);
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
        await this.page.locator(this.Elements.OThrSecondRow).fill("1");
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
    }
    async clickOnSaveAndSubmit(): Promise<void> {
        await this.base.waitAndClick(this.Elements.SaveANDSubmit);

        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
    }
    async verifySuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.successNotification))
    }
    async SubmitandApprovetheTimehseet(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.conductSaftyTalk).check();
        await this.page.locator(this.Elements.TimehseetApprovalName).fill("TestUser");
        await this.base.waitAndClick(this.Elements.SaveANDSubmit);
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.LBCTManagemnetName).fill("Ops");
        await this.base.waitAndClick(this.Elements.ApproveButton);
        await fixture.page.waitForTimeout(3000);

    }

    async clickOnPayrollMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.payrollLink);
        await this.base.waitAndClick(this.Elements.payrollOCUDashboard);
    }

    async selectTheBatch(): Promise<void> {

        const date = new Date(this.noTRStatusDate);
        // const date = new Date('2025-08-01');
        const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Map day of the week to week number
        const weekNumberMap = {
            6: 1, // Saturday -> batch 1
            0: 2, // Sunday -> batch 2
            1: 3, // Monday -> batch 3
            2: 4, // Tuesday -> batch 4
            3: 5, // Wednesday -> batch 5
            4: 6, // Thursday -> batch 6
            5: 7  // Friday -> batch 7
        };
        const weekNumber = weekNumberMap[dayOfWeek];
        console.log(`Clicking on week number: ${weekNumber}`);

        // Click on the particular number (week number)
        const weekNumberXPath = `//span[normalize-space(text())='${weekNumber}']`;

        // Click on the particular number (week number)
        await this.page.locator(weekNumberXPath).click();
    }

    async ClickOnBatchReady(): Promise<void> {
        await this.base.waitAndClick(this.Elements.batchReadyButton);
        await this.base.waitAndClick(this.Elements.BatchConfirmationPopUp);

        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
    }
    async verifyBatchReadySuccessMessage(): Promise<void> {
        const successMessage = await this.page.locator(this.Elements.successNotificationBatchReady).textContent();
        expect(successMessage).toContain("Timesheet status have been updated to Batch Ready successfully");
    }
    async calculateWeekNumber(): Promise<void> {
        const date = new Date(this.noTRStatusDate);
        // const date = new Date('2025-08-01');
        const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)

        // Map day of the week to batch number
        const weekNumberMap = {
            6: 1, // Saturday -> batch 1
            0: 2, // Sunday -> batch 2
            1: 3, // Monday -> batch 3
            2: 4, // Tuesday -> batch 4
            3: 5, // Wednesday -> batch 5
            4: 6, // Thursday -> batch 6
            5: 7  // Friday -> batch 7
        };

        this.weekNumber = weekNumberMap[dayOfWeek];
        console.log(`Calculated week number: ${this.weekNumber}`);
    }
    async waitForDifferenceButton(): Promise<void> {
        const downloadButtonXPath = `//td[span[normalize-space(text())='${this.weekNumber}']]/following-sibling::td[9]//i[contains(@class, 'bi bi-journal-arrow-down')]`;
        await this.page.locator(downloadButtonXPath).click();
        const pageTitle = await this.page.locator(this.Elements.pageTitle).textContent();
        expect(pageTitle).toContain("OCU - Differences Report");
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(2000);
        this.downLoadDifference();
        await this.base.waitAndClick(this.Elements.backButton);


    }

    async waitForDownloadButton(): Promise<void> {
        const downloadButtonXPath = `//td[span[normalize-space(text())='${this.weekNumber}']]/following-sibling::td[6]//i[contains(@class, 'bi-save')]`;

        let downloadButtonVisible = false;
        while (!downloadButtonVisible) {
            await this.base.waitAndClick(this.Elements.RefreshButton);
            await fixture.page.waitForTimeout(3000);
            downloadButtonVisible = await this.page.locator(downloadButtonXPath).isVisible();
        }
    }

    async downloadBatchFile(): Promise<void> {
        const downloadButtonXPath = `//td[span[normalize-space(text())='${this.weekNumber}']]/following-sibling::td[6]//i[contains(@class, 'bi-save')]`;

        // Create a folder for downloads if it doesn't exist
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);

        // Handle the download event
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // Wait for the download to start
            this.page.locator(downloadButtonXPath).click() // Perform the action that initiates download
        ]);


        // Save the downloaded file to the specified folder as a text file
        const downloadPathWithFileName = path.join(downloadPath, 'downloadedFile.txt');
        await download.saveAs(downloadPathWithFileName);
        console.log(`File downloaded to: ${downloadPathWithFileName}`);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();

        // return downloadPathWithFileName;
        const uploadPMABatch = this.page.locator(`//td[span[normalize-space(text())='${this.weekNumber}']]/following-sibling::td[7]//i[contains(@class, 'bi bi-folder')]`);
        await uploadPMABatch.click();
        await this.page.locator(this.Elements.pmaBatchNumber).fill("10");

        // Locate the file input element and set the file path
        const fileInput = await this.page.locator('//input[@type="file"]');
        await fileInput.setInputFiles(downloadPathWithFileName);
        console.log(`File uploaded from: ${downloadPathWithFileName}`);

        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.uploadButton).click();
        await fixture.page.waitForTimeout(3000);
    }

    async verifyUploadSuccess(): Promise<void> {
        const successMessageXPath = `//td[span[normalize-space(text())='${this.weekNumber}']]/following-sibling::td[7]//div//span[normalize-space(text())='Processed Successfully']`;
        let successMessageAfterUpload = false;

        while (!successMessageAfterUpload) {
            await this.base.waitAndClick(this.Elements.RefreshButton);
            await fixture.page.waitForTimeout(3000);
            successMessageAfterUpload = await this.page.locator(successMessageXPath).isVisible();
        }

        const successMessage = await this.page.locator(successMessageXPath).textContent();
        expect(successMessage).toContain("Processed Successfully");
        await fixture.page.waitForTimeout(2000);
    }


    clearDownloadFolder(downloadPath: string): void {
        fs.readdir(downloadPath, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(downloadPath, file), err => {
                    if (err) throw err;
                });
            }
        });
    }
    async ClickOnSOTAButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.SOTAConfirm);
        await this.base.waitAndClick(this.Elements.BatchConfirmationPopUp);
        await fixture.page.waitForTimeout(3000);

    }
    async verifySOTASuccessMessage(): Promise<void> {
        const successMessage = await this.page.locator(this.Elements.successMessageAfterSOTA).textContent();
        expect(successMessage).toContain("Batch SOTA Confirmed successfully");
    }
    async ClickOnPMAApproved(): Promise<void> {
        await this.base.waitAndClick(this.Elements.PMAApprovedButton);
        await this.base.waitAndClick(this.Elements.BatchConfirmationPopUp);

        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
    }
    async verifyPMASuccessMessageAfterPMAApproval(): Promise<void> {
        const successMessage = await this.page.locator(this.Elements.successMessageAfterPMAApproved).textContent();
        expect(successMessage).toContain("Batch PMA Approved successfully");
        await fixture.page.waitForTimeout(2000);
    }
    async clickPayrollManagementDashnoard(): Promise<void> {
        await this.base.waitAndClick(this.Elements.payrollMenu);
        await this.base.waitAndClick(this.Elements.payrollManagemnetDashboardMenu);
    }
    async clickOnBatchInBatchLevel(): Promise<void> {
        await this.base.waitAndClick(this.Elements.shiftBatchLevelScreen);
    }
    async saveInfo(): Promise<void> {
        await this.base.waitAndClick(this.Elements.completeCheckList);
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.reviewNotesButton);
        await this.page.locator(this.Elements.reviewTextArea).fill("Test remarks");
        await this.base.waitAndClick(this.Elements.addRemarksButton);
        await fixture.page.waitForTimeout(2000);
        await this.page.locator('#items').first().check();
        await this.page.locator('div:nth-child(4) > #items').check();
        await this.page.locator('div:nth-child(5) > #items').check();

        await this.base.waitAndClick(this.Elements.saveInfo);
    }
    async viewTimehseet(): Promise<void> {
        await this.base.waitAndClick(this.Elements.viewTimesheet);
        const pageTitle = await this.page.locator(this.Elements.pageTitle).textContent();
        expect(pageTitle).toContain("Timesheet Management");
        await this.page.goBack();


    }
    async backButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.backButton);
        const pageTitle = await this.page.locator(this.Elements.pageTitle).textContent();
        expect(pageTitle).toContain("Payroll - Batch Level");
        await this.page.goBack();
        await fixture.page.waitForTimeout(2000);


    }
    async OCULogHistory(): Promise<void> {
        await this.base.waitAndClick(this.Elements.OCULogHistory);
        const pageTitle = await this.page.locator(this.Elements.pageTitle).textContent();
        expect(pageTitle).toContain("View OCU Logs");
        await this.base.waitAndClick(this.Elements.backButton);


    }
    async ganglink(): Promise<void> {
        await this.base.waitAndClick(this.Elements.gangLink);
        const pageTitle = await this.page.locator(this.Elements.pageTitle).textContent();
        expect(pageTitle).toContain("Timesheet Management");

    }
    async batchUnready(): Promise<void> {
        await this.base.waitAndClick(this.Elements.batchUnready);
        await this.base.waitAndClick(this.Elements.BatchConfirmationPopUp);

        const pageTitle = await this.page.locator(this.Elements.successNotificationBatchUnReady).textContent();
        expect(pageTitle).toContain("Timesheet status have been updated to Batch Un-Ready successfully");

    }

    async PMAProcess(): Promise<void> {
        await this.base.waitAndClick(this.Elements.pmaUnApproved);
        await this.base.waitAndClick(this.Elements.BatchConfirmationPopUp);

        const PMA = await this.page.locator(this.Elements.successNotificationPMAUnapproved).textContent();
        expect(PMA).toContain("Batch PMA Un-Approved successfully");
        await this.base.waitAndClick(this.Elements.SOTAUnnConfirm);
        await this.base.waitAndClick(this.Elements.BatchConfirmationPopUp);
        const SOTA = await this.page.locator(this.Elements.successNotificationSOTAUnapproved).textContent();
        expect(SOTA).toContain("Batch SOTA Un-Confirmed successfully");


    }
    async timeSheetReport(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.timeSheetReport).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'TimeSheet_Report.XLSX');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }
    async steadyListReport(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.steadyListReport).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'SteadyList_Report.XLSX');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }
    async timeSheetReviewRecap(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.timeSheetReviewRecap).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'TimeSheetReviewRecap_Report.XLSX');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }

    async downLoadBatchReport(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.downloadBatchReport).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'Batch_Report.XLSX');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }
    async downLoadDifference(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.differenceDownLoadReport).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'PMADifference_Report.XLSX');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }

} 