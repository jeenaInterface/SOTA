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
  Given('Select work date, shift and job number and click on Go button', async function () {
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
  });
  Then('the user clicks on the Firm button', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
  Then('the user clicks on the push button', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
