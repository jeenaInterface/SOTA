// The step definition’s role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import terminalServiceOrderPage from "../../pages/terminalServiceOrder.page";
import vesselOrderPage from "../../pages/vesselOrder.page";



let terminalServiceOrder: terminalServiceOrderPage;
let vesselOrder: vesselOrderPage;
setDefaultTimeout(60 * 1000 * 1)
Given('the user creates a new Terminal service order', async function () {
    terminalServiceOrder = new terminalServiceOrderPage(fixture.page)
    vesselOrder = new vesselOrderPage(fixture.page)
    await terminalServiceOrder.clickOnVesselOrderMenu();
    await terminalServiceOrder.SelectDetailsOnLandingPage();
    await terminalServiceOrder.FillManningTable();
    await vesselOrder.ClickSaveMayCan();
});
Then('the user discards the Terminal service order', async function () {
    await vesselOrder.ClickDiscard();
});
Then('the user firm the Terminal service order', async function () {
    await vesselOrder.ClickFirmButton();
});
Then('the user push the Terminal service order to the summary sheet', async function () {
    await vesselOrder.ClickPushButton();
});
Then('the user cancel the Terminal service order', async function () {
    await vesselOrder.ClickCancelButton();
});


