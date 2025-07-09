import { Given, Then} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import { DispatchNoteReportPage } from '../../pages/DispatchNoteReport.page';
import * as fs from 'fs';


let dispatchNotePage: DispatchNoteReportPage;


Then('I am on the Dispatch Note Report page', async function () {
    dispatchNotePage = new DispatchNoteReportPage(fixture.page);
    await dispatchNotePage.goto();
});

Then('Verify Add Dispatch Note Functionalities', async function () {
    await dispatchNotePage.addDispatchNote();
});

Then('Verify Update Dispatch Note Functionalities', async function () {
    await dispatchNotePage.updateDispatchNote();
});

Then('Verify Dispatch Note downloaded successfully', async function () {
    // Download the report and attach the Excel file
    const filePath = await dispatchNotePage.downloadDiscrepancyReport();
    // Attach the Excel file directly to the report
     if (fs.existsSync(filePath) && this.attach) {
         const fileBuffer = fs.readFileSync(filePath);
         await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
     }
});
Then('Verify Search and Reset Dispatch Note Functionalities', async function () {
    await dispatchNotePage.searchAndResetDispatchNotes();
});

Then('Verify Delete Dispatch Note Functionalities', async function () {
    await dispatchNotePage.deleteDispatchNote();
});
