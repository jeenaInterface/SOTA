import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';

export class DispatchNoteReportPage {
    protected base: PlaywrightWrapper;
    public page: Page;

    private Elements = {
        ReportMenu: "//div[normalize-space()='Report']",
        DispatchNoteReportLabel: "//a[normalize-space()='Dispatch Notes']",
        addDispatchNoteButton: "//button[normalize-space()='ADD DISPATCH NOTES']",
        updateDispatchNoteButton: "//button[normalize-space()='UPDATE DISPATCH NOTE']",
        downloadDispatchNoteButton: "//button[normalize-space()='DISPATCH NOTE REPORT']",
        descriptionInput: "//textarea[@id='descriptionError']",
        saveButton: "//button[normalize-space()='ADD']",
        successMessage: "//span[contains(text(),'Dispatch Note information saved successfully')]",
        OperationType: "//select[@id='opsType']",
        FromDate: "//input[@id='fromDt']",
        ToDate: "//input[@id='toDt']",
        shift: "//select[@id='shift']",
        JobCode: "//select[@id='jobCode']",
        detailsTextBox: "//textarea[@id='laborOrder']",
        DescriptionOfResolution: "//textarea[@id='omResponse']",
        MGMTConsulted: "//input[@class='ng-pristine ng-valid ng-touched']",
        MGMTConsultedDate: "//div[@class='row']//div[2]//input[1]",
        MGMTFinalDecision: "//div[@class='row']//div[3]//input[1]",

        FinalMGMTConsultedDate: "//div[@class='row']//div[4]//input[1]",
        DispatchNotesComplete: "//input[@value='1']"
    };

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ReportMenu);
        await this.base.waitAndClick(this.Elements.DispatchNoteReportLabel);
    }

    async addDispatchNote(): Promise<void> {
        await this.page.locator(this.Elements.OperationType).selectOption({ label: 'Yard' });
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formatted = `${yyyy}-${mm}-${dd}`;
        await this.page.locator(this.Elements.FromDate).fill(formatted);
        await this.page.locator(this.Elements.ToDate).fill(formatted);
        await this.page.locator(this.Elements.shift).selectOption({ label: '1ST' });
        await this.page.locator(this.Elements.JobCode).selectOption({ label: 'Yard Ops - 690101' });
        await this.base.waitAndClick(this.Elements.addDispatchNoteButton);
        const randomText = 'Note_' + Math.random().toString(36).substring(2, 10);
        await this.page.locator(this.Elements.descriptionInput).fill(randomText);
        await this.base.waitAndClick(this.Elements.saveButton);
        const message = await this.page.locator(this.Elements.successMessage).textContent();
        expect(message).toContain('Dispatch Note information saved successfully');
    }

    async updateDispatchNote(): Promise<void> {
        await this.base.waitAndClick(this.Elements.updateDispatchNoteButton);
        const randomText = 'Updated_' + Math.random().toString(36).substring(2, 10);
        await this.page.locator(this.Elements.descriptionInput).fill(randomText);
        await this.base.waitAndClick(this.Elements.saveButton);
        const message = await this.page.locator(this.Elements.successMessage).textContent();
        expect(message).toContain('Dispatch Note information saved successfully');
    }

    async downloadDispatchNote(): Promise<boolean> {
        await this.base.waitAndClick(this.Elements.downloadDispatchNoteButton);
        // Add logic to verify file download if needed
        return true;
    }
}
