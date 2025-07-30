Feature:  Guarantee Timesheet Management

@GuaranteeTimesheet
  Scenario: TR management user creates and saves Guarantee timesheet, OPS management approves, reject and deletes the entry - rail order
    Given TR user logged into the application
    And I navigate to the Guarantee Timesheet page
    When I select landing page details for Guarantee timesheet with work order date, shift and job type
    And I create a new row in the Guarantee tab and enter steady, ST, and OT hours
    Then user click on logout button
    Then Ops user logged into the application
    When I navigate to the Guarantee Timesheet page
    And I select landing page details for Guarantee timesheet with work order date, shift and job type
    And Ops user approve the timesheet entry
    Then verify the GuaranteeTimesheet report downloaded successfully
    Then Then Reject the guarantee timesheet entry
    Then delete entire guarantee timesheet 

    @guaranteeTimesheetvalidation
  Scenario: Mandatory validation messages in guarantee timesheet
    Given Ops management user logged into the application
    When I navigate to the Guarantee Timesheet page
    And I select landing page details for Guarantee timesheet with work order date, shift and job type
    Then Click on submit button without entering any details in guarantee timesheet
    Then Verify that the appropriate validation message for guarantee timesheet entry when click on approve button
    Then Verify validation message for Longshore Name, Payroll and Hours for Guarantee Timesheet
    Then Verify validation message for LBCT Management Name for Guarantee Timesheet
    Then Delete entire guarantee timesheet entry



