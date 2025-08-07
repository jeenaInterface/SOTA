import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";

export class SecuritySchedulePage {
    protected base: PlaywrightWrapper;
    public page: Page;
    public formattedDate: string;
    public rollingCodeText: string;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        securityMenu: "//div[normalize-space()='Security Menu']",
        laborOrder: "//a[normalize-space()='Security Labor Order']",
        scheduleMenu: "//a[normalize-space()='Daily Security Schedule']",
        homeicon: "//div[@ng-reflect-router-link='/home']//a[1]",
        dateInput: "//input[@id='sWorkDt']",
        dateInTimesheet: "//input[@id='sWorkDate']",
        shiftDropdown: "//select[@id='shift']",
        goButton: "//button[normalize-space()='GO']",
        staffingList: "//select[@id='opsId']",
        steadyNameInput: "//input[@id='steadyName']",
        radioInput: "//input[@id='radio']",
        vehicleInput: "//input[@id='vehicle']",
        notesInput: "//textarea[@id='floatingTextarea2']",
        sergeantNameInput: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse-daily[1]/div[1]/div[1]/div[3]/div[2]/input[1]",
        saveButton: "//button[normalize-space()='SAVE']",
        successMessage: "//span[contains(text(),'Daily Security Information has been saved successfully')]",
        deleteRowButton: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse-daily[1]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[12]/i[1]",
        viewDifferentScheduleButton: "//button[normalize-space()='VIEW DIFFERENT SCHEDULE']",
        RollingCodeButton: "//button[normalize-space()='View']",
        RollingCode: "//h5[@id='rollinglabel']",
        RollingCodeTextBox: "//input[@id='rollingCode']",
        RollingCodeCloseButton: "//div[@id='rollingCode']//button[@class='btn button-action'][normalize-space()='Close']",
        timesheetMenu: "//a[normalize-space()='Security Timesheet']",
        stHrInput: "//input[@id='stHr']",
        otHrInput: "//input[@id='otHr']",
        timesheetSaveButton: "//button[normalize-space()='Save Timesheet']",
        timesheetSuccessMessage: "//span[contains(text(),'Timesheet saved successfully')]",
        timesheetSubmitButton: "//button[normalize-space()='SAVE AND SUBMIT']",
        lastUpdatedBy: "//div[@class='row']//div[3]//input[1]",
        steady1: "//input[@id='longshore0']",
        steady2: "//input[@id='longshore1']",
        steady3: "//input[@id='longshore2']",
        radio1: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse-daily[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[9]/select[1]",
        radio2: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse-daily[1]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[9]/select[1]",
        radio3: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse-daily[1]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[9]/select[1]",
        vehicle1: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse-daily[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]/select[1]",
        vehicle2: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse-daily[1]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[10]/select[1]",
        vehicle3: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse-daily[1]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[10]/select[1]",
        RegisterNo1: "//tbody/tr[1]/td[5]/input[1]",
        RegisterNo2: "//tbody/tr[2]/td[5]/input[1]",
        RegisterNo3: "//tbody/tr[3]/td[5]/input[1]",
        yesButton: "//button[normalize-space()='Yes']",
        GoButton: "//button[normalize-space()='Go']",
        GoButtonTimeSheet: "//button[normalize-space()='GO']",
        saveAndSubmitButton: "//button[normalize-space()='SAVE AND SUBMIT']",
        firstCell1: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[8]/input[1]",
        secondCell1: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[9]/input[1]",
        thirdCell1: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[10]/input[1]",
        fourthCell1: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[11]/input[1]",
        firstcell2: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[8]/input[1]",
        secondcell2: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[9]/input[1]",
        thirdcell2: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[10]/input[1]",
        fourthcell2: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[11]/input[1]",
        firstcell3: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[8]/input[1]",
        secondcell3: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[9]/input[1]",
        thirdcell3: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[10]/input[1]",
        fourthcell3: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[1]/table[1]/tbody[1]/tr[3]/td[11]/input[1]",
        firstcell4: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[8]/input[1]",
        secondcell4: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[9]/input[1]",
        thirdcell4: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[10]/input[1]",
        fourthcell4: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[11]/input[1]",
        firstcell5: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[2]/td[8]/input[1]",
        secondcell5: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[2]/td[9]/input[1]",
        thirdcell5: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[2]/td[10]/input[1]",
        fourthcell5: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[2]/td[11]/input[1]",
        firstcell6: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[3]/td[8]/input[1]",
        secondcell6: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[3]/td[9]/input[1]",
        thirdcell6: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[3]/td[10]/input[1]",
        fourthcell6: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[3]/td[11]/input[1]",
        firstcell7: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[8]/input[1]",
        secondcell7: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[9]/input[1]",
        thirdcell7: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[10]/input[1]",
        fourthcell7: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[11]/input[1]",
        firstcell8: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[2]/td[8]/input[1]",
        secondcell8: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[2]/td[9]/input[1]",
        thirdcell8: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[2]/td[10]/input[1]",
        fourthcell8: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[2]/td[11]/input[1]",
        firstcell9: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[3]/td[8]/input[1]",
        secondcell9: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[3]/td[9]/input[1]",
        thirdcell9: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[3]/td[10]/input[1]",
        fourthcell9: "//body[1]/app-root[1]/app-home[1]/div[1]/div[1]/section[1]/div[1]/app-timesheet-sse[1]/div[1]/div[1]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[3]/td[11]/input[1]",
        sergeantNameInTimesheet: "//input[@id='sergeantName']",
        removeApproval: "//button[normalize-space()='REMOVE APPROVAL']",
        approveButton: "//button[normalize-space()='APPROVE']",
        rejectButton: "//button[normalize-space()='REJECT']",
        saveWithoutSubmitButton: "//button[normalize-space()='SAVE WITHOUT SUBMITTING']",

        pageTitle: "//span[@class='page-title p-1']",
        errorMessage: "//div[@class='col-lg-4 p-0 alert-notification mt-2']//div[1]//div[1]//span[1]"
    };

