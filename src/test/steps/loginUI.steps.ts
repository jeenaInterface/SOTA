import { Given, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import loginPage from "../../pages/login.page";
import * as data from "../../helper/util/test-data/payloads.json"

let login: loginPage;


Given('User navigates to the application', async function () {
    login = new loginPage(fixture.page)
    await login.navigateToLoginPage()
});

When('TR management User enter the username and password', async function () {
    await login.enterUserName(data.userEmailTR)
    await login.enterPassword(data.userPasswordTR)
});

When('User click on the login button', async function () {
  await login.clickLoginButton();
});

Then('user click on logout button', async function () {
await login.logOutDropDownlist();
});
