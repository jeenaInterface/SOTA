import { expect, Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/PlaywrightWrappers';

export class VesselSchedulePage {
    protected base: PlaywrightWrapper;
    public page: Page;

    private Elements = {
        ScheduleMenu: "//div[@class='nav-title mt-1 no-wrap']",
        VesselScheduleMenu: "//a[normalize-space()='Vessel Scheduling']",
        GoButton: "//button[normalize-space()='GO']",
        addVesselButton: "//button[normalize-space()='Add Vessel']",
        vesselNameInput: "//input[@id='jobNo']",
        addVessel: "//button[@type='button'][normalize-space()='Add Vessel']",
        voyagenumber: "//input[@id='voyage']",
        search: "//input[@class='search-filter ng-valid ng-dirty ng-touched']",
        berthInfoInput: "//input[@id='berthInfo']",
        vesselInfoInput: "//input[@id='vesselInfo']",
        weekInfoInput: "//input[@id='weekInfo']",
        saveButton: "//button[normalize-space()='SAVE']",
        successMessage: "//span[contains(text(),'Vessel Schedule information saved successfully')]",
        remarksInput: "//textarea[@id='remarks']",
        addRemarksButton: "//button[normalize-space()='Add Remarks']",
        deleteVesselButton: "//button[normalize-space()='Delete Vessel']",
        confirmDeleteButton: "//button[normalize-space()='Yes']",
        viewScheduleButton: "//button[normalize-space()='View Schedule']",
        scheduleTable: "//table[@id='scheduleTable']",
        closeButton: "//div[@class='modal-footer']//button[@type='button'][normalize-space()='Close']",
        service:"//select[@id='serv0']",
        berthInfo: "//select[@id='berth']",
        stern:"//input[@id='stern']",
        amp:"//input[@id='amp']",
        caddy:"//input[@id='caddy0']",
        checkbox:"//*[@id='moveIcons']/input",
        remarks:"//i[@class='bi bi-card-list icon-lg p-0 m-0']"
    };

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ScheduleMenu);
        await this.base.waitAndClick(this.Elements.VesselScheduleMenu);
        await this.base.waitAndClick(this.Elements.GoButton);
    }
    async clickAddVessel(): Promise<void> {
        await this.base.waitAndClick(this.Elements.addVesselButton);

        await this.page.getByPlaceholder('Search By Job No or Vessel').fill('cos');
        await this.page.waitForTimeout(1000);
        await this.page.getByPlaceholder('Search By Job No or Vessel').press('ArrowRight');
        await this.page.getByPlaceholder('Search By Job No or Vessel').click();
        await this.page.getByPlaceholder('Search By Job No or Vessel').fill('COSCO ENGLAND - 053 - 100714 - 9516428');
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.addVessel);
    }

    async enterVesselName(): Promise<void> {
        // Search for voyage number '53'
        await this.page.getByPlaceholder('Search').nth(2).click();
        await this.page.getByPlaceholder('Search').nth(2).type('53', { delay: 100 });
        await this.page.getByPlaceholder('Search').nth(2).press('Enter');
        await this.page.waitForTimeout(1000);
        const closeButton = this.page.locator(this.Elements.closeButton);
        // Check if any entries exist for voyage number 53
        //verify the voyage number of if the xpath is visible otherwise add the vessel
        //add a vessel if the voyage number is not visible and if the voyage number is not equal to 53

        // Directly search table rows for voyage number 053 and delete if found
        // After filter, check if any checkbox is visible in the table rows and tick it

        const checkbox = this.Elements.checkbox;
        if (await this.page.locator(checkbox).count() > 0 && await this.page.locator(checkbox).isVisible()) {
            await this.page.locator(checkbox).check();
            await this.page.getByRole('button', { name: 'Delete Vessel' }).click();
            const yesButton = this.page.locator("//button[normalize-space()='Yes']");
            if (await yesButton.isVisible()) {
                await this.page.waitForTimeout(1000);
                await yesButton.click();
            }
        }
        await this.page.waitForTimeout(5000);
        await this.clickAddVessel();               
        await closeButton.click();

    }

    async enterBerthVesselWeekInfo(berth: string, vessel: string, week: string): Promise<void> {
        await this.page.locator(this.Elements.berthInfoInput).fill(berth);
        await this.page.locator(this.Elements.vesselInfoInput).fill(vessel);
        await this.page.locator(this.Elements.weekInfoInput).fill(week);
    }

    async clickSave(): Promise<void> {
                await this.base.waitAndClick(this.Elements.saveButton);
        const message = await this.page.locator(this.Elements.successMessage).textContent();
        expect(message).toContain('Vessel Schedule information saved successfully');
    }


    async addRemarks(remarks: string): Promise<void> {
        await this.page.locator(this.Elements.remarksInput).fill(remarks);
        await this.base.waitAndClick(this.Elements.addRemarksButton);
    }

    async verifyRemarksAdded(): Promise<void> {
        // Implement logic to verify remarks are added, e.g., check for remarks in UI
        const remarks = await this.page.locator(this.Elements.remarksInput).inputValue();
        expect(remarks).not.toBe('');
    }

    async deleteVessel(): Promise<void> {
        await this.base.waitAndClick(this.Elements.deleteVesselButton);
        await this.base.waitAndClick(this.Elements.confirmDeleteButton);
    }

    async verifyViewSchedule(): Promise<void> {
        await this.base.waitAndClick(this.Elements.viewScheduleButton);
        const tableVisible = await this.page.locator(this.Elements.scheduleTable).isVisible();
        expect(tableVisible).toBeTruthy();
    }

    async fillBerthVesselWeekForVoyage53(): Promise<void> {
            await this.page.waitForTimeout(4000);
        await this.page.getByPlaceholder('Search').nth(2).click();
        await this.page.getByPlaceholder('Search').nth(2).type('53', { delay: 100 });
        await this.page.getByPlaceholder('Search').nth(2).press('Enter');
        await this.page.waitForTimeout(1000);
        //SELECT PVCS FROM SERVICE
        await this.page.locator(this.Elements.berthInfo).selectOption('E22');
        await this.page.locator(this.Elements.service).selectOption('PCC1');
        await this.page.locator(this.Elements.stern).fill('10');
        await this.page.locator(this.Elements.amp).fill('100');
        await this.page.locator(this.Elements.caddy).check();
       await this.page.locator(this.Elements.remarks).click();
        await this.page.getByPlaceholder('Enter your remarks here...').fill('test remarks');
        await this.page.getByRole('button', { name: 'Add Remarks' }).click();
        await this.page.getByRole('button', { name: 'SAVE' }).click();
        await this.page.locator(this.Elements.checkbox).check();
            await this.page.getByRole('button', { name: 'Delete Vessel' }).click();
            const yesButton = this.page.locator("//button[normalize-space()='Yes']");
            if (await yesButton.isVisible()) {
                await this.page.waitForTimeout(1000);
                await yesButton.click();
            }

    }
}
