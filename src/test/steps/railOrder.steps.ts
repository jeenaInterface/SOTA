// The step definition’s role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import railOrderPage from "../../pages/railOrder.page";
import vesselOrderPage from "../../pages/vesselOrder.page";



let railOrder: railOrderPage;
let vesselOrder: vesselOrderPage;
setDefaultTimeout(60 * 1000 * 1)
Given('the user creates a new Rail order', async function () {
  railOrder = new railOrderPage(fixture.page)
  vesselOrder = new vesselOrderPage(fixture.page)
  await railOrder.clickOnVesselOrderMenu();
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


