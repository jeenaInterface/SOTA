import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import yardOrderPage from "../../pages/yardOrder.page";
import * as data from "../../helper/util/test-data/payloads.json"
import timesheetPage from "../../pages/timehseet.page";

let timehseet: timesheetPage;
setDefaultTimeout(60 * 1000 * 5)


Given('the user navigates to the yard order timehseet', async function () {
    timehseet = new timesheetPage(fixture.page)
    await timehseet.clickOnTimehseetMenu();
});
Then('Select work date, shift and job number', async function () {
    await timehseet.SelectDetailsOnLandingPage();
});
Then('Enter ST and OT hrs and click on the save without submit button.', async function () {
    await timehseet.clickOnForemanTab();
    await timehseet.FillHrsTab();
    await timehseet.clickOnSaveAndSubmit();
    
});
Then('verify the timehseet is created successfully', async function () {
    await timehseet.verifySuccessMessage();
});