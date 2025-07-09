import { Given, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import { SteadyScheduleTrackingSheetReportPage } from '../../pages/SteadyScheduleTrackingSheetReport.page';
import * as fs from 'fs';
let steadyReportPage: SteadyScheduleTrackingSheetReportPage;


Then('I am on the Steady Schedule Tracking Sheet Report page', async function () {
    steadyReportPage = new SteadyScheduleTrackingSheetReportPage(fixture.page);
    await steadyReportPage.goto();
});

Then('Click on Steady report button by select Tracking option and verify the report downloaded successfully', async function () {
    await steadyReportPage.selectFromDate('2025-01-01');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    await steadyReportPage.selectToDate(formatted);
    const filePath = await steadyReportPage.downloadReport();
    if (fs.existsSync(filePath) && this.attach) {
        const fileBuffer = fs.readFileSync(filePath);
        await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
});

Then('Verify Steady Schedule Tracking Sheet Report reset functionalities', async function () {
    await steadyReportPage.reset();
});

Then('Click on Steady report button by select schedule option and verify the report downloaded successfully', async function () {
    await steadyReportPage.scheduleCheckbox();
    await steadyReportPage.selectFromDate('2025-01-01');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    await steadyReportPage.selectToDate(formatted);
    const filePath = await steadyReportPage.downloadReport();
    if (fs.existsSync(filePath) && this.attach) {
        const fileBuffer = fs.readFileSync(filePath);
        await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
});
