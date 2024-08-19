import { Page, BrowserContext, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import * as data from "../helper/util/test-data/payloads.json";
import { request } from "@playwright/test";
import { APiUtils } from "../helper/util/apiUtils/api.utils";
import {setDefaultTimeout } from "@cucumber/cucumber"

setDefaultTimeout(60 * 1000)
let Response: any; // Define Response variable
let ClientPage: steadyManagementPage; // Define ClientPage variable
let orderId: any

export default class steadyManagementPage {

    private base: PlaywrightWrapper;
    private page: Page;


    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;


    }

    private Elements = {
        steady: "//div[normalize-space(text())='Steady']",
        steadyManagement: "//div[@data-bs-popper='static']//a[1]",
        OperationType: "//select[@ng-reflect-name='opsType']",
        column: "th",
        orderDetails: "//small[text()='Order Id']/following-sibling::div",
        button:"(//button[text()='View'])[1]"
    };

    async clicksteadyMenuButton(): Promise<void> {
       await this.page.goto("https://sotadev.gcp.lbct.llc/#/home/steadyLookup");
        await this.base.waitAndClick(this.Elements.steady);
        await this.base.waitAndClick(this.Elements.steadyManagement);
    }

    // async clickOrderButton1(): Promise<void> {
    //     await this.base.waitAndClick(this.Elements.myOrders);
    // }

    // async getOrderId(): Promise<string> {
    //     const orderdetails = await this.page.locator(this.Elements.orderDetails);
    //     const innertextPanel = await orderdetails.innerText();
    //     console.log("innertextPanel" +innertextPanel);
    //     return innertextPanel;
    // }
    // async addTokenToLocalStorage(): Promise<void> {
    //     // Adds a script to the page that sets the 'token' key in the local storage with the provided token value.
    //     await this.page.addInitScript((token) => {
    //         localStorage.setItem('token', token);
    //     }, Response.token);         
    // }


}