    async navigateToSchedule() {
        await this.base.waitAndClick(this.Elements.securityMenu);
        await this.base.waitAndClick(this.Elements.scheduleMenu);
    }

    async selectDateShift(shift: string) {
        // await this.page.locator(this.Elements.dateInput).fill(date);
        await this.page.locator(this.Elements.shiftDropdown).selectOption({ label: shift });
        await this.page.getByRole('button', { name: 'GO' }).click();
        // Wait for staffing table to reload for the selected shift
        await this.page.waitForTimeout(1000); // short delay for table reload
        await this.page.locator(this.Elements.staffingList).first().waitFor({ state: 'visible', timeout: 5000 });
    }
    async selectAvailableSecurityOrderDate(shift: string): Promise<string> {
        let currentDate = new Date();
        let formattedDate: string;
        const maxAttempts = 10;

        // Start from current date minus 50 days
        currentDate.setDate(currentDate.getDate() - 50);

        for (let attempts = 0; attempts < maxAttempts; attempts++) {
            formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
            this.formattedDate = formattedDate;
            await this.page.locator(this.Elements.dateInput).fill(formattedDate);
            await this.page.locator(this.Elements.shiftDropdown).selectOption({ label: shift });
            await this.base.waitAndClick(this.Elements.goButton);

            fixture.logger.info("Waiting for 1 seconds");
            await this.page.waitForTimeout(1000);

            // Check if lastUpdatedBy element is attached
            const lastUpdatedByLocator = this.page.locator(this.Elements.lastUpdatedBy);
            const isAttached = await lastUpdatedByLocator.waitFor({ state: 'attached', timeout: 3000 })
                .then(() => true)
                .catch(() => false);

            let lastUpdatedByText = '';
            if (isAttached) {
                lastUpdatedByText = await lastUpdatedByLocator.inputValue();
                fixture.logger.info(`Last updated by field is attached. Value: '${lastUpdatedByText}'`);
            } else {
                fixture.logger.info("Last updated by element is not attached to DOM.");
            }

            if (lastUpdatedByText && lastUpdatedByText.trim() !== '') {
                fixture.logger.info(`Order already exists for ${formattedDate} (last updated by: '${lastUpdatedByText}'), moving to next date.`);
                // Common logic: increment date by 1 day for next attempt
                currentDate.setDate(currentDate.getDate() + 1);
                // Re-navigate to security labor order form
                await this.page.locator(this.Elements.homeicon).click();
                await this.base.waitAndClick(this.Elements.securityMenu);
                await this.base.waitAndClick(this.Elements.scheduleMenu);
            } else {
                fixture.logger.info(`Order can be created for date: ${formattedDate}`);
                this.formattedDate = formattedDate;
                return formattedDate; // stop loop on success
            }
        }
        throw new Error("Unable to create order — all attempted dates already have an entry.");
    }

