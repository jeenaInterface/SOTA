import { Given, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import { TimesheetReviewRecapReportPage } from '../../pages/TimesheetReviewRecapReport.page';
import * as fs from 'fs';

let timesheetReviewRecapReportPage: TimesheetReviewRecapReportPage;

Then('I am on the Timesheet Review Recap Report page', async function () {
    timesheetReviewRecapReportPage = new TimesheetReviewRecapReportPage(fixture.page);
    await timesheetReviewRecapReportPage.goto();
});

Then('Click on timesheet Review Recap report button and verify the report downloaded successfully', async function () {
    // Set date range if needed, or use default
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    await timesheetReviewRecapReportPage.selectFromDate(formatted);
    const filePath = await timesheetReviewRecapReportPage.downloadReport();
    
    if (filePath && fs.existsSync(filePath) && this.attach) {
        const fileBuffer = fs.readFileSync(filePath);
        await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
});
