import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import { VesselSchedulePage } from '../../pages/VesselSchedule.page';

let vesselSchedulePage: VesselSchedulePage;


Then('I am on the Vessel Schedule page', async function () {
    vesselSchedulePage = new VesselSchedulePage(fixture.page);
    await vesselSchedulePage.goto();
});

When('Schedule a vessel', async function () {
    await vesselSchedulePage.enterVesselName();
});

When('Enter berth info, vessel info and week info', async function () {
    // Example values, update as needed
    await vesselSchedulePage.fillBerthVesselWeekForVoyage53();
});

When('Click on Save button', async function () {
    await vesselSchedulePage.clickSave();
});

Then('Verify remarks are added successfully', async function () {
    await vesselSchedulePage.addRemarks('Test Remark');
    await vesselSchedulePage.verifyRemarksAdded();
});

Then('verify delete vessel functionalities', async function () {
    await vesselSchedulePage.deleteVessel();
});

Then('Verify View schedule View', async function () {
    await vesselSchedulePage.verifyViewSchedule();
});
