// The step definition’s role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import terminalServiceOrderPage from "../../pages/terminalServiceOrder.page";
import vesselOrderPage from "../../pages/vesselOrder.page";



let terminalServiceOrder: terminalServiceOrderPage;
let vesselOrder: vesselOrderPage;
setDefaultTimeout(60 * 1000 * 1)
Given('the user creates a new Terminal Services Order', async function () {
    terminalServiceOrder = new terminalServiceOrderPage(fixture.page)
    vesselOrder = new vesselOrderPage(fixture.page)
    await terminalServiceOrder.clickOnTerminalServiceOrderMenu();
    await terminalServiceOrder.SelectDetailsOnLandingPage();
    await terminalServiceOrder.FillManningTable();
    await vesselOrder.ClickSaveMayCan();
});
Then('the user discards the Terminal Services Order', async function () {
    await vesselOrder.ClickDiscard();
});
Then('the user firm the Terminal Services Order', async function () {
    await vesselOrder.ClickFirmButton();
});
Then('the user push the Terminal Services Order to the summary sheet', async function () {
    await vesselOrder.ClickPushButton();
});
Then('the user cancel the Terminal Services Order', async function () {
    await vesselOrder.ClickCancelButton();
});


Given('the user creates a timesheet for the Terminal Services Order', async function () {
    await terminalServiceOrder.clickOnTimehseetMenu();
    let LatestWorkOrderDate: string
    await terminalServiceOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
    await terminalServiceOrder.clickOnSweeperTab();
});
Then('delete three rows in the timesheet and add a new row in the timesheet', async function () {
    await terminalServiceOrder.deleteAllEntries();
    fixture.logger.info("Waiting for 2 seconds")
    await fixture.page.waitForTimeout(2000);
    await terminalServiceOrder.addNewRowInTimesheet();
    fixture.logger.info("Waiting for 2 seconds")
    await fixture.page.waitForTimeout(2000);
    await vesselOrder.clickOnSaveWithoutSubmit();



});
When('the user saves the Terminal Services Timehseet without submitting it', async function () {
    await vesselOrder.clickOnSaveWithoutSubmit();
    await vesselOrder.VerifySuccessMessage();
});
Then('the user saves and submits the Terminal Services Timehseet', async function () {
    await vesselOrder.clickOnSaveAndSubmit();
    await vesselOrder.VerifySuccessMessage();
});
Then('Ops user submits and approve the Terminal Services Timehseet', async function () {
    terminalServiceOrder = new terminalServiceOrderPage(fixture.page)
    vesselOrder = new vesselOrderPage(fixture.page)
    await terminalServiceOrder.clickOnTimehseetMenu();
    let LatestWorkOrderDate: string
    await terminalServiceOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
    await terminalServiceOrder.clickOnSweeperTab();
    await terminalServiceOrder.FillHrsTab();
    await vesselOrder.SubmitTimehseet();
    await vesselOrder.ApprovetheTimehseet()
});
Then('ops user reject the Terminal Services Timehseet', async function () {
    await vesselOrder.clickOnReject();
});
Then('verify remove approval functionality of Terminal Services Timehseet', async function () {
    await vesselOrder.clickOnRemoveApproval();
    await vesselOrder.storeRollingCode()
});
Then('Labor entry add new steady details and mgr comments and submit the Terminal Services Timehseet', async function () {
    let RollingCode: string
    await vesselOrder.pasteRollingCode(RollingCode);
    await terminalServiceOrder.AddNewRowterminal();
    await vesselOrder.SubmitTimehseet();
});

Then('the user verifies the download report functionality for the Terminal Services Timehseet', async function () {
    await vesselOrder.downloadTimehseetReport();
});