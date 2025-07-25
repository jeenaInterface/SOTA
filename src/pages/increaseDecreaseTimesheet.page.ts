import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(60 * 1000)
export class IncreaseDecreaseTimesheetPage {
    static formatDate(date: Date): string {
        // Format as YYYY-MM-DD
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    protected base: PlaywrightWrapper;
    public page: Page;

    // Constructor accepts the Page object
    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }


    public Elements = {
        payrollWeekDropdown: 'select[name="payrollWeek"]',
        operationDropdown: '//select[@id="subOpsType"]',
        workDateInput: '//input[@id="sWorkDt"]',
        shiftDropdown: '//select[@id="shift"]',
        jobCodeDropdown: '//select[@id="jobCode"]',
        goButton: '//button[normalize-space()="GO"]',
        increaseTab: '//a[normalize-space()="INCREASE"]',
        decreaseTab: '//a[normalize-space()="DECREASE"]',
        addRowButton: '//button[normalize-space()="+"]',
        steadyInput: '//input[@name="steady"]',
        stHoursInput: '//input[@name="stHours"]',
        otHoursInput: 'input[name="otHours"]',
        saveAndSubmitButton: '//button[normalize-space()="SAVE WITHOUT SUBMITTING"]',
        saveButton: '//button[normalize-space()="SAVE AND SUBMIT"]',
        logoutButton: 'button:has-text("Logout")',
        approveButton: 'button:has-text("Approve")',
        TimehseetMenu: "//div[normalize-space()='Timesheet']",
        increaseTabTimehseet: "//a[normalize-space()='Increase/Decrease Timesheet']",
        plusBtton: "//i[contains(@class,'bi bi-plus-square')]",
        jobList: "(//input[contains(@class,'form-control dynamic-input')])[2]",
        JobListAddButton: "//button[normalize-space(text())='ADD']",
        FirstNamecell: "//input[@id='longshore0']",
        ST: "xpath=/html/body/app-root/app-home/div/div/section/div/app-timesheet/div/div[1]/div/div[3]/table/tbody/tr[1]/td[6]/input",
        OT: "xpath=/html/body/app-root/app-home/div/div/section/div/app-timesheet/div/div[1]/div/div[3]/table/tbody/tr[1]/td[7]/input",
        MGRRemarks: "(//i[@data-bs-target='#remarks'])[3]",
        RemarksTextArea: "//textarea[@id='addComment']",
        AddRemarksButton: "//button[normalize-space()='Add Remarks']",
        RegisterNo: "//input[@id='regNo0']",
        successMessage: "//span[contains(text(),'Timesheet Information has been updated successfully')]",
        ManagemnetName: "//input[@id='mgmtName']",
        rejectButton: "//button[normalize-space(text())='REJECT']",
        rejectpopup: "//button[normalize-space(text())='OK']",
        deleteIcon: "//i[@class='bi bi-dash-circle icon-delete']",
        deletePopup: "//button[normalize-space()='Yes']",
        deleteButton: "//button[normalize-space()='DELETE']",
        downloadReport: "//button[normalize-space()='DOWNLOAD REPORT']",
        DFT:"xpath=/html/body/app-root/app-home/div/div/section/div/app-timesheet/div/div[1]/div/div[3]/table/tbody/tr[1]/td[8]/input"
        
    };

    async clickOnTimehseetMenu(): Promise<void> {
        // await this.base.goto(process.env.BASEURL, { timeout: 60000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.TimehseetMenu);
        await this.base.waitAndClick(this.Elements.increaseTabTimehseet);
    }

    async selectLandingDetails(operation: string, workDate: string, shift: string, jobCode: string) {
        await this.page.selectOption(this.Elements.operationDropdown, { label: operation });
        await this.page.fill(this.Elements.workDateInput, workDate);
        await this.page.selectOption(this.Elements.shiftDropdown, { label: shift });
        await this.page.selectOption(this.Elements.jobCodeDropdown, { label: jobCode });
    }

    async clickGo() {
        await this.page.click(this.Elements.goButton);
    }

    async AddNewRow(): Promise<void> {
        await this.base.waitAndClick(this.Elements.plusBtton);
        await this.STEADYHours();

    }
    async AddNewRowForYard(): Promise<void> {
        await this.base.waitAndClick(this.Elements.plusBtton);
        await this.STEADYHoursForDFT();

    }

