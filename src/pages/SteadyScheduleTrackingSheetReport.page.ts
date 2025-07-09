import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';
import * as fs from 'fs';
import * as path from 'path';
import { fixture } from '../hooks/pageFixture';

export class SteadyScheduleTrackingSheetReportPage {
    protected base: PlaywrightWrapper;
    public page: Page;

    private Elements = {
        ReportMenu: "//div[normalize-space()='Report']",
        SteadyScheduleTrackingSheetLabel: "//a[normalize-space()='Steady Schedule/Tracking']",
        trackingOption: "//input[@id='tracking']",
        scheduleOption: "//input[@id='schedule']",
        downloadButton: "//button[normalize-space()='Steady Report']",
        resetButton: "//button[normalize-space()='Reset']",
        fromDate:"//input[@id='fromDt']",
        toDate:"//input[@id='toDt']",
        regName:"//input[@placeholder='Search By Reg #']"
    };

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ReportMenu);
        await this.base.waitAndClick(this.Elements.SteadyScheduleTrackingSheetLabel);
    }
    async scheduleCheckbox(): Promise<void> {
        // Ensure the schedule option is unchecked
        await this.page.locator(this.Elements.scheduleOption).check();
    }
    
    async selectFromDate(date: string): Promise<void> {
        await this.page.locator(this.Elements.fromDate).fill(date);
    }

    async selectToDate(date: string): Promise<void> {
        await this.page.locator(this.Elements.toDate).fill(date);
    }


    async downloadReport(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);

        // Handle the download event
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // Wait for the download to start
            this.page.locator(this.Elements.downloadButton).click() // Perform the action that initiates download
        ]);

        // Save the downloaded file to the specified folder as a text file
        const downloadPathWithFileName = path.join(downloadPath, 'Steady_Schedule_Tracking_Sheet_Report.xlsx');
        await download.saveAs(downloadPathWithFileName);
        console.log(`File downloaded to: ${downloadPathWithFileName}`);
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

    async reset(): Promise<void> {
        await this.page.locator(this.Elements.regName).fill('345345'); // Clear fromDate field
        await this.base.waitAndClick(this.Elements.resetButton);
        // Verify fromDate and toDate fields are reset to current date
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const currentDate = `${yyyy}-${mm}-${dd}`;
        const fromDateValue = await this.page.locator(this.Elements.fromDate).inputValue();
        const toDateValue = await this.page.locator(this.Elements.toDate).inputValue();
        expect(fromDateValue).toBe(currentDate);
        expect(toDateValue).toBe(currentDate);
        const regNameValue = await this.page.locator(this.Elements.regName).inputValue();
        expect(regNameValue).toBe(''); // Verify regName field is cleared
    }
}
