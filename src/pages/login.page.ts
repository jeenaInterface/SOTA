import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import {setDefaultTimeout } from "@cucumber/cucumber"
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000)

export default class loginPage {

    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;

    }

    private Elements = {
        userName: "//input[@type='email']",
        next:"//input[@value='Next']",
        password: "//input[@type='password']",
        logOutButton:"//i[@role='button']",
        logOut:"//a[normalize-space(text())='Logout']",
        pickAnAccount:"(//div[@data-bind='text: ((session.isSignedIn || session.isSamsungSso) && session.unsafe_fullName) || session.unsafe_displayName'])[1]",
        useAnotherAccount:"//div[normalize-space(text())='Use another account']",
    };

    async navigateToLoginPage() {
        await this.base.goto(process.env.BASEURL, { timeout: 60000 });
        // await this.page.setViewportSize({ width: 1536, height: 864 });
        await this.page.evaluate(() => {
            window.moveTo(0, 0);
            window.resizeTo(screen.width, screen.height);
        });
    }
    
    async enterUserName(user: string) {
        await this.page.locator(this.Elements.userName).fill(user);
        await this.base.waitAndClick(this.Elements.next);

    }
    async enterPassword(Password: string) {
        await this.page.locator(this.Elements.password).fill(Password);
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

    async clickLoginButton() {     
        await this.page.getByRole('button', { name: 'Yes' }).click();
    }

    async logOutDropDownlist(){
        await this.base.waitAndClick(this.Elements.logOutButton);
        await this.base.waitAndClick(this.Elements.logOut);
        await this.base.waitAndClick(this.Elements.pickAnAccount);
        await this.base.waitAndClick(this.Elements.useAnotherAccount);
    }

}