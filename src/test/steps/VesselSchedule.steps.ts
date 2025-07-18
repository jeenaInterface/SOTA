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

When('Enter berth info, vessel info , week info and remarks', async function () {
    // Example values, update as needed
    await vesselSchedulePage.fillBerthVesselWeekForVoyage53();
});

When('Click on Save button', async function () {
    await vesselSchedulePage.clickSave();
});


Then('Verify View schedule View', async function () {
    await vesselSchedulePage.verifyViewSchedule();
});
