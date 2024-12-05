import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import * as data from "../helper/util/test-data/payloads.json";
import { request } from "@playwright/test";
import { APiUtils } from "../helper/util/apiUtils/api.utils";
import { setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(60 * 1000)

export default class yardOrderPage {

    private base: PlaywrightWrapper;
    private page: Page;


    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;


    }

    private Elements = {
        laborOrderMenu: "//div[normalize-space(text())='Labor Order']",
        yardOrder: "//a[normalize-space(text())='Ops Yard Order']",
        workDate: "//input[@id='sWorkDt']",
        shift: "//select[@ng-reflect-name='shift']",
        jobType: "//select[@ng-reflect-name='jobCode']",
        Go: "//button[normalize-space(text())='GO']",
        startTime: "//select[@id='startTime']",
        stdDbFX: "//*[@id='first']/div/div/tbody/tr[1]/td[9]/input",
        SteadyDBName: "//datalist//option[contains(text(), 'DiLeva, John J (John D) - 38407')]",
        stdDbFXFlexList: "//select[@ng-reflect-name='YARD BOSScbSteadyFx00']",
        stdFX: "//*[@id='first']/div/div/tbody/tr[1]/td[10]/input",
        SteadyFXName: "//datalist//option[contains(text(), 'Ramirez, Johnny M (Johnny) - 34343')]",
        stdFXFlexList: "//select[@ng-reflect-name='YARD BOSScbSteadyFx10']",
        YardBossddl1: "//input[@ng-reflect-name='YARD BOSStxSteadyNm00']",
        YardBossddl2: "//input[@ng-reflect-name='YARD BOSStxSteadyNm01']",
        FlexTypeList: "//select[contains(.,'FD')]",
        notes: "//div[@class='col-12']//textarea[1]",
        SaveMaycan: "//button[normalize-space(text())='SAVE/MAY-CAN']",
        Firm: "//input[@formcontrolname='name']",
        Push: "//button[normalize-space(text())='SAVE/PUSH']",
        successNotification: "//span[contains(normalize-space(text()), 'Order information has been saved successfully')]",
        pushbuttonNotification: "//span[contains(normalize-space(text()), 'The Order information has been pushed to Summary Sheet')]"
    };

    async clickOnLaborOrderMenu(): Promise<void> {
        await this.base.goto(process.env.BASEURL);
        await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.base.waitAndClick(this.Elements.laborOrderMenu);
        await this.base.waitAndClick(this.Elements.yardOrder);
    }
    async SelectDetailsOnLandingPage(): Promise<void> {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Move to tomorrow's date

        const day = today.getDate();
        const month = today.getMonth() + 1; // Months are 0-based, so add 1
        const year = today.getFullYear();

        // Format the date as YYYY-MM-DD
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        // Fill the calendar input with tomorrow's date
        await this.page.locator(this.Elements.workDate).click();
        await this.page.locator(this.Elements.workDate).fill(formattedDate);
        await this.page.locator(this.Elements.jobType).selectOption("Yard Ops - 690101");
        await this.base.waitAndClick(this.Elements.Go);
    }
    async SelectStartTime(): Promise<void> {
        await this.page.locator(this.Elements.startTime).selectOption("8AM");
    }
    async FillManningTable(): Promise<void> {
        await this.page.locator(this.Elements.stdDbFX).fill("1");
        await this.page.locator(this.Elements.stdFX).fill("1");
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 5 seconds")
        await fixture.page.waitForTimeout(5000);

    }
    async SelectSteadyDetails(): Promise<void> {
        await this.page.locator(this.Elements.YardBossddl1).fill("38407");
        await this.page.locator(this.Elements.YardBossddl1).press("Enter");
        // Locate the option element using XPath and get the text
        const YardBossddl1Steady = await this.page.locator(this.Elements.SteadyDBName).textContent();
        await this.page.locator(this.Elements.YardBossddl1).fill(YardBossddl1Steady);
        await this.page.locator(this.Elements.stdDbFXFlexList).selectOption('2');
        await this.page.locator(this.Elements.YardBossddl2).fill("34343");
        await this.page.locator(this.Elements.YardBossddl2).press("Enter");
        const YardBossddl2Steady = await this.page.locator(this.Elements.SteadyFXName).textContent();
        await this.page.locator(this.Elements.YardBossddl2).fill(YardBossddl2Steady);
        await this.page.locator(this.Elements.stdFXFlexList).selectOption('1');

    }

    async ClickSaveMayCan(): Promise<void> {
        await this.base.waitAndClick(this.Elements.SaveMaycan);
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);

    }

    async VerifySuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.successNotification))

    }
    async ClickPushButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.Push);
        await this.page.locator('body').click();
        fixture.logger.info("Waiting for 2 seconds")
        await fixture.page.waitForTimeout(2000);

    }

    async VerifyPushFunctionalitySuccessMessage(): Promise<void> {
        expect(await this.page.locator(this.Elements.pushbuttonNotification))

    }

}