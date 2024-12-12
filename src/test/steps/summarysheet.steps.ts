// import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
// import { fixture } from "../../hooks/pageFixture";
// import summarySheetPage from "../../pages/summarysheet.page";


// let summarysheet: summarySheetPage;
// setDefaultTimeout(60 * 1000 * 5)

// Given('the user navigates to the summary sheet', async function () {
//     summarysheet = new summarySheetPage(fixture.page)
//     await summarysheet.clickOnSummarySheetMenu();
//   });
//   Then('the user select the data and shift', async function () {
//     await summarysheet.SelectDetailsOnLandingPage();
//   });
//   Then('Verify yard order details pushed to the summary sheet', async function () {
//     await summarysheet.VerifySummarySheetCreated();
//   });
//   Then('verify the manner count and steady details are reflected in summary sheet', async function () {
//     await summarysheet.VerifySteadyDetailsAndManningCount();
//   });