    async addDecreaseRow() {
        await this.page.click(this.Elements.decreaseTab);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.plusBtton);

        await this.STEADYHours();
       // sleep(2000);
       await fixture.page.waitForTimeout(3000);
        // Fill the Register No
    }
    async addDecreaseRowForYard() {
        await this.page.click(this.Elements.decreaseTab);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.plusBtton);

        await this.STEADYHoursForDFT();
       // sleep(2000);
       await fixture.page.waitForTimeout(3000);
        // Fill the Register No
    }
    async STEADYHoursForDFT() {
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('140');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').press('Enter');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').click();
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('140 - LB - LASH BOSS');
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
        await this.page.locator(this.Elements.DFT).fill("2");
        // Save and check success message
        await this.page.locator(this.Elements.saveAndSubmitButton).click();
        await this.page.waitForSelector(this.Elements.successMessage, { timeout: 5000 });
        const successMessage1 = await this.page.locator(this.Elements.successMessage).textContent();
        expect(successMessage1).toContain("Timesheet Information has been updated successfully");

    }


    async approveTimesheet() {
        // fill management name
        await this.page.click(this.Elements.saveButton);
        await this.page.waitForTimeout(2000);
        await this.page.fill(this.Elements.ManagemnetName, "Test user");
       await this.page.click(this.Elements.decreaseTab);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.page.fill(this.Elements.ManagemnetName, "sample user");
        await this.page.click(this.Elements.approveButton);
        await this.page.waitForTimeout(2000);
    }
    async STEADYHours() {
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('140');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').press('Enter');
        await this.page.getByPlaceholder('Search Job Type or OCC Code').click();
        await this.page.getByPlaceholder('Search Job Type or OCC Code').fill('140 - LB - LASH BOSS');
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
    async clickOnReject(): Promise<void> {
        await this.base.waitAndClick(this.Elements.rejectButton);
        await this.base.waitAndClick(this.Elements.rejectpopup);

    }
    //remove individual timesheet entry
    async deleteIndividualTimesheetEntry(): Promise<void> {
        await this.base.waitAndClick(this.Elements.deleteIcon);
        await this.base.waitAndClick(this.Elements.deletePopup);
        // await this.base.waitAndClick(this.Elements.saveAndSubmitButton);

        await this.base.waitAndClick(this.Elements.increaseTab);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.deleteIcon);
        await this.base.waitAndClick(this.Elements.deletePopup);
        await this.base.waitAndClick(this.Elements.saveAndSubmitButton);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.deleteButton);
        await this.base.waitAndClick(this.Elements.deletePopup);
        //verify go button is visible
        fixture.logger.info("Waiting for 3 seconds")
        await fixture.page.waitForTimeout(3000);
        const isGoButtonVisible = await this.page.isVisible(this.Elements.goButton);
        expect(isGoButtonVisible).toBeTruthy();

    }
    async downloadTimehseetReport(): Promise<void> {
        // Create a folder for downloads if it doesn't exist
        const downloadPath = path.resolve(__dirname, 'downloads');
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);

        // Handle the download event
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // Wait for the download to start
            this.page.locator(this.Elements.downloadReport).click() // Perform the action that initiates download
        ]);

        // Save the downloaded file to the specified folder as a text file
        const downloadPathWithFileName = path.join(downloadPath, 'increaseDecreaseTimesheet.pdf');
        await download.saveAs(downloadPathWithFileName);
        console.log(`File downloaded to: ${downloadPathWithFileName}`);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();


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
    async saveAndSubmitTimesheet(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveButton);
        await this.page.waitForSelector(this.Elements.successMessage, { timeout: 5000 });
        const successMessage = await this.page.locator(this.Elements.successMessage).textContent();
        expect(successMessage).toContain("Timesheet Information has been updated successfully");
    }

        async deleteTimesheetEntry(): Promise<void> {
        await this.base.waitAndClick(this.Elements.deleteIcon);
        await this.base.waitAndClick(this.Elements.deletePopup);
        await this.base.waitAndClick(this.Elements.saveAndSubmitButton);
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.deleteButton);
        await this.base.waitAndClick(this.Elements.deletePopup);
        //verify go button is visible
        fixture.logger.info("Waiting for 3 seconds")
        await fixture.page.waitForTimeout(3000);
        const isGoButtonVisible = await this.page.isVisible(this.Elements.goButton);
        expect(isGoButtonVisible).toBeTruthy();

    }
}
