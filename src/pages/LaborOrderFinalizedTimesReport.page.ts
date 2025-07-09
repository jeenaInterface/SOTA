import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';
import * as fs from 'fs';
import * as path from 'path';
import { fixture } from '../hooks/pageFixture';

export class LaborOrderFinalizedTimesReportPage {
    protected base: PlaywrightWrapper;
    public page: Page;

    private Elements = {
        ReportMenu: "//div[normalize-space()='Report']",
        LaborOrderFinalizedTimesReportLabel: "//a[normalize-space()='Labor Order Finalized Times']",
        finalizedTimesDownloadButton: "//button[normalize-space()='Finalized Report']",
        finalizedAfterDeadlinesDownloadButton: "//button[normalize-space()='Finalized After Deadlines Report']",
        fromDate: "//input[@id='fromDt']",
        toDate: "//input[@id='toDt']"
    };

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ReportMenu);
        await this.base.waitAndClick(this.Elements.LaborOrderFinalizedTimesReportLabel);
    }

    async selectFromDate(date: string): Promise<void> {
        await this.page.locator(this.Elements.fromDate).fill(date);
    }

    async selectToDate(date: string): Promise<void> {
        await this.page.locator(this.Elements.toDate).fill(date);
    }

    async downloadFinalizedTimesReport(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.finalizedTimesDownloadButton).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'Labor_Order_Finalized_Times_Report.xlsx');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }

    async downloadFinalizedAfterDeadlinesReport(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.finalizedAfterDeadlinesDownloadButton).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'Labor_Order_Finalized_After_Deadlines_Report.xlsx');
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
}
