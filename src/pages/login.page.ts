import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import {setDefaultTimeout } from "@cucumber/cucumber"

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
        password: "//input[@type='password']",
        LoginButton: "//input[@type='submit']",
        yesButton:"//input[@data-report-value='Submit']",
        logOutButton:"//i[@role='button']",
        logOut:"//a[normalize-space(text())='Logout']"
    };

    async navigateToLoginPage() {
        await this.base.goto(process.env.BASEURL);
    }
    async enterUserName(user: string) {
        await this.page.locator(this.Elements.userName).fill(user);
    }
    async enterPassword(Password: string) {
        await this.page.locator(this.Elements.password).fill(Password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.Elements.LoginButton);
        await this.base.waitAndClick(this.Elements.yesButton);
    }

    async logOutDropDownlist(){
        await this.base.waitAndClick(this.Elements.logOutButton);
        await this.base.waitAndClick(this.Elements.logOut);
    }

}