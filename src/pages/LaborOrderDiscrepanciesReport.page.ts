import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';
import * as fs from 'fs';
import * as path from 'path';

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
        OperationType:"//select[@id='opsType']",
        FromDate:"//input[@id='fromDt']",
        ToDate:"//input[@id='toDt']",   
        shift:"//select[@id='shift']",
        JobCode:"//select[@id='jobCode']",
        descriptionOfDiscrepancy: "//textarea[@id='descriptionError']",
        ErrorType1:"//div[@for='dispatchIssues']//div[1]//input[1]",
        saveButton:"//button[normalize-space()='ADD']",
        successConfirmationMessageLocator: "//span[contains(text(),'Labor Order Discrepancy information saved successfully')]",
        FirstRow: "//tbody/tr[1]/td[1]/label[1]",
        UpdateButton: "//button[normalize-space()='UPDATE']"

    };

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ReportMenu);
        await this.base.waitAndClick(this.Elements.LaborOrderDiscrepanciesReportLabel);
    }

    async addDiscrepancy(): Promise<void> {
        await this.base.waitAndClick(this.Elements.addDiscrepancyButton);
        // 1. Select Yard from OperationType dropdown
        await this.page.locator(this.Elements.OperationType).selectOption({ label: 'Yard' });
        // 2. Select current date in from and to date fields
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formatted = `${yyyy}-${mm}-${dd}`;
        await this.page.locator(this.Elements.FromDate).fill(formatted);
        await this.page.locator(this.Elements.ToDate).fill(formatted);
        // 3. Select 1ST from shift dropdown
        await this.page.locator(this.Elements.shift).selectOption({ label: '1ST' });
        // 4. Select Yard Ops - 690101 from job code list
        await this.page.locator(this.Elements.JobCode).selectOption({ label: 'Yard Ops - 690101' });
        // Wait and check for success message
        await this.base.waitAndClick(this.Elements.addDiscrepancyButton);
        await this.page.waitForTimeout(1000);
        // Fill random text in description
        const randomText = 'TestData_' + Math.random().toString(36).substring(2, 10);
        await this.page.locator(this.Elements.descriptionOfDiscrepancy).fill(randomText);
        await this.page.locator(this.Elements.ErrorType1).check();
        await this.base.waitAndClick(this.Elements.saveButton);
        const validationMessageForSave = await this.page.locator(this.Elements.successConfirmationMessageLocator).textContent();
        expect(validationMessageForSave).toContain("Labor Order Discrepancy information saved successfully");

    }

    async verifyUpdateFunctionality(): Promise<void> {
        await this.base.waitAndClick(this.Elements.FirstRow);
        const randomText = 'TestData_' + Math.random().toString(36).substring(2, 10);
        await this.page.locator(this.Elements.descriptionOfDiscrepancy).fill(randomText);
        await this.base.waitAndClick(this.Elements.UpdateButton);
        const validationMessageForUpdate = await this.page.locator(this.Elements.successConfirmationMessageLocator).textContent();
        expect(validationMessageForUpdate).toContain("Labor Order Discrepancy information saved successfully");
        // Add logic to verify update functionality
    }

    async downloadReport(): Promise<boolean> {
        await this.base.waitAndClick(this.Elements.downloadReportButton);
        // Add logic to verify file download if needed
        return true;
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
            const downloadPath = path.resolve(__dirname, 'DiscrepancyReport');
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
}
