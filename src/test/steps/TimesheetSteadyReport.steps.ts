import { Given, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import { TimesheetSteadyReportPage } from '../../pages/TimesheetSteadyReport.page';
import * as fs from 'fs';

let timesheetSteadyReportPage: TimesheetSteadyReportPage;


Then('I am on the Timesheet Steady Report page', async function () {
    timesheetSteadyReportPage = new TimesheetSteadyReportPage(fixture.page);
    await timesheetSteadyReportPage.goto();
});

Then('Click on timesheet Steady report button and verify the report downloaded successfully', async function () {
    await timesheetSteadyReportPage.selectFromDate('2025-01-01');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    await timesheetSteadyReportPage.selectToDate(formatted);
    const filePath = await timesheetSteadyReportPage.downloadReport();

    if (fs.existsSync(filePath) && this.attach) {
        const fileBuffer = fs.readFileSync(filePath);
        await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
});
