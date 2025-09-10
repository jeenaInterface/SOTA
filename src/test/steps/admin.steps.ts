import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import { adminPage } from '../../pages/admin.page';


let admin: adminPage;


Then('select Supporting Data from the admin menu', async function () {
    admin = new adminPage(fixture.page);
    await admin.clickOnAdminMenu();
});

When('Select LO_Reference from the type list', async function () {
    await admin.selectType();
});

When('Click on the edit button', async function () {
    await admin.clickEditButton();
});

When('Click on the update button', async function () {
    await admin.clickUpdateButton();
});

Then('Verify the success message is displayed', async function () {
    await admin.getSuccessMessage();
});

Then('select Shift and Holiday from the admin menu', async function () {
    admin = new adminPage(fixture.page);
    await admin.clickOnShiftHolidayMenu();
});

When('Click on the save button', async function () {
    await admin.clickSaveButton();
});

Then('Verify the shift holiday success message is displayed', async function () {
    await admin.verifyShiftHolidaySuccessMessage();
});

Then('select OCC Code from the admin menu', async function () {
    admin = new adminPage(fixture.page);
    await admin.clickOnOCCCodeMenu();
});

When('Select Operational Type as {string}', async function (type: string) {
    await admin.selectOperationalType(type);
});

When('Select Labor Type as {string}', async function (type: string) {
    await admin.selectLaborType(type);
});

When('Enter Job Type as {string}', async function (type: string) {
    await admin.enterJobType(type);
});

When('Enter OCC Code as {string}', async function (code: string) {
    await admin.enterOCCCode(code);
});

When('Click on the search button', async function () {
    await admin.clickSearchButton();
});

Then('Verify table contains single entry', async function () {
    await admin.verifyTableHasSingleEntry();
});

Then('Verify Job Type is {string}', async function (expectedJobType: string) {
    await admin.verifyJobType(expectedJobType);
});

When('Click on the reset button', async function () {
    await admin.clickResetButton();
});

Then('Verify Operational Type is reset to default', async function () {
    await admin.verifyOperationalTypeReset();
});

Then('Verify Labor Type is reset to default', async function () {
    await admin.verifyLaborTypeReset();
});

Then('Verify Job Type field is empty', async function () {
    await admin.verifyJobTypeEmpty();
});

Then('Verify OCC Code field is empty', async function () {
    await admin.verifyOCCCodeEmpty();
});

When('Click on download report button', async function () {
    await admin.downloadOCCReport();
});

Then('Verify OCC report is downloaded successfully', async function () {
    await admin.verifyDownloadedReport();
});

Then('Verify OCC report contains data with row count', async function () {
    const rowCount = await admin.getOCCReportRowCount();
    fixture.logger.info(`OCC Report contains ${rowCount} rows of data`);
    expect(rowCount).toBeGreaterThan(0);
});

Then('click on that row', async function () {
    await admin.clickFirstResultRow();
});
Then('click on that position', async function () {
    await admin.clickOnThePosition();
});

Then('click on save button and confirm the success message', async function () {
    await admin.clickOccCodeSaveButton();
    await admin.verifyOccCodeSaveSuccess();
});
Then('select  Steady Positions & Functions from the admin menu', async function () {
    admin = new adminPage(fixture.page);
    await admin.clickOnSteadyPositionMenu();
});
When('Select position as {string}', async function (position: string) {
    await admin.selectPosition(position);
});

When('select function as {string}', async function (functionName: string) {
    await admin.selectFunction(functionName);
});

Then('Verify position is {string}', async function (expectedPosition: string) {
    await admin.verifyPosition(expectedPosition);
});

Then('Click on back button', async function () {
    await admin.clickBackButton();
});

Then('Verify position is reset to default', async function () {
    await admin.verifyPositionReset();
});

Then('Verify function is reset to default', async function () {
    await admin.verifyFunctionReset();
});

Then('Verify steady report is downloaded successfully', async function () {
    await admin.downloadSteadyReport();
    await admin.verifySteadyReport();
});

Then('Verify steady report contains data with row count', async function () {
    const rowCount = await admin.getSteadyReportRowCount();
    expect(rowCount).toBeGreaterThan(0);
    fixture.logger.info(`Steady Position Report contains ${rowCount} rows of data`);
});

Then('select steady Job Role from the admin menu', async function () {
    admin = new adminPage(fixture.page);
    await admin.clickOnSteadyJobRoleMenu();
});

When('Enter Job Worked as {string}', async function (jobWorked: string) {
    await admin.enterJobWorked(jobWorked);
});

Then('Verify Job Worked is {string}', async function (expectedJobWorked: string) {
    await admin.verifyJobWorked(expectedJobWorked);
});

Then('click on that Job Worked', async function () {
    await admin.clickJobWorkedRow();
});

Then('Verify Job Worked is reset to default', async function () {
    await admin.verifyJobWorkedReset();
});

Then('Verify steady job role is downloaded successfully', async function () {
    await admin.downloadSteadyJobRoleReport();
    await admin.verifySteadyJobRoleReport();
});

Then('Verify steady job role contains data with row count', async function () {
    const rowCount = await admin.getSteadyJobRoleReportRowCount();
    expect(rowCount).toBeGreaterThan(0);
    fixture.logger.info(`Steady Job Role Report contains ${rowCount} rows of data`);
});


// When 
// And 
// And 
// Then 
// When 
// And 
// And Verify download functionality of Daily Security Schedule Templates

Then('select Daily Security Schedule Templates from the admin menu', async function () {
    admin = new adminPage(fixture.page);
    await admin.clickOnSecurityTemplateMenu();
});
Then('Click on the Add staffing template button', async function () {
    await admin.AddStaffingforOperation();
});
Then('Enter template name and new job details', async function () {
    await admin.FillDetails();
});
Then('click on SAVE button and confirm the success message', async function () {
    await admin.clickSaveButtonSecurityTemplate();
    await admin.verifySecurityTemplateSuccessMessage();
});
Then('Verify Action Log is created with details', async function () {
    await admin.verifyActionlog();
});
Then('verify search functionality', async function () {
    await admin.verifySearchFunctionality();
});
Then('verify reset functionality', async function () {
    await admin.verifyResetFunctionality();
});