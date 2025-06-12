import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import { SteadySchedulePage } from "../../pages/steadySchedule.page";

let steadySchedulePage: SteadySchedulePage;

Given('User navigates to the steady schedule page', async function () {
    steadySchedulePage = new SteadySchedulePage(fixture.page);
    await steadySchedulePage.navigateToSteadySchedule();
});

When('User selects a work date for steady schedule', async function () {
    const currentDate = new Date().toISOString().split('T')[0];
    await steadySchedulePage.selectWorkDate(currentDate);
});

When('User clicks on GO button', async function () {
    await steadySchedulePage.clickGoButton();
});

When('User adds steady details with following information:', async function (dataTable) {
    const data = dataTable.hashes()[0];
    await steadySchedulePage.enterNumberOfJobs(data['Number of Jobs']);
    await steadySchedulePage.selectJobType(data['Job Type']);
    await steadySchedulePage.selectStartTime(data['Start Time']);
    await steadySchedulePage.selectFinishTime(data['Finish Time']);
});

When('User adds remarks {string}', async function (remarks) {
    await steadySchedulePage.clickRemarksButton();
    await steadySchedulePage.enterRemarks(remarks);
    await steadySchedulePage.clickAddRemarksButton();
});

When('User clicks on Save button', async function () {
    await steadySchedulePage.clickSaveButton();
});

When('User updates steady details with following information:', async function (dataTable) {
    const data = dataTable.hashes()[0];
    await steadySchedulePage.enterNumberOfJobs(data['Number of Jobs']);
    await steadySchedulePage.selectJobType(data['Job Type']);
    await steadySchedulePage.selectStartTime(data['Start Time']);
    await steadySchedulePage.selectFinishTime(data['Finish Time']);
});

When('User updates remarks to {string}', async function (remarks) {
    await steadySchedulePage.clickRemarksButton();
    await steadySchedulePage.enterRemarks(remarks);
    await steadySchedulePage.clickAddRemarksButton();
});

When('User tries to save without entering mandatory fields', async function () {
    await steadySchedulePage.clearMandatoryFields();
    await steadySchedulePage.clickSaveButton();
});

When('User clicks on Cancel button', async function () {
    await steadySchedulePage.clickCancelButton();
});

Then('User should see success message for steady schedule', async function () {
    await steadySchedulePage.verifySuccessMessage();
});

Then('User should see validation messages for required fields', async function () {
    await steadySchedulePage.verifyValidationMessages();
});

Then('User should be returned to steady schedule list without saving', async function () {
    await steadySchedulePage.verifyScheduleListPage();
});
