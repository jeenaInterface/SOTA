import { Given, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import OCCFileUploadPage from "../../pages/occFileUpload.page";
import * as data from "../../helper/util/test-data/payloads.json"

let logioccFile: OCCFileUploadPage;

Given('Go to PMA Employee-OCC File Upload', async function () {
  logioccFile = new OCCFileUploadPage(fixture.page);
  await logioccFile.clickOnPayrollMenu();
});

Then('Upload the valid OCC file and verify the success message', async function () {
  await logioccFile.clickOnOCCFileRadioButton();
    await logioccFile.UploadOCCFile();
      await logioccFile.verifyUploadSuccess();  
});


