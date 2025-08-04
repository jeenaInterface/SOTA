import { Given, When, Then } from "@cucumber/cucumber";
import { SecurityPage } from "../../pages/securityLaborOrder.page";
import { fixture } from "../../hooks/pageFixture";
import { expect } from "@playwright/test";
import * as fs from 'fs';

let securityPage: SecurityPage;

When('User navigates to security labor order page', async function () {
    securityPage = new SecurityPage(fixture.page);
    await securityPage.clickSecurityLaborOrder();
});

When('User selects date and clicks GO button', async function () {
    await securityPage.selectAvailableSecurityOrderDate();
});

When('User enters order date and time', async function () {
    await securityPage.enterOrderDateTime();
});


When('User adds job details with following information:', async function (dataTable) {
    const jobs = dataTable.hashes();
    for (let i = 0; i < jobs.length; i++) {
        await securityPage.clickPlusButton();
        await securityPage.enterNumberOfJobs(jobs[i]['Number of Jobs'], i);
        await securityPage.selectJobType(jobs[i]['Job Type'], i);
        await securityPage.selectStartTime(jobs[i]['Start Time'], i);
        await securityPage.selectFinishTime(jobs[i]['Finish Time'], i);
        await securityPage.enterRemarks(jobs[i]['remarks'], i);
    }
});

When('User clicks Save button', async function () {
    await securityPage.clickSaveButton();
});


Then('User should see success message for security labor order', async function () {
    await securityPage.verifySuccessMessage();
});


When('User downloads the security labor report', async function () {
    await securityPage.downloadSecurityLaborReport();
});

Then('verify cancel functionality', async function () {

    await securityPage.clickCancelButton();
});
When('Delete one row from the security labor order', async function () {
    await securityPage.deleteSecondRow();
});
When('User should see message for Mandatory fields', async function () {
    await securityPage.verifyMandatoryFieldsMessage();
});
When('User should see validation message for duplicate entry', async function () {
    await securityPage.verifyDuplicateEntryMessage();
});