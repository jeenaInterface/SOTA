import { Given, Then, When } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import { SupportingDataPage } from '../../pages/admin.page';

let supportingDataPage: SupportingDataPage;

Given('TR user logged into the application', async function() {
    // Login step will be handled in login steps
});

Then('select Supporting Data from the admin menu', async function() {
    supportingDataPage = new SupportingDataPage(fixture.page);
    await supportingDataPage.clickOnAdminMenu();
});

When('Select LO_Reference from the type list', async function() {
    await supportingDataPage.selectType();
});

When('Click on the edit button', async function() {
    await supportingDataPage.clickEditButton();
});

When('Click on the update button', async function() {
    await supportingDataPage.clickUpdateButton();
});

Then('Verify the sucess message is displayed', async function() {
    await supportingDataPage.getSuccessMessage();
});