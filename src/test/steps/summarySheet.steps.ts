import { Given, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import summarySheet from "../../pages/summarySheet.page";
import * as data from "../../helper/util/test-data/payloads.json"
import vesselOrderPage from "../../pages/vesselOrder.page";
import yardOrderPage from "../../pages/yardOrderPOC.page";


let vesselOrder: vesselOrderPage;
let summarySheetPage: summarySheet;



  Then('update manning details, calo status and NF and Cut time in summary sheet and verify the details', async function () {
    summarySheetPage = new summarySheet(fixture.page)
    await summarySheetPage.VerifySummarySheetCreated();
    await summarySheetPage.updateSummarySheetDetails();
    await summarySheetPage.clickOnSave();
});

  Then('download labor order difference report', async function () {

  });
  Then('verify hall labor report', async function () {

  });
  Then('download summary sheet report', async function () {

  });