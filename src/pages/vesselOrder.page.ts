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
        yesCheckBox:"(//input[@id='radio-button'])[2]",
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
        RollingCode: "//div[contains(@class,'modal-body')]//div[.//span[text()='Foreman']]/span[last()]",
        RollingCodeTextBox: "//input[@id='rollingCode']",
        RollingCodeCloseButton: "//div[@id='rollingCode']//button[@class='btn button-action'][normalize-space()='Close']",
        GoButton: "//button[normalize-space()='Go']",
        validationMessageForMandatoryFields: "(//span[@class='text-bold color-white'])[1]",
        stdyHammerhead: "//*[@id='first']/div/div/tbody/tr[5]/td[10]/input",
        stdyValidationMessage: "//span[normalize-space(text())='The total Flex Steady Count and the total Flex Steady names are not matching for Longshore']",
        newOrderMenu: "//a[normalize-space()='New Order Form']",
        workDateNEWORDER: "//input[@id='sWorkDt']",
        shiftNEWOrder: "//select[@id='shift']",
        goButton: "//button[normalize-space(text())='GO']",
        vesselOrderTab: "//a[contains(normalize-space(text()), 'COSCO KAOHSIUNG')]",
        extratAB: "(//a[@aria-disabled='false'])[2]",
        addNewOrder: "//button[normalize-space(text())='ADD NEW ORDER']",
        hallAndTime: "(//input[@placeholder='--Enter Hall Name & Time--'])[1]",
        code: "(//select[@data-toggle='tooltip'])[1]",
        berthRequired: "//tbody/tr[2]/td[2]/select[1]",
        bertthActual: "//tbody/tr[2]/td[3]/select[1]",
        timeRequired: "//tbody/tr[3]/td[2]/select[1]",
        timeActual: "//tbody/tr[3]/td[3]/select[1]",
        jonType: "(//td[@colspan='2']//select)[2]",
        jonTypeRequired: "(//label[normalize-space(text())='!']/following::input)[1]",
        jonTypeActual: "(//input[@type='number'])[2]",
        lateOrder: "(//label[normalize-space(text())='!']/following::input)[3]",
        local13Tab: "//a[normalize-space()='LOCAL 13']",
        local63Tab: "//a[normalize-space()='LOCAL 63']",
        local94Tab: "//a[normalize-space()='LOCAL 94']",
        dockWorkTab: "(//a[@role='tab'])[2]",
        saveButton: "//button[normalize-space(text())='SAVE']",
        successMessageneworder: "//span[contains(normalize-space(text()), 'New Order information saved successfully')]",
        carbonField: "#carbon",
        carbonCheckbox: "#cbCarbon",
        alcNo: "//tr[.//text()='Alc No']//input",
        reqRound: "select[name='reqRound']",
        orderedRound: "select[name='orderedRound']",
        reqTime: "(//select[@ng-reflect-name='reqTime'])[3]",
        orderTime: "(//select[@ng-reflect-name='reqTime'])[4]",
        jobType: "(//select[@data-placement='top'])[1]",
        jobType1: "(//select[@data-placement='top'])[2]",
        jobType2: "(//select[@data-placement='top'])[3]",
        jobType3: "//select[@data-toggle='tooltip']",
        jobTypeReq: "input[name='jobTypeReq']",
        jobTypeOrd: "input[name='jobTypeOrd']",
        hallNameTime: "//input[@id='hallName']",
        reqJobType: "input[name='reqJobType']",
        bossName: "//div[@class='display-flex m-0']//input[@id='vessel']",
        orderedJobType: "input[name='orderedJobType']",
        reqJobTypeDockWork: "(//input[@type='number'])[1]",
        orderedJobTypeDockWork: "(//input[@type='number'])[2]",
        remarksInput: "//textarea[@placeholder='Enter your remarks here...']",
        addRemarksButton: "//button[normalize-space()='Add Remarks']",
        addSteadyTableButton: "//button[normalize-space()='ADD STEADY TABLE']",
        searchByName: "//input[@placeholder='Search By Name or Reg #']",
        invalidCheck: "#invalidCheck",
        carbonInput: '#carbon',
        reqRoundSelect: 'select[name="reqRound"]',
        orderedRoundSelect: 'select[name="orderedRound"]',
        reqTimeSelect: 'select[name="reqTime"]',
        jobTypeSelect: 'select[name="jobType"]',
        jobTypeReqInput: 'input[name="jobTypeReq"]',
        jobTypeOrdInput: 'input[name="jobTypeOrd"]',
        alcNoRowTextbox: { row: 'Alc No', role: 'textbox' },
        LaborOrderDifferenceReport: "//i[@title='Labor Order Difference Report']",
        labelOnDifferenceReport: "//h5[contains(text(),'Pier E - LB 24 - COSCO KAOHSIUNG - 090 - 100741 - ')]",
        summarysheetContent: "//td[normalize-space()='BACK']",
        berthNewOrder: "//select[@ng-reflect-name='berth']",
        operationNewOrderTable: "(//input[@type='text'])[4]",
        operationSteadyTable: "(//input[@type='text'])[6]",
        bossNewOrderTable: "(//input[@type='text'])[5]",
        bossSteadyTable: "(//input[@type='text'])[7]",
        newOrderReport: "//button[normalize-space()='NEW ORDER REPORT']",
        Report210: "//button[normalize-space()='210 Report']",
        Report240: "//button[normalize-space()='240 Report']",
        allocationinfo: "(//a[normalize-space()='Allocation Info'])[1]",
        vesselNameLabel:"//th[normalize-space()='Vessel Name']"
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
        await this.page.waitForTimeout(1000);
        await this.page.getByPlaceholder('Search By Job No or Vessel').fill('COSCO KAOHSIUNG - 090 - 100741 - 9355563');
        // await this.page.getByPlaceholder('Search By Job No or Vessel Name or Voyage or Lloyds').click();
        // Wait for datalist options
        await this.page.waitForTimeout(1000);
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
        const maxAttempts = 20;

        await this.page.locator(this.Elements.shift).selectOption("2ND");
        await this.selectJobNumber();


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
                await this.page.locator(this.Elements.vesselOrder).click();

                // Fill the next date
                formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                    .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
                await this.page.locator(this.Elements.workDate).waitFor({ state: 'attached', timeout: 3000 });
                await this.page.locator(this.Elements.workDate).click();
                await this.page.locator(this.Elements.workDate).fill(formattedDate);

                await this.page.locator(this.Elements.shift).selectOption("2ND");
                await this.selectJobNumber(); // 

            } else {
                fixture.logger.info(`Order created for date: ${formattedDate}`);
                this.noTRStatusDate = formattedDate;
                return formattedDate; // stop loop on success
            }
        }

        throw new Error("Unable to create order — all attempted dates already have TRStatus.");
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
    async SelectDetailsOnLandingPageTimehseetTRUSER(formatteddate: string): Promise<void> {
        const LatestWorkOrderDate = await this.getLatestWorkOrderDate();
        console.log(LatestWorkOrderDate);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.workDatetimehseet).click();
        await this.page.locator(this.Elements.workDatetimehseet).fill(this.noTRStatusDate);
        // await this.page.locator(this.Elements.workDatetimehseet).fill('2025-07-29');
        await this.page.locator(this.Elements.shift).selectOption("2ND");
        await this.page.locator(this.Elements.yesCheckBox).check();
        this.selectJobNumber();
    }
        async SelectDetailsOnLandingPageTimehseet(formatteddate: string): Promise<void> {
        const LatestWorkOrderDate = await this.getLatestWorkOrderDate();
        console.log(LatestWorkOrderDate);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.workDatetimehseet).click();
        await this.page.locator(this.Elements.workDatetimehseet).fill(this.noTRStatusDate);
        // await this.page.locator(this.Elements.workDatetimehseet).fill('2025-07-29');
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
        const maxAttempts = 10; // Increase attempts for reliability

        while (attempts < maxAttempts) {
            // Open the rolling code dialog
            await this.base.waitAndClick(this.Elements.RollingCodeButton);

            // Wait for the rolling code value to be visible (not just any text)
            const rollingCodeElement = this.page.locator(this.Elements.RollingCode);
            // Wait up to 2 seconds for the value to be non-empty
            let foremanCode = '';
            try {
                await rollingCodeElement.waitFor({ state: 'visible', timeout: 2000 });
                const value = await rollingCodeElement.textContent();
                if (value && value.trim() !== '') {
                    foremanCode = value.trim();
                }
            } catch (e) {
                // If not visible, treat as not found
                foremanCode = '';
            }

            // Close the popup
            await this.base.waitAndClick(this.Elements.RollingCodeCloseButton);

            if (foremanCode !== '') {
                this.rollingCodeText = foremanCode;
                return foremanCode;
            }

            fixture.logger.info("Foreman rolling code not found, reopening the popup.");
            attempts++;
            await this.page.waitForTimeout(1000);
        }
        throw new Error('Foreman rolling code was not generated after multiple attempts.');
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
        // await this.page.locator(this.Elements.workDateSummarySheet).fill('2025-07-31');
        await this.page.locator(this.Elements.shift).selectOption("Nightside");
        await this.base.waitAndClick(this.Elements.Go);
    }
    async clickOnSummarySheetMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.summarysheet);
    }
    async downloadLaborOrderDifferenceReport(): Promise<void> {

        this.page.locator(this.Elements.LaborOrderDifferenceReport).click()
        fixture.logger.info("Waiting for 5 seconds")
        await fixture.page.waitForTimeout(5000);
        const label = await this.page.locator(this.Elements.labelOnDifferenceReport).textContent();
        expect(label).toContain(" Pier E - LB 24 - COSCO KAOHSIUNG - 090 - 100741 - 2ND Shift");


    }
    async navigateToNewOrderForm(): Promise<void> {
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.newOrderMenu);
    }

    async enterWorkDate() {
        await this.page.locator(this.Elements.workDateNEWORDER).click();
        await this.page.locator(this.Elements.workDateNEWORDER).fill(this.noTRStatusDate);
        // await this.page.locator(this.Elements.workDateNEWORDER).fill("2025-08-20");
        await this.page.locator(this.Elements.shiftNEWOrder).selectOption("Nightside");
        await this.base.waitAndClick(this.Elements.goButton);

    }


    async fillLocal13Details() {
        await this.page.locator(this.Elements.vesselOrderTab).click();
        const carbonInput = this.page.locator('#carbon');
        const reqRoundSelect = this.page.locator('select[name="reqRound"]');
        const orderedRoundSelect = this.page.locator('select[name="orderedRound"]');
        const reqTimeSelectFirst = this.page.locator('select[name="reqTime"]').first();
        const reqTimeSelectSecond = this.page.locator("//table[@class='table']/tbody[1]/tr[2]/td[3]/select[1]");
        const jobTypeSelect = this.page.locator('select[name="jobType"]');
        const jobTypeReqInput = this.page.locator('input[name="jobTypeReq"]');
        const jobTypeOrdInput = this.page.locator('input[name="jobTypeOrd"]');
        const alcNoTextbox = this.page.getByRole('row', { name: 'Alc No', exact: true }).getByRole('textbox');
        const action = this.page.locator("//td[@class='table-row-xl']//select[@id='tag']");
        const hallAndTime = this.page.locator("//table[contains(@class,'table table-newOrder')]/tbody[1]/tr[2]/td[4]/input[1]");
        const addNewOrderButtonSelector = "//button[normalize-space()='ADD NEW ORDER']";
        const deletetTab2 = "//i[@class='bi bi-x-square icon-color-danger']";
        const remarks = "//i[@title='Remarks']";
        await fixture.page.waitForTimeout(10000);

        await carbonInput.fill("1");
        await action.selectOption("CUT");
        await hallAndTime.fill("Hall 1 @ 10am");
        await this.base.waitAndClick(remarks);
        await this.page.locator(this.Elements.remarksInput).fill("Test remarks for Local 13");
        await this.base.waitAndClick(this.Elements.addRemarksButton);
        await alcNoTextbox.fill("1");
        await reqRoundSelect.selectOption("MRO");
        await orderedRoundSelect.selectOption("MRO");
        await reqTimeSelectFirst.selectOption("3-3AMfx HT LS");
        // await reqTimeSelectSecond.selectOption("3-3AMfx HT LS");
        await jobTypeSelect.selectOption("GEAR LEADMAN-SPECIAL");
        await jobTypeReqInput.fill("1");
        await jobTypeOrdInput.fill("1");
        await this.base.waitAndClick(this.Elements.saveButton);
        expect(await this.page.locator(this.Elements.successMessageneworder)).toBeVisible();
        await this.base.waitAndClick(addNewOrderButtonSelector);
        await this.base.waitAndClick(deletetTab2);
        await this.base.waitAndClick(this.Elements.YesButtonOnDiscard);
        await this.base.waitAndClick(this.Elements.saveButton);
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(2000);
    }
    async fillExtraTab() {
        await this.page.locator(this.Elements.extratAB).click();
        await fixture.page.waitForTimeout(10000);
        await this.page.locator(this.Elements.addNewOrder).click();
        await this.page.locator(this.Elements.hallAndTime).fill('Hall 1 @ 10am');
        await this.page.locator(this.Elements.code).selectOption('002 - DOCKWORK RAILS');
        await this.page.locator(this.Elements.berthRequired).selectOption('Pier E - LB 24');
        await this.page.locator(this.Elements.bertthActual).selectOption('Pier E - LB 24');
        await this.page.locator(this.Elements.timeRequired).selectOption('6PM');
        await this.page.locator(this.Elements.timeActual).selectOption('6PM');
        await this.page.locator(this.Elements.jonType).selectOption('DA');
        await this.page.locator(this.Elements.jonTypeRequired).fill('1');
        await this.page.locator(this.Elements.jonTypeActual).fill('1');
        await this.page.locator(this.Elements.lateOrder).click();
        await this.base.waitAndClick(this.Elements.saveButton);
        expect(await this.page.locator(this.Elements.successMessageneworder)).toBeVisible();
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(2000);
    }
     async allocationInfoTab() {
        await this.page.locator(this.Elements.allocationinfo).click();
        await fixture.page.waitForTimeout(5000);
        const vesselName = await this.page.locator(this.Elements.vesselNameLabel).textContent();
        expect(vesselName).toContain("Vessel Name");

     }

    async fillLocal63Details() {

        await this.base.waitAndClick(this.Elements.local63Tab);
        await fixture.page.waitForTimeout(10000);

        // Fill hall name and time
        await this.page.locator(this.Elements.hallNameTime).click();
        await this.page.locator(this.Elements.hallNameTime).fill('john @10am');

        // Select options
        await this.page.getByRole('combobox').nth(2).selectOption('REGULAR');
        await this.page.getByRole('combobox').nth(3).selectOption('FLEX');
        await this.page.locator(this.Elements.jobType).selectOption('SR');

        // Fill job type details
        await this.page.locator(this.Elements.reqJobType).click();
        await this.page.locator(this.Elements.reqJobType).fill('11');
        await this.page.locator(this.Elements.orderedJobType).click();
        await this.page.locator(this.Elements.orderedJobType).fill('1');

        // Add remarks
        await this.page.locator('.col > .bi').first().click();
        await this.page.locator(this.Elements.remarksInput).fill('test');
        await this.page.locator(this.Elements.addRemarksButton).click();

        // Add steady table
        await this.page.locator(this.Elements.addSteadyTableButton).click();
        await this.page.locator(this.Elements.reqTime).selectOption('FLEX');
        await this.page.locator(this.Elements.orderTime).selectOption('REGULAR');
        await this.page.locator(this.Elements.jobType1).selectOption('VPT');
        await this.page.locator(this.Elements.jobType2).selectOption('VPT');
        // Search and select employee
        await this.page.locator(this.Elements.searchByName).fill('john');
        await this.page.locator(this.Elements.searchByName).press('Enter');
        await this.page.locator(this.Elements.searchByName).fill('Allen, Johnny L - 1635032');

        // Check boxes
        await this.page.locator(this.Elements.invalidCheck).check();
        await this.page.locator(this.Elements.lateOrder).check();
        await this.base.waitAndClick(this.Elements.saveButton);
        expect(await this.page.locator(this.Elements.successMessageneworder)).toBeVisible();
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(2000);
    }

    async dockworkDetails() {
        await this.base.waitAndClick(this.Elements.dockWorkTab);
        await fixture.page.waitForTimeout(10000);
        // Add specific details for Local 94
        await this.page.locator(this.Elements.berthNewOrder).selectOption('Pier E - LB 24');

        await this.page.locator(this.Elements.hallNameTime).click();
        await this.page.locator(this.Elements.hallNameTime).fill('john @10am');

        // Select options

        await this.page.locator(this.Elements.addNewOrder).click();
        await this.page.getByRole('combobox').nth(2).selectOption('REGULAR');
        await this.page.getByRole('combobox').nth(3).selectOption('FLEX');
        await this.page.locator(this.Elements.jobType).selectOption('RC');

        // Fill job type details
        await this.page.locator(this.Elements.reqJobTypeDockWork).click();
        await this.page.locator(this.Elements.reqJobTypeDockWork).fill('11');
        await this.page.locator(this.Elements.orderedJobTypeDockWork).click();
        await this.page.locator(this.Elements.orderedJobTypeDockWork).fill('1');

        // Add remarks
        await this.page.locator('.col > .bi').first().click();
        await this.page.locator(this.Elements.remarksInput).fill('test');
        await this.page.locator(this.Elements.addRemarksButton).click();

        // Add steady table
        await this.page.locator(this.Elements.addSteadyTableButton).click();
        await this.page.locator(this.Elements.reqTime).selectOption('FLEX');
        await this.page.locator(this.Elements.orderTime).selectOption('REGULAR');
        await this.page.locator(this.Elements.jobType1).selectOption('FR');
        await this.page.locator(this.Elements.jobType2).selectOption('DST');
        // Search and select employee
        await this.page.locator(this.Elements.searchByName).fill('john');
        await this.page.locator(this.Elements.searchByName).press('Enter');
        await this.page.locator(this.Elements.searchByName).fill('Allen, Johnny L - 1635032');

        // Check boxes
        await this.page.locator(this.Elements.invalidCheck).check();
        await this.page.locator(this.Elements.lateOrder).check();
        await this.base.waitAndClick(this.Elements.saveButton);
        expect(await this.page.locator(this.Elements.successMessageneworder)).toBeVisible();
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(2000);
    }

    async fillLocal94Details() {
        await this.base.waitAndClick(this.Elements.local94Tab);
        await fixture.page.waitForTimeout(10000);
        await this.page.locator(this.Elements.bossName).fill('john');
        await this.page.locator(this.Elements.hallNameTime).click();
        await this.page.locator(this.Elements.hallNameTime).fill('john @10am');

        // Select options
        await this.page.getByRole('combobox').nth(2).selectOption('5PM');
        await this.page.getByRole('combobox').nth(3).selectOption('5PM');
        await this.page.locator(this.Elements.jobType).selectOption('SB');

        // Fill job type details
        await this.page.locator(this.Elements.reqJobType).click();
        await this.page.locator(this.Elements.reqJobType).fill('1');
        await this.page.locator(this.Elements.orderedJobType).click();
        await this.page.locator(this.Elements.orderedJobType).fill('1');

        // Add remarks
        await this.page.locator('.col > .bi').first().click();
        await this.page.locator(this.Elements.remarksInput).fill('test');
        await this.page.locator(this.Elements.addRemarksButton).click();

        // Add steady table
        await this.page.locator(this.Elements.addSteadyTableButton).click();
        await this.page.locator(this.Elements.reqTime).selectOption('4PMfx');
        await this.page.locator(this.Elements.orderTime).selectOption('4PMfx');
        await this.page.locator(this.Elements.jobType1).selectOption('LB');
        await this.page.locator(this.Elements.jobType2).selectOption('LB');
        // Search and select employee
        await this.page.locator(this.Elements.searchByName).fill('john');
        await this.page.locator(this.Elements.searchByName).press('Enter');
        await this.page.locator(this.Elements.searchByName).fill('Allen, Johnny L - 1635032');

        // Check boxes
        await this.page.locator(this.Elements.invalidCheck).check();
        await this.page.locator(this.Elements.lateOrder).check();
        await this.base.waitAndClick(this.Elements.saveButton);
        expect(await this.page.locator(this.Elements.successMessageneworder)).toBeVisible();
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(2000);
    }
    async dockworkDetailsLocal94() {
        await this.base.waitAndClick(this.Elements.dockWorkTab);
        await fixture.page.waitForTimeout(10000);
        // Add specific details for Local 94
        await this.page.locator(this.Elements.berthNewOrder).selectOption('Pier E - LB 24');
        await this.page.locator(this.Elements.bossName).fill('john');
        await this.page.locator(this.Elements.hallNameTime).click();
        await this.page.locator(this.Elements.hallNameTime).fill('john @10am');

        // Select options

        await this.page.locator(this.Elements.addNewOrder).click();
        await this.page.locator(this.Elements.operationNewOrderTable).fill('vessel');
        await this.page.locator(this.Elements.bossNewOrderTable).fill('John');
        await this.page.getByRole('combobox').nth(2).selectOption('5PM');
        await this.page.getByRole('combobox').nth(3).selectOption('5PM');
        await this.page.locator(this.Elements.jobType).selectOption('YB');

        // Fill job type details
        await this.page.locator(this.Elements.reqJobTypeDockWork).click();
        await this.page.locator(this.Elements.reqJobTypeDockWork).fill('1');
        await this.page.locator(this.Elements.orderedJobTypeDockWork).click();
        await this.page.locator(this.Elements.orderedJobTypeDockWork).fill('2');

        // Add remarks
        await this.page.locator('.col > .bi').first().click();
        await this.page.locator(this.Elements.remarksInput).fill('test');
        await this.page.locator(this.Elements.addRemarksButton).click();

        // Add steady table
        await this.page.locator(this.Elements.addSteadyTableButton).click();
        await this.page.locator(this.Elements.operationSteadyTable).fill('vessel');
        await this.page.locator(this.Elements.bossSteadyTable).fill('John');
        await this.page.locator(this.Elements.reqTime).selectOption('5PM');
        await this.page.locator(this.Elements.orderTime).selectOption('5PM');
        await this.page.locator(this.Elements.jobType1).selectOption('DB');
        await this.page.locator(this.Elements.jobType2).selectOption('DB');
        // Search and select employee
        await this.page.locator(this.Elements.searchByName).fill('john');
        await this.page.locator(this.Elements.searchByName).press('Enter');
        await this.page.locator(this.Elements.searchByName).fill('Allen, Johnny L - 1635032');


        await this.base.waitAndClick(this.Elements.saveButton);
        expect(await this.page.locator(this.Elements.successMessageneworder)).toBeVisible();
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(2000);
    }

    async clickSaveButton() {
        await this.base.waitAndClick(this.Elements.saveButton);
    }

    async verifySuccessMessagenewOrder() {
        expect(await this.page.locator(this.Elements.successMessageneworder))
    }
    async downloadNewOrderReport(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.newOrderReport).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'NewOrder_Report.xlsx');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }
    async download210Report(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.Report210).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'NewOrder_Report.xlsx');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }
    async download240Report(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.Report240).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'NewOrder_Report.xlsx');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }


}

