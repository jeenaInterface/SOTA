// The step definition's role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import yardOrderPage from "../../pages/yardOrderPOC.page";
import loginPage from "../../pages/login.page";
import * as data from "../../helper/util/test-data/payloads.json"


let yardOrder: yardOrderPage;
let login: loginPage;

setDefaultTimeout(60 * 1000 * 5)

Given('TR user creates a new labor order', async function () {
  yardOrder = new yardOrderPage(fixture.page)
  await yardOrder.clickOnLaborOrderMenu();
  await yardOrder.SelectDetailsOnLandingPage();
  await yardOrder.SelectStartTime();
  await yardOrder.FillManningTable();
  await yardOrder.SelectSteadyDetails();
  await yardOrder.ClickSaveMayCan();
  await yardOrder.VerifySuccessMessage();
  await yardOrder.ClickPushButton();
  await yardOrder.VerifyPushFunctionalitySuccessMessage()
  fixture.logger.info("Waiting for 3 seconds")
  await fixture.page.waitForTimeout(3000);
});

Then('TR user verifies that the labor order is pushed to the summary sheet and verifies the details', async function () {
  await yardOrder.clickOnSummarySheetMenu();
  let LatestWorkOrderDate: string;
  await yardOrder.SelectDetailsOnLandingPageSummarysheet(LatestWorkOrderDate);
  await yardOrder.VerifySummarySheetCreated();
  await yardOrder.VerifySteadyDetailsAndManningCount();
});
Then('TR user creates a timesheet for the same labor order', async function () {
  await yardOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string
  await yardOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
  await yardOrder.clickOnForemanTab();
  await yardOrder.FillHrsTab();
  await yardOrder.clickOnSaveAndSubmit();
  await yardOrder.verifySuccessMessage();
});
Then('Ops user submits and approve the timesheet', async function () {
  await yardOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string
  await yardOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
  await yardOrder.clickOnForemanTab();
  await yardOrder.SubmitandApprovetheTimehseet()

});


Then('OCU user does the Batch ready and SOTA approval', async function () {
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.selectTheBatch();
  await yardOrder.ClickOnBatchReady();
  await yardOrder.verifyBatchReadySuccessMessage();
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.calculateWeekNumber();
  await yardOrder.waitForDownloadButton();
  await yardOrder.downloadBatchFile();
  await yardOrder.verifyUploadSuccess();
  await yardOrder.selectTheBatch();
  await yardOrder.ClickOnSOTAButton();
});
Then('Accounting user does the final approval', async function () {
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.selectTheBatch();
  await yardOrder.ClickOnPMAApproved();
  await yardOrder.verifyPMASuccessMessageAfterPMAApproval();


});
