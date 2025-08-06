import { Given, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import loginPage from "../../pages/login.page";
import * as data from "../../helper/util/test-data/payloads.json"

let login: loginPage;

Given('TR user logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(data.userEmailTR);
  await login.enterPassword(data.userPasswordTR);
  await login.clickLoginButton();
});

Then('TR management user logged into the application', async function () {
  await login.enterUserName(data.userEmailTR);
  await login.enterPassword(data.userPasswordTR);
});

Then('Ops management user logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(data.userEmailOps);
  await login.enterPassword(data.userPasswordOps);
  await login.clickLoginButton();
});
Then('Ops user logged into the application', async function () {
  await login.enterUserName(data.userEmailOps)
  await login.enterPassword(data.userPasswordOps)
});
Then('OCU user logged into the application', async function () {
  await login.enterUserName(data.userEmailOCU)
  await login.enterPassword(data.userPasswordOCU)
});
Then('Accounting user logged into the application', async function () {
  await login.enterUserName(data.userEmailAccounts)
  await login.enterPassword(data.userPasswordAccounts)
});
Then('Timehseet entry user logged into the application', async function () {
  await login.enterUserName(data.userEmailentry)
  await login.enterPassword(data.userPasswordentry)
});
Given('Security management user logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(data.userEmailSecurityManager)
  await login.enterPassword(data.userPasswordSecurityManager)
  await login.clickLoginButton();
});
Then('Security sergeant user logged into the application', async function () {

  await login.enterUserName(data.userEmailSecuritySergeant)
  await login.enterPassword(data.userPasswordSergeant)

});
Then('Security manager user logged into the application', async function () {

  await login.enterUserName(data.userEmailSecurityManager)
  await login.enterPassword(data.userPasswordSecurityManager)

});
Then('user click on logout button', async function () {
  await login.logOutDropDownlist();
});

Given('Vessel schedule user logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(data.userEmailVesselSchedule)
  await login.enterPassword(data.userPasswordVesselSchedule)
  await login.clickLoginButton();
});