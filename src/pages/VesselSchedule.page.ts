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
        addVessel:"//button[@type='button'][normalize-space()='Add Vessel']",
        berthInfoInput: "//input[@id='berthInfo']",
        vesselInfoInput: "//input[@id='vesselInfo']",
        weekInfoInput: "//input[@id='weekInfo']",
        saveButton: "//button[normalize-space()='Save']",
        successMessage: "//span[contains(text(),'Vessel added successfully')]",
        remarksInput: "//textarea[@id='remarks']",
        addRemarksButton: "//button[normalize-space()='Add Remarks']",
        deleteVesselButton: "//button[normalize-space()='Delete Vessel']",
        confirmDeleteButton: "//button[normalize-space()='Yes']",
        viewScheduleButton: "//button[normalize-space()='View Schedule']",
        scheduleTable: "//table[@id='scheduleTable']"
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
    }

    async enterVesselName(name: string): Promise<void> {
        await this.page.locator(this.Elements.vesselNameInput).fill(name);
        await this.page.locator(this.Elements.vesselNameInput).press('Enter');
        await this.page.waitForTimeout(500); // Wait for any potential UI updates
        //select first entry from the dropdown
        const firstOption = this.page.locator("//*[@id='nameListData']/option[1]");
        await firstOption.click();
        await this.base.waitAndClick(this.Elements.addVessel);
    }

    async enterBerthVesselWeekInfo(berth: string, vessel: string, week: string): Promise<void> {
        await this.page.locator(this.Elements.berthInfoInput).fill(berth);
        await this.page.locator(this.Elements.vesselInfoInput).fill(vessel);
        await this.page.locator(this.Elements.weekInfoInput).fill(week);
    }

    async clickSave(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveButton);
    }

    async verifySuccessMessage(): Promise<void> {
        const message = await this.page.locator(this.Elements.successMessage).textContent();
        expect(message).toContain('Vessel added successfully');
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
}
