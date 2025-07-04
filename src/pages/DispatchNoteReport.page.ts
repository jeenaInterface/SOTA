import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';
import * as fs from 'fs';
import * as path from 'path';
import { fixture } from '../hooks/pageFixture';

export class DispatchNoteReportPage {
    protected base: PlaywrightWrapper;
    public page: Page;

    private Elements = {
        ReportMenu: "//div[normalize-space()='Report']",
        DispatchNoteReportLabel: "//a[normalize-space()='Dispatch Notes']",
        addDispatchNoteButton: "//button[normalize-space()='ADD DISPATCH NOTES']",
        updateDispatchNoteButton: "//button[normalize-space(text())='UPDATE']",
        downloadDispatchNoteButton: "//button[normalize-space(text())='DOWNLOAD REPORT']",
        descriptionInput: "//textarea[@id='descriptionError']",
        saveButton: "//button[normalize-space()='ADD']",
        successMessage: "//span[contains(text(),'Dispatch Notes information saved successfully')]",
        OperationType: "input[type=\"text\"]",
        FromDate: "//input[@id='fromDt']",
        ToDate: "//input[@id='toDt']",
        shift: "//select[@id='shift']",
        JobCode: "//select[@id='jobCode']",
        detailsTextBox: "//textarea[@id='laborOrder']",
        DescriptionOfResolution: "//textarea[@id='omResponse']",
        MGMTConsulted: "(//label[normalize-space(text())='MGMT Consulted']/following::input)[1]",
        MGMTConsultedDate: "(//label[normalize-space(text())='MGMT Consulted Date']/following::input)[1]",
        MGMTFinalDecision: "//label[text()='MGMT Final decision']/following-sibling::input",
        FinalMGMTConsultedDate: "//label[text()='Final MGMT Consulted Date']/following-sibling::input",
        DispatchNotesComplete: "//label[text()=' Dispatch Notes Complete?']/following-sibling::input",
        // Checkbox XPaths
        dispatch1: "(//input[@id='dispatch'])[1]",
        dispatch4: "(//label[normalize-space(text())='FOREMEN NOT AVAILABLE (NOT A SQOFF DAY)']/following::input)[1]",
        dispatch5: "(//label[normalize-space(text())='22/20 DAY DISCREPANCIES']/following::input)[1]",
        dispatch6: "(//label[normalize-space(text())='EXCEPTIONS TO ALLOCATION AND CONTRACT RULES']/following::input)[1]",
        dispatch7: "(//label[normalize-space(text())='COMBINED CO SCHEDULE DISCREPANCY']/following::input)[1]",
        guarantee1: "(//input[@id='guarantee'])[1]",
        guarantee2: "(//input[@id='guarantee'])[2]",
        guarantee3: "(//input[@id='guarantee'])[3]",
        guarantee4: "(//input[@id='guarantee'])[4]",
        guarantee5: "(//input[@id='guarantee'])[5]",
        payroll1: "(//input[@id='payroll'])[1]",
        payroll2: "(//input[@id='payroll'])[2]",
        search: "//button[normalize-space()='SEARCH']",
        resetButton: "//button[normalize-space()='RESET']",
        FirstRow: "//tbody/tr[1]/td[1]/label[1]",
        deleteButton: "//tbody/tr[1]/td[8]/i[1]",
        yesButton: "//button[normalize-space()='Yes']",
        LaborOrderDispatchNoteDeletedMessage:"//span[contains(text(),'Dispatch Notes information deleted successfully')]"

    };

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ReportMenu);
        await this.base.waitAndClick(this.Elements.DispatchNoteReportLabel);
    }
    async getFormattedDate(): Promise<string> {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }
    async randomText(): Promise<string> {
        const randomText = 'Note_' + Math.random().toString(36).substring(2, 10);
        return randomText;
    }
    async fillHeaderDefaults(): Promise<void> {

    await this.page.locator('input[type="text"]').click();
    await this.page.locator("//span[contains(@class,'ng-option-label') and text()='Yard']").click();
    fixture.page.waitForTimeout(1000);
    await this.page.locator(this.Elements.FromDate).fill(await this.getFormattedDate());
    await this.page.locator(this.Elements.ToDate).fill(await this.getFormattedDate());
    await this.page.locator(this.Elements.shift).selectOption({ label: '1ST' });
    await this.page.locator(this.Elements.JobCode).selectOption({ label: 'Yard Ops - 690101' });

    }
    async addDispatchNote(): Promise<void> {
        await this.fillHeaderDefaults();
        await this.base.waitAndClick(this.Elements.addDispatchNoteButton);
        // Fill MGMT Consulted
        await this.page.locator(this.Elements.MGMTConsulted).fill("TEST_USER");
        await this.page.locator(this.Elements.MGMTConsultedDate).fill(await this.getFormattedDate());
        // Fill MGMT Final Decision
        await this.page.locator(this.Elements.MGMTFinalDecision).fill("TEST_USER");
        await this.page.locator(this.Elements.FinalMGMTConsultedDate).fill(await this.getFormattedDate());
        // Check Dispatch Notes Complete
        await this.page.locator(this.Elements.DispatchNotesComplete).check();
        // Fill other required fields
        await this.page.locator(this.Elements.descriptionInput).fill(await this.randomText());
        await this.page.locator(this.Elements.detailsTextBox).fill(await this.randomText());
        await this.page.locator(this.Elements.DescriptionOfResolution).fill(await this.randomText());
        // Checkboxes
        await this.page.locator(this.Elements.dispatch1).check();
        await this.page.locator(this.Elements.dispatch5).check();
        await this.page.locator(this.Elements.dispatch4).uncheck();
        await this.page.locator(this.Elements.dispatch4).check();
        await this.page.locator(this.Elements.dispatch6).check();
        await this.page.locator(this.Elements.dispatch7).check();
        await this.page.locator(this.Elements.guarantee1).check();
        await this.page.locator(this.Elements.guarantee2).check();
        await this.page.locator(this.Elements.guarantee3).check();
        await this.page.locator(this.Elements.guarantee4).check();
        await this.page.locator(this.Elements.guarantee5).check();
        await this.page.locator(this.Elements.payroll1).check();
        await this.page.locator(this.Elements.payroll2).check();
        await this.base.waitAndClick(this.Elements.saveButton);
        const message = await this.page.locator(this.Elements.successMessage).textContent();
        expect(message).toContain('Dispatch Notes information saved successfully');
    }

    async updateDispatchNote(): Promise<void> {
        await this.base.waitAndClick(this.Elements.FirstRow);
        await this.page.locator(this.Elements.descriptionInput).fill(await this.randomText());
        await this.base.waitAndClick(this.Elements.updateDispatchNoteButton);
        const message = await this.page.locator(this.Elements.successMessage).textContent();
        expect(message).toContain('Dispatch Notes information saved successfully');
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
            this.page.locator(this.Elements.downloadDispatchNoteButton).click() // Perform the action that initiates download
        ]);

        // Save the downloaded file to the specified folder as a text file
        const downloadPathWithFileName = path.join(downloadPath, 'DispatchReport.xlsx');
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

    async searchAndResetDispatchNotes(): Promise<void> {
            await this.fillHeaderDefaults();
            await this.base.waitAndClick(this.Elements.search);
            const FirstRow = await this.page.locator(this.Elements.FirstRow).textContent();
            expect(FirstRow).toContain("1");
            await this.base.waitAndClick(this.Elements.resetButton);
            const shift = await this.page.locator(this.Elements.shift).textContent();
            expect(shift).toContain('Select');
        }
        async deleteDispatchNote(): Promise<void> {
            await this.fillHeaderDefaults();
            await this.base.waitAndClick(this.Elements.search);
            fixture.page.setDefaultTimeout(2000)
            await this.base.waitAndClick(this.Elements.deleteButton);
            await this.base.waitAndClick(this.Elements.yesButton);
            await this.page.waitForTimeout(1000);
            const validationMessageForDelete = await this.page.locator(this.Elements.LaborOrderDispatchNoteDeletedMessage).textContent();
            expect(validationMessageForDelete).toContain("Dispatch Notes information deleted successfully");
        }

}
