import { Given, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import summarySheet from "../../pages/summarySheet.page";
import * as data from "../../helper/util/test-data/payloads.json"
import vesselOrderPage from "../../pages/vesselOrder.page";
import * as fs from 'fs';


let vesselOrder: vesselOrderPage;
let summarySheetPage: summarySheet;



Then('update manning details, calo status and NF and Cut time in summary sheet and verify the details', async function () {
  summarySheetPage = new summarySheet(fixture.page)
  vesselOrder = new vesselOrderPage(fixture.page)
  await summarySheetPage.VerifySummarySheetCreated();
  await summarySheetPage.updateSummarySheetDetails();
  await summarySheetPage.clickOnSave();
});

Then('Verify download summary sheet report', async function () {

  const filePath = await summarySheetPage.downloadsummaryreport();
  if (filePath && fs.existsSync(filePath) && this.attach) {
    const fileBuffer = fs.readFileSync(filePath);
    await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }
});

Then('Verify download duplicate report', async function () {

  const filePath = await summarySheetPage.downloadDuplicateReport();
  if (filePath && fs.existsSync(filePath) && this.attach) {
    const fileBuffer = fs.readFileSync(filePath);
    await this.attach(fileBuffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

});

Then('Verify transfer to tracking sheet', async function () {
    await summarySheetPage.transferToTrackingSheet();

});

Then('Verify place new orders button is redirecting to new order form', async function () {
    await summarySheetPage.placeNewOrders();

});
