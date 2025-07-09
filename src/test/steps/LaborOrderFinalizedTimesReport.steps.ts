import { Given, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import { LaborOrderFinalizedTimesReportPage } from '../../pages/LaborOrderFinalizedTimesReport.page';
import * as fs from 'fs';

let laborOrderFinalizedTimesReportPage: LaborOrderFinalizedTimesReportPage;

Then('I am on the Labor Order Finalized Times Report page', async function () {
    laborOrderFinalizedTimesReportPage = new LaborOrderFinalizedTimesReportPage(fixture.page);
    await laborOrderFinalizedTimesReportPage.goto();
});

Then('Click on Labor Order Finalized Times report button and verify the report downloaded successfully', async function () {
    // Set date range if needed, or use default
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    await laborOrderFinalizedTimesReportPage.selectFromDate('2025-01-01');
    await laborOrderFinalizedTimesReportPage.selectToDate(formatted);
    const filePath = await laborOrderFinalizedTimesReportPage.downloadFinalizedTimesReport();
    if (filePath && fs.existsSync(filePath) && this.attach) {
        const fileBuffer = fs.readFileSync(filePath);
        await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
});

Then('Click on Finalized after deadlines report button and verify the report downloaded successfully', async function () {
    // Set date range if needed, or use default
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    await laborOrderFinalizedTimesReportPage.selectFromDate('2025-01-01');
    await laborOrderFinalizedTimesReportPage.selectToDate(formatted);
    const filePath = await laborOrderFinalizedTimesReportPage.downloadFinalizedAfterDeadlinesReport();
    if (filePath && fs.existsSync(filePath) && this.attach) {
        const fileBuffer = fs.readFileSync(filePath);
        await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
});
