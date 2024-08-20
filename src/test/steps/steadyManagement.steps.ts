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

Given('Select vessel as operational type', async function () {
    // await login.enterUserName(data.userEmail)
    // await login.enterPassword(data.userPassword)
});

When('Click on search button', async function () {
    //   await login.clickLoginButton();
});

Then('Verify the steadies are loaded in the table', async function () {
    // await login.logOutDropDownlist();
});

Given('Select vessel as operational type', async function () {
    // await login.logOutDropDownlist();
});

When('Click on search button', async function () {
    // await login.logOutDropDownlist();
});
Then('Verify the steadies are loaded in the table with vessel opearional type', async function () {
    // await login.logOutDropDownlist();
});