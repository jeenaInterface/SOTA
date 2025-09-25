
import { Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";

export class SteadyTrackingSheetPage {
    protected base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        steadyMenu: "//div[normalize-space()='Steady']",
        steadyTrackingSheetMenu: "//a[normalize-space(text())='Steady Tracking Sheet']",
        goButton: "//button[normalize-space()='GO']",
        saveButton: "//button[normalize-space()='SAVE']",
        successMessage: "//span[normalize-space(text())='Steady Tracking Information saved successfully']",
        remarksInput: "//table[contains(@class,'table')]/tbody/tr[1]/td[9]/textarea",
        lastTab: "//div[@class='col p-0 m-1 mt-0 mb-0 ml-4']//li[5]//a[1]",
        jobCodeInputSelector1: "(//label[text()='RM']/following::input)[1]",
        jobCodeInputSelector2: "(//label[text()='RM']/following::input)[2]",
        jobCodeInputSelector3: "(//label[text()='RM']/following::input)[3]",
        jobCodeInputSelector4: "(//label[text()='RM']/following::input)[4]",
        jobCodeInputSelector5: "(//label[text()='RM']/following::input)[5]",
        jobCodeInputSelector6: "(//label[text()='RM']/following::input)[6]",
        jobCodeInputSelector7: "(//label[text()='RM']/following::input)[7]",
        totalValue: "(//td[contains(@class,'w-8 bg-white')])[1]",
        opsTab: "//a[normalize-space(text())='Ops']",
        clerkTab: "//a[normalize-space(text())='Clerk']",
        foremenTab: "//a[normalize-space(text())='Foremen']",
        craneoperatorTab: "//a[normalize-space(text())='Crane Operator']",
        craneOperatorTab: "//a[normalize-space(text())='Crane Operator']",
        longshoreTab: "//a[normalize-space(text())='Longshore']",
        addRemarksButton: "(//button[normalize-space()='Add Remarks'])[1]",
        remarksArea: "(//textarea[@id='addComment'])[1]",
        addRemarksButton2: "//day-remark-modal[@id='dayRemarks']//button[@type='button'][normalize-space()='Add Remarks']",
        remarksButtonInCalendar: "(//i[@data-bs-target='#dayRemarks'])[1]",
        textareaInCalendar1: "//tbody/tr/td[1]/textarea[1]",
        textareaInCalendar2: "//tbody/tr/td[2]/textarea[1]",
        textareaInCalendar3: "//tbody/tr/td[3]/textarea[1]",
        textareaInCalendar4: "//tbody/tr/td[4]/textarea[1]",
        textareaInCalendar5: "//tbody/tr/td[5]/textarea[1]",
        textareaInCalendar6: "//tbody/tr/td[6]/textarea[1]",
        textareaInCalendar7: "//tbody/tr/td[7]/textarea[1]",
        remarksButtonAboveCalendar: "(//th[contains(@class,'bg-white p-0')]//i)[1]",
        vesselTab: "//a[@id='parentTab-1']",
        guaranteeValue: "(//input[@for='gttotal'])[1]",
        yardTab: "//a[@id='parentTab-2']",
        railTab:"//a[@id='parentTab-3']",
        TSRVTab:"//a[@id='parentTab-4']",


    };

    async navigateToSteadyTrackingSheet(): Promise<void> {
        await this.base.waitAndClick(this.Elements.steadyMenu);
        await this.base.waitAndClick(this.Elements.steadyTrackingSheetMenu);
        fixture.logger.info('Navigated to Steady Tracking Sheet page');
    }

    async clickGoButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.goButton);
        fixture.logger.info('Clicked GO button');
        await this.base.waitAndClick(this.Elements.lastTab);

    }

    async enterRemarks(remarks: string): Promise<void> {
        await this.page.locator(this.Elements.remarksButtonInCalendar).click();
        await this.page.locator(this.Elements.textareaInCalendar1).fill('text1');
        await this.page.locator(this.Elements.textareaInCalendar2).fill('text2');
        await this.page.locator(this.Elements.textareaInCalendar3).fill('text3');
        await this.page.locator(this.Elements.textareaInCalendar4).fill('text4');
        await this.page.locator(this.Elements.textareaInCalendar5).fill('text5');
        await this.page.locator(this.Elements.textareaInCalendar6).fill('text6');
        await this.page.locator(this.Elements.textareaInCalendar7).fill('text7');

        await this.base.waitAndClick(this.Elements.addRemarksButton2);
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.remarksButtonAboveCalendar).click();
        await this.page.locator(this.Elements.remarksArea).fill(remarks);
        await this.base.waitAndClick(this.Elements.addRemarksButton);
        await fixture.page.waitForTimeout(2000);


    }

    async clickSaveButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveButton);
        fixture.logger.info('Clicked Save button');
        await fixture.page.waitForTimeout(3000);
    }

    async verifySuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.successMessage)).toBeVisible();
        fixture.logger.info('Steady Tracking Information saved successfully');
        //add Delay
        await fixture.page.waitForTimeout(2000);
    }




    async selectJobCode_Ops_Clerk_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.opsTab);
        await this.base.waitAndClick(this.Elements.clerkTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector5).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector6).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector7).fill('SC26');

    }
    async selectJobCode_vessel_Clerk_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.vesselTab);
        await this.base.waitAndClick(this.Elements.clerkTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('AC26 -TURN');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('AC26 -TURN');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('AC26 -TURN');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('AC26 -TURN');
        await this.page.locator(this.Elements.jobCodeInputSelector5).fill('AC26 -TURN');
        await this.page.locator(this.Elements.jobCodeInputSelector6).fill('AC26 -TURN');
        await this.page.locator(this.Elements.jobCodeInputSelector7).fill('AC26 -TURN');

    }
    async selectJobCode_vessel_Foremen_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.vesselTab);
        await this.base.waitAndClick(this.Elements.foremenTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('LB26');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('LB26 -R');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('LB26');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('LB26 -R');
        await this.page.locator(this.Elements.jobCodeInputSelector5).fill('LB26');
        await this.page.locator(this.Elements.jobCodeInputSelector6).fill('LB26 -R');


    }
    async selectJobCode_vessel_Crane_Operator_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.vesselTab);
        await this.base.waitAndClick(this.Elements.craneOperatorTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('HH26');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('HH26 -R');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('HH26');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('HH26');

    }
    async selectJobCode_yard_clerk_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.yardTab);
        await this.base.waitAndClick(this.Elements.clerkTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector5).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector6).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector7).fill('SC26');
        await fixture.page.waitForTimeout(1000);

    }
    async selectJobCode_yard_Foreman_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.yardTab);
        await this.base.waitAndClick(this.Elements.foremenTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('LB26');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('LB26');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('LB26');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('LB26');

    }
    async selectJobCode_yard_craneOperator_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.yardTab);
        await this.base.waitAndClick(this.Elements.craneOperatorTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('HH26');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('HH26');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('HH26');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('HH26');

    }
    async selectJobCode_yard_Longshore_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.yardTab);
        await this.base.waitAndClick(this.Elements.longshoreTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('YH');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('YH');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('YH');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('YH');

    }
    async verifyTotalValue(): Promise<void> {
        //GET THE TEXT OF TOTAL VALUE
        expect(await this.page.locator(this.Elements.totalValue)).toBeVisible();
        fixture.logger.info('Verified total value');
        const totalValue = await this.page.locator(this.Elements.totalValue).textContent();
        expect(totalValue).toContain('7');
    }

    async verifyTotalValueVessel_Foremen_Tab(): Promise<void> {
        //GET THE TEXT OF TOTAL VALUE
        expect(await this.page.locator(this.Elements.totalValue)).toBeVisible();
        fixture.logger.info('Verified total value');
        const totalValue = await this.page.locator(this.Elements.totalValue).textContent();
        expect(totalValue).toContain('3');
        //GET THE TEXT OF GUARANTEE VALUE
        expect(await this.page.locator(this.Elements.guaranteeValue)).toBeVisible();
        const guaranteeValue = await this.page.locator(this.Elements.guaranteeValue).textContent();
        expect(guaranteeValue).toContain('10');
    }
    async verifyTotalValueVessel_craneoperator_Tab(): Promise<void> {
        //GET THE TEXT OF TOTAL VALUE
        expect(await this.page.locator(this.Elements.totalValue)).toBeVisible();
        fixture.logger.info('Verified total value');
        const totalValue = await this.page.locator(this.Elements.totalValue).textContent();
        expect(totalValue).toContain('3');
        //GET THE TEXT OF GUARANTEE VALUE
        expect(await this.page.locator(this.Elements.guaranteeValue)).toBeVisible();
        const guaranteeValue = await this.page.locator(this.Elements.guaranteeValue).textContent();
        expect(guaranteeValue).toContain('2');
    }

    async verifyTotalAndGuaranteeValue(): Promise<void> {
        // Example: verify total and guarantee value are visible, update selectors as needed
        const totalValueSelector = "//td[contains(@class,'total-value')]";
        const guaranteeValueSelector = "//td[contains(@class,'guarantee-value')]";
        expect(await this.page.locator(totalValueSelector)).toBeVisible();
        expect(await this.page.locator(guaranteeValueSelector)).toBeVisible();
        fixture.logger.info('Verified total and guarantee value');
    }
        async selectJobCode_rail_Longshore_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.railTab);
        await this.base.waitAndClick(this.Elements.longshoreTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('YU');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('YU');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('YU');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('YU');

    }
        async selectJobCode_rail_clerk_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.railTab);
        await this.base.waitAndClick(this.Elements.clerkTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('SC26');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('SC26');

    }
        async selectJobCode_rail_craneoperator_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.railTab);
        await this.base.waitAndClick(this.Elements.craneOperatorTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('HH26');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('HH26');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('HH26');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('HH26');

    }
        async selectJobCode_rail_Foreman_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.railTab);
        await this.base.waitAndClick(this.Elements.foremenTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('LB26');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('LB26');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('LB26');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('LB26');

    }
            async selectJobCode_TSRV_Longshore_Tab(): Promise<void> {
        // Example: fill job code for first row, update selector as needed
        await this.base.waitAndClick(this.Elements.TSRVTab);
        await this.base.waitAndClick(this.Elements.longshoreTab);
        await this.page.locator(this.Elements.jobCodeInputSelector1).fill('MS');
        await this.page.locator(this.Elements.jobCodeInputSelector2).fill('MS');
        await this.page.locator(this.Elements.jobCodeInputSelector3).fill('MS');
        await this.page.locator(this.Elements.jobCodeInputSelector4).fill('MS');

    }
        async verifyUpdateScheduleNotAvailable(): Promise<void> {

        const updateButton = this.page.locator(this.Elements.saveButton);
        const isVisible = await updateButton.isVisible();
        if (isVisible) {
            throw new Error('Update steady functionality should not be available for LR management user');
        }
    }
    
}
