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

// When('User enter the username and password', async function () {
//     await login.enterUserName(data.userEmail)
//     await login.enterPassword(data.userPassword)
// });

// When('User click on the login button', async function () {
//   await login.clickLoginButton();
// });

// Then('user click on logout button', async function () {
// await login.logOutDropDownlist();
// });
