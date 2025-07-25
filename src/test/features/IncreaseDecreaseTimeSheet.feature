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

  @increaseDecreaseTimesheet @yardorderincreaseDecreaseTimesheet
  Scenario: TR management user creates and saves increase-decrease timesheet, OPS management approves, reject and deletes the entry - yard order
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