import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import { SteadyTrackingSheetPage } from "../../pages/steadyTrackingSheet.page";

let steadyTrackingSheetPage: SteadyTrackingSheetPage;

Given('User navigates to the steady tracking sheet page', async function () {
    steadyTrackingSheetPage = new SteadyTrackingSheetPage(fixture.page);
    await steadyTrackingSheetPage.navigateToSteadyTrackingSheet();
    await steadyTrackingSheetPage.clickGoButton();
});



When('Select Job code for some steadies under Ops - Clerk tab', async function () {

    await steadyTrackingSheetPage.selectJobCode_Ops_Clerk_Tab();
});

When('Select Job code for some steadies under vessel - clerk tab', async function () {
    await steadyTrackingSheetPage.selectJobCode_vessel_Clerk_Tab();
});

When('Select Job code for some steadies under Vessel - forman tab', async function () {
    await steadyTrackingSheetPage.selectJobCode_vessel_Foremen_Tab();
});
When('Verify total value and gurantee value in vessel - forman tab', async function () {
    await steadyTrackingSheetPage.verifyTotalValueVessel_Foremen_Tab();
});


// When('Select Job code for some steadies under vessel - crane operator tab', async function () {
//     await steadyTrackingSheetPage.selectTab('Vessel - Crane Operator');
//     await steadyTrackingSheetPage.selectJobCode('Vessel - Crane Operator');
// });

Then('Enter remarks for first row in the steady tracking sheet', async function () {
    await steadyTrackingSheetPage.enterRemarks('Test remarks');
});

When('User clicks on Save button in the steady tracking sheet', async function () {
    await steadyTrackingSheetPage.clickSaveButton();
});

Then('User should see success message for steady tracking sheet', async function () {
    await steadyTrackingSheetPage.verifySuccessMessage();
});

Then('Verify total value', async function () {
    await steadyTrackingSheetPage.verifyTotalValue();
});

