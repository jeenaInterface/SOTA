// The step definition’s role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import yardOrderPage from "../../pages/yardOrder.page";



let yardOrder: yardOrderPage;
setDefaultTimeout(60 * 1000 * 5)

Given('User creates a new labor order', async function () {
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

Given('User verifies that the labor order is pushed to the summary sheet and verifies the details', async function () {
  await yardOrder.clickOnSummarySheetMenu();
  let LatestWorkOrderDate: string
  await yardOrder.SelectDetailsOnLandingPageSummarysheet(LatestWorkOrderDate);
  await yardOrder.VerifySummarySheetCreated();
  await yardOrder.VerifySteadyDetailsAndManningCount();

});
Given('User creates a timesheet for the same yard order', async function () {
  await yardOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string
  await yardOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
  await yardOrder.clickOnForemanTab();
  await yardOrder.FillHrsTab();
  await yardOrder.clickOnSaveAndSubmit();
  await yardOrder.verifySuccessMessage();
});



