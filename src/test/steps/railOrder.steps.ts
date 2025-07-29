// The step definition's role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import railOrderPage from "../../pages/railOrder.page";
import vesselOrderPage from "../../pages/vesselOrder.page";
import YardOrderPage from "../../pages/yardOrder.page";

let railOrder: railOrderPage;
let vesselOrder: vesselOrderPage;
let YardOrder: YardOrderPage;

setDefaultTimeout(60 * 1000 * 1);

Given('the user creates a new Rail order', async function () {
  railOrder = new railOrderPage(fixture.page);
  vesselOrder = new vesselOrderPage(fixture.page);
  await railOrder.clickOnRailOrderMenu();
  await railOrder.SelectDetailsOnLandingPage();
  await railOrder.EnterHeaderDetails();
  await railOrder.FillManningTable();
  await railOrder.SelectSteadyDetails();
  await vesselOrder.ClickSaveMayCan();
});

Then('the user discards the Rail order', async function () {
  await vesselOrder.ClickDiscard();
});

Then('the user firm the Rail order', async function () {
  await vesselOrder.ClickFirmButton();
});

Then('the user push the Rail labor order to the summary sheet', async function () {
  await vesselOrder.ClickPushButton();
});

Then('the user cancel the Rail order', async function () {
  await vesselOrder.ClickCancelButton();
});

Then('Verify that the appropriate validation message for start time field in rail order', async function () {
  railOrder = new railOrderPage(fixture.page);
  vesselOrder = new vesselOrderPage(fixture.page);
  YardOrder = new YardOrderPage(fixture.page);
  await railOrder.clickOnRailOrderMenu();
  await railOrder.SelectDetailsOnLandingPage();
  await vesselOrder.ClickSaveMayCan();
  await YardOrder.validationMessageForMandatoryFields();
});

Then('Verify that the appropriate validation message for steady name and steady count field in rail order', async function () {
  await railOrder.validationMessageForSteadtcount();
});

Given('the user creates a new rail timesheet', async function () {
  await railOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string;
  await railOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
  await railOrder.clickOnClerkTab();
  await railOrder.FillHrsTab();
});

When('the user saves the rail order without submitting it', async function () {
  await vesselOrder.clickOnSaveWithoutSubmit();
  await vesselOrder.VerifySuccessMessage();
});

Then('the user saves and submits the rail order', async function () {
  await vesselOrder.clickOnSaveAndSubmit();
  await vesselOrder.VerifySuccessMessage();
});

Then('Ops user submits and approve the rail order timesheet', async function () {
  await railOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string;
  await railOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
  await railOrder.clickOnClerkTab();
  await vesselOrder.SubmitTimehseet();
  await vesselOrder.ApprovetheTimehseet();
});

Then('ops user reject the rail timesheet', async function () {
  await vesselOrder.clickOnReject();
});

Then('verify remove approval functionality in rail timehseet', async function () {
  await vesselOrder.clickOnRemoveApproval();
  await railOrder.storeRollingCodeRailTimesheet();
});

Then('Labor entry add new steady details and mgr comments and submit the rail order timehseet', async function () {
  let RollingCode: string;
  await railOrder.pasteRollingCode(RollingCode);
  await railOrder.AddNewRowRail();
  await vesselOrder.SubmitTimehseet();
});

Then('the user verifies the download report functionality for the rail order', async function () {
  await vesselOrder.downloadTimehseetReport();
});