// The step definition’s role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import YardOrderPage from "../../pages/yardOrder.page";
import vesselOrderPage from "../../pages/vesselOrder.page";



let YardOrder: YardOrderPage;
let vesselOrder: vesselOrderPage;
setDefaultTimeout(60 * 1000 * 1)
Given('the user creates a new Yard order', async function () {
    YardOrder = new YardOrderPage(fixture.page)
  vesselOrder = new vesselOrderPage(fixture.page)
  await YardOrder.clickOnYardOrderMenu();
  await YardOrder.SelectDetailsOnLandingPage();
  await YardOrder.EnterHeaderDetails();
  await YardOrder.FillManningTable();
  await YardOrder.SelectSteadyDetails();
  await vesselOrder.ClickSaveMayCan();
});
Then('the user discards the Yard order', async function () {
  await vesselOrder.ClickDiscard();
});
Then('the user firm the Yard order', async function () {
  await vesselOrder.ClickFirmButton();
});
Then('the user push the Yard labor order to the summary sheet', async function () {
  await vesselOrder.ClickPushButton();
});
Then('the user cancel the Yard order', async function () {
  await vesselOrder.ClickCancelButton();
});
Then('Verify that the appropriate validation message for start time field', async function () {
  YardOrder = new YardOrderPage(fixture.page)
  vesselOrder = new vesselOrderPage(fixture.page)
  await YardOrder.clickOnYardOrderMenu();
  await YardOrder.SelectDetailsOnLandingPage();
  await vesselOrder.ClickSaveMayCan();
  await YardOrder.validationMessageForMandatoryFields();
});
 Then('Verify that the appropriate validation message for steady name and steady count field in yard order', async function () {
  await YardOrder.validationMessageForSteadtcount();
});

Given('the user creates a timesheet for the yard order', async function () {
  await YardOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string
  await YardOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
  await YardOrder.clickOnForemanTab();
  await YardOrder.FillHrsTab();
});
When('the user saves the yard order without submitting it', async function () {
  await vesselOrder.clickOnSaveWithoutSubmit();
  await vesselOrder.VerifySuccessMessage();

});

When('the user saves and submits the yard order', async function () {
  await vesselOrder.clickOnSaveAndSubmit();
  await vesselOrder.VerifySuccessMessage();

});
Then('Ops user submits and approve the yard timesheet', async function () {
  await YardOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string
  await YardOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
  await YardOrder.clickOnForemanTab();
  await vesselOrder.SubmitTimehseet();
  await vesselOrder.ApprovetheTimehseet()

});
Then('the user verifies the download report functionality for the yard order', async function () {
  await vesselOrder.downloadTimehseetReport();
});
Then('ops user reject the yard timesheet', async function () {
  await vesselOrder.clickOnReject();
});
Then('verify remove approval functionality of yard timehseet', async function () {
  await vesselOrder.clickOnRemoveApproval();
  await vesselOrder.storeRollingCode()
});
Then('Labor entry add new steady details and mgr comments and submit the yard order timehseet', async function () {
  let RollingCode: string
  await vesselOrder.pasteRollingCode(RollingCode);
  await YardOrder.AddNewRowYard();
  await vesselOrder.SubmitTimehseet();
});



