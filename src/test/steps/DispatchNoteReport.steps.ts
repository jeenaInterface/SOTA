import { Given, Then} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import { DispatchNoteReportPage } from '../../pages/DispatchNoteReport.page';

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
    await dispatchNotePage.downloadDiscrepancyReport();
});
Then('Verify Search and Reset Dispatch Note Functionalities', async function () {
    await dispatchNotePage.searchAndResetDispatchNotes();
});

Then('Verify Delete Dispatch Note Functionalities', async function () {
    await dispatchNotePage.deleteDispatchNote();
});
