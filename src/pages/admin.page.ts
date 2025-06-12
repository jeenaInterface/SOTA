import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

export class adminPage {
    protected base: PlaywrightWrapper;  // Change to protected so that subclasses can access it
    public page: Page;  // Same with page property

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    } private Elements = {
        typeDropdown: "//select[@name='type']",
        editButton: "(//i[@data-bs-toggle='modal'])[1]",
        updateButton: "//button[normalize-space()='UPDATE']",
        resetButton: "//button[normalize-space()='Reset']",
        jobTypeInput: "//input[@placeholder='Search Job Type']",
        successNotification: "//span[contains(normalize-space(text()), 'Summary Sheet information has been saved successfully')]",
        adminMenu: "//div[normalize-space()='Admin']",
        supportingDataMenu: "//a[normalize-space()='Supporting Data']",
        shiftHolidayMenu: "//a[normalize-space()='Shift & Holiday']",
        saveButton: "//button[normalize-space()='SAVE']",
        shiftHolidaySuccessMessage: "//span[contains(text(),'Holiday and Shift Information updated successfully')]",
        occCodeMenu: "//a[normalize-space()='OCC Code']",
        operationalTypeDropdown: "//select[@formcontrolname='opsType']",
        laborTypeDropdown: "//select[@id='laborType']",
        occCodeInput: "//input[@placeholder='Search OCC Code']",
        searchButton: "//button[normalize-space()='SEARCH']",
        resultTable: "//table[@class='table table-form']",
        resultRow: "//table[@class='table table-form']//tbody/tr[2]",
        jobTypeCell: "//tbody//tr//td[5]",
        firstResultRow: "//table[@class='table table-form']//tbody/tr[1]",
        saveButtonOccCode: "//button[normalize-space()='SAVE']",
        occCodeSuccessMessage: "//span[contains(text(),'The information has been updated successfully')]",
        backButton: "//button[normalize-space()='Back']",
        steadyPositionsMenu: "//a[normalize-space()='Steady Positions']",
        positionDropdown: "//select[@formcontrolname='pos']",
        functionDropdown: "//select[@formcontrolname='func']",
        positionCell: "//td[normalize-space()='25% Clerk']",
        steadyReportDownloadButton: "//button[normalize-space()='Download Report']",
        steadySuccessMessage: "//span[contains(text(),'The information has been updated successfully')]",
        steadyPositionMenu: "//a[normalize-space()='Steady Positions & Functions']",
        steadyJobRoleMenu: "//a[normalize-space()='Steady Job Roles']",
        jobWorkedInput: "//input[@placeholder='Search Job Worked']",
        jobWorkedCell: "//tbody//tr[1]//td[4]",
        steadyJobRoleSuccessMessage: "//span[contains(text(),'The information has been updated successfully')]"
    }



    async clickOnAdminMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 100000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.adminMenu);
        await this.base.waitAndClick(this.Elements.supportingDataMenu);
    }

    async selectType(): Promise<void> {
        await this.page.locator(this.Elements.typeDropdown).selectOption("LO_Reference");
    }

    async clickEditButton(): Promise<void> {
        await this.page.locator(this.Elements.editButton).click();
    }

    async clickUpdateButton(): Promise<void> {
        await this.page.locator(this.Elements.updateButton).click();
    }

    async getSuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.successNotification))
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
    }

    async clickOnShiftHolidayMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.adminMenu);
        await this.base.waitAndClick(this.Elements.shiftHolidayMenu);
    }

    async clickSaveButton(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
    }

    async verifyShiftHolidaySuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.shiftHolidaySuccessMessage)).toBeVisible();
        fixture.logger.info("Waiting for 2 seconds");
        await fixture.page.waitForTimeout(2000);
    }

    async clickOnOCCCodeMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.adminMenu);
        await this.base.waitAndClick(this.Elements.occCodeMenu);
    }

    async selectOperationalType(type: string): Promise<void> {
        await this.page.locator(this.Elements.operationalTypeDropdown).selectOption(type);
    }

    async selectLaborType(type: string): Promise<void> {
        await this.page.locator(this.Elements.laborTypeDropdown).selectOption(type);
    }

    async enterJobType(type: string): Promise<void> {
        await this.page.locator(this.Elements.jobTypeInput).fill(type);
    }

    async enterOCCCode(code: string): Promise<void> {
        await this.page.locator(this.Elements.occCodeInput).fill(code);
    }

    async clickSearchButton(): Promise<void> {
        await this.page.locator(this.Elements.searchButton).click();
    }

    async verifyTableHasSingleEntry(): Promise<void> {
        const rows = await this.page.locator(this.Elements.resultRow).count();
        expect(rows).toBe(1);
    }

    async verifyJobType(expectedJobType: string): Promise<void> {
        const jobType = await this.page.locator(this.Elements.jobTypeCell).textContent();
        expect(jobType?.trim()).toBe(expectedJobType);
    }

    async clickResetButton(): Promise<void> {
        await this.page.locator(this.Elements.resetButton).click();
    }

    async verifyOperationalTypeReset(): Promise<void> {
        const selectedValue = await this.page.locator(this.Elements.operationalTypeDropdown).textContent();
        expect(selectedValue).toContain('All Operations'); // or whatever the default value should be
    }

    async verifyLaborTypeReset(): Promise<void> {
        const selectedValue = await this.page.locator(this.Elements.laborTypeDropdown).textContent();
        expect(selectedValue).toContain('All'); // or whatever the default value should be
    }

    async verifyJobTypeEmpty(): Promise<void> {
        const value = await this.page.locator(this.Elements.jobTypeInput).textContent();
        expect(value).toBe('');
    }

    async verifyOCCCodeEmpty(): Promise<void> {
        const value = await this.page.locator(this.Elements.occCodeInput).textContent();
        expect(value).toBe('');
    }
    async downloadOCCReport(): Promise<void> {
        const downloadButtonXPath = "//button[normalize-space()='Download Report']";

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
        const downloadPathWithFileName = path.join(downloadPath, 'OccReport.xlsx');
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

    async getOCCReportRowCount(): Promise<number> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        const filePath = path.join(downloadPath, 'OccReport.xlsx');

        // Verify file exists
        expect(fs.existsSync(filePath)).toBeTruthy();

        // Read the Excel file
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON to count rows
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const rowCount = jsonData.length;

        fixture.logger.info(`Total rows in OCC Report: ${rowCount}`);
        return rowCount;
    }

    async verifyDownloadedReport(): Promise<void> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        const filePath = path.join(downloadPath, 'OccReport.xlsx');

        // Verify file exists
        expect(fs.existsSync(filePath)).toBeTruthy();

        // Verify file is not empty
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeGreaterThan(0);

        // Get and verify row count
        const rowCount = await this.getOCCReportRowCount();
        expect(rowCount).toBeGreaterThan(0);

        fixture.logger.info("OCC Report downloaded and verified successfully with " + rowCount + " rows");
    }

    async clickFirstResultRow(): Promise<void> {
        await this.page.locator(this.Elements.jobTypeCell).click();
        fixture.logger.info("Clicked on the first result row");
    }

    async clickOccCodeSaveButton(): Promise<void> {
        await this.page.locator(this.Elements.saveButtonOccCode).click();
        fixture.logger.info("Clicked on save button");
    }

    async verifyOccCodeSaveSuccess(): Promise<void> {
        await this.page.locator(this.Elements.occCodeSuccessMessage).waitFor({ state: 'visible' });
        expect(await this.page.locator(this.Elements.occCodeSuccessMessage)).toBeVisible();
    }
    async clickOnBackButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.backButton);
    }

    // Steady Position specific methods
    async selectPosition(position: string): Promise<void> {
        await this.page.locator(this.Elements.positionDropdown).selectOption(position);
    }

    async selectFunction(functionName: string): Promise<void> {
        await this.page.locator(this.Elements.functionDropdown).selectOption(functionName);
    }

    async verifyPosition(expectedPosition: string): Promise<void> {
        const position = await this.page.locator(this.Elements.positionCell).textContent();
        expect(position?.trim()).toBe(expectedPosition);
    }
    async clickOnThePosition(): Promise<void> {
        await this.page.locator(this.Elements.positionCell).click();
    }

    async clickBackButton(): Promise<void> {
        await this.page.locator(this.Elements.backButton).click();
    }

    async verifyPositionReset(): Promise<void> {
        const selectedValue = await this.page.locator(this.Elements.positionDropdown).textContent();
        expect(selectedValue).toContain('All Position'); // or whatever the default value should be

    }

    async verifyFunctionReset(): Promise<void> {
        const selectedValue = await this.page.locator(this.Elements.functionDropdown).textContent();
        expect(selectedValue).toContain('All Functions'); // or whatever the default value should be

    }

    async downloadSteadyReport(): Promise<void> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);

        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.steadyReportDownloadButton).click()
        ]);

        const downloadPathWithFileName = path.join(downloadPath, 'SteadyPositionReport.xlsx');
        await download.saveAs(downloadPathWithFileName);
        fixture.logger.info(`Steady Position Report downloaded to: ${downloadPathWithFileName}`);
    }

    async verifySteadyReport(): Promise<void> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        const filePath = path.join(downloadPath, 'SteadyPositionReport.xlsx');

        expect(fs.existsSync(filePath)).toBeTruthy();
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeGreaterThan(0);

        fixture.logger.info("Steady Position Report verified successfully");
    }

    async getSteadyReportRowCount(): Promise<number> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        const filePath = path.join(downloadPath, 'SteadyPositionReport.xlsx');

        // Verify file exists
        expect(fs.existsSync(filePath)).toBeTruthy();

        // Read the Excel file
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON to count rows
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const rowCount = jsonData.length;

        fixture.logger.info(`Total rows in Steady Position Report: ${rowCount}`);
        return rowCount;
    }
    async clickOnSteadyPositionMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.adminMenu);
        await this.base.waitAndClick(this.Elements.steadyPositionMenu);
    }

    async clickOnSteadyJobRoleMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.adminMenu);
        await this.base.waitAndClick(this.Elements.steadyJobRoleMenu);
    }

    async enterJobWorked(jobWorked: string): Promise<void> {
        await this.page.locator(this.Elements.jobWorkedInput).fill(jobWorked);

    }

    async verifyJobWorked(expectedJobWorked: string): Promise<void> {
        await this.page.waitForSelector(this.Elements.jobWorkedCell);
        const jobWorked = await this.page.locator(this.Elements.jobWorkedCell).textContent();
        expect(jobWorked?.trim()).toBe(expectedJobWorked);
    }

    async verifySteadyJobRoleSuccess(): Promise<void> {
        await this.page.locator(this.Elements.steadyJobRoleSuccessMessage).waitFor({ state: 'visible' });
        expect(await this.page.locator(this.Elements.steadyJobRoleSuccessMessage)).toBeVisible();

    }

    async clickJobWorkedRow(): Promise<void> {
        await this.page.locator(this.Elements.jobWorkedCell).click();
    }

    async verifyJobWorkedReset(): Promise<void> {
        const value = await this.page.locator(this.Elements.jobWorkedInput).inputValue();
        expect(value).toBe('');
    }

    async downloadSteadyJobRoleReport(): Promise<void> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);

        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.steadyReportDownloadButton).click()
        ]);

        const downloadPathWithFileName = path.join(downloadPath, 'SteadyJobRoleReport.xlsx');
        await download.saveAs(downloadPathWithFileName);
        fixture.logger.info(`Steady Job Role Report downloaded to: ${downloadPathWithFileName}`);
    }

    async verifySteadyJobRoleReport(): Promise<void> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        const filePath = path.join(downloadPath, 'SteadyJobRoleReport.xlsx');
        
        expect(fs.existsSync(filePath)).toBeTruthy();
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeGreaterThan(0);
        
        fixture.logger.info("Steady Job Role Report verified successfully");
    }

    async getSteadyJobRoleReportRowCount(): Promise<number> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        const filePath = path.join(downloadPath, 'SteadyJobRoleReport.xlsx');
        
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const rowCount = jsonData.length;
        
        fixture.logger.info(`Total rows in Steady Job Role Report: ${rowCount}`);
        return rowCount;
    }
}