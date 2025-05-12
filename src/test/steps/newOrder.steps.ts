import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import newOrderPage from "../../pages/newOrder.page";

let newOrder: newOrderPage;

When('the user navigates to the new order form', async function () {
    newOrder = new newOrderPage(fixture.page);
    await newOrder.navigateToNewOrderForm();
});

When('the user enters work date and shift', async function () {
    await newOrder.enterWorkDate();
    await newOrder.selectShift();
});

When('the user clicks on Go button', async function () {
    await newOrder.clickGoButton();
});


When('the user fills details in local 13 tab', async function () {
    await newOrder.fillLocal13Details();
    await newOrder.clickSaveButton();
    await newOrder.verifySuccessMessage();
});

When('the user fills details in local 63 tab', async function () {
    await newOrder.fillLocal63Details();
    await newOrder.clickSaveButton();
    await newOrder.verifySuccessMessage();
});

When('the user fills details in local 94 tab', async function () {
    await newOrder.fillLocal94Details();
});
