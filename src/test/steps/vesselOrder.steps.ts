// The step definition’s role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import vesselOrderPage from "../../pages/vesselOrder.page";
import loginPage from "../../pages/login.page";
import * as data from "../../helper/util/test-data/payloads.json"


let vesselOrder: vesselOrderPage;
setDefaultTimeout(60 * 1000 * 1)
Given('the user creates a new vessel order', async function () {
  vesselOrder = new vesselOrderPage(fixture.page)
  await vesselOrder.clickOnVesselOrderMenu();
  await vesselOrder.SelectDetailsOnLandingPage();
  await vesselOrder.EnterHeaderDetails();
  await vesselOrder.EnterGangsDetails();
  await vesselOrder.FillManningTable();
  await vesselOrder.SelectSteadyDetails();
  await vesselOrder.ClickSaveMayCan();

});
Then('the user discards the vessel order', async function () {
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
