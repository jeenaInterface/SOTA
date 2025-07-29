

import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { IncreaseDecreaseTimesheetPage } from '../../pages/increaseDecreaseTimesheet.page';
import { fixture } from '../../hooks/pageFixture';


let timesheetPage: IncreaseDecreaseTimesheetPage;


let currentDate = new Date();



When('I navigate to the Increase-Decrease Timesheet page', async function () {
  timesheetPage = new IncreaseDecreaseTimesheetPage(fixture.page);
  await timesheetPage.clickOnTimehseetMenu();
});

When('I select landing page details for a rail order with work order date as current date minus 15 days', async function () {
  const workDate = new Date(currentDate);
  workDate.setDate(workDate.getDate() - 15);
  await timesheetPage.selectLandingDetails('Rail', IncreaseDecreaseTimesheetPage.formatDate(workDate), '1ST', 'Rail Ops - 790101');
  await timesheetPage.clickGo();
});
When('I select landing page details for a yard order with work order date as current date minus 15 days', async function () {
  const workDate = new Date(currentDate);
  workDate.setDate(workDate.getDate() - 15);
  await timesheetPage.selectLandingDetails('Yard', IncreaseDecreaseTimesheetPage.formatDate(workDate), '1ST', 'Yard Ops - 690101');
  await timesheetPage.clickGo();
});


When('I create a new row in the Increase-decrease tab and enter steady, ST, and OT hours', async function () {
  await timesheetPage.AddNewRow();
  await timesheetPage.addDecreaseRow();

});

When('I create a new row in the Increase-decrease tab and enter steady, ST, OT and DFT hours', async function () {
  await timesheetPage.AddNewRowForYard();
  await timesheetPage.addDecreaseRowForYard();

});

When('I approve the timesheet entry', async function () {
  await timesheetPage.approveTimesheet();
});

Then('Then Reject the timesheet entry', async function () {
  // Implement reject logic
    await timesheetPage.clickOnReject();
  
});

Then('Then delete entire timesheet entry', async function () {
  // Implement delete logic
    await timesheetPage.deleteIndividualTimesheetEntry();
  
});
Then('verify the report downloaded successfully', async function () {
  //timeout
  await fixture.page.waitForTimeout(5000);
  await timesheetPage.downloadTimehseetReport();
});

Then('Click on submit button without entering any details', async function () {
  await timesheetPage.saveAndSubmitTimesheetWithValidation();
});

Then('Verify that the appropriate validation message for timesheet entry when click on approve button', async function () {
  await timesheetPage.approveWithValidation();
});

Then('Verify validation message for Longshore Name, Payroll and Hours', async function () {
  // Implement this method in the page object if not present
  await timesheetPage.verifyValidationMessageForLongshorePayrollHours();
});

Then('Verify validation message for LBCT Management Name', async function () {
  // Implement this method in the page object if not present
  await timesheetPage.verifyValidationMessageForLBCTManagementName();
});
