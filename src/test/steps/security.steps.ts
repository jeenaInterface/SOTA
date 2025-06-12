import { Given, When, Then } from "@cucumber/cucumber";
import { SecurityPage } from "../../pages/security.page";
import { fixture } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";

let securityPage: SecurityPage;

When('User navigates to security labor order page', async function () {
    securityPage = new SecurityPage(fixture.page);
    await securityPage.clickSecurityLaborOrder();
});

When('User selects date and clicks GO button', async function () {
    const specificDate = '2025-06-12'; // Using specific date in YYYY-MM-DD format
    await securityPage.selectDate(specificDate);
    await securityPage.clickGoButton();
});

When('User enters order date and time', async function () {
    await securityPage.enterOrderDateTime();
});

When('User adds job details with following information:', async function (dataTable) {
    const data = dataTable.hashes()[0];
    await securityPage.clickPlusButton();
    await securityPage.enterNumberOfJobs(data['Number of Jobs']);
    await securityPage.selectJobType(data['Job Type']);
    await securityPage.selectStartTime(data['Start Time']);
    await securityPage.selectFinishTime(data['Finish Time']);
});

When('User adds remarks {string}', async function (remarks) {
    await securityPage.clickRemarksButton();
    await securityPage.enterRemarks(remarks);
    await securityPage.clickAddRemarksButton();
});

When('User clicks Save button', async function () {
    await securityPage.clickSaveButton();
});

When('User clicks Save and Submit button', async function () {
    await securityPage.saveAndSubmitAsManagement();
});

Then('User should see success message for security labor order', async function () {
    await securityPage.verifySuccessMessage();
});

Then('User should see success message for security labor order submission', async function () {
    await securityPage.verifySuccessMessage();
});

When('User downloads the security labor report', async function () {
    // Note: Implement the download functionality in security.page.ts if not already present
    // This is a placeholder for the download action
    // await securityPage.downloadSecurityLaborReport();
});

Then('Report should be downloaded successfully', async function () {
    // Note: Implement the download verification in security.page.ts if not already present
    // This is a placeholder for the download verification
    // await securityPage.verifyReportDownloaded();
});