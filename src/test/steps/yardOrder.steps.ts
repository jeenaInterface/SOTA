// The step definition’s role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import yardOrderPage from "../../pages/yardOrder.page";
import * as data from "../../helper/util/test-data/payloads.json"


let yardOrder: yardOrderPage;
setDefaultTimeout(60 * 1000 * 5)

Given('Go to yard order screen', async function () {
    yardOrder = new yardOrderPage(fixture.page)
    await yardOrder.clickOnLaborOrderMenu();
  });
  When('Select work date, shift and job number and click on Go button', async function () {
    await yardOrder.SelectDetailsOnLandingPage();
  });
  When('Select start time', async function () {
    await yardOrder.SelectStartTime();
  });
  Then('Enter values in manning table', async function () {
    await yardOrder.FillManningTable();
  });
  Then('Select the steady and flex type', async function () {
    await yardOrder.SelectSteadyDetails();
  });
  Then('the user clicks on the Save-May-can button', async function () {
    await yardOrder.ClickSaveMayCan();
  });
  Then('verify whether the yard order is created successfully', async function () {
    await yardOrder.VerifySuccessMessage();
    await yardOrder.getLatestWorkOrderDate()
  });
  Then('the user clicks on the push button', async function () {
    
    await yardOrder.ClickPushButton();
    await yardOrder.VerifyPushFunctionalitySuccessMessage()   
    fixture.logger.info("Waiting for 5 seconds")
    await fixture.page.waitForTimeout(5000);

  });
Given('the user navigates to the summary sheet', async function () {
    await yardOrder.clickOnSummarySheetMenu();
  });
  Then('the user select the date and shift', async function () {
    // First, get the noTRStatusDate by calling the method that retrieves it
    let LatestWorkOrderDate: string
    // Then pass the noTRStatusDate to SelectDetailsOnLandingPageSummarysheet
    await yardOrder.SelectDetailsOnLandingPageSummarysheet(LatestWorkOrderDate);

  });
  Then('Verify yard order details pushed to the summary sheet', async function () {
    await yardOrder.VerifySummarySheetCreated();
  });
  Then('verify the manner count and steady details are reflected in summary sheet', async function () {
    await yardOrder.VerifySteadyDetailsAndManningCount();
  });


