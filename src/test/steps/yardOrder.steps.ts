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
  await YardOrder.clickOnVesselOrderMenu();
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


