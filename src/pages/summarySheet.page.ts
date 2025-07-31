import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(60 * 1000)

export default class summarySheetPage {

    protected base: PlaywrightWrapper;  // Change to protected so that subclasses can access it
    public page: Page;  // Same with page property

    // Declare the global variable for noTRStatusDate at the class level
    public noTRStatusDate: string;
    private weekNumber: number;

    // Constructor accepts the Page object
    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }
    private Elements = {
        summarysheet: "//a[normalize-space(text())='Summary Sheet']",
        laborOrderMenu: "//div[normalize-space(text())='Labor Order']",
        vesselOrderTab: "//a[normalize-space(text())='COSCO ENGLAND - 100714']",
        saveButton: "//button[normalize-space()='SAVE']",
        successNotification: "//span[contains(normalize-space(text()), 'Summary Sheet information has been saved successfully')]",
        logOutButton: "//i[@role='button']",
        logOut: "//a[normalize-space(text())='Logout']",
        pickAnAccount: "(//div[@data-bind='text: ((session.isSignedIn || session.isSamsungSso) && session.unsafe_fullName) || session.unsafe_displayName'])[1]",
        useAnotherAccount: "//div[normalize-space(text())='Use another account']",

        // New locators for summary sheet update
        calStatus: "#calStatus",
        newOrderStatus: "#newOrderStatus",
        comeBackCatchUpSpin2: () => this.page.locator("(//input[@type='number'])[3]"),
        comeBackCatchUpSpin3: () => this.page.locator("(//input[@type='number'])[4]"),
        references: "#references",
        gangsFinish: "#gangsFinish",
        manningField15: "(//input[contains(@class,'form-control ng-pristine')])[3]",
        manningField16: "(//input[contains(@class,'form-control ng-pristine')])[4]",
        manningField16Row3: () => this.page.locator('tr:nth-child(3) > td:nth-child(16) > .form-control'),
        swingLashIcon: () => this.page.getByRole('row', { name: 'SWING LASH --Select--   ' }).locator('i').first(),
        remarksInput: () => this.page.getByPlaceholder('Enter your remarks here...'),
        addRemarksButton: () => this.page.getByRole('button', { name: 'Add Remarks' }),
        trNotes: "#trNotes"
    };



    
    async VerifySummarySheetCreated(): Promise<void> {
        const TabPresent = await this.page.locator(this.Elements.vesselOrderTab).textContent();
        expect(TabPresent).toContain("COSCO NETHERLANDS - 100604");
        for (let i = 0; i < 10; i++) {
            await this.page.keyboard.press('PageDown');
            await this.page.waitForTimeout(500);
        }
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(5000);
    }
    async clickOnSave(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveButton);

        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);
        expect(await this.page.locator(this.Elements.successNotification))
    }

    async updateSummarySheetDetails(): Promise<void> {
        // Update calo status and new order status
        await this.page.locator(this.Elements.calStatus).selectOption('2');
        await this.page.locator(this.Elements.newOrderStatus).selectOption('1');

        // Update NF and Cut time
        await this.Elements.comeBackCatchUpSpin2().click();
        await this.Elements.comeBackCatchUpSpin2().fill('11');
        await this.Elements.comeBackCatchUpSpin3().click();

        // Update reference and gangs finish
        await this.page.locator(this.Elements.references).selectOption('To Finish');
        await this.page.locator(this.Elements.gangsFinish).click();
        await this.page.locator(this.Elements.gangsFinish).fill('10');

        // Update manning details
        await this.page.locator(this.Elements.manningField15).click();
        await this.page.locator(this.Elements.manningField15).fill('11');
        await this.page.locator(this.Elements.manningField16).click();
        await this.page.locator(this.Elements.manningField16).fill('11');
        await this.Elements.manningField16Row3().click();
        await this.Elements.manningField16Row3().fill('1');

        // Add remarks
        await this.Elements.swingLashIcon().click();
        await this.Elements.remarksInput().fill('sdsfg');
        await this.Elements.remarksInput().click();
        await this.Elements.remarksInput().fill('re');
        await this.Elements.addRemarksButton().click();

        // Add notes
        await this.page.locator(this.Elements.trNotes).click();
        await this.page.locator(this.Elements.trNotes).fill('notes');
    }

}