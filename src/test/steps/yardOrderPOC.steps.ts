// The step definition's role is to link the page and feature files. 
// It contains the test steps where the methods from the page module are invoked to execute the functionalities. 
import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import yardOrderPage from "../../pages/yardOrderPOC.page";
import loginPage from "../../pages/login.page";
import * as fs from 'fs';


let yardOrder: yardOrderPage;
let login: loginPage;

setDefaultTimeout(60 * 1000 * 5)

Given('TR user creates a new labor order', async function () {
  yardOrder = new yardOrderPage(fixture.page)
  await yardOrder.clickOnLaborOrderMenu();
  await yardOrder.SelectDetailsOnLandingPage();
  await yardOrder.SelectStartTime();
  await yardOrder.FillManningTable();
  await yardOrder.SelectSteadyDetails();
  await yardOrder.ClickSaveMayCan();
  await yardOrder.VerifySuccessMessage();
  await yardOrder.ClickPushButton();
  await yardOrder.VerifyPushFunctionalitySuccessMessage()
  fixture.logger.info("Waiting for 3 seconds")
  await fixture.page.waitForTimeout(3000);
});

Then('TR user verifies that the labor order is pushed to the summary sheet and verifies the details', async function () {
  await yardOrder.clickOnSummarySheetMenu();
  let LatestWorkOrderDate: string;
  await yardOrder.SelectDetailsOnLandingPageSummarysheet(LatestWorkOrderDate);
  await yardOrder.VerifySummarySheetCreated();
  await yardOrder.VerifySteadyDetailsAndManningCount();
});
Then('TR user creates a timesheet for the same labor order', async function () {
  await yardOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string
  await yardOrder.SelectDetailsOnLandingPageTimehseetTRUSER(LatestWorkOrderDate);
  await yardOrder.clickOnForemanTab();
  await yardOrder.FillHrsTab();
  await yardOrder.clickOnSaveAndSubmit();
  await yardOrder.verifySuccessMessage();
});
Then('Ops user submits and approve the timesheet', async function () {
  await yardOrder.clickOnTimehseetMenu();
  let LatestWorkOrderDate: string
  await yardOrder.SelectDetailsOnLandingPageTimehseet(LatestWorkOrderDate);
  await yardOrder.clickOnForemanTab();
  await yardOrder.SubmitandApprovetheTimehseet()

});


Then('OCU user does the Batch ready and SOTA approval', async function () {
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.selectPayrollWeek();
  await yardOrder.selectTheBatch();
  await yardOrder.ClickOnBatchReady();
  await yardOrder.verifyBatchReadySuccessMessage();
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.selectPayrollWeek();
  await yardOrder.calculateWeekNumber();
  await yardOrder.waitForDownloadButton();
  await yardOrder.downloadBatchFile();
  await yardOrder.verifyUploadSuccess();
  await yardOrder.selectTheBatch();
  await yardOrder.ClickOnSOTAButton();
});

Then('OCU user does the Batch ready, batch Unready, SOTA Approval and verify difference report', async function () {
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.selectPayrollWeek();
  await yardOrder.selectTheBatch();
  await yardOrder.ClickOnBatchReady();
  await yardOrder.verifyBatchReadySuccessMessage();
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.selectPayrollWeek();
  await yardOrder.calculateWeekNumber();
  await yardOrder.waitForDownloadButton();
  await yardOrder.downloadBatchFile();
  await yardOrder.verifyUploadSuccess();
  await yardOrder.waitForDifferenceButton();
  await yardOrder.selectTheBatch();
  await yardOrder.batchUnready();
  await yardOrder.ClickOnBatchReady();
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.selectPayrollWeek();
  await yardOrder.calculateWeekNumber();
  await yardOrder.waitForDownloadButton();
  await yardOrder.downloadBatchFile();
  await yardOrder.selectTheBatch();
  await yardOrder.ClickOnSOTAButton();
  await yardOrder.verifySOTASuccessMessage();
});

Then('Accounting user does the final approval', async function () {
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.selectPayrollWeek();
  await yardOrder.selectTheBatch();
  await yardOrder.ClickOnPMAApproved();
  await yardOrder.verifyPMASuccessMessageAfterPMAApproval();

});

Then('Accouting user does PMA un approval and SOTA Un approval', async function () {
  await yardOrder.PMAProcess();

});

Then('user open payroll managemnt dashboard', async function () {
  await yardOrder.clickPayrollManagementDashnoard();

});
Then('Click on batch number', async function () {
  await yardOrder.selectPayrollWeek();
  await yardOrder.selectTheBatch();

});
Then('Click on shift', async function () {
  await yardOrder.clickOnBatchInBatchLevel();

});
Then('verify the link in child tab payroll-timesheet screen', async function () {
  await yardOrder.ganglink();

});


Then('Verify Save Info functionality', async function () {
  await yardOrder.saveInfo();

});
Then('Verify View timehseet functionality', async function () {
  await yardOrder.viewTimehseet();

});

Then('Verify back button functionality', async function () {
  await yardOrder.backButton();

});
Then('Verify timehseet report', async function () {
  const filePath = await yardOrder.timeSheetReport();
  if (filePath && fs.existsSync(filePath) && this.attach) {
    const fileBuffer = fs.readFileSync(filePath);
    await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

});
Then('Verify steady list report', async function () {
  const filePath = await yardOrder.steadyListReport();
  if (filePath && fs.existsSync(filePath) && this.attach) {
    const fileBuffer = fs.readFileSync(filePath);
    await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

});
Then('verify steady recap report', async function () {
  const filePath = await yardOrder.timeSheetReviewRecap();
  if (filePath && fs.existsSync(filePath) && this.attach) {
    const fileBuffer = fs.readFileSync(filePath);
    await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

});

Then('verify OCU log history', async function () {
  await yardOrder.OCULogHistory();
});


Then('verify download batch report', async function () {
  const filePath = await yardOrder.downLoadBatchReport();
  if (filePath && fs.existsSync(filePath) && this.attach) {
    const fileBuffer = fs.readFileSync(filePath);
    await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

});

Then('OCU user does the Batch ready', async function () {
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.selectPayrollWeek();
  await yardOrder.selectTheBatch();
  await yardOrder.ClickOnBatchReady();
  await yardOrder.verifyBatchReadySuccessMessage();
  await yardOrder.clickOnPayrollMenu();
  await yardOrder.selectPayrollWeek();
  await yardOrder.calculateWeekNumber();
  await yardOrder.waitForDownloadButton();
  await yardOrder.downloadBatchFile();
  await yardOrder.verifyUploadSuccess();
  await yardOrder.selectTheBatch();
});
Then('Add remarks by OCU user', async function () {
  await yardOrder.saveOCURemarksInfo();
});

Then('verify Notify manager functionality', async function () {
  await yardOrder.notifyManager();
});
