import { Given, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import loginPage from "../../pages/login.page";

let login: loginPage;


Given('TR user logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(process.env.userEmailTR);
  await login.enterPassword(process.env.userPasswordTR);
  await login.clickLoginButton();
});

Then('TR management user logged into the application', async function () {
  await login.enterUserName(process.env.userEmailTR);
  await login.enterPassword(process.env.userPasswordTR);
});

Then('Ops management user logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(process.env.userEmailOps);
  await login.enterPassword(process.env.userPasswordOps);
  await login.clickLoginButton();
});
Then('Ops user logged into the application', async function () {
  await login.enterUserName(process.env.userEmailOps)
  await login.enterPassword(process.env.userPasswordOps)
});
Then('OCU user logged into the application', async function () {
  await login.enterUserName(process.env.userEmailOCU)
  await login.enterPassword(process.env.userPasswordOCU)
});
Then('OCU management user logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(process.env.userEmailOCU)
  await login.enterPassword(process.env.userPasswordOCU)
  await login.clickLoginButton();
});
Then('Accounting user logged into the application', async function () {
  await login.enterUserName(process.env.userEmailAccounts)
  await login.enterPassword(process.env.userPasswordAccounts)
});
Then('Timehseet entry user logged into the application', async function () {
  await login.enterUserName(process.env.userEmailentry)
  await login.enterPassword(process.env.userPasswordentry)
});
Given('Security management user logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(process.env.userEmailSecurityManager)
  await login.enterPassword(process.env.userPasswordSecurityManager)
  await login.clickLoginButton();
});
Then('Security sergeant user logged into the application', async function () {

  await login.enterUserName(process.env.userEmailSecuritySergeant)
  await login.enterPassword(process.env.userPasswordSergeant)

});
Then('Security manager user logged into the application', async function () {

  await login.enterUserName(process.env.userEmailSecurityManager)
  await login.enterPassword(process.env.userPasswordSecurityManager)

});
Then('user click on logout button', async function () {
  await login.logOutDropDownlist();
});

Given('Vessel schedule user logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(process.env.userEmailVesselSchedule)
  await login.enterPassword(process.env.userPasswordVesselSchedule)
  await login.clickLoginButton();
});
Given('LR managment user logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(process.env.lrManagementUserEmail)
  await login.enterPassword(process.env.userPasswordLRUser)
  await login.clickLoginButton();
});