import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";
import * as moment from 'moment';
import * as fs from 'fs';
import * as path from 'path';

export class SecurityPage {
    protected base: PlaywrightWrapper;
    public page: Page;
    public rollingCodeText: string;
    public formattedDate: string;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        securityMenu: "//div[normalize-space()='Security Menu']",
        homeicon: "//div[@ng-reflect-router-link='/home']//a[1]",
        securityLaborOrderMenu: "//a[normalize-space()='Security Labor Order']",
        dateInput: "//input[@id='sWorkDate']",
        goButton: "//button[normalize-space()='GO']",
        orderDateTimeInput: "//input[@id='workDt' and @type='datetime-local']",
        plusButton: "//i[@class='bi bi-plus-square icon-color-blue']",
        deleteButton: "//i[@class='bi bi-dash-circle icon-delete']",
        yesButton: "//button[normalize-space()='Yes']",
        numberOfJobsInput: "//tbody/tr/td[1]/input[1]",
        jobTypeDropdown: (rowIndex: number) => `//select[@id='jobType${rowIndex}']`,
        startTimeDropdown: "//tbody/tr/td[3]/select[1]",
        finishTimeDropdown: "//tbody/tr/td[5]/select[1]",
        remarksTextArea: (rowIndex: number) => `//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-labor-order-sse[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[${rowIndex + 1}]/td[7]/input[1]`,
        saveButton: "//button[normalize-space()='SAVE']",
        successMessage: "//span[contains(text(),'Security Labor Order details saved successfully')]",
        submitButton: "//button[normalize-space()='SAVE AND SUBMIT']",
        downloadReportButton: "//button[normalize-space()='DOWNLOAD REPORT']",
        laborOrderSuccessMessage: "//span[contains(text(),'Security Labor Order details saved successfully')]",
        orderStatus: "//div[6]//input[1]",
        jobOrderBy: "//div[3]//input[1]",
        cancelButton:"//button[normalize-space()='CANCEL ORDER']",
        yesButtonOnCancel: "//button[normalize-space()='Yes']",
        orderCancelledMessage: "//span[contains(text(),'Order information has been cancelled successfully')]",
        deleteSecondRow: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-labor-order-sse[1]/div[1]/div[1]/div[2]/table[1]/tbody[1]/tr[2]/td[8]/i[1]",
        duplicateEntryMessage: "//span[contains(text(),'Cannot add a duplicate record for the same Job Type, Start Time and Finish Time')]",
        mandatoryFieldsMessage: "//span[contains(text(),'Date/Time Of Order information is mandatory')]"
    };
    async downloadSecurityLaborReport(): Promise<string> {
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.downloadReportButton).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'Labor_Order_Security_Report.pdf');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        return downloadPathWithFileName;
    }

    clearDownloadFolder(downloadPath: string): void {
        fs.readdir(downloadPath, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(downloadPath, file), err => {
                    if (err) throw err;
                });
            }
        });
    }


    async verifySuccessMessage(): Promise<void> {
        await this.page.waitForSelector(this.Elements.laborOrderSuccessMessage, { state: 'visible' });
        const message = await this.page.locator(this.Elements.laborOrderSuccessMessage).textContent();
        expect(message).toContain('Security Labor Order details saved successfully');
    }

    async clickSecurityLaborOrder(): Promise<void> {
        await this.base.waitAndClick(this.Elements.securityMenu);
        await this.base.waitAndClick(this.Elements.securityLaborOrderMenu);
    }


    async enterOrderDateTime(): Promise<void> {
        const currentDateTime = moment().format('YYYY-MM-DDTHH:mm');
        await this.page.waitForTimeout(1000); // Wait for input to be ready
        await this.page.locator(this.Elements.orderDateTimeInput).fill(currentDateTime);
        fixture.logger.info(`Entered order date/time: ${currentDateTime}`);
        await this.page.locator(this.Elements.jobOrderBy).fill("Test User");

    }

    async clickPlusButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.plusButton);
    }

    async enterNumberOfJobs(number: string, rowIndex: number): Promise<void> {
        await this.page.locator(this.Elements.numberOfJobsInput).nth(rowIndex).fill(number);
    }

    async selectJobType(jobType: string, rowIndex: number): Promise<void> {
        await this.page.locator(this.Elements.jobTypeDropdown(rowIndex)).selectOption({ label: jobType });
    }

    async selectStartTime(time: string, rowIndex: number): Promise<void> {
        await this.page.locator(this.Elements.startTimeDropdown).nth(rowIndex).selectOption(time);
    }

    async selectFinishTime(time: string, rowIndex: number): Promise<void> {
        await this.page.locator(this.Elements.finishTimeDropdown).nth(rowIndex).selectOption(time);
    }

    async enterRemarks(remarks: string, rowIndex: number): Promise<void> {
        await this.page.locator(this.Elements.remarksTextArea(rowIndex)).fill(remarks);
    }

    async clickSaveButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveButton);
        fixture.logger.info("Waiting for 3 seconds");
        await fixture.page.waitForTimeout(3000);

    }
    async deleteSecondRow(): Promise<void> {
        // Click the delete icon for the second row
        await this.base.waitAndClick(this.Elements.deleteSecondRow);
        await this.base.waitAndClick(this.Elements.yesButtonOnCancel);
        await this.base.waitAndClick(this.Elements.saveButton);
    }
    async clickCancelButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.cancelButton);
        await this.base.waitAndClick(this.Elements.yesButtonOnCancel);
        await this.page.waitForSelector(this.Elements.orderCancelledMessage, { state: 'visible' });
        const message = await this.page.locator(this.Elements.orderCancelledMessage).textContent();
        expect(message).toContain('Order information has been cancelled successfully');
    }

    async verifyMandatoryFieldsMessage(): Promise<void> {
        await this.page.waitForSelector(this.Elements.mandatoryFieldsMessage, { state: 'visible' });
        const message = await this.page.locator(this.Elements.mandatoryFieldsMessage).textContent();
        expect(message).toContain('Date/Time Of Order information is mandatory');
    }

    async verifyDuplicateEntryMessage(): Promise<void> {
        await this.page.waitForSelector(this.Elements.duplicateEntryMessage, { state: 'visible' });
        const message = await this.page.locator(this.Elements.duplicateEntryMessage).textContent();
        expect(message).toContain('Cannot add a duplicate record for the same Job Type, Start Time and Finish Time');
    }

    async selectAvailableSecurityOrderDate(): Promise<string> {
        let currentDate = new Date();
        let formattedDate: string;
        const maxAttempts = 10;

        // Start from current date minus 5 days
        currentDate.setDate(currentDate.getDate() - 5);

        for (let attempts = 0; attempts < maxAttempts; attempts++) {
            formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
            this.formattedDate = formattedDate;
            await this.page.locator(this.Elements.dateInput).fill(formattedDate);
            await this.base.waitAndClick(this.Elements.goButton);

            fixture.logger.info("Waiting for 1 seconds");
            await this.page.waitForTimeout(1000);

            // Check if orderStatus element is attached
            const orderStatusLocator = this.page.locator(this.Elements.orderStatus);
            const isAttached = await orderStatusLocator.waitFor({ state: 'attached', timeout: 3000 })
                .then(() => true)
                .catch(() => false);

            let orderStatusText = '';
            if (isAttached) {
                orderStatusText = await orderStatusLocator.inputValue();
                fixture.logger.info(`Order status field is attached. Value: '${orderStatusText}'`);
            } else {
                fixture.logger.info("Order status element is not attached to DOM.");
            }

            if (orderStatusText && orderStatusText.trim() !== '') {
                fixture.logger.info(`Order already exists for ${formattedDate} (status: '${orderStatusText}'), moving to next date.`);
                // Common logic: increment date by 1 day for next attempt
                currentDate.setDate(currentDate.getDate() + 1);
                // Re-navigate to security labor order form
                await this.page.locator(this.Elements.homeicon).click();
                await this.base.waitAndClick(this.Elements.securityMenu);
                await this.base.waitAndClick(this.Elements.securityLaborOrderMenu);
            } else {
                fixture.logger.info(`Order can be created for date: ${formattedDate}`);
                this.formattedDate = formattedDate;
                return formattedDate; // stop loop on success
            }
        }
        throw new Error("Unable to create order — all attempted dates already have an entry.");
    }


}