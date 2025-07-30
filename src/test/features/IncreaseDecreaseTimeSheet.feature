Feature: Increase/Decrease Timesheet Management

@increaseDecreaseTimesheet
  Scenario: TR management user creates and saves increase/decrease timesheet, OPS management approves, reject and deletes the entry - rail order
    Given TR user logged into the application
    And I navigate to the Increase-Decrease Timesheet page
    When I select landing page details for a rail order with work order date as current date minus 15 days
    And I create a new row in the Increase-decrease tab and enter steady, ST, and OT hours
    Then user click on logout button
    Then Ops user logged into the application
    When I navigate to the Increase-Decrease Timesheet page
    And I select landing page details for a rail order with work order date as current date minus 15 days
    And I approve the timesheet entry
    Then verify the report downloaded successfully
    Then Then Reject the timesheet entry
    Then Then delete entire timesheet entry

    @increaseDecreaseTimesheet
  Scenario: TR management user creates and saves increase/decrease timesheet, OPS management approves, reject and deletes the entry - yard order
    Given TR user logged into the application
    And I navigate to the Increase-Decrease Timesheet page
    When I select landing page details for a yard order with work order date as current date minus 15 days
    And I create a new row in the Increase-decrease tab and enter steady, ST, OT and DFT hours
    Then user click on logout button
    Then Ops user logged into the application
    When I navigate to the Increase-Decrease Timesheet page
    And I select landing page details for a yard order with work order date as current date minus 15 days
    And I approve the timesheet entry
    Then verify the report downloaded successfully
    Then Then Reject the timesheet entry
    Then Then delete entire timesheet entry


  @increaseDecreaseTimesheetvalidation
  Scenario: Mandatory validation messages in increase-decrease timesheet
    Given Ops management user logged into the application
    When I navigate to the Increase-Decrease Timesheet page
    And I select landing page details for a rail order with work order date as current date minus 15 days
    Then Click on submit button without entering any details
    Then Verify that the appropriate validation message for timesheet entry when click on approve button
    Then Verify validation message for Longshore Name, Payroll and Hours
    Then Verify validation message for LBCT Management Name
    Then Delete entire timesheet entire entry