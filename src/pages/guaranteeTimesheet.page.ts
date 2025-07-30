import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";

export class GuaranteeTimesheetPage {
    protected base: PlaywrightWrapper;
    public page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    public Elements = {
        timesheetMenu: "//div[normalize-space()='Timesheet']",
        guaranteeTab: "//a[normalize-space()='Guarantee Timesheet']",
        workDateInput: "//input[@id='sWorkDt']",
        shiftDropdown: "//select[@id='shift']",
        jobTypeDropdown: "//select[@id='jobCode']",
        goButton: "//button[normalize-space()='GO']",
        guaranteeTabButton: "//a[normalize-space()='GUARANTEE']",
        addRowButton: "//button[normalize-space()='+']",
        steadyInput: "//input[@name='steady']",
        stHoursInput: "//input[@name='stHours']",
        otHoursInput: "//input[@name='otHours']",
        saveButton: "//button[normalize-space()='SAVE AND SUBMIT']",
        logoutButton: "//button[normalize-space()='Logout']",
        approveButton: "//button[normalize-space(text())='APPROVE']",
        rejectButton: "//button[normalize-space()='REJECT']",
        rejectPopup: "//button[normalize-space()='OK']",
        deleteIcon: "//i[@class='bi bi-dash-circle icon-delete']",
        deletePopup: "//button[normalize-space()='Yes']",
        deleteButton: "//button[normalize-space()='DELETE']",
        downloadReport: "//button[normalize-space()='DOWNLOAD REPORT']",
        successMessage: "//span[contains(text(),'Timesheet Information has been updated successfully')]",
        operationType: "//select[@id='subOpsType']",
        plusBtton: "//i[contains(@class,'bi bi-plus-square')]",
        RegisterNo: "//input[@id='regNo0']",
        saveAndSubmitButton: '//button[normalize-space()="SAVE WITHOUT SUBMITTING"]',
        ManagemnetName: "//input[@id='mgmtName']",
        jobList: "(//input[contains(@class,'form-control dynamic-input')])[2]",
        JobListAddButton: "//button[normalize-space(text())='ADD']",
        FirstNamecell: "//input[@id='longshore0']",
        ST: "xpath=/html/body/app-root/app-home/div/div/section/div/app-timesheet/div/div[1]/div/div[3]/table/tbody/tr[1]/td[6]/input",
        OT: "xpath=/html/body/app-root/app-home/div/div/section/div/app-timesheet/div/div[1]/div/div[3]/table/tbody/tr[1]/td[7]/input",
    };

    async navigateToGuaranteeTimesheet() {
        await this.base.waitAndClick(this.Elements.timesheetMenu);
        await this.base.waitAndClick(this.Elements.guaranteeTab);
    }

    async selectLandingDetails(operation: string, workDate: string, shift: string, jobType: string) {
        await this.page.selectOption(this.Elements.operationType, { label: operation });
        await this.page.fill(this.Elements.workDateInput, workDate);
        await this.page.selectOption(this.Elements.shiftDropdown, { label: shift });
        await this.page.selectOption(this.Elements.jobTypeDropdown, { label: jobType });
        await this.page.click(this.Elements.goButton);
    }

    async STEADYHours() {
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('215');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').press('Enter');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').click();
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('215 - GM - GEARMEN');
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.JobListAddButton);
        await this.page.locator(this.Elements.FirstNamecell).click();
        await this.page.locator(this.Elements.FirstNamecell).fill("3961305");
        await this.page.locator(this.Elements.FirstNamecell).press('Enter');
        await this.page.locator(this.Elements.FirstNamecell).fill("Acosta, Johnnie A");
        await this.page.locator(this.Elements.RegisterNo).fill("3961305");
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.ST).fill("7");
        await this.page.locator(this.Elements.OT).fill("3");
        // Save and check success message
        await this.page.locator(this.Elements.saveAndSubmitButton).click();
        await this.page.waitForSelector(this.Elements.successMessage, { timeout: 5000 });
        const successMessage1 = await this.page.locator(this.Elements.successMessage).textContent();
        expect(successMessage1).toContain("Timesheet Information has been updated successfully");

    }
    async AddNewRow(): Promise<void> {
        await this.base.waitAndClick(this.Elements.plusBtton);
        await this.STEADYHours();

    }
    async approveTimesheet() {
        // fill management name
        await this.page.click(this.Elements.saveButton);
        await this.page.waitForTimeout(2000);
        await this.page.fill(this.Elements.ManagemnetName, "Test user");
        await this.page.click(this.Elements.approveButton);
        await this.page.waitForTimeout(2000);
    }


 async verifyValidationMessageForLongshorePayrollHours(): Promise<void> {
        // Example: Adjust the selector/message as per your app's actual validation
        await this.base.waitAndClick(this.Elements.plusBtton);
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('215');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').press('Enter');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').click();
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('215 - GM - GEARMEN');
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.JobListAddButton);
        await this.base.waitAndClick(this.Elements.approveButton);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        const selector = "//span[@class='text-bold color-white']";
        const isVisible = await this.page.isVisible(selector);
        expect(isVisible).toBeTruthy();
    }


}
