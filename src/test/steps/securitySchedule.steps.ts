import { Given, When, Then } from "@cucumber/cucumber";
import { SecuritySchedulePage } from "../../pages/securitySchedule.page";
import { fixture } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";

let schedulePage: SecuritySchedulePage;


When('User navigates to security schedule page', async function () {
    schedulePage = new SecuritySchedulePage(fixture.page);
    await schedulePage.navigateToSchedule();
});

When('User selects date, shift and clicks GO button', async function () {
    // Use today's date and first shift for demo
    await schedulePage.selectAvailableSecurityOrderDate('1ST');

});

When('Select staffing from Staffing for Operations list and fill the steady name, radio and vehicle', async function () {
    await schedulePage.selectStaffingAndFillDetails();
});

When('Enter notes, sergeant name and click on save', async function () {
    await schedulePage.enterNotesAndSergeant('Notes', 'Test Sergeant');
    await schedulePage.clickSaveButton();
});


Then('User should see success message for security schedule', async function () {
    await schedulePage.verifySuccessMessage();
});

Then('Delete one row from the security schedule and click on save', async function () {
    await schedulePage.deleteRow();
    await schedulePage.clickSaveButton();
});

Then('click on view different schedule button', async function () {
    await schedulePage.clickViewDifferentSchedule();
});

Then('Select 2nd shift and click on go button', async function () {
 
    await schedulePage.selectDateShift('2ND');
});

Then('Select 3RD shift and click on go button', async function () {
    await schedulePage.selectDateShift('3RD');

});

Then('copy the rolling code from the schedule', async function () {
    await schedulePage.storeRollingCode();

});


Then('Open the timesheet menu', async function () {
      let RollingCode: string
await schedulePage.pasteRollingCode(RollingCode);
    await schedulePage.navigateToTimesheet();
});

Then('Verify the validations for ST and OT hr.', async function () {
    await schedulePage.enterWrongTimesheetHours();
});

Then('Enter correct ST and OT hr.', async function () {
    await schedulePage.enterTimesheetHours();
});

Then('Click on save button', async function () {
    await schedulePage.saveTimesheet();
});

Then('Verify the success message for timesheet', async function () {
    await schedulePage.verifyTimesheetSuccess();
});

Then('submit the timesheet', async function () {
    await schedulePage.submitTimesheet();
});

Then('Verify the success message for timesheet submission', async function () {
    await schedulePage.verifyTimesheetSuccess();
});

Then('Approve the timesheet', async function () {
    await schedulePage.approveTimesheet();
});

Then('Verify the success message for timesheet approval', async function () {
    await schedulePage.verifyTimesheetSuccess();
});

Then('Verify reject functionality', async function () {
    await schedulePage.rejectTimesheet();
});