    async selectStaffingAndFillDetails() {
        fixture.logger.info("Waiting for 1 seconds");
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.staffingList).selectOption({ index: 1 });
        fixture.logger.info("Waiting for 1 seconds");
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.steady1).click();
        await this.page.locator(this.Elements.steady1).fill("3961305");
        await this.page.locator(this.Elements.steady1).press('Enter');
        await this.page.locator(this.Elements.steady1).fill("Acosta, Johnnie A");
        await this.page.locator(this.Elements.RegisterNo1).fill("3961305");
        await this.page.locator(this.Elements.steady2).click();
        await this.page.locator(this.Elements.steady2).fill("7911254");
        await this.page.locator(this.Elements.steady2).press('Enter');
        await this.page.locator(this.Elements.steady2).fill("Ponce de Leon, Andres");
        await this.page.locator(this.Elements.RegisterNo2).fill("7911254");
        await this.page.locator(this.Elements.steady3).click();
        await this.page.locator(this.Elements.steady3).fill("6337955");
        await this.page.locator(this.Elements.steady3).press('Enter');
        await this.page.locator(this.Elements.steady3).fill("Ponce, Eugene");
        await this.page.locator(this.Elements.RegisterNo3).fill("6337955");
        await this.page.locator(this.Elements.radio1).selectOption({ index: 1 });
        await this.page.locator(this.Elements.radio2).selectOption({ index: 2 });
        await this.page.locator(this.Elements.radio3).selectOption({ index: 3 });
        await this.page.locator(this.Elements.vehicle1).selectOption({ index: 1 });
        await this.page.locator(this.Elements.vehicle2).selectOption({ index: 2 });
        await this.page.locator(this.Elements.vehicle3).selectOption({ index: 3 });
    }

    async enterNotesAndSergeant(notes: string, sergeant: string) {
        await this.page.locator(this.Elements.notesInput).fill(notes);
        await this.page.locator(this.Elements.sergeantNameInput).fill(sergeant);
    }

    async clickSaveButton() {
        await this.base.waitAndClick(this.Elements.saveButton);
        fixture.logger.info("Waiting for 5 seconds");
        await this.page.waitForTimeout(5000);
    }

    async selectStaffingForOperations() {
        await this.page.locator(this.Elements.staffingList).selectOption({ index: 1 });
        fixture.logger.info("Waiting for 1 seconds");
        await this.page.waitForTimeout(1000);
    }

    async verifySuccessMessage() {
        await this.page.waitForSelector(this.Elements.successMessage, { state: 'visible' });
        const message = await this.page.locator(this.Elements.successMessage).textContent();
        expect(message).toContain('Daily Security Information has been saved successfully');
    }

    async verifyMandatoryFieldValidations() {

        await this.page.waitForSelector(this.Elements.errorMessage, { state: 'visible' });
        const message = await this.page.locator(this.Elements.errorMessage).textContent();

        expect(
            message === 'Please enter Sergeant Name' ||
            message === 'Please enter the Watchman Information for row no: 1'
        ).toBe(true);

    }

    async deleteRow() {
        await this.base.waitAndClick(this.Elements.deleteRowButton);
        await this.page.waitForSelector(this.Elements.yesButton, { state: 'visible' });
        await this.base.waitAndClick(this.Elements.yesButton);
    }

    async clickViewDifferentSchedule() {
        await this.base.waitAndClick(this.Elements.viewDifferentScheduleButton);
    }

    async storeRollingCode(): Promise<string> {
        let attempts = 0;
        const maxAttempts = 10; // Increase attempts for reliability

        while (attempts < maxAttempts) {
            // Open the rolling code dialog
            await this.base.waitAndClick(this.Elements.RollingCodeButton);

            // Wait for the rolling code value to be visible
            const rollingCodeElement = this.page.locator(this.Elements.RollingCode);
            let rollingCode = '';
            try {
                await rollingCodeElement.waitFor({ state: 'visible', timeout: 2000 });
                const value = await rollingCodeElement.textContent();
                // Only accept if value is a valid integer (not default message)
                if (value && /^\d+$/.test(value.trim())) {
                    rollingCode = value.trim();
                }
            } catch (e) {
                rollingCode = '';
            }

            // Close the popup
            await this.base.waitAndClick(this.Elements.RollingCodeCloseButton);

            if (rollingCode !== '') {
                this.rollingCodeText = rollingCode;
                return rollingCode;
            }

            fixture.logger.info("Rolling code not found or not generated, reopening the popup.");
            attempts++;
            await this.page.waitForTimeout(1000);
        }
        throw new Error('Rolling code was not generated after multiple attempts.');
    }
    async pasteRollingCode(RollingCode: string): Promise<void> {
        await this.page.locator(this.Elements.RollingCodeTextBox).fill(this.rollingCodeText);
        await this.base.waitAndClick(this.Elements.GoButton);

    }

    async navigateToTimesheet() {
        fixture.logger.info("Waiting for 3 seconds");
        await this.page.waitForTimeout(3000);
        await this.base.waitAndClick(this.Elements.securityMenu);
        await this.base.waitAndClick(this.Elements.timesheetMenu);
        await this.page.waitForSelector(this.Elements.GoButtonTimeSheet, { state: 'visible' });
        await this.base.waitAndClick(this.Elements.GoButtonTimeSheet);
    }
    async navigateToTimesheetInSchedule() {
        fixture.logger.info("Waiting for 1 seconds");
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.securityMenu);
        await this.base.waitAndClick(this.Elements.timesheetMenu);
    }
    async navigateToSchedulePageInSergeant() {
        fixture.logger.info("Waiting for 1 seconds");
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.securityMenu);
        await this.base.waitAndClick(this.Elements.scheduleMenu);
        await this.page.waitForSelector(this.Elements.goButton, { state: 'visible' });
        await this.base.waitAndClick(this.Elements.goButton);
        await this.page.waitForSelector(this.Elements.pageTitle, { state: 'visible' });
        const pageTitle = await this.page.locator(this.Elements.pageTitle).textContent();
        expect(pageTitle).toContain('Daily Security Schedule');

    }
    async navigateToLaborOrderPageInSergeant() {
        fixture.logger.info("Waiting for 1 seconds");
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.securityMenu);
        await this.base.waitAndClick(this.Elements.laborOrder);
        await this.page.waitForSelector(this.Elements.goButton, { state: 'visible' });
        await this.base.waitAndClick(this.Elements.goButton);
        await this.page.waitForSelector(this.Elements.pageTitle, { state: 'visible' });
        const pageTitle = await this.page.locator(this.Elements.pageTitle).textContent();
        expect(pageTitle).toContain('Security Labor Order');

    }

    async enterWrongTimesheetHours() {
        await this.page.locator(this.Elements.firstCell1).click();
        await this.page.locator(this.Elements.firstCell1).fill('20');
        await this.page.locator(this.Elements.secondCell1).click();
        await this.page.locator(this.Elements.secondCell1).fill('20');
        await this.page.locator(this.Elements.thirdCell1).click();
        await this.page.locator(this.Elements.thirdCell1).fill('20');
        await this.page.locator(this.Elements.fourthCell1).click();
        await this.page.locator(this.Elements.fourthCell1).fill('20');
        await this.page.locator(this.Elements.saveAndSubmitButton).click();
        await this.page.waitForSelector("//span[contains(text(),'ST/ OT/ ST2/ OT2 exceeds limit of 10 Hours')]", { state: 'visible' });
        const errorMessage = await this.page.locator("//span[contains(text(),'ST/ OT/ ST2/ OT2 exceeds limit of 10 Hours')]").textContent();
        expect(errorMessage).toContain('ST/ OT/ ST2/ OT2 exceeds limit of 10 Hours');
    }

    async enterTimesheetHours() {
        await this.page.locator(this.Elements.firstCell1).click();
        await this.page.locator(this.Elements.firstCell1).fill('2');
        await this.page.locator(this.Elements.secondCell1).click();
        await this.page.locator(this.Elements.secondCell1).fill('2');
        await this.page.locator(this.Elements.thirdCell1).click();
        await this.page.locator(this.Elements.thirdCell1).fill('2');
        await this.page.locator(this.Elements.fourthCell1).click();
        await this.page.locator(this.Elements.fourthCell1).fill('2');

        await this.page.locator(this.Elements.firstcell2).click();
        await this.page.locator(this.Elements.firstcell2).fill('2');
        await this.page.locator(this.Elements.secondcell2).click();
        await this.page.locator(this.Elements.secondcell2).fill('2');
        await this.page.locator(this.Elements.thirdcell2).click();
        await this.page.locator(this.Elements.thirdcell2).fill('2');
        await this.page.locator(this.Elements.fourthcell2).click();
        await this.page.locator(this.Elements.fourthcell2).fill('2');

        await this.page.locator(this.Elements.firstcell3).click();
        await this.page.locator(this.Elements.firstcell3).fill('2');
        await this.page.locator(this.Elements.secondcell3).click();
        await this.page.locator(this.Elements.secondcell3).fill('2');
        await this.page.locator(this.Elements.thirdcell3).click();
        await this.page.locator(this.Elements.thirdcell3).fill('2');
        await this.page.locator(this.Elements.fourthcell3).click();
        await this.page.locator(this.Elements.fourthcell3).fill('2');



        await this.page.locator(this.Elements.firstcell4).click();
        await this.page.locator(this.Elements.firstcell4).fill('2');
        await this.page.locator(this.Elements.secondcell4).click();
        await this.page.locator(this.Elements.secondcell4).fill('2');
        await this.page.locator(this.Elements.thirdcell4).click();
        await this.page.locator(this.Elements.thirdcell4).fill('2');
        await this.page.locator(this.Elements.fourthcell4).click();
        await this.page.locator(this.Elements.fourthcell4).fill('2');

        await this.page.locator(this.Elements.firstcell5).click();
        await this.page.locator(this.Elements.firstcell5).fill('2');
        await this.page.locator(this.Elements.secondcell5).click();
        await this.page.locator(this.Elements.secondcell5).fill('2');
        await this.page.locator(this.Elements.thirdcell5).click();
        await this.page.locator(this.Elements.thirdcell5).fill('2');
        await this.page.locator(this.Elements.fourthcell5).click();
        await this.page.locator(this.Elements.fourthcell5).fill('2');

        await this.page.locator(this.Elements.firstcell6).click();
        await this.page.locator(this.Elements.firstcell6).fill('2');
        await this.page.locator(this.Elements.secondcell6).click();
        await this.page.locator(this.Elements.secondcell6).fill('2');
        await this.page.locator(this.Elements.thirdcell6).click();
        await this.page.locator(this.Elements.thirdcell6).fill('2');
        await this.page.locator(this.Elements.fourthcell6).click();
        await this.page.locator(this.Elements.fourthcell6).fill('2');

        await this.page.locator(this.Elements.firstcell7).click();
        await this.page.locator(this.Elements.firstcell7).fill('2');
        await this.page.locator(this.Elements.secondcell7).click();
        await this.page.locator(this.Elements.secondcell7).fill('2');
        await this.page.locator(this.Elements.thirdcell7).click();
        await this.page.locator(this.Elements.thirdcell7).fill('2');
        await this.page.locator(this.Elements.fourthcell7).click();
        await this.page.locator(this.Elements.fourthcell7).fill('2');

        await this.page.locator(this.Elements.firstcell8).click();
        await this.page.locator(this.Elements.firstcell8).fill('2');
        await this.page.locator(this.Elements.secondcell8).click();
        await this.page.locator(this.Elements.secondcell8).fill('2');
        await this.page.locator(this.Elements.thirdcell8).click();
        await this.page.locator(this.Elements.thirdcell8).fill('2');
        await this.page.locator(this.Elements.fourthcell8).click();
        await this.page.locator(this.Elements.fourthcell8).fill('2');


        await this.page.locator(this.Elements.firstcell9).click();
        await this.page.locator(this.Elements.firstcell9).fill('2');
        await this.page.locator(this.Elements.secondcell9).click();
        await this.page.locator(this.Elements.secondcell9).fill('2');
        await this.page.locator(this.Elements.thirdcell9).click();
        await this.page.locator(this.Elements.thirdcell9).fill('2');
        await this.page.locator(this.Elements.fourthcell9).click();
        await this.page.locator(this.Elements.fourthcell9).fill('2');

        await this.page.locator(this.Elements.saveAndSubmitButton).click();
        const sergeantLocator = this.page.locator(this.Elements.sergeantNameInTimesheet);
        await sergeantLocator.scrollIntoViewIfNeeded();
        await sergeantLocator.fill("Test Sergeant");
        await this.base.waitAndClick(this.Elements.saveAndSubmitButton);
        // fixture.logger.info("Waiting for 5 seconds");
        // await this.page.waitForTimeout(5000);
        // await this.page.waitForSelector("//span[contains(text(),'Security Timesheet information saved successfully')]", { state: 'visible' });
        // const successMessage = await this.page.locator("//span[contains(text(),'Security Timesheet information saved successfully')]").textContent();
        // expect(successMessage).toContain('Security Timesheet information saved successfully');
    }



    async verifyTimesheetSuccess() {
        await this.page.waitForSelector(this.Elements.timesheetSuccessMessage, { state: 'visible' });
    }



    async SelectDetailsOnLandingPageTimesheet(formatteddate: string): Promise<void> {
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.dateInTimesheet).click();
        await this.page.locator(this.Elements.dateInTimesheet).fill(this.formattedDate);
        await this.base.waitAndClick(this.Elements.GoButtonTimeSheet);
    }
    async saveWithoutSubmit(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveWithoutSubmitButton);
        await this.page.waitForSelector("//span[contains(text(),'Security Timesheet information saved successfully')]", { state: 'visible' });
        const successMessage = await this.page.locator("//span[contains(text(),'Security Timesheet information saved successfully')]").textContent();
        expect(successMessage).toContain('Security Timesheet information saved successfully');
        fixture.logger.info(successMessage);
    }
    async submit(): Promise<void> {

        const sergeantLocator = this.page.locator(this.Elements.sergeantNameInTimesheet);
        await sergeantLocator.scrollIntoViewIfNeeded();
        await sergeantLocator.fill("Test Sergeant");
        await this.base.waitAndClick(this.Elements.timesheetSubmitButton);

    }
    async RemoveApproval(): Promise<void> {
        await this.base.waitAndClick(this.Elements.removeApproval);
        await this.page.waitForSelector(this.Elements.yesButton, { state: 'visible' });
        await this.base.waitAndClick(this.Elements.yesButton);

    }

    async Approval(): Promise<void> {
        await this.base.waitAndClick(this.Elements.approveButton);

    }

    async Reject(): Promise<void> {
        await this.base.waitAndClick(this.Elements.rejectButton);
        await this.page.waitForSelector(this.Elements.yesButton, { state: 'visible' });
        await this.base.waitAndClick(this.Elements.yesButton);

    }

}
