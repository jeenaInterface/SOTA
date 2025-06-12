import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";
import * as moment from 'moment';
import * as path from 'path';

export class SecurityPage {
    protected base: PlaywrightWrapper;
    public page: Page;
    public rollingCodeText: string;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        securityMenu: "//div[normalize-space()='Security Menu']",
        securityLaborOrderMenu: "//a[normalize-space()='Security Labor Order']",
        dateInput: "//input[@id='sWorkDate']",
        goButton: "//button[normalize-space()='GO']",
        orderDateTimeInput: "//input[@id='workDt' and @type='datetime-local']",
        plusButton: "//i[@class='bi bi-plus-square icon-color-blue']",
        deleteButton: "//i[@class='bi bi-dash-circle icon-delete']",
        yesButton: "//button[normalize-space()='Yes']",
        numberOfJobsInput: "//tbody/tr/td[1]/input[1]",
        jobTypeDropdown: "//select[@id='jobType0']",
        startTimeDropdown: "//tbody/tr/td[3]/select[1]",
        finishTimeDropdown: "//tbody/tr/td[5]/select[1]",
        remarksButton: "//i[@class='bi bi-card-list icon-lg p-0 m-0']",
        remarksTextArea: "//textarea[@id='addComment']",
        addRemarksButton: "//button[normalize-space()='Add Remarks']",
        saveButton: "//button[normalize-space()='SAVE']",
        successMessage: "//span[contains(text(),'Security Labor Order details saved successfully')]",
        submitButton: "//button[normalize-space()='SAVE AND SUBMIT']",
        downloadReportButton: "//button[contains(@title,'Download Report')]",
        downloadCompleteToast: "//div[contains(@class,'toast-success')]",
        laborOrderSuccessMessage: "//span[contains(text(),'Security Labor Order details saved successfully')]"
    };

    async downloadSecurityLaborReport(): Promise<void> {
        // Create download promise before clicking
        const downloadPromise = this.page.waitForEvent('download');

        // Click the download button
        await this.base.waitAndClick(this.Elements.downloadReportButton);

        // Wait for the download to start
        const download = await downloadPromise;

        // Wait for the download to complete and get the suggested filename
        const suggestedFilename = download.suggestedFilename();
        const downloadPath = path.join('test-results', 'downloads', suggestedFilename);

        // Save the download
        await download.saveAs(downloadPath);

        // Verify the download was successful
        await this.page.waitForSelector(this.Elements.downloadCompleteToast, { state: 'visible' });
        fixture.logger.info(`Report downloaded successfully to: ${downloadPath}`);
    }

    async verifyReportDownloaded(): Promise<void> {
        // Wait for success toast to be visible
        await this.page.waitForSelector(this.Elements.downloadCompleteToast, { state: 'visible' });
        const toastMessage = await this.page.locator(this.Elements.downloadCompleteToast).textContent();
        expect(toastMessage).toContain('downloaded successfully');
    }

    async verifySuccessMessage(): Promise<void> {
        await this.page.waitForSelector(this.Elements.laborOrderSuccessMessage, { state: 'visible' });
        const message = await this.page.locator(this.Elements.laborOrderSuccessMessage).textContent();
        expect(message).toContain('Security Labor Order details saved successfully');
    }

    async saveAndSubmitAsManagement(): Promise<void> {
        await this.base.waitAndClick(this.Elements.submitButton);
        await this.verifySuccessMessage();
    }

    async clickSecurityLaborOrder(): Promise<void> {
        await this.base.waitAndClick(this.Elements.securityMenu);
        await this.base.waitAndClick(this.Elements.securityLaborOrderMenu);
    }

    async selectDate(date: string): Promise<void> {
        await this.page.waitForTimeout(2000); // Wait for the page to be ready
        await this.page.locator(this.Elements.dateInput).fill(date);
    }

    async clickGoButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.goButton);
    }

    async enterOrderDateTime(): Promise<void> {
        const currentDateTime = moment().format('YYYY-MM-DDTHH:mm');
        await this.page.waitForTimeout(1000); // Wait for input to be ready
        await this.page.locator(this.Elements.orderDateTimeInput).fill(currentDateTime);
        fixture.logger.info(`Entered order date/time: ${currentDateTime}`);
    }

    async clickPlusButton(): Promise<void> {
        try {
            // Try to click delete button if it exists
            if (await this.page.locator(this.Elements.deleteButton).isVisible()) {
                await this.base.waitAndClick(this.Elements.deleteButton);
                await this.base.waitAndClick(this.Elements.yesButton);
            }
        } catch (error) {
            fixture.logger.info("No existing entries to delete");
        }
        await this.base.waitAndClick(this.Elements.plusButton);
    }

    async enterNumberOfJobs(number: string): Promise<void> {
        await this.page.locator(this.Elements.numberOfJobsInput).fill(number);
    }

    async selectJobType(jobType: string): Promise<void> {
        await this.page.locator(this.Elements.jobTypeDropdown).selectOption({ label: jobType });

    }

    async selectStartTime(time: string): Promise<void> {
        await this.page.locator(this.Elements.startTimeDropdown).selectOption(time);
    }
    async selectFinishTime(time: string): Promise<void> {
        await this.page.locator(this.Elements.finishTimeDropdown).selectOption(time);
    }

    async clickRemarksButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.remarksButton);
    }

    async enterRemarks(remarks: string): Promise<void> {
        await this.page.locator(this.Elements.remarksTextArea).fill(remarks);
    }

    async clickAddRemarksButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.addRemarksButton);
    }

    async clickSaveButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveButton);
    }


}