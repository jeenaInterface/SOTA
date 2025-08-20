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
    await steadySchedulePage.selectJobCode();
});

When('Select Job code for some steadies under FM tab', async function () {
    await steadySchedulePage.selectFMTab();
});

When('Select Job code for some steadies under Vessel tab', async function () {
    await steadySchedulePage.selectVesselTab();
});
When('Select Job code for some steadies under Yard tab', async function () {
    await steadySchedulePage.selectYardTab();
});
When('Select Job code for some steadies under Rail tab', async function () {
    await steadySchedulePage.selectRailTab();
});
When('Select Job code for some steadies under TSRV tab', async function () {
    await steadySchedulePage.selectTSRVTab();
});

Then('Enter remarks for first row', async function () {
    await steadySchedulePage.enterRemarks('Test remarks for steady schedule');
    await steadySchedulePage.clickSaveButton();

});

Then('Verify total and guarantee value', async function () {
    await steadySchedulePage.verifyTotalAndGuaranteeValue();
});
