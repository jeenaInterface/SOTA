import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import * as data from "../helper/util/test-data/payloads.json";
import { request } from "@playwright/test";
import { APiUtils } from "../helper/util/apiUtils/api.utils";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(60 * 1000)

export default class vesselOrderPage {

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


    public Elements = {
        laborOrderMenu: "//div[normalize-space(text())='Labor Order']",
        vesselOrder: "//a[normalize-space(text())='Ops Vessel Order']",
        workDate: "//input[@aria-describedby='Work Date']",
        shift: "//select[@ng-reflect-name='shift']",
        jobNo: "//input[@ng-reflect-name='jobNo']",
        Go: "//button[normalize-space(text())='GO']",
        TRStatus: "//select[@ng-reflect-name='trStatus']",
        homeicon: "//div[@ng-reflect-router-link='/home']//a[1]",
        dataList: "//datalist[@id='nameListData']",
        berth:"//select[@id='berth']",
        startTime:"//select[@id='startTime']",
        reference: "//select[@id='references']",
        CNTRComeBack:"(//input[@type='number'])[1]",
        LashComeBack:"(//input[@type='number'])[2]",
        LashTypeComeBack:"//select[@id='lashType0']",
        ForeManTab:"//a[normalize-space(text())='Foreman']",
        STDYFX:"//*[@id='first']/div/div/tbody/tr[1]/td[7]/input",
        LASHBOSSSTEADY:"//input[@list='nameListData00']",
        LASHBOSSSTEADYflexType:"//select[@id='cbSteadyFx']",
        textArea:"//textarea[@ng-reflect-name='notes']",
        savemaycan:"//button[normalize-space(text())='SAVE/MAY-CAN']",
        SteadyDBName: "//datalist//option[contains(text(), 'Albano, Bill (Bill) - 38280')]",
        successNotification: "//span[contains(normalize-space(text()), 'Order information has been saved successfully')]",
        Discard:"//button[normalize-space(text())='DISCARD']",
        YesButtonOnDiscard:"//button[normalize-space(text())='Yes']",
        DiscardNotification: "//span[contains(normalize-space(text()), 'Order information has been discarded successfully')]",
        FirmButton:"//button[normalize-space(text())='SAVE/FIRM']",
        PushButton: "//button[normalize-space(text())='SAVE/PUSH']",
        pushbuttonNotification: "//span[contains(normalize-space(text()), 'The Order information has been pushed to Summary Sheet')]",
        CancelButton:"//button[normalize-space(text())='CANCEL']",
        cancelpopupyes:"//button[normalize-space(text())='Yes']",
        cancelNotification:"//span[contains(normalize-space(text()), 'Order information has been cancelled successfully')]",
        
    }
    async clickOnVesselOrderMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 100000 });
        await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.vesselOrder);
    }
    async selectJobNumber(): Promise<void> {
        await this.page.getByPlaceholder('Search By Job No or Vessel').fill('cos');
        await this.page.waitForTimeout(1000);
        await this.page.getByPlaceholder('Search By Job No or Vessel').press('ArrowRight');
        await this.page.getByPlaceholder('Search By Job No or Vessel').click();
        await this.page.getByPlaceholder('Search By Job No or Vessel').fill('COSCO ASIA - 082 - 100654 - 9345403');
       // await this.page.getByPlaceholder('Search By Job No or Vessel Name or Voyage or Lloyds').click();
        // Wait for datalist options
        await this.page.waitForTimeout(4000);
        // Get the first option value
        await this.page.evaluate(() => {
            const xpath = "//button[text()='GO']";
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            const goButton = result.singleNodeValue as HTMLButtonElement;
            if (goButton) {
                goButton.disabled = false;
            }
        });
        
        // Ensure the "Go" button is enabled before clicking on it
        const goButton = this.page.locator("//button[text()='GO']");
        await goButton.waitFor({ state: 'visible' });
        
        const isGoButtonEnabled = await goButton.isEnabled();
        if (isGoButtonEnabled) {
            await goButton.click();
        } else {
            throw new Error("The 'Go' button is not enabled.");
        }
    }
    
    async SelectDetailsOnLandingPage(): Promise<void> {
        let currentDate = new Date();
        let formattedDate: string;
        const maxAttempts = 10;

        await this.page.getByPlaceholder('Search By Job No or Vessel').click();
        await this.page.locator(this.Elements.shift).selectOption("2ND");
        this.selectJobNumber();

        fixture.logger.info("Waiting for 1 seconds");
        await fixture.page.waitForTimeout(1000);

        for (let attempts = 0; attempts < maxAttempts; attempts++) {

            const trStatusVisible = await this.page.locator(this.Elements.TRStatus).isVisible();
            fixture.logger.info("Waiting for 2 seconds");
            await fixture.page.waitForTimeout(2000);

            if (trStatusVisible) {
                await this.page.locator(this.Elements.homeicon).click();
                await this.page.locator(this.Elements.laborOrderMenu).click();
                await this.page.locator(this.Elements.vesselOrder).click();
                currentDate.setDate(currentDate.getDate() + 1);

                formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

                // Wait and fill the date for the next order
                await this.page.locator(this.Elements.workDate).waitFor({ state: 'attached', timeout: 3000 });
                await this.page.locator(this.Elements.workDate).click();
                await this.page.locator(this.Elements.workDate).fill(formattedDate);
                await this.page.locator(this.Elements.shift).selectOption("2ND");
                this.selectJobNumber();

            } else {
                // If no TR status, assign the formatted date as noTRStatusDate
                this.noTRStatusDate = formattedDate;
                fixture.logger.info(`TR status is not present on ${formattedDate}`);
            }
        }
        // await this.page.locator(this.Elements.workDate).fill('2025-01-26');
        // await this.page.locator(this.Elements.shift).selectOption("2ND");
        // this.selectJobNumber();


        // // Store the date to noTRStatusDate
        // this.noTRStatusDate = '2025-01-26';
    }

    async EnterHeaderDetails(): Promise<void> {
        await this.page.locator(this.Elements.berth).selectOption("Pier E - LB 24");
        await this.page.locator(this.Elements.startTime).selectOption("5PMfx");
        await this.page.locator(this.Elements.reference).selectOption("To Start");
    }
    async EnterGangsDetails(): Promise<void> {
        await this.page.locator(this.Elements.CNTRComeBack).fill("2");
        await this.page.locator(this.Elements.LashComeBack).fill("3");
        await this.page.locator(this.Elements.LashTypeComeBack).selectOption("Catch Up");
    }

    async FillManningTable(): Promise<void> {
        await this.page.locator(this.Elements.ForeManTab).click();
        await this.page.locator(this.Elements.STDYFX).fill("1");
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);

    }
    async SelectSteadyDetails(): Promise<void> {
        await this.page.locator(this.Elements.LASHBOSSSTEADY).fill("38280");
        await this.page.locator(this.Elements.LASHBOSSSTEADY).press("Enter");
        // Locate the option element using XPath and get the text
        const LashBossddl1Steady = await this.page.locator(this.Elements.SteadyDBName).textContent();
        await this.page.locator(this.Elements.LASHBOSSSTEADY).fill(LashBossddl1Steady);
        await this.page.locator(this.Elements.LASHBOSSSTEADYflexType).selectOption('1');
        await this.page.locator(this.Elements.textArea).fill("text data");
    }

    async ClickSaveMayCan(): Promise<void> {
        await this.base.waitAndClick(this.Elements.savemaycan);
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);

    }

    async VerifySuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.successNotification))

    }
    async ClickDiscard(): Promise<void> {
        await this.base.waitAndClick(this.Elements.Discard);
        await this.base.waitAndClick(this.Elements.YesButtonOnDiscard);
        expect(await this.page.locator(this.Elements.DiscardNotification))
        fixture.logger.info("Waiting for 3 seconds")
        await fixture.page.waitForTimeout(3000);
    }
    async ClickFirmButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.FirmButton);
        expect(await this.page.locator(this.Elements.successNotification))
        fixture.logger.info("Waiting for 3 seconds")
        await fixture.page.waitForTimeout(3000);
    }
    async ClickPushButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.PushButton);
        expect(await this.page.locator(this.Elements.pushbuttonNotification))
        fixture.logger.info("Waiting for 3 seconds")
        await fixture.page.waitForTimeout(3000);
    }
    async ClickCancelButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.CancelButton);
        await this.base.waitAndClick(this.Elements.cancelpopupyes);
        expect(await this.page.locator(this.Elements.cancelNotification))
        fixture.logger.info("Waiting for 3 seconds")
        await fixture.page.waitForTimeout(3000);
    }

}