import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';
import { fixture } from '../hooks/pageFixture';

export class LaborOrderReceiverReportPage {
    protected base: PlaywrightWrapper;
    public page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        fromDateInput: "//input[@id='fromDt']",
        toDateInput: "//input[@id='toDt']",
        searchButton: "//button[normalize-space()='SEARCH']",
        LaborOrderReceivedLogReportreportLabel: 'text= Labor Order Received Log',
        saveButton: 'button:has-text("Save")',
        ReportMenu: "//div[normalize-space()='Report']",
        reportTable: "//table[@class='table table-form']",
        firstIgnoreCheckbox: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-order-rec-log[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]/input[1]",
        firstAddRemarksButton: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-order-rec-log[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[11]/i[1]",
        successConfirmationMessageLocator: "//span[contains(text(),'Order Received Log information updated successfully')]",
        remarksInput: "//textarea[@id='addComment']",
        saveRemarksButton: "//button[normalize-space()='Add Remarks']"
    };

    async clickLaborOrderReceivedLogReport(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ReportMenu);
        await this.base.waitAndClick(this.Elements.LaborOrderReceivedLogReportreportLabel);
    }

    async selectFromDate(date: string): Promise<void> {
        await this.page.locator(this.Elements.fromDateInput).fill(date);
    }

    async selectToDate(date: string): Promise<void> {
        await this.page.locator(this.Elements.toDateInput).fill(date);
    }

    async clickSearch(): Promise<void> {
        await this.base.waitAndClick(this.Elements.searchButton);
    }



    async ignoreFunctionality(): Promise<void> {
        const checkbox = this.page.locator(this.Elements.firstIgnoreCheckbox);
        // Uncheck if already checked
        if (await checkbox.isChecked()) {
            await checkbox.click(); // Uncheck
            await this.page.waitForTimeout(500);
        }
        // Check again
        await checkbox.click();
        await this.base.waitAndClick(this.Elements.saveButton);
        await this.page.waitForTimeout(1000);
        const validationMessageForSave = await this.page.locator(this.Elements.successConfirmationMessageLocator).textContent();
        expect(validationMessageForSave).toContain("Order Received Log information updated successfully");
    }


    async addRemarksFunctionality(): Promise<void> {

        await this.base.waitAndClick(this.Elements.firstAddRemarksButton);
        await this.page.locator(this.Elements.remarksInput).fill("TEST REMARKS!");
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.saveRemarksButton);
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(1000);
        // Add more checks as needed
        const validationMessageForSave = await this.page.locator(this.Elements.successConfirmationMessageLocator).textContent();
        expect(validationMessageForSave).toContain("Order Received Log information updated successfully");
    }
}
