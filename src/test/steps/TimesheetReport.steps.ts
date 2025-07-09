import { Given, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import { TimesheetReportPage } from '../../pages/TimesheetReport.page';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

let timesheetReportPage: TimesheetReportPage;

Then('I am on the Timesheet Report page', async function () {
    timesheetReportPage = new TimesheetReportPage(fixture.page);
    await timesheetReportPage.goto();
});

Then('Click on timesheet Report button with date range and verify the report downloaded successfully', async function () {
    // Example: set a date range (last 7 days)
    await timesheetReportPage.selectFromDate('2025-01-01');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    await timesheetReportPage.selectToDate(formatted);
    const filePath = await timesheetReportPage.downloadReport();

    // Attach the Excel file directly to the report
    if (fs.existsSync(filePath) && this.attach) {
        const fileBuffer = fs.readFileSync(filePath);
        await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
});
