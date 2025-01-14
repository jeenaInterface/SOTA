import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
const fs = require("fs-extra");
import { ITestCaseHookParameter } from '@cucumber/cucumber';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});
// It will trigger for not auth scenarios
Before({ tags: "not @auth" }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});


Before({ tags: '@auth' }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        storageState: getStorageState(pickle.name),
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});



After(async function ({ pickle, result }) {
    let videoPath: string;
    let img: Buffer;
    if (result?.status == Status.PASSED) {
        img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
        videoPath = await fixture.page.video().path();
    }

    if (result?.status == Status.FAILED) {
        img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
        videoPath = await fixture.page.video().path();
    }

    if (result?.status == Status.SKIPPED) {
        img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
        videoPath = await fixture.page.video().path();
    }

    await fixture.page.close();
    await context.close();

    if (result?.status == Status.PASSED) {
        await this.attach(
            img, "image/png"
        );
        await this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );
    }

    if (result?.status == Status.FAILED) {
        await this.attach(
            img, "image/png"
        );
        await this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );
    }

    if (result?.status == Status.SKIPPED) {
        await this.attach(
            img, "image/png"
        );
        await this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );
    }


});

AfterAll(async function () {
    await browser.close();

})


function getStorageState(user: string): string | { cookies: { name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }[]; origins: { origin: string; localStorage: { name: string; value: string; }[]; }[]; } {
    if (user.includes("TR"))
        return "src/helper/auth/TR.json";
    else if (user.includes("Ops"))
        return "src/helper/auth/Ops.json";
    else if (user.includes("OCU"))
        return "src/helper/auth/ops.json";
    else if (user.includes("Accounting"))
        return "src/helper/auth/ops.json";
}
