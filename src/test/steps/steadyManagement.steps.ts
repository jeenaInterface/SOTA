import { Given, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import loginPage from "../../pages/steadyManagement.page";
import * as data from "../../helper/util/test-data/payloads.json"
import steadyManagementPage from "../../pages/steadyManagement.page";

let steady: steadyManagementPage;


Given('Go to steady management screen', async function () {
    steady = new steadyManagementPage(fixture.page)
    await steady.clicksteadyMenuButton()
});

When('Select vessel as operational type', async function () {
    await steady.SelectoperationalType()
});

When('Click on search button', async function () {
  await steady.ClickOnSearch();
});

Then('Update the details for the First Steady in the table and confirm the success message.', async function () {
await steady.updateFirstSteady();
});
