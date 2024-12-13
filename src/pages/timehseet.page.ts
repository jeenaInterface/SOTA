// import { Page, BrowserContext, expect } from "@playwright/test";
// import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
// import { setDefaultTimeout } from "@cucumber/cucumber"
// import { fixture } from "../hooks/pageFixture";
// import yardOrderPage from "../pages/yardOrder.page";

// setDefaultTimeout(60 * 1000)
// // let yardOrder: yardOrderPage;

// export default class timesheetPage extends yardOrderPage {
//     // Make base property `protected` to match the base class
//     protected base: PlaywrightWrapper;  // Make it protected so it can be accessed in derived class
//     public yardOrder: yardOrderPage;


//     constructor(arg: Page | yardOrderPage) {
//         // Determine what to pass to the parent constructor before calling super()
//         const pageToPass: Page = arg instanceof yardOrderPage ? arg.page : arg;

//         // Call super() as the first statement
//         super(pageToPass);

//         // Initialize the yardOrder property after super() call
//         this.yardOrder = arg instanceof yardOrderPage ? arg : new yardOrderPage(arg);
//     }

//     public Element = {
//         TimehseetMenu: "//div[normalize-space(text())='Timesheet']",
//         yardTimehseet: "//a[normalize-space(text())='Ops Yard Timesheet']",
//         workDate: "//input[@id='sWorkDt']",
//         shift: "//select[@ng-reflect-name='shift']",
//         jobType: "//select[@ng-reflect-name='jobCode']",
//         Go: "//button[normalize-space(text())='GO']",
//         ForemanTab: "//a[normalize-space(text())='Foreman']",
//         SThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[8]/input[1]",
//         OThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[9]/input[1]",
//         DFThrFirstRow: "//table[contains(@class,'table table-form')]/tbody[1]/tr[1]/td[10]/input[1]",
//         SaveWithoutSubmit: "//button[normalize-space(text())='SAVE WITHOUT SUBMITTING']",
//         successNotification: "//span[normalize-space(text())='Timesheet Information has been updated successfully']",

//     };

//     async clickOnTimehseetMenu(): Promise<void> {
//         // await this.base.goto(process.env.BASEURL, { timeout: 60000 });
//         // await this.page.setViewportSize({ width: 1536, height: 864 });
//         await this.base.waitAndClick(this.Element.TimehseetMenu);
//         await this.base.waitAndClick(this.Element.yardTimehseet);
//     }
//     async SelectDetailsOnLandingPageTimehseet(noTRStatusDate: string): Promise<void> {
  
//         // Fill the calendar input with tomorrow's date
//         await this.page.locator(this.Element.workDate).click();
//         noTRStatusDate = this.noTRStatusDate;  // Access the noTRStatusDate from yardOrderPage

//         if (noTRStatusDate) {
//             // Here we are setting the date field with the noTRStatusDate
//             const dateField = await this.page.locator(this.Elements.workDate);
//             await dateField.fill(noTRStatusDate);  // Fill the date field with the value of noTRStatusDate
//         } else {
//             console.log('noTRStatusDate is not set');
//         }
//         await this.page.locator(this.Element.workDate).fill(noTRStatusDate);
//         await this.page.locator(this.Element.jobType).selectOption("Yard Ops - 690101");
//         await this.base.waitAndClick(this.Element.Go);
//     }
//     async clickOnForemanTab(): Promise<void> {
//         await this.base.waitAndClick(this.Element.ForemanTab);
//     }
//     async FillHrsTab(): Promise<void> {
//         await this.page.locator(this.Element.SThrFirstRow).fill("8");
//         await this.page.locator(this.Element.OThrFirstRow).fill("2");
//         await this.page.locator(this.Element.DFThrFirstRow).fill("1");
//         fixture.logger.info("Waiting for 2 seconds")
//         await fixture.page.waitForTimeout(5000);
//     }
//     async clickOnSaveAndSubmit(): Promise<void> {
//         await this.base.waitAndClick(this.Element.SaveWithoutSubmit);

//         fixture.logger.info("Waiting for 2 seconds")
//         await fixture.page.waitForTimeout(5000);
//     }
//     async verifySuccessMessage(): Promise<void> {
//         expect(await this.page.locator(this.Element.successNotification))
//     }

// }