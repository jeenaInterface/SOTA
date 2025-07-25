import { Given, When, Then } from '@cucumber/cucumber';
import { GuaranteeTimesheetPage } from '../../pages/guaranteeTimesheet.page';
import { fixture } from '../../hooks/pageFixture';
import { IncreaseDecreaseTimesheetPage } from '../../pages/increaseDecreaseTimesheet.page';


let guaranteePage: GuaranteeTimesheetPage;
let timesheetPage: IncreaseDecreaseTimesheetPage;

let currentDate = new Date();
function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

When('I navigate to the Guarantee Timesheet page', async function () {
    guaranteePage = new GuaranteeTimesheetPage(fixture.page);
    timesheetPage = new IncreaseDecreaseTimesheetPage(fixture.page);
    await guaranteePage.navigateToGuaranteeTimesheet();
});

When('I select landing page details for Guarantee timesheet with work order date, shift and job type', async function () {
    const workDate = formatDate(currentDate);
    await guaranteePage.selectLandingDetails('Rail', workDate, '1ST', 'Guarantee - 790199');
});


When('I create a new row in the Guarantee tab and enter steady, ST, and OT hours', async function () {
    await guaranteePage.AddNewRow();
});

When('Ops user approve the timesheet entry', async function () {
    await guaranteePage.approveTimesheet();
});

Then('Then Reject the guarantee timesheet entry', async function () {
    await timesheetPage.clickOnReject();
});

Then('delete entire guarantee timesheet', async function () {
    await timesheetPage.deleteTimesheetEntry();
});

Then('verify the GuaranteeTimesheet report downloaded successfully', async function () {
    //timeout
    await fixture.page.waitForTimeout(5000);
    await timesheetPage.downloadTimehseetReport();
});
