import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(60 * 1000)

export default class vesselOrderPage {

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
        summarysheet: "//a[normalize-space(text())='Summary Sheet']",
        vesselOrder: "//a[normalize-space(text())='Ops Vessel Order']",
        workDate: "//input[@aria-describedby='Work Date']",
        workDateSummarySheet: "//input[@type='date']",
        shift: "//select[@ng-reflect-name='shift']",
        jobNo: "//input[@ng-reflect-name='jobNo']",
        Go: "//button[normalize-space(text())='GO']",
        TRStatus: "//select[@ng-reflect-name='trStatus']",
        homeicon: "//div[@ng-reflect-router-link='/home']//a[1]",
        dataList: "//datalist[@id='nameListData']",
        berth: "//select[@id='berth']",
        startTime: "//select[@id='startTime']",
        reference: "//select[@id='references']",
        CNTRComeBack: "(//input[@type='number'])[1]",
        LashComeBack: "(//input[@type='number'])[2]",
        LashTypeComeBack: "//select[@id='lashType0']",
        ForeManTab: "//a[normalize-space(text())='Foreman']",
        STDYFX: "//*[@id='first']/div/div/tbody/tr[1]/td[7]/input",
        LASHBOSSSTEADY: "//input[@list='nameListData00']",
        LASHBOSSSTEADYflexType: "//select[@id='cbSteadyFx']",
        textArea: "//textarea[@ng-reflect-name='notes']",
        savemaycan: "//button[normalize-space(text())='SAVE/MAY-CAN']",
        SteadyDBName: "//datalist//option[contains(text(), 'Albano, Bill (Bill) - 38280')]",
        successNotification: "//span[contains(normalize-space(text()), 'Order information has been saved successfully')]",
        Discard: "//button[normalize-space(text())='DISCARD']",
        YesButtonOnDiscard: "//button[normalize-space(text())='Yes']",
        DiscardNotification: "//span[contains(normalize-space(text()), 'Order information has been discarded successfully')]",
        FirmButton: "//button[normalize-space(text())='SAVE/FIRM']",
        PushButton: "//button[normalize-space(text())='SAVE/PUSH']",
        pushbuttonNotification: "//span[contains(normalize-space(text()), 'The Order information has been pushed to Summary Sheet')]",
        CancelButton: "//button[normalize-space(text())='CANCEL']",
        cancelpopupyes: "//button[normalize-space(text())='Yes']",
        cancelNotification: "//span[contains(normalize-space(text()), 'Order information has been cancelled successfully')]",
        TimehseetMenu: "//div[normalize-space(text())='Timesheet']",
        vesselTimehseet: "//a[normalize-space(text())='Ops Vessel Timesheet']",
        workDatetimehseet: "//input[@id='sWorkDt']",
        shifttimehseet: "//select[@ng-reflect-name='shift']",
        ForemanTab: "//a[normalize-space(text())='Foreman']",
        SThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[8]/input[1]",
        OThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[9]/input[1]",
        saveWithoutSubmit: "//button[normalize-space(text())='SAVE WITHOUT SUBMITTING']",
        SaveANDSubmit: "//button[normalize-space()='SAVE AND SUBMIT']",
        successNotificationtimesheet: "//span[normalize-space(text())='Timesheet Information has been updated successfully']",
        conductSaftyTalk: "//input[@id='flexCheckDefault']",
        TimehseetApprovalName: "//input[@aria-describedby='signature']",
        LBCTManagemnetName: "//input[@aria-describedby='mgmtName']",
        ApproveButton: "//button[normalize-space(text())='APPROVE']",
        downloadReport: "//button[normalize-space(text())='DOWNLOAD REPORT']",
        rejectButton: "//button[normalize-space(text())='REJECT']",
        rejectpopup: "//button[normalize-space(text())='OK']",
        removeApproval: "//button[normalize-space(text())='REMOVE APPROVAL']",
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
        RollingCodeButton: "//button[normalize-space()='View']",
        RollingCode: "//h5[@id='rollingCode']",
        RollingCodeTextBox: "//input[@id='rollingCode']",
        RollingCodeCloseButton: "//div[@id='rollingCode']//button[@class='btn button-action'][normalize-space()='Close']",
        GoButton: "//button[normalize-space()='Go']",
        validationMessageForMandatoryFields: "(//span[@class='text-bold color-white'])[1]",
        stdyHammerhead: "//*[@id='first']/div/div/tbody/tr[5]/td[10]/input",
        stdyValidationMessage: "//span[normalize-space(text())='The total Flex Steady Count and the total Flex Steady names are not matching for Longshore']",
    }
    async clickOnVesselOrderMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 100000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.vesselOrder);
    }
    async selectJobNumber(): Promise<void> {
        await this.page.getByPlaceholder('Search By Job No or Vessel').fill('cos');
        await this.page.waitForTimeout(1000);
        await this.page.getByPlaceholder('Search By Job No or Vessel').press('ArrowRight');
        await this.page.getByPlaceholder('Search By Job No or Vessel').click();
        await this.page.getByPlaceholder('Search By Job No or Vessel').fill('COSCO ENGLAND - 053 - 100714 - 9516428');
        // await this.page.getByPlaceholder('Search By Job No or Vessel Name or Voyage or Lloyds').click();
        // Wait for datalist options
        await this.page.waitForTimeout(4000);
        // Get the first option value
        await this.page.evaluate(() => {
            const xpath = "//button[text()='GO']";
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            const goButton = result.singleNodeValue as HTMLButtonElement;
            if (goButton) {
                goButton.disabled = false;
            }
        });

        // Ensure the "Go" button is enabled before clicking on it
        const goButton = this.page.locator("//button[text()='GO']");
        await goButton.waitFor({ state: 'visible' });

        const isGoButtonEnabled = await goButton.isEnabled();
        if (isGoButtonEnabled) {
            await goButton.click();
        } else {
            throw new Error("The 'Go' button is not enabled.");
        }
    }

    async SelectDetailsOnLandingPage(): Promise<string> {
        let currentDate = new Date();
        let formattedDate: string;
        const maxAttempts = 10;

        await this.page.getByPlaceholder('Search By Job No or Vessel').click();
        await this.page.locator(this.Elements.shift).selectOption("2ND");
        this.selectJobNumber();

        fixture.logger.info("Waiting for 1 seconds");
        await fixture.page.waitForTimeout(1000);

        for (let attempts = 0; attempts < maxAttempts; attempts++) {

            const trStatusVisible = await this.page.locator(this.Elements.TRStatus).isVisible();
            fixture.logger.info("Waiting for 2 seconds");
            await fixture.page.waitForTimeout(2000);

            if (trStatusVisible) {
                await this.page.locator(this.Elements.homeicon).click();
                await this.page.locator(this.Elements.laborOrderMenu).click();
                await this.page.locator(this.Elements.vesselOrder).click();
                currentDate.setDate(currentDate.getDate() + 1);

                formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

                // Wait and fill the date for the next order
                await this.page.locator(this.Elements.workDate).waitFor({ state: 'attached', timeout: 3000 });
                await this.page.locator(this.Elements.workDate).click();
                await this.page.locator(this.Elements.workDate).fill(formattedDate);
                await this.page.locator(this.Elements.shift).selectOption("2ND");
                this.selectJobNumber();

            } else {
                // If no TR status, assign the formatted date as noTRStatusDate
                this.noTRStatusDate = formattedDate;
                fixture.logger.info(`TR status is not present on ${formattedDate}`);
            }
        }
        // await this.page.locator(this.Elements.workDate).fill('2025-01-28');
        // await this.page.locator(this.Elements.shift).selectOption("2ND");
        // this.selectJobNumber();

        this.noTRStatusDate = formattedDate;
        return this.noTRStatusDate;
        // // Store the date to noTRStatusDate
        // this.noTRStatusDate = '2025-01-28';
    }

    async EnterHeaderDetails(): Promise<void> {
        await this.page.locator(this.Elements.berth).selectOption("Pier E - LB 24");
        await this.page.locator(this.Elements.startTime).selectOption("5PMfx");
        await this.page.locator(this.Elements.reference).selectOption("To Start");
    }
    async EnterGangsDetails(): Promise<void> {
        await this.page.locator(this.Elements.CNTRComeBack).fill("2");
        await this.page.locator(this.Elements.LashComeBack).fill("3");
        await this.page.locator(this.Elements.LashTypeComeBack).selectOption("Catch Up");
    }

    async FillManningTable(): Promise<void> {
        await this.page.locator(this.Elements.ForeManTab).click();
        await this.page.locator(this.Elements.STDYFX).fill("1");
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);

    }
    async SelectSteadyDetails(): Promise<void> {
        await this.page.locator(this.Elements.LASHBOSSSTEADY).fill("38280");
        await this.page.locator(this.Elements.LASHBOSSSTEADY).press("Enter");
        // Locate the option element using XPath and get the text
        const LashBossddl1Steady = await this.page.locator(this.Elements.SteadyDBName).textContent();
        await this.page.locator(this.Elements.LASHBOSSSTEADY).fill(LashBossddl1Steady);
        await this.page.locator(this.Elements.LASHBOSSSTEADYflexType).selectOption('1');
        await this.page.locator(this.Elements.textArea).fill("text data");
    }

    async ClickSaveMayCan(): Promise<void> {
        await this.base.waitAndClick(this.Elements.savemaycan);
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);

    }

    async VerifySuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.successNotification))
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);

    }
    async ClickDiscard(): Promise<void> {
        await this.base.waitAndClick(this.Elements.Discard);
        await this.base.waitAndClick(this.Elements.YesButtonOnDiscard);
        expect(await this.page.locator(this.Elements.DiscardNotification))
        fixture.logger.info("Waiting for 3 seconds")
        await fixture.page.waitForTimeout(3000);
    }
    async ClickFirmButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.FirmButton);
        expect(await this.page.locator(this.Elements.successNotification))
        fixture.logger.info("Waiting for 3 seconds")
        await fixture.page.waitForTimeout(3000);
    }
    async ClickPushButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.PushButton);
        expect(await this.page.locator(this.Elements.pushbuttonNotification))
        fixture.logger.info("Waiting for 3 seconds")
        await fixture.page.waitForTimeout(3000);
    }
    async ClickCancelButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.CancelButton);
        await this.base.waitAndClick(this.Elements.cancelpopupyes);
        expect(await this.page.locator(this.Elements.cancelNotification))
        fixture.logger.info("Waiting for 3 seconds")
        await fixture.page.waitForTimeout(3000);
    }
    async clickOnTimehseetMenu(): Promise<void> {
        // await this.base.goto(process.env.BASEURL, { timeout: 60000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.TimehseetMenu);
        await this.base.waitAndClick(this.Elements.vesselTimehseet);
    }
    async getLatestWorkOrderDate(): Promise<string> {
        return this.noTRStatusDate;  // Access the global noTRStatusDate
    }
    async SelectDetailsOnLandingPageTimehseet(formatteddate: string): Promise<void> {
        const LatestWorkOrderDate = await this.getLatestWorkOrderDate();
        console.log(LatestWorkOrderDate);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.workDatetimehseet).click();
        await this.page.locator(this.Elements.workDatetimehseet).fill(this.noTRStatusDate);
        await this.page.locator(this.Elements.shift).selectOption("2ND");
        this.selectJobNumber();
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
    async clickOnSaveWithoutSubmit(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveWithoutSubmit);

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
    async SubmitTimehseet(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.conductSaftyTalk).check();
        await this.page.locator(this.Elements.TimehseetApprovalName).fill("TestUser");
        await this.base.waitAndClick(this.Elements.SaveANDSubmit);
        await fixture.page.waitForTimeout(3000);

    }
    async ApprovetheTimehseet(): Promise<void> {
        await this.page.locator(this.Elements.LBCTManagemnetName).fill("Ops");
        await this.base.waitAndClick(this.Elements.ApproveButton);
        await fixture.page.waitForTimeout(3000);

    }
    async downloadTimehseetReport(): Promise<void> {
        // Create a folder for downloads if it doesn't exist
        const downloadPath = path.resolve(__dirname, 'TimehseetReportDownloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);

        // Handle the download event
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // Wait for the download to start
            this.page.locator(this.Elements.downloadReport).click() // Perform the action that initiates download
        ]);

        // Save the downloaded file to the specified folder as a text file
        const downloadPathWithFileName = path.join(downloadPath, 'TimehseetReportDownloads.pdf');
        await download.saveAs(downloadPathWithFileName);
        console.log(`File downloaded to: ${downloadPathWithFileName}`);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();


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
    async clickOnReject(): Promise<void> {
        await this.base.waitAndClick(this.Elements.rejectButton);
        await this.base.waitAndClick(this.Elements.rejectpopup);

        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        expect(await this.page.locator(this.Elements.successNotification))
    }
    async clickOnRemoveApproval(): Promise<void> {
        await this.base.waitAndClick(this.Elements.removeApproval);
        await this.base.waitAndClick(this.Elements.rejectpopup);

        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        expect(await this.page.locator(this.Elements.successNotification))
    }
    async AddNewRow(): Promise<void> {
        await this.base.waitAndClick(this.Elements.plusBtton);
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('140');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').press('Enter');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').click();
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('140 - LB - LASH BOSS');
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
    async storeRollingCode(): Promise<string> {
        let attempts = 0;
        const maxAttempts = 5; // Set a maximum number of attempts to avoid infinite loops

        while (attempts < maxAttempts) {
            // Try clicking to open the rolling code dialog
            await this.base.waitAndClick(this.Elements.RollingCodeButton);

            // Wait for the rolling code element to appear and get its text
            const rollingCodeElement = await this.page.locator(this.Elements.RollingCode);
            this.rollingCodeText = await rollingCodeElement.textContent();

            if (this.rollingCodeText && this.rollingCodeText.trim() !== '') {
                // Exit the loop if the rolling code is found and has content
                await this.base.waitAndClick(this.Elements.RollingCodeCloseButton);
                return this.rollingCodeText;
            }

            // If no valid rolling code is found, log and try closing and reopening the popup
            fixture.logger.info("Rolling code not found, closing and reopening the popup.");
            await this.base.waitAndClick(this.Elements.RollingCodeCloseButton);


            attempts++;
            await this.page.waitForTimeout(1000); // Optional, can adjust based on your application's behavior
        }

    }
    async pasteRollingCode(RollingCode: string): Promise<void> {
        await this.page.locator(this.Elements.RollingCodeTextBox).fill(this.rollingCodeText);
        await this.base.waitAndClick(this.Elements.GoButton);

    }
    async validationMessageForMandatoryFields(): Promise<void> {
        const validationMessageForMandatoryFields = await this.page.locator(this.Elements.validationMessageForMandatoryFields).textContent();
        expect(validationMessageForMandatoryFields).toContain("Please select a Berth");
        expect(validationMessageForMandatoryFields).toContain("Please select a Shift Start Time");
        expect(validationMessageForMandatoryFields).toContain("Please select a Reference");


    }
    async validationMessageForSteadtcount(): Promise<void> {
        this.EnterHeaderDetails()
        await this.page.locator(this.Elements.stdyHammerhead).fill("1");
        await this.page.locator('body').click();
        await this.base.waitAndClick(this.Elements.savemaycan);
        const validationMessageForSteady = await this.page.locator(this.Elements.stdyValidationMessage).textContent();
        expect(validationMessageForSteady).toContain("The total Flex Steady Count and the total Flex Steady names are not matching for Longshore");



    }
    async SelectDetailsOnLandingPageSummarysheet(formatteddate: string): Promise<void> {
        const LatestWorkOrderDate = await this.getLatestWorkOrderDate();
        console.log(LatestWorkOrderDate);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.workDateSummarySheet).click();
        await this.page.locator(this.Elements.workDateSummarySheet).fill(this.noTRStatusDate);
        await this.page.locator(this.Elements.shift).selectOption("Nightside");
        // await this.passDate();
        await this.base.waitAndClick(this.Elements.Go);
    }
    async clickOnSummarySheetMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.summarysheet);
    }

}