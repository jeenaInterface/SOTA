import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import { SteadySchedulePage } from "../../pages/steadySchedule.page";

let steadySchedulePage: SteadySchedulePage;

Given('User navigates to the steady schedule page', async function () {
    steadySchedulePage = new SteadySchedulePage(fixture.page);
    await steadySchedulePage.navigateToSteadySchedule();
});

When('User clicks on GO button', async function () {
    await steadySchedulePage.clickGoButton();
});



When('User clicks on Save button', async function () {
    await steadySchedulePage.clickSaveButton();
});



Then('User should see success message for steady schedule', async function () {
    await steadySchedulePage.verifySuccessMessage();
});


When('Select Job code for some steadies under CO tab', async function () {
    await steadySchedulePage.selectCOTab();
    // Selecting job codes for multiple rows
    await steadySchedulePage.selectJobCode(1, 'JC001'); // Example job code
    await steadySchedulePage.selectJobCode(2, 'JC002'); // Example job code
});

When('Select Job code for some steadies under FM tab', async function () {
    await steadySchedulePage.selectFMTab();
    // Selecting job codes for multiple rows
    await steadySchedulePage.selectJobCode(1, 'FM001'); // Example job code
    await steadySchedulePage.selectJobCode(2, 'FM002'); // Example job code
});

When('Select Job code for some steadies under Vessel tab', async function () {
    await steadySchedulePage.selectVesselTab();
    // Selecting job codes for multiple rows
    await steadySchedulePage.selectJobCode(1, 'VS001'); // Example job code
    await steadySchedulePage.selectJobCode(2, 'VS002'); // Example job code
});

Then('Enter remarks for first row.', async function () {
    await steadySchedulePage.enterRemarks('Test remarks for steady schedule');
});

Then('Verify total and gurantee value', async function () {
    await steadySchedulePage.verifyTotalAndGuaranteeValue();
});
