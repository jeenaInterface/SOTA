import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";
import * as fs from 'fs';
import * as path from 'path';
import { title } from "process";

setDefaultTimeout(60 * 1000)

export default class summarySheetPage {

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
    private Elements = {
        summarysheet: "//a[normalize-space(text())='Summary Sheet']",
        laborOrderMenu: "//div[normalize-space(text())='Labor Order']",
        vesselOrderTab: "(//a[normalize-space()='COSCO KAOHSIUNG - 100741'])",
        saveButton: "//button[normalize-space()='SAVE']",
        successNotification: "//span[contains(normalize-space(text()), 'Summary Sheet information has been saved successfully')]",
        logOutButton: "//i[@role='button']",
        logOut: "//a[normalize-space(text())='Logout']",
        pickAnAccount: "(//div[@data-bind='text: ((session.isSignedIn || session.isSamsungSso) && session.unsafe_fullName) || session.unsafe_displayName'])[1]",
        useAnotherAccount: "//div[normalize-space(text())='Use another account']",

        // New locators for summary sheet update
        calStatus: "#calStatus",
        newOrderStatus: "#newOrderStatus",
        comeBackCatchUpSpin2: "//*[@id='vesselLongshore']/div[2]/div/div/tbody/tr[1]/td[15]/input",
        comeBackCatchUpSpin3: "//*[@id='vesselLongshore']/div[2]/div/div/tbody/tr[1]/td[16]/input",
        references: "#references",
        gangsFinish: "#gangsFinish",
        manningField15: "//*[@id='vesselLongshore']/div[2]/div/div/tbody/tr[1]/td[4]/input",
        manningField16: "//*[@id='vesselLongshore']/div[2]/div/div/tbody/tr[1]/td[5]/input",
        manningField16Row3: "//*[@id='vesselLongshore']/div[2]/div/div/tbody/tr[1]/td[5]/input",
        swingLashIcon: "//*[@id='vesselLongshore']/div[3]/div/div/tbody/tr[4]/td[3]/input",
        remarksButton: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-summary-sheet[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]/tbody[1]/tr[1]/td[17]/i[1]",
        remarksInput: "//*[@placeholder='Enter your remarks here...']",
        addRemarksButton: "//button[normalize-space()='Add Remarks']",
        trNotes: "#trNotes",
        downloadReport: "//button[normalize-space()='DOWNLOAD REPORT']",
        LaborOrderDifferenceReport: "//i[@title='Labor Order Difference Report']",
        DuplicateReport: "//i[@title='Duplicate Report']",
        HallLaborReport: "//i[@title='Hall Labor Table']",
        transferToTrackingSheet: "//i[@title='Transfer to Tracking Sheet']",
        steadyDispatchReport: "//i[@title='Steady Dispatch Report']",
        placeNewOrders: "//i[@title='Place New Orders']",
        labelOnDifferenceReport: "//h5[contains(text(),'Pier E - LB 24 - COSCO ENGLAND - 050 - 100643 - 2N')]",
        summarysheetContent: "//td[normalize-space()='BACK']",
        hallreportlabel: "//span[@class='page-title p-1']",
        yesPopUp: "//button[normalize-space()='Yes']",
        transferToTrackingSheetMessage: "//div[@class='col-10 p-2']",
        successMessage: "//span[contains(normalize-space(text()), 'Dispatch Update information updated successfully')]",
        title: "//span[@class='page-title p-1']",
        vesselLabel: "//h5[normalize-space()='Vessel - COSCO KAOHSIUNG']",
        dispatchUpdateTab: "//a[normalize-space(text())='DISPATCH UPDATE']",
        repacementSteadyAddButton: "(//div[contains(@class,'d-flex justify-content-between')]//i)[1]",
        repacementHallCount: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[2]/input[1]",
        repacementHallAddButton: "(//div[contains(@class,'d-flex justify-content-between')]//i)[2]",
        repacementHallTextBox: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[1]/input[1]",
        RemarksTextArea: "(//textarea[contains(@class,'p-2 w-100')])[1]",
        AddRemarksButton: "(//button[normalize-space()='Add Remarks'])[1]",
        replacementSteadyRemarks: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[2]/i[1]",
        joblistAddButton: "//button[normalize-space(text())='Add Job Type']",
        remarksButtonHall:"//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[3]/i[1]"
        // 
    };




