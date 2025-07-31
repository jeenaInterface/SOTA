// The step definition’s role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import vesselOrderPage from "../../pages/vesselOrder.page";
import summarySheetPage from "../../pages/summarySheet.page";


let vesselOrder: vesselOrderPage;
let summarySheet: summarySheetPage;

setDefaultTimeout(60 * 1000 * 1)
Given('the user creates a new vessel order', async function () {
  vesselOrder = new vesselOrderPage(fixture.page)
  summarySheet = new summarySheetPage(fixture.page)
  await vesselOrder.clickOnVesselOrderMenu();
  await vesselOrder.SelectDetailsOnLandingPage();
  await vesselOrder.EnterHeaderDetails();
  await vesselOrder.EnterGangsDetails();
  await vesselOrder.FillManningTable();
  await vesselOrder.SelectSteadyDetails();
  await vesselOrder.ClickSaveMayCan();

});
Then('the user discards the order', async function () {
  await vesselOrder.ClickDiscard();
});
Then('the user firm the order', async function () {
  await vesselOrder.ClickFirmButton();
});
Then('the user push the labor order to the summary sheet', async function () {
  await vesselOrder.ClickPushButton();
});
Then('the user cancel the order', async function () {
  await vesselOrder.ClickCancelButton();
});
Given('the user creates a new vessel timesheet', async function () {
  vesselOrder = new vesselOrderPage(fixture.page)
  await vesselOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string
  await vesselOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
  await vesselOrder.clickOnForemanTab();
  await vesselOrder.FillHrsTab();
});
When('the user saves the vessel order without submitting it', async function () {
  await vesselOrder.clickOnSaveWithoutSubmit();
  await vesselOrder.VerifySuccessMessage();

});
Then('the user saves and submits the vessel order', async function () {
  await vesselOrder.clickOnSaveAndSubmit();
  await vesselOrder.VerifySuccessMessage();

});
Then('Ops user submits and approve the vessel timesheet', async function () {
  await vesselOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string
  await vesselOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
  await vesselOrder.clickOnForemanTab();
  await vesselOrder.SubmitTimehseet();
  await vesselOrder.ApprovetheTimehseet()

});
Then('the user verifies the download report functionality for the vessel order', async function () {
  await vesselOrder.downloadTimehseetReport();
});
Then('ops user reject the vessel timesheet', async function () {
  await vesselOrder.clickOnReject();
});
Then('verify remove approval functionality', async function () {
  await vesselOrder.clickOnRemoveApproval();
  await vesselOrder.storeRollingCode()
});
Then('Labor entry add new steady details and mgr comments and submit the timehseet', async function () {
  let RollingCode: string
  await vesselOrder.pasteRollingCode(RollingCode);
  await vesselOrder.AddNewRow();
  await vesselOrder.SubmitTimehseet();
});
Then('Verify that the appropriate validation message for berth , start time and reference field', async function () {
  vesselOrder = new vesselOrderPage(fixture.page)
  await vesselOrder.clickOnVesselOrderMenu();
  await vesselOrder.SelectDetailsOnLandingPage();
  await vesselOrder.ClickSaveMayCan();
  await vesselOrder.validationMessageForMandatoryFields();
});
Then('Verify that the appropriate validation message for steady name and steady count field', async function () {
  await vesselOrder.validationMessageForSteadtcount();
});
Then('TR user verifies that the vessel labor order is pushed to the summary sheet and verifies the details', async function () {
  await vesselOrder.clickOnSummarySheetMenu();
  let LatestWorkOrderDate: string
  await vesselOrder.SelectDetailsOnLandingPageSummarysheet(LatestWorkOrderDate);
});

When('the user navigates to the new order form', async function () {
  vesselOrder = new vesselOrderPage(fixture.page);
    await vesselOrder.navigateToNewOrderForm();
});

When('the user enters work date and shift', async function () {
    await vesselOrder.enterWorkDate();

});


When('the user fills details in local 13 tab', async function () {
    await vesselOrder.fillLocal13Details();
});

When('the user fills details in local 63 tab', async function () {
    await vesselOrder.fillLocal63Details();
    await vesselOrder.clickSaveButton();
    await vesselOrder.verifySuccessMessage();
});

When('the user fills details in local 94 tab', async function () {
    await vesselOrder.fillLocal94Details();
});
Then('Verify download labor order difference report', async function () {
  await vesselOrder.downloadLaborOrderDifferenceReport();
    await vesselOrder.clickOnSummarySheetMenu();
  let LatestWorkOrderDate: string
  await vesselOrder.SelectDetailsOnLandingPageSummarysheet(LatestWorkOrderDate)
  await summarySheet.VerifySummarySheetCreated();
});
Then('Verify hall labor report', async function () {
await summarySheet.HallLaborReport();
  await vesselOrder.clickOnSummarySheetMenu();
  let LatestWorkOrderDate: string
  await vesselOrder.SelectDetailsOnLandingPageSummarysheet(LatestWorkOrderDate)
  await summarySheet.VerifySummarySheetCreated();
});
Then('Verify steady dispatch report', async function () {
    await summarySheet.steadyDispatchReport();
    await vesselOrder.clickOnSummarySheetMenu();
    let LatestWorkOrderDate: string
    await vesselOrder.SelectDetailsOnLandingPageSummarysheet(LatestWorkOrderDate)
    await summarySheet.VerifySummarySheetCreated();
});