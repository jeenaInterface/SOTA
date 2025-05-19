Feature: Vessel order and ops vessel timehseet functionalities
  @auth
  Scenario: TR user creates a new vessel order and then discards the order
    Given the user creates a new vessel order
    Then the user discards the order


  @auth1
  Scenario: TR user creates, firms, pushes to summary sheet, and cancels a vessel order
    Given the user creates a new vessel order
    Then the user firm the order
    Then the user push the labor order to the summary sheet
    Then the user cancel the order

  @sanity
  Scenario: The TR user creates a new vessel order and discards it
    Given TR user logged into the application
    Given the user creates a new vessel order
    Then the user discards the order

  @sanity
  Scenario: Verify Mandatory validation messages in vessel order
    Given TR user logged into the application
    Then Verify that the appropriate validation message for berth , start time and reference field
    Then Verify that the appropriate validation message for steady name and steady count field


  @sanity
  Scenario: TR user creates, firms, pushes to summary sheet, and cancels a vessel order
    Given TR user logged into the application
    Given the user creates a new vessel order
    Then the user firm the order
    Then the user push the labor order to the summary sheet
    Then the user cancel the order

  @sanity
  Scenario: Vessel Order Timehseet - Save without submit, Save and Submit, Reject, Approve, Remove Approval, Add new steady and Download Report
    Given TR user logged into the application
    Given the user creates a new vessel order
    Then the user push the labor order to the summary sheet
    Given the user creates a new vessel timesheet
    When the user saves the vessel order without submitting it
    Then the user saves and submits the vessel order
    Then user click on logout button
    Then Ops user logged into the application
    Then Ops user submits and approve the vessel timesheet
    Then ops user reject the vessel timesheet
    Then verify remove approval functionality
    Then user click on logout button
    Then Timehseet entry user logged into the application
    Then Labor entry add new steady details and mgr comments and submit the timehseet
    Then user click on logout button
    Then Ops user logged into the application
    Then Ops user submits and approve the vessel timesheet
    Then the user verifies the download report functionality for the vessel order
    Then user click on logout button