    async VerifySummarySheetCreated(): Promise<void> {
        await this.page.locator(this.Elements.vesselOrderTab).click();
        fixture.logger.info("Clicked on the vessel order tab");
        const TabPresent = await this.page.locator(this.Elements.vesselOrderTab).textContent();
        expect(TabPresent).toContain("COSCO KAOHSIUNG - 100741");
        // for (let i = 0; i < 10; i++) {
        //     await this.page.keyboard.press('PageDown');
        //     await this.page.waitForTimeout(500);
        // }


    }
    async clickOnSave(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveButton);

        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        expect(await this.page.locator(this.Elements.successNotification))
    }

    async updateSummarySheetDetails(): Promise<void> {
        // Update calo status and new order status
        // await this.page.locator(this.Elements.calStatus).selectOption('1');
        // await this.page.locator(this.Elements.newOrderStatus).selectOption('1');

        // Update NF and Cut time
        await this.page.locator(this.Elements.comeBackCatchUpSpin2).click();
        await this.page.locator(this.Elements.comeBackCatchUpSpin2).fill('11');
        await this.page.locator(this.Elements.comeBackCatchUpSpin3).click();
        await this.page.locator(this.Elements.comeBackCatchUpSpin3).fill('11');

        // Update reference and gangs finish
        await this.page.locator(this.Elements.references).selectOption('To Finish');
        await this.page.locator(this.Elements.gangsFinish).click();
        await this.page.locator(this.Elements.gangsFinish).fill('10');

        // Update manning details
        await this.page.locator(this.Elements.manningField15).click();
        await this.page.locator(this.Elements.manningField15).fill('11');
        await this.page.locator(this.Elements.manningField16).click();
        await this.page.locator(this.Elements.manningField16).fill('11');
        await this.page.locator(this.Elements.manningField16Row3).click();
        await this.page.locator(this.Elements.manningField16Row3).fill('1');

        // Add remarks
        // await this.page.locator(this.Elements.swingLashIcon).click();
        // await this.page.locator(this.Elements.remarksButton).click();
        // await this.page.locator(this.Elements.remarksInput).fill('test remarks');
        // await this.page.locator(this.Elements.addRemarksButton).click();

        // Add notes
        await this.page.locator(this.Elements.trNotes).click();
        await this.page.locator(this.Elements.trNotes).fill('notes');
    }
    async downloadsummaryreport(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.downloadReport).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'summaryReport.pdf');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }
    async downloadDuplicateReport(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.DuplicateReport).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'Duplicate_Report.XLSX');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
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


    async HallLaborReport(): Promise<void> {
        await this.base.waitAndClick(this.Elements.HallLaborReport);
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(2000);
        // Add verification logic for Hall Labor Report if needed
        const hallReportLabel = await this.page.locator(this.Elements.hallreportlabel).textContent();
        expect(hallReportLabel).toContain("Hall Labor Report");
    }
    async transferToTrackingSheet(): Promise<void> {
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.transferToTrackingSheet).click();
        await this.page.locator(this.Elements.yesPopUp).click();
        await fixture.page.waitForTimeout(2000);
        const transferMessage = await this.page.locator(this.Elements.transferToTrackingSheetMessage).textContent();
        expect(transferMessage).toContain("successfully transferred to Steady Tracking Sheet");
    }
    async steadyDispatchReport(): Promise<void> {
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(7000);
        //wait until steadyDispatchReport visible
        await this.page.locator(this.Elements.steadyDispatchReport).click();
        // Add verification logic for Steady Dispatch Report if needed
        const steadyDispatchLabel = await this.page.locator(this.Elements.title).textContent();
        expect(steadyDispatchLabel).toContain("Steady Dispatch Report");
        const vesselLabel = await this.page.locator(this.Elements.vesselLabel).textContent();
        expect(vesselLabel).toContain("Vessel - COSCO KAOHSIUNG");
    }
    async placeNewOrders(): Promise<void> {
        await this.page.locator(this.Elements.placeNewOrders).click();
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(2000);
        // Add verification logic for Place New Orders if needed
        const newOrder = await this.page.locator(this.Elements.title).textContent();
        expect(newOrder).toContain("New Order Form");
    }
        async clickOnDispatchButton(): Promise<void> {
        await this.page.locator(this.Elements.dispatchUpdateTab).click();
    }
    async replacementAdd(): Promise<void> {

        await this.page.locator(this.Elements.repacementHallAddButton).click();
        await this.page.getByPlaceholder('Search By Job Type or OCC Code').fill('221');
        await this.page.getByPlaceholder('Search By Job Type or OCC Code').press('Enter');
        await this.page.getByPlaceholder('Search By Job Type or OCC Code').click();
        await this.page.getByPlaceholder('Search By Job Type or OCC Code').fill('221 - GEAR LEADMEN SPECIAL');
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.joblistAddButton);
        await this.page.locator(this.Elements.repacementHallCount).click();
        await this.page.locator(this.Elements.repacementHallCount).fill('1');
        await this.base.waitAndClick(this.Elements.remarksButtonHall);
        await this.page.locator(this.Elements.RemarksTextArea).fill("MGR REMARKS!");
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.AddRemarksButton);
        await this.page.locator(this.Elements.saveButton).click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        const successmessage = await this.page.locator(this.Elements.successMessage).textContent();
        expect(successmessage).toContain("Dispatch Update information updated successfully");


    }


}