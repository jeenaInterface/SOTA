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