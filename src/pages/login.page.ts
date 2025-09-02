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
        pickAnAccount: "(//div[@data-bind='text: ((session.isSignedIn || session.isSamsungSso) && session.unsafe_fullName) || session.unsafe_displayName'])[1]",
        useAnotherAccount: "//div[normalize-space(text())='Use another account']"
    };

    // async navigateToLoginPage(): Promise<void> {
    //     await this.base.goto(process.env.BASEURL, { timeout: 60000 });
    //     await this.page.evaluate(() => {
    //         window.moveTo(1920, 10);
    //         window.resizeTo(screen.width, screen.height);
    //     });

    // }
    async navigateToLoginPage(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 60000 });
                await this.page.evaluate(() => {
            window.moveTo(1920, 1080);
            window.resizeTo(screen.width, screen.height);
        });

        await this.page.waitForSelector(this.Elements.userName, { state: 'visible', timeout: 15000 });
    }
    async enterUserName(user: string): Promise<void> {
        await this.page.waitForSelector(this.Elements.userName, { state: 'visible', timeout: 15000 });
        await this.page.locator(this.Elements.userName).fill(user);
        await this.base.waitAndClick(this.Elements.next);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.waitForSelector(this.Elements.password, { state: 'visible', timeout: 15000 });
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
    }

    async logOutDropDownlist(): Promise<void> {
        await this.base.waitAndClick(this.Elements.logOutButton);
        await this.base.waitAndClick(this.Elements.logOut);
        await this.base.waitAndClick(this.Elements.pickAnAccount);
        await this.base.waitAndClick(this.Elements.useAnotherAccount);
    }
}