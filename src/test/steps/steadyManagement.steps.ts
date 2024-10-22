import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import loginPage from "../../pages/steadyManagement.page";
import * as data from "../../helper/util/test-data/payloads.json"
import steadyManagementPage from "../../pages/steadyManagement.page";

let steady: steadyManagementPage;
setDefaultTimeout(60 * 1000 * 5)

Given('Go to steady management screen', async function () {
    steady = new steadyManagementPage(fixture.page)
    await steady.clicksteadyMenuButton()
});

When('Select vessel as operational type', async function () {
    await steady.SelectoperationalType()
});

When('Click on search button', async function () {
  await steady.ClickOnSearch();
  fixture.logger.info("Waiting for 5 seconds")
  await fixture.page.waitForTimeout(5000);
});

Then('Update the details for the First Steady in the table and confirm the success message.', async function () {
await steady.updateFirstSteady();
});
 
Then('Enter a wrong steady name in the search box', async function () {
  await steady.enterWrongSteadyName();
});

Then('Confirm validation message is displayed', async function () {
  await steady.verifyErrorMessage();
  fixture.logger.info("Waiting for 2 seconds")
  await fixture.page.waitForTimeout(5000);
});
