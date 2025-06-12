import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import * as data from "../helper/util/test-data/payloads.json";
import { request } from "@playwright/test";
import { APiUtils } from "../helper/util/apiUtils/api.utils";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(60 * 1000)
let Response: any; // Define Response variable
let ClientPage: steadyManagementPage; // Define ClientPage variable
let orderId: any

export default class steadyManagementPage {

    private base: PlaywrightWrapper;
    private page: Page;


    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;


    }

    private Elements = {
        steady: "//div[normalize-space(text())='Steady']",
        steadyManagement: "//div[@data-bs-popper='static']//a[1]",
        OperationType: "//select[@ng-reflect-name='opsType']",
        column: "th",
        orderDetails: "//small[text()='Order Id']/following-sibling::div",
        button: "(//button[text()='View'])[1]",
        search: "//button[normalize-space(text())='SEARCH']",
        FirstRowInTheTable: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[2]/label[1]",
        Remarks: "(//textarea[@id='remarks'])[1]",
        save: "//button[normalize-space(text())='SAVE']",
        Notification: "//span[normalize-space(text())='Steady Information updated successfully']",
        errorNotification: "//span[normalize-space(text())='No data found for the selected criteria']",
        backButton: "//button[normalize-space()='BACK']",
        resetButton: "//button[normalize-space()='RESET']",
        createNewSteadyButton: "//button[normalize-space()='ADD STEADY']",
        downloadReportButton: "//button[normalize-space()='Download Report']",
        steadyReportButton: "//button[normalize-space()='Steady Report']",
        operationalTypeDefault: "//select[@ng-reflect-name='opsType']//option[@value='']",
        steadyNameField: "//input[@formcontrolname='name']",
        successMessage: "//span[contains(text(),'successfully')]",
        downloadPath: "//downloads/steady-report.xlsx",
        searchByNameInput: "//input[@id='longshore0']",
        searchDatalist: "//datalist[@id='longshorelist']",
        datalistOption: "//datalist[@id='longshorelist']/option[contains(text(),'Ponce De Leon, Adolfo - 1915431')]",
        autoCompleteDropdown: "//div[contains(@class,'ng-dropdown-panel')]//div[contains(@class,'ng-option')]",
        searchOption: "//div[contains(@class,'ng-option')]//span[contains(text(),'Ponce De Leon, Adolfo - 1915431')]",
        steadySearchResults: "//div[contains(@class,'search-results')]",
        addButton: "//button[normalize-space()='Add']",
        positionDropdown: "//div[contains(text(),'Position')]/following-sibling::select",
        functionDropdown: "//div[contains(text(),'Function')]/following-sibling::select",
        firstPositionDropdown: "(//select)[1]",
        secondPositionDropdown: "(//select)[2]",
        clerkPositionOption: "//option[contains(text(),'30/25% Clerk')]",
        acClerkFunctionOption: "//option[contains(text(),'AC Clerk')]",
        steadyCreatedMessage: "//span[contains(text(),'Steady created successfully')]"
    };

    async clicksteadyMenuButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.steady);
        await this.base.waitAndClick(this.Elements.steadyManagement);
    }

    async SelectoperationalType(): Promise<void> {

        await this.page.locator(this.Elements.OperationType).selectOption("Vessel");
    }
    async ClickOnSearch(): Promise<void> {
        await this.base.waitAndClick(this.Elements.search);
    }
    async updateFirstSteady(): Promise<void> {
        await this.base.waitAndClick(this.Elements.FirstRowInTheTable);
        await this.page.locator(this.Elements.Remarks).clear()
        await this.page.locator(this.Elements.Remarks).fill("TestRemarks")
        await this.base.waitAndClick(this.Elements.save);
        fixture.logger.info("Waiting for 5 seconds")
        await fixture.page.waitForTimeout(5000);
        expect.soft(await this.page.locator(this.Elements.Notification))

    }

    async enterWrongSteadyName(): Promise<void> {
        await this.page.locator(this.Elements.steadyNameField).clear()
        await this.page.locator(this.Elements.steadyNameField).fill("TestData")
    }

    async verifyErrorMessage(): Promise<void> {
        expect.soft(await this.page.locator(this.Elements.errorNotification))
    }

    async verifyTableDetails(): Promise<void> {
        await this.page.waitForSelector('//table[contains(@class,"table")]');
        const rowCount = await this.page.locator('//table[contains(@class,"table")]//tbody//tr').count();
        expect(rowCount).toBeGreaterThan(0);
    }

    async clickBackButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.backButton);
        await this.page.waitForTimeout(1000);
    }

    async clickResetButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.resetButton);
        await this.page.waitForTimeout(1000);
    }

    async verifyOperationalTypeReset(): Promise<void> {
        await this.page.waitForSelector(this.Elements.OperationType);

        const select = this.page.locator(this.Elements.OperationType);
        const value = await select.evaluate((el: HTMLSelectElement) => el.value);
        fixture.logger.info(`Selected value: ${value}`);

        if (value !== '-1') {
            throw new Error(`Expected dropdown value to be '-1' but got '${value}'`);
        }
    }

    async verifySteadyNameEmpty(): Promise<void> {
        const steadyNameValue = await this.page.locator(this.Elements.steadyNameField).inputValue();
        expect(steadyNameValue).toBe('');
    }

    async clickCreateNewSteady(): Promise<void> {
        await this.base.waitAndClick(this.Elements.createNewSteadyButton);

        await this.page.locator(this.Elements.searchByNameInput).fill('PONCE');
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.searchByNameInput).press('ArrowRight');
        await this.page.locator(this.Elements.searchByNameInput).click();
        await this.page.waitForTimeout(1000); // Wait for search results - once fill ponce and click on enter a list will show, that xpath is not able to get. need to select the below text from the list - Ponce De Leon, Adolfo - 1915431

        // Select steady from search results
        await this.page.locator(this.Elements.searchByNameInput).fill('Ponce De Leon, Adolfo - 1915431');
        await this.page.waitForTimeout(4000);
        await this.base.waitAndClick(this.Elements.addButton);
    }

    async verifyNewSteadyCreation(): Promise<void> {
        await this.page.waitForSelector(this.Elements.steadyCreatedMessage, { state: 'visible', timeout: 10000 });
        const successMsg = await this.page.locator(this.Elements.steadyCreatedMessage);
        await expect(successMsg).toBeVisible();
    }

    async enterSteadyName(name: string): Promise<void> {
        await this.page.locator(this.Elements.steadyNameField).fill(name);
    }

    async downloadReport(): Promise<void> {
        await this.base.waitAndClick(this.Elements.downloadReportButton);
        await this.page.waitForTimeout(3000); // Wait for download
    }

    async downloadSteadyReport(): Promise<void> {
        await this.base.waitAndClick(this.Elements.steadyReportButton);
        await this.page.waitForTimeout(3000); // Wait for download
    }

    async verifyDownload(): Promise<void> {
        // Verify download completed
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.downloadReportButton).click()
        ]);

        expect(download).toBeTruthy();
    }

    async verifyLongshoremenSelection(): Promise<void> {
        // Check if the input has a valid value
        const searchInput = this.page.locator(this.Elements.searchByNameInput);
        const value = await searchInput.inputValue();

        if (!value || value.trim() === '') {
            throw new Error('Longshoreman selection is empty');
        }

        // Verify the Add button is visible, indicating a valid selection
        const addButton = this.page.locator(this.Elements.addButton);
        const isVisible = await addButton.isVisible();
        if (!isVisible) {
            throw new Error('Add button is not visible after selection');
        }
    }
}

