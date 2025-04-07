// The step definition’s role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import terminalServiceOrderPage from "../../pages/terminalServiceOrder.page";
import vesselOrderPage from "../../pages/vesselOrder.page";



let terminalServiceOrder: terminalServiceOrderPage;
let vesselOrder: vesselOrderPage;
setDefaultTimeout(60 * 1000 * 1)
Given('the user creates a new Terminal Services Order', async function () {
    terminalServiceOrder = new terminalServiceOrderPage(fixture.page)
    vesselOrder = new vesselOrderPage(fixture.page)
    await terminalServiceOrder.clickOnTerminalServiceOrderMenu();
    await terminalServiceOrder.SelectDetailsOnLandingPage();
    await terminalServiceOrder.FillManningTable();
    await vesselOrder.ClickSaveMayCan();
});
Then('the user discards the Terminal Services Order', async function () {
    await vesselOrder.ClickDiscard();
});
Then('the user firm the Terminal Services Order', async function () {
    await vesselOrder.ClickFirmButton();
});
Then('the user push the Terminal Services Order to the summary sheet', async function () {
    await vesselOrder.ClickPushButton();
});
Then('the user cancel the Terminal Services Order', async function () {
    await vesselOrder.ClickCancelButton();
});


Given('the user creates a timesheet for the Terminal Services Order', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
When('the user saves the Terminal Services Timehseet without submitting it', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
Then('the user saves and submits the Terminal Services Timehseet', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
Then('Ops user submits and approve the Terminal Services Timehseet', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
Then('ops user reject the Terminal Services Timehseet', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
Then('verify remove approval functionality of Terminal Services Timehseet', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
Then('Labor entry add new steady details and mgr comments and submit the Terminal Services Timehseet', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
Then('Ops user submits and approve the Terminal Services Timehseet', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
Then('the user verifies the download report functionality for the Terminal Services Timehseet', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});