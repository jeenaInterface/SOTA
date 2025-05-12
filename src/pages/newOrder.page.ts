import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";

export default class newOrderPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        laborOrderMenu: "//div[normalize-space(text())='Labor Order']",
        newOrderMenu: "//a[normalize-space(text())='New Order Form']",
        workDate: "//input[@id='sWorkDt']",
        shift: "//select[@id='shift']",
        goButton: "//button[normalize-space(text())='GO']",
        local13Tab: "//a[normalize-space()='LOCAL 13']",
        local63Tab: "//a[normalize-space()='LOCAL 63']",
        local94Tab: "//a[normalize-space()='LOCAL 94']",
        saveButton: "//button[normalize-space(text())='SAVE']",
        successMessage: "//span[contains(normalize-space(text()), 'New Order information saved successfully')]",
        carbonField: "#carbon",
        carbonCheckbox: "#cbCarbon",
        alcNo: "//tr[.//text()='Alc No']//input",
        reqRound: "select[name='reqRound']",
        orderedRound: "select[name='orderedRound']",
        reqTime: "select[name='reqTime']",
        jobType: "select[name='jobType']",
        jobTypeReq: "input[name='jobTypeReq']",
        jobTypeOrd: "input[name='jobTypeOrd']",
        hallNameTime: "//input[@id='hallName']",
        reqJobType: "input[name='reqJobType']",
        orderedJobType: "input[name='orderedJobType']",
        remarksInput: "//textarea[@placeholder='Enter your remarks here...']",
        addRemarksButton: "//button[text()='Add Remarks']",
        addSteadyTableButton: "//button[text()='ADD STEADY TABLE']",
        searchByName: "//input[@placeholder='Search By Name or Reg #']",
        invalidCheck: "#invalidCheck",
        lateOrder: "#lateOrder1"
    };


    async navigateToNewOrderForm(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 100000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.newOrderMenu);
    }

    async enterWorkDate() {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        await this.page.locator(this.Elements.workDate).fill(formattedDate);
    }

    async selectShift() {
        await this.page.locator(this.Elements.shift).selectOption("Dayside");
    }

    async clickGoButton() {
        await this.base.waitAndClick(this.Elements.goButton);
    }


    async fillLocal13Details() {

        // Fill carbon details
        await this.page.locator(this.Elements.carbonField).click();
        await this.page.locator(this.Elements.carbonField).fill('12');
        await this.page.locator(this.Elements.carbonCheckbox).check();

        // Fill ALC No
        await this.page.locator(this.Elements.alcNo).click();
        await this.page.locator(this.Elements.alcNo).fill('123');

        // Fill round details
        await this.page.locator(this.Elements.reqRound).selectOption('MRO');
        await this.page.locator(this.Elements.orderedRound).selectOption('FLEX');

        // Fill time details
        await this.page.locator(this.Elements.reqTime).first().selectOption('7AM fx');
        await this.page.locator(this.Elements.reqTime).nth(1).selectOption('8AM');

        // Fill job type details
        await this.page.locator(this.Elements.jobType).selectOption('FRONTMAN');
        await this.page.locator(this.Elements.jobTypeReq).click();
        await this.page.locator(this.Elements.jobTypeReq).fill('233');
        await this.page.locator(this.Elements.jobTypeOrd).click();
        await this.page.locator(this.Elements.jobTypeOrd).fill('3');

    }

    async fillLocal63Details() {
        await fixture.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.local63Tab);

        // Fill hall name and time
        await this.page.locator(this.Elements.hallNameTime).click();
        await this.page.locator(this.Elements.hallNameTime).fill('john @10am');

        // Select options
        await this.page.getByRole('combobox').nth(2).selectOption('REGULAR');
        await this.page.getByRole('combobox').nth(3).selectOption('FLEX');
        await this.page.locator(this.Elements.jobType).selectOption('SR');

        // Fill job type details
        await this.page.locator(this.Elements.reqJobType).click();
        await this.page.locator(this.Elements.reqJobType).fill('11');
        await this.page.locator(this.Elements.orderedJobType).click();
        await this.page.locator(this.Elements.orderedJobType).fill('1');

        // Add remarks
        await this.page.locator('.col > .bi').first().click();
        await this.page.locator(this.Elements.remarksInput).fill('test');
        await this.page.locator(this.Elements.addRemarksButton).click();

        // Add steady table
        await this.page.locator(this.Elements.addSteadyTableButton).click();
        await this.page.locator(this.Elements.reqTime).nth(2).selectOption('FLEX');
        await this.page.locator(this.Elements.reqTime).nth(3).selectOption('REGULAR');
        await this.page.locator(this.Elements.jobType).nth(1).selectOption('VPT');
        await this.page.getByRole('cell', { name: '--Select--' }).getByRole('combobox').selectOption('SUPERVISOR-SHIP');

        // Search and select employee
        await this.page.locator(this.Elements.searchByName).fill('john');
        await this.page.locator(this.Elements.searchByName).press('Enter');
        await this.page.locator(this.Elements.searchByName).fill('Allen, Johnny L - 1635032');

        // Check boxes
        await this.page.locator(this.Elements.invalidCheck).check();
        await this.page.locator(this.Elements.lateOrder).check();
    }

    async fillLocal94Details() {
        await this.base.waitAndClick(this.Elements.local94Tab);
        // Add specific details for Local 94
    }

    async clickSaveButton() {
        await this.base.waitAndClick(this.Elements.saveButton);
    }

    async verifySuccessMessage() {
        expect(await this.page.locator(this.Elements.successMessage))
    }
} 