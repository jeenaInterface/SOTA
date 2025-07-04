import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';
import * as fs from 'fs';
import * as path from 'path';
import { defaultMaxListeners } from 'events';
import { fixture } from '../hooks/pageFixture';

export class LaborOrderDiscrepanciesReportPage {
    protected base: PlaywrightWrapper;
    public page: Page;

    private Elements = {
        ReportMenu: "//div[normalize-space()='Report']",
        LaborOrderDiscrepanciesReportLabel: "//a[normalize-space()='Labor Order Discrepancies']",
        addDiscrepancyButton: "//button[normalize-space()='ADD DISCREPANCY']",
        downloadReportButton: "//button[normalize-space()='DISCREPANCY REPORT']",
        downloadSummaryButton: "//button[normalize-space()='DISCREPANCY SUMMARY REPORT']",
        successMessage: "//span[contains(text(),'Discrepancy added successfully')]",
        OperationType: "//select[@id='opsType']",
        FromDate: "//input[@id='fromDt']",
        ToDate: "//input[@id='toDt']",
        shift: "//select[@id='shift']",
        JobCode: "//select[@id='jobCode']",
        descriptionOfDiscrepancy: "//textarea[@id='descriptionError']",
        ErrorType1: "//div[@for='dispatchIssues']//div[1]//input[1]",
        saveButton: "//button[normalize-space()='ADD']",
        successConfirmationMessageLocator: "//span[contains(text(),'Labor Order Discrepancy information saved successfully')]",
        FirstRow: "//tbody/tr[1]/td[1]/label[1]",
        UpdateButton: "//button[normalize-space()='UPDATE']",
        AOM: "//input[@id='sentBy']",
        DateReceived: "//input[@id='recvDtTm']",
        search: "//button[normalize-space()='SEARCH']",
        resetButton: "//button[normalize-space()='RESET']",
        deleteButton: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/labor-discrepancies[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]/i[1]",
        yesButton: "//button[normalize-space()='Yes']",
        LaborOrderDiscrepancyDeletedMessage: "//span[contains(text(),'Labor Order Discrepancy information deleted successfully')]"
    };

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ReportMenu);
        await this.base.waitAndClick(this.Elements.LaborOrderDiscrepanciesReportLabel);
    }
        async getFormattedDate(): Promise<string> {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }
    async fillHeaderDefaults(): Promise<void> {
        await this.page.locator(this.Elements.OperationType).selectOption({ label: 'Yard' });
        // 2. Select current date in from and to date fields
        await this.page.locator(this.Elements.FromDate).fill(await this.getFormattedDate());
        await this.page.locator(this.Elements.ToDate).fill(await this.getFormattedDate());
        // 3. Select 1ST from shift dropdown
        await this.page.locator(this.Elements.shift).selectOption({ label: '1ST' });
        // 4. Select Yard Ops - 690101 from job code list
        await this.page.locator(this.Elements.JobCode).selectOption({ label: 'Yard Ops - 690101' });
    }

    async addDiscrepancy(): Promise<void> {
        // 1. Select Yard from OperationType dropdown
        await this.fillHeaderDefaults();
        // Wait and check for success message
        await this.base.waitAndClick(this.Elements.addDiscrepancyButton);
        await this.page.waitForTimeout(1000);
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formatted = `${yyyy}-${mm}-${dd}`;

        // Fill random text in description
        const randomText = 'TestData_' + Math.random().toString(36).substring(2, 10);
        await this.page.locator(this.Elements.AOM).fill(randomText);
        // Fill Date/Time Received in correct format: yyyy-MM-ddTHH:mm
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const dateTimeFormatted = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
        await this.page.locator(this.Elements.DateReceived).fill(dateTimeFormatted);
        await this.page.locator(this.Elements.descriptionOfDiscrepancy).fill(randomText);
        await this.page.locator(this.Elements.ErrorType1).check();
        await this.base.waitAndClick(this.Elements.saveButton);
        const validationMessageForSave = await this.page.locator(this.Elements.successConfirmationMessageLocator).textContent();
        expect(validationMessageForSave).toContain("Labor Order Discrepancy information saved successfully");

    }

    async verifyUpdateFunctionality(): Promise<void> {
        await this.base.waitAndClick(this.Elements.FirstRow);
        const randomText = 'TestData_' + Math.random().toString(36).substring(2, 10);
        await this.page.locator(this.Elements.AOM).fill(randomText);
        await this.page.locator(this.Elements.descriptionOfDiscrepancy).fill(randomText);
        await this.base.waitAndClick(this.Elements.UpdateButton);
        const validationMessageForUpdate = await this.page.locator(this.Elements.successConfirmationMessageLocator).textContent();
        expect(validationMessageForUpdate).toContain("Labor Order Discrepancy information saved successfully");
        // Add logic to verify update functionality
    }

    async downloadSummaryReport(): Promise<void> {
        const downloadPath = path.resolve(__dirname, 'DiscrepancySummaryReport');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);

        // Handle the download event
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // Wait for the download to start
            this.page.locator(this.Elements.downloadSummaryButton).click() // Perform the action that initiates download
        ]);

        // Save the downloaded file to the specified folder as a text file
        const downloadPathWithFileName = path.join(downloadPath, 'DiscrepancySummaryReport.xlsx');
        await download.saveAs(downloadPathWithFileName);
        console.log(`File downloaded to: ${downloadPathWithFileName}`);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();

    }
    async downloadDiscrepancyReport(): Promise<void> {
        // Create a folder for downloads if it doesn't exist
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);

        // Handle the download event
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // Wait for the download to start
            this.page.locator(this.Elements.downloadReportButton).click() // Perform the action that initiates download
        ]);

        // Save the downloaded file to the specified folder as a text file
        const downloadPathWithFileName = path.join(downloadPath, 'DiscrepancyReport.xlsx');
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
    async searchDiscrepancies(): Promise<void> {
        await this.fillHeaderDefaults();
        await this.base.waitAndClick(this.Elements.search);
        const FirstRow = await this.page.locator(this.Elements.FirstRow).textContent();
        expect(FirstRow).toContain("1");
    }
    async resetDiscrepancies(): Promise<void> {
        await this.fillHeaderDefaults();
        await this.base.waitAndClick(this.Elements.resetButton);
        const selectedValue = await this.page.locator(this.Elements.OperationType).textContent();
        expect(selectedValue).toContain('All');
        const shift = await this.page.locator(this.Elements.shift).textContent();
        expect(shift).toContain('Select');
    }
    async deleteDiscrepancy(): Promise<void> {
        await this.fillHeaderDefaults();
        await this.base.waitAndClick(this.Elements.search);
        await this.base.waitAndClick(this.Elements.deleteButton);
        await this.base.waitAndClick(this.Elements.yesButton);
         await fixture.page.waitForTimeout(1000);
        const validationMessageForDelete = await this.page.locator(this.Elements.LaborOrderDiscrepancyDeletedMessage).textContent();
        expect(validationMessageForDelete).toContain("Labor Order Discrepancy information deleted successfully");
    }
}



