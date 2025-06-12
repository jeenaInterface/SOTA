import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";

export class SteadySchedulePage {
    protected base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        steadyMenu: "//div[normalize-space()='Steady Menu']",
        steadyScheduleMenu: "//a[normalize-space()='Steady Schedule']",
        workDateInput: "//input[@id='workDate']",
        goButton: "//button[normalize-space()='GO']",
        numberOfJobsInput: "//input[@id='numberOfJobs']",
        jobTypeDropdown: "//select[@id='jobType']",
        startTimeDropdown: "//select[@id='startTime']",
        finishTimeDropdown: "//select[@id='finishTime']",
        remarksButton: "//button[contains(@aria-label,'Add Remarks')]",
        remarksInput: "//textarea[@id='remarks']",
        addRemarksButton: "//button[normalize-space()='Add Remarks']",
        saveButton: "//button[normalize-space()='Save']",
        cancelButton: "//button[normalize-space()='Cancel']",
        successMessage: "//div[contains(@class,'success-message')]",
        scheduleListContainer: "//div[contains(@class,'schedule-list')]"
    };

    async navigateToSteadySchedule(): Promise<void> {
        await this.base.waitAndClick(this.Elements.steadyMenu);
        await this.base.waitAndClick(this.Elements.steadyScheduleMenu);
    }

    async selectWorkDate(date: string): Promise<void> {
        await this.page.locator(this.Elements.workDateInput).fill(date);
    }

    async clickGoButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.goButton);
    }

    async enterNumberOfJobs(jobs: string): Promise<void> {
        await this.page.locator(this.Elements.numberOfJobsInput).fill(jobs);
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
        await this.page.locator(this.Elements.remarksInput).fill(remarks);
    }

    async clickAddRemarksButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.addRemarksButton);
    }

    async clickSaveButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveButton);
    }

    async clickCancelButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.cancelButton);
    }

    async verifySuccessMessage(): Promise<void> {
        await this.page.locator(this.Elements.successMessage).waitFor({ state: 'visible' });
        const message = await this.page.locator(this.Elements.successMessage).textContent();
        expect(message).toContain('successfully');
    }

    async clearMandatoryFields(): Promise<void> {
        await this.page.locator(this.Elements.numberOfJobsInput).fill('');
        await this.page.locator(this.Elements.jobTypeDropdown).selectOption('');
    }

    async verifyValidationMessages(): Promise<void> {
        // Add specific validation message checks based on your application's requirements
        const validationMessages = await this.page.locator('div.validation-message').all();
        expect(validationMessages.length).toBeGreaterThan(0);
    }

    async verifyScheduleListPage(): Promise<void> {
        await this.page.locator(this.Elements.scheduleListContainer).waitFor({ state: 'visible' });
        expect(await this.page.locator(this.Elements.scheduleListContainer).isVisible()).toBeTruthy();
    }
}
