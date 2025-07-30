import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import loginPage from "../../pages/steadyManagement.page";
import * as data from "../../helper/util/test-data/payloads.json"
import steadyManagementPage from "../../pages/steadyManagement.page";
import * as fs from 'fs';

let steady: steadyManagementPage;
setDefaultTimeout(60 * 1000 * 5)

Given('Go to steady management screen', async function () {
    steady = new steadyManagementPage(fixture.page);
    await steady.clicksteadyMenuButton();
});

When('Select vessel as operational type', async function () {
    await steady.SelectoperationalType();
});

Then('Select steady name as {string}', async function (name: string) {
    await steady.enterSteadyName(name);
});

When('Click on search button', async function () {
    await steady.ClickOnSearch();
    fixture.logger.info("Waiting for 5 seconds");
    await fixture.page.waitForTimeout(5000);
});

Then('Verify the steady details are displayed in the table', async function () {
    await steady.verifyTableDetails();
});

Then('Verify update steady functioanlities', async function () {
    await steady.updateFirstSteady();
});

Then('click on back button', async function () {
    await steady.clickBackButton();
});

Then('Click on reset button', async function () {
    await steady.clickResetButton();
});

Then('Verify the operational type is reset to default', async function () {
    await steady.verifyOperationalTypeReset();
});

Then('Verify the steady name field is empty', async function () {
    await steady.verifySteadyNameEmpty();
});

Then('Click on create new steady button', async function () {
    await steady.clickCreateNewSteady();
});

Then('Verify new steady is created or proper message is displayed', async function () {
    await steady.verifyNewSteadyCreation();
});

Then('Enter a wrong steady name in the search box', async function () {
    await steady.enterWrongSteadyName();
});

Then('Confirm validation message is displayed', async function () {
    await steady.verifyErrorMessage();
    fixture.logger.info("Waiting for 2 seconds");
    await fixture.page.waitForTimeout(5000);
});

Then('Verify the download report is downloaded successfully', async function () {
    const filePath = await steady.downloadReport();
    if (filePath && fs.existsSync(filePath) && this.attach) {
        const fileBuffer = fs.readFileSync(filePath);
        await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
})

Then('Verify the steady report is downloaded successfully', async function () {
    const filePath = await steady.downloadSteadyReport();
    if (filePath && fs.existsSync(filePath) && this.attach) {
        const fileBuffer = fs.readFileSync(filePath);
        await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
});
