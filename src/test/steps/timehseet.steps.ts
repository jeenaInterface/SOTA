// import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
// import { fixture } from "../../hooks/pageFixture";
// import yardOrderPage from "../../pages/yardOrder.page";
// import * as data from "../../helper/util/test-data/payloads.json"
// import timesheetPage from "../../pages/timehseet.page";

// let timehseet: timesheetPage;
// setDefaultTimeout(60 * 1000 * 5)


// Given('User creates a timesheet for the same yard order', async function () {
//     timehseet = new timesheetPage(fixture.page)
//     await timehseet.clickOnTimehseetMenu();
//     let LatestWorkOrderDate: string
//     await timehseet.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
//     await timehseet.clickOnForemanTab();
//     await timehseet.FillHrsTab();
//     await timehseet.clickOnSaveAndSubmit();
//     await timehseet.verifySuccessMessage();
// });
