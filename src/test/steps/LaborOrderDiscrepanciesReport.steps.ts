import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import { LaborOrderDiscrepanciesReportPage } from '../../pages/LaborOrderDiscrepanciesReport.page';

let discrepanciesPage: LaborOrderDiscrepanciesReportPage;

Then('I am on the Labor Order Discrepancies Report page', async function () {
    discrepanciesPage = new LaborOrderDiscrepanciesReportPage(fixture.page);
    await discrepanciesPage.goto();
});

Then('Verify Add Discrepancies Functionalities', async function () {
    await discrepanciesPage.addDiscrepancy();
});
Then('Verify Update Discrepancies Functionalities', async function () {
    await discrepanciesPage.verifyUpdateFunctionality();
});

Then('Verify discrepancies report downloaded successfully', async function () {
    await discrepanciesPage.downloadDiscrepancyReport();
});

Then('Verify discrepancies summary report downloaded successfully', async function () {
    await discrepanciesPage.downloadSummaryReport();
});
Then('Verify Search Discrepancies Functionalities', async function () {
    await discrepanciesPage.searchDiscrepancies();
});
Then('Verify Reset Discrepancies Functionalities', async function () {
    await discrepanciesPage.resetDiscrepancies();
});
Then('Verify Delete Discrepancies Functionalities', async function () {
    await discrepanciesPage.deleteDiscrepancy();
});
