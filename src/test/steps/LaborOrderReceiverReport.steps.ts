import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import { LaborOrderReceiverReportPage } from '../../pages/LaborOrderReceiverReport.page';

let reportPage: LaborOrderReceiverReportPage;


Then('I am on the Labor Order Receiver Report page', async function () {
    reportPage = new LaborOrderReceiverReportPage(fixture.page);
    await reportPage.clickLaborOrderReceivedLogReport();
});

Then('Select One Jan 1 from the from date field', async function () {
    await reportPage.selectFromDate('2025-01-01');
});

Then('Select current date from the to date field', async function () {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`;
    await reportPage.selectToDate(formatted);
});

When('I click on the Search button', async function () {
    await reportPage.clickSearch();
});

Then('Verify the ignore Functionalities', async function () {
    await reportPage.ignoreFunctionality();
});

Then('Verify the add remarks Functionalities', async function () {
    await reportPage.addRemarksFunctionality();
});
