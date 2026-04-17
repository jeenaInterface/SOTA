import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(100 * 1000);

export default class LoginPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        userName: "//input[@type='email']",
        next: "//input[@value='Next']",
        password: "//input[@type='password']",
        signInButton: "button[name='Sign in']",
        confirmButton: "button[name='Yes']",
        logOutButton: "//i[@role='button']",
        logOut: "//a[normalize-space(text())='Logout']",
        pickAnAccount: "//small[@data-bind='text: session.unsafe_displayName']",
        useAnotherAccount: "//div[normalize-space(text())='Use another account']",
        dashboard:"//span[normalize-space(text())='SOTA Dashboard']"
    };

    // async navigateToLoginPage(): Promise<void> {
    //     await this.base.goto(process.env.BASEURL, { timeout: 60000 });
    //     await this.page.evaluate(() => {
    //         window.moveTo(1920, 10);
    //         window.resizeTo(screen.width, screen.height);
    //     });

    // }
    async navigateToLoginPage(): Promise<void> {

    for (let i = 0; i < 5; i++) {
        await this.base.goto(process.env.BASEURL!, { timeout: 100000 });

        try {
            await this.page.waitForSelector(this.Elements.userName, {
                state: 'visible',
                timeout: 10000
            });
            return; // username found
        } catch {
            await this.page.reload();
        }
    }

    throw new Error('Username field not found after 5 attempts');

    }
    async enterUserName(user: string): Promise<void> {
        await this.page.waitForSelector(this.Elements.userName, { state: 'visible', timeout: 100000 });
        await this.page.locator(this.Elements.userName).fill(user);
        await this.base.waitAndClick(this.Elements.next);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.waitForSelector(this.Elements.password, { state: 'visible', timeout: 100000 });
        await this.page.locator(this.Elements.password).fill(password);
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

    // ...existing code...
    async clickLoginButton(): Promise<void> {
        await this.page.getByRole('button', { name: 'Yes' }).click();
    }
    // ...existing code...

    async login(username: string, password: string): Promise<void> {
        await this.navigateToLoginPage();
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
        //add delay to wait for the login process to complete
        await this.page.waitForTimeout(100000);
        //do multiple refresh until the dashboard is visible or max 5 times
        for (let i = 0; i < 5; i++) {
            try {
                await this.page.waitForSelector(this.Elements.dashboard, { state: 'visible', timeout: 100000 });
                return; // dashboard found
            } catch {
                await this.page.reload();
            }   
        }
        throw new Error('Dashboard not found after 5 attempts');
    }

    async logOutDropDownlist(): Promise<void> {
        await this.base.waitAndClick(this.Elements.logOutButton);
        await this.base.waitAndClick(this.Elements.logOut);
        await this.base.waitAndClick(this.Elements.pickAnAccount);
        await this.base.waitAndClick(this.Elements.useAnotherAccount);
    }
}