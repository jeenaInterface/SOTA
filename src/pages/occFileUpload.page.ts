import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";
import * as path from 'path';

setDefaultTimeout(100 * 1000);

export default class OCCFileUploadPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        payrollLink: "(//a[@id='navbarDropdown'])[3]",
        OCCFileUpload: "//a[normalize-space(text())='PMA Employee/OCC File Upload']",
        PMAOCCCodeFile: "(//input[@name='flexRadioDefault'])[2]",
        fileUpload: "//input[@type='file']",
        uploadButton: "//button[normalize-space(text())='Upload']",
        refreashButton: "//button[normalize-space(text())='Refresh']"
    };



    async clickOnPayrollMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.payrollLink);
        await this.base.waitAndClick(this.Elements.OCCFileUpload);

    }
    async clickOnOCCFileRadioButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.PMAOCCCodeFile);

    }

    async UploadOCCFile(): Promise<void> {


        const path = require('path');

        // Resolve the full path to the file
        const downloadPath = path.resolve(__dirname, 'OCCFile');
        const filePath = path.join(downloadPath, 'occrates.txt');

        // Locate the file input and upload the file
        const fileInput = await this.page.locator('input[type="file"]');
        await fileInput.setInputFiles(filePath);

        // Wait for the upload button to be clickable and then click it
        await this.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.uploadButton).click();
        await this.page.waitForTimeout(3000);

    }
    async verifyUploadSuccess(): Promise<void> {
        const successMessageXPath = `//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[4]`;
        let successMessage = '';

        while (successMessage !== 'Processed Successfully') {
            await this.base.waitAndClick(this.Elements.refreashButton);
            await fixture.page.waitForTimeout(3000);

            const locator = this.page.locator(successMessageXPath);
            if (await locator.isVisible()) {
                successMessage = (await locator.textContent())?.trim() || '';
            }

            // Optional: add a timeout or max retry logic to avoid infinite loop
        }

        expect(successMessage).toContain("Processed Successfully");
        await fixture.page.waitForTimeout(2000);
    }
}