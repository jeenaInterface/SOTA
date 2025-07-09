import { Given, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import { SteadyJobAssignmentsDuplicateCheckReportPage } from '../../pages/SteadyJobAssignmentsDuplicateCheckReport.page';
import * as fs from 'fs';

let steadyJobAssignmentsDuplicateCheckReportPage: SteadyJobAssignmentsDuplicateCheckReportPage;

Then('I am on the Steady Job Assignments Duplicate Check Report page', async function () {
    steadyJobAssignmentsDuplicateCheckReportPage = new SteadyJobAssignmentsDuplicateCheckReportPage(fixture.page);
    await steadyJobAssignmentsDuplicateCheckReportPage.goto();
});

Then('Click on Steady Job Assignments Duplicate Check report button and verify the report downloaded successfully', async function () {
    // Set date range if needed, or use default
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    await steadyJobAssignmentsDuplicateCheckReportPage.selectFromDate(formatted);
    const filePath = await steadyJobAssignmentsDuplicateCheckReportPage.downloadReport();
    if (filePath && fs.existsSync(filePath) && this.attach) {
        const fileBuffer = fs.readFileSync(filePath);
        await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
});